// ============================================================
//  DAP — Telavox Suivi · Google Apps Script
//  À coller dans : script.google.com → Nouveau projet
// ============================================================

// ── CONFIGURATION ───────────────────────────────────────────
const SHEET_ID = 'REMPLACER_PAR_ID_DU_SHEET'; // ID du Google Sheet (dans l'URL)
const SECRET   = 'dap_telavox_2024';           // Changer par un mot de passe secret

// Mapping extension Telavox → nom courtier
// Remplacer par les vrais numéros de poste DAP
const COURTIERS = {
  '101': 'Julie Maes',
  '102': 'Maxime Dubois',
  '103': 'Lorena Morales',
  '104': 'Sufyan Khalil',
  '105': 'Matias Garcia',
};

// ── WEBHOOK TELAVOX (réception des événements d'appel) ──────
function doPost(e) {
  try {
    const params = e.parameter;

    if (params.secret !== SECRET) {
      return _json({ error: 'Unauthorized' }, 403);
    }

    const event  = params.event     || '';
    const numero = params.caller    || 'Inconnu';
    const poste  = params.extension || '';
    const callId = params.callid    || Utilities.getUuid();
    const nom    = COURTIERS[poste] || ('Poste ' + poste);

    const ss    = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('calls');

    if (event === 'ringing') {
      // Appel entrant — on l'enregistre, pas encore décroché
      sheet.appendRow([
        callId,
        new Date().toISOString(),
        nom,
        _formatNum(numero),
        'ringing',
        false,
        new Date().toLocaleDateString('fr-BE')
      ]);
    }

    if (event === 'answer') {
      // Quelqu'un a décroché → marquer answered = true
      _updateCall(sheet, callId, { answered: true });
    }

    if (event === 'hangup') {
      // Raccroché — si jamais répondu → appel manqué
      const data = sheet.getDataRange().getValues();
      let found  = false;

      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === callId) {
          found = true;
          if (!data[i][5]) {
            // answered = false → appel manqué confirmé
            sheet.getRange(i + 1, 5).setValue('missed');
          }
          break;
        }
      }

      if (!found) {
        // Hangup direct sans ringing enregistré (edge case)
        sheet.appendRow([
          callId,
          new Date().toISOString(),
          nom,
          _formatNum(numero),
          'missed',
          false,
          new Date().toLocaleDateString('fr-BE')
        ]);
      }
    }

    return _json({ ok: true });

  } catch (err) {
    console.error('doPost error:', err);
    return _json({ error: err.toString() });
  }
}

// ── API LECTURE + ACTIONS (appelée par l'outil HTML) ────────
function doGet(e) {
  try {
    const params = e.parameter;

    if (params.secret !== SECRET) {
      return _json({ error: 'Unauthorized' });
    }

    const action = params.action || 'getData';

    // ── Lire les données ──
    if (action === 'getData') {
      return _json(_getData());
    }

    // ── Prendre en charge un appel ──
    if (action === 'prendre') {
      const ss    = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName('suivis');
      sheet.appendRow([
        params.callId,
        params.courtier,
        new Date().toISOString(),
        '',    // note vide
        '',    // résultat vide
        false  // non clôturé
      ]);
      return _json({ ok: true });
    }

    // ── Clôturer un suivi ──
    if (action === 'cloturer') {
      const ss    = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheetByName('suivis');
      const data  = sheet.getDataRange().getValues();

      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === params.callId) {
          sheet.getRange(i + 1, 4).setValue(params.note     || '');
          sheet.getRange(i + 1, 5).setValue(params.resultat || '');
          sheet.getRange(i + 1, 6).setValue(true);
          break;
        }
      }
      return _json({ ok: true });
    }

    return _json({ error: 'Action inconnue' });

  } catch (err) {
    console.error('doGet error:', err);
    return _json({ error: err.toString() });
  }
}

// ── LOGIQUE MÉTIER ───────────────────────────────────────────
function _getData() {
  const ss     = SpreadsheetApp.openById(SHEET_ID);
  const calls  = ss.getSheetByName('calls').getDataRange().getValues();
  const suivis = ss.getSheetByName('suivis').getDataRange().getValues();

  // Appels des 7 derniers jours
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);

  const missed = calls.slice(1)
    .filter(r => r[4] === 'missed' && new Date(r[1]) > cutoff)
    .map(r => ({
      id:        r[0],
      timestamp: r[1],
      courtier:  r[2],
      numero:    r[3],
    }));

  // IDs déjà clôturés
  const closedIds = new Set(
    suivis.slice(1).filter(r => r[5] === true).map(r => r[0])
  );

  // IDs déjà pris en charge (non clôturés)
  const prisSuivis = {};
  suivis.slice(1)
    .filter(r => r[5] !== true)
    .forEach(r => { prisSuivis[r[0]] = { prisPar: r[1], pris: r[2], note: r[3] }; });

  // Appels ouverts (non clôturés)
  const open = missed.filter(c => !closedIds.has(c.id));

  // Grouper par numéro
  const byNum = {};
  open.forEach(c => {
    if (!byNum[c.numero]) byNum[c.numero] = [];
    byNum[c.numero].push(c);
  });

  // Rappeleurs (≥ 2 appels manqués du même numéro)
  const rappeleurs = Object.entries(byNum)
    .filter(([, arr]) => arr.length >= 2)
    .map(([num, arr]) => {
      const sorted = arr.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const lastId = sorted[sorted.length - 1].id;
      return {
        id:         lastId,
        numero:     num,
        appels:     arr.length,
        premier:    _fmtDate(sorted[0].timestamp),
        dernier:    _fmtDate(sorted[sorted.length - 1].timestamp),
        depuisMin:  _depuisMin(sorted[sorted.length - 1].timestamp),
        prisPar:    prisSuivis[lastId]?.prisPar || null,
        history:    sorted.map(c => ({ time: _fmtDate(c.timestamp), courtier: c.courtier })),
      };
    });

  // Attente (1 seul appel, pas encore pris en charge)
  const attente = Object.entries(byNum)
    .filter(([, arr]) => arr.length === 1)
    .map(([num, arr]) => ({
      id:        arr[0].id,
      numero:    num,
      timestamp: _fmtDate(arr[0].timestamp),
      depuisMin: _depuisMin(arr[0].timestamp),
      prisPar:   prisSuivis[arr[0].id]?.prisPar || null,
    }))
    .filter(c => !c.prisPar) // exclure les déjà pris en charge
    .sort((a, b) => b.depuisMin - a.depuisMin);

  // Mes suivis actifs (tous utilisateurs — filtrés côté outil par nom)
  const activeSuivis = suivis.slice(1)
    .filter(r => r[5] !== true)
    .map(r => ({
      callId:  r[0],
      prisPar: r[1],
      pris:    _fmtDate(r[2]),
      note:    r[3],
      numero:  _numFromCallId(r[0], missed),
    }));

  return {
    rappeleurs,
    attente,
    suivis:   activeSuivis,
    traites:  suivis.slice(1).filter(r => r[5] === true).length,
  };
}

// ── HELPERS ──────────────────────────────────────────────────
function _updateCall(sheet, callId, updates) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === callId) {
      if (updates.answered !== undefined) sheet.getRange(i + 1, 6).setValue(updates.answered);
      break;
    }
  }
}

function _formatNum(num) {
  // Normalise le numéro : +32477123456 → +32 477 12 34 56
  const clean = (num || '').replace(/\s/g, '');
  if (clean.startsWith('+32') && clean.length === 12) {
    return '+32 ' + clean.slice(3, 6) + ' ' + clean.slice(6, 8) + ' ' + clean.slice(8, 10) + ' ' + clean.slice(10);
  }
  return num;
}

function _fmtDate(iso) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    if (isToday) return 'Auj. ' + h + ':' + m;
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    return days[d.getDay()] + ' ' + h + ':' + m;
  } catch { return iso; }
}

function _depuisMin(iso) {
  return Math.round((new Date() - new Date(iso)) / 60000);
}

function _numFromCallId(callId, missed) {
  const found = missed.find(c => c.id === callId);
  return found ? found.numero : '—';
}

function _json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── INITIALISATION DU SHEET (à lancer une seule fois) ───────
function initSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // Onglet calls
  let calls = ss.getSheetByName('calls');
  if (!calls) calls = ss.insertSheet('calls');
  calls.clearContents();
  calls.getRange(1, 1, 1, 7).setValues([[
    'id', 'timestamp', 'courtier', 'numero', 'event', 'answered', 'date'
  ]]);
  calls.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('white');

  // Onglet suivis
  let suivis = ss.getSheetByName('suivis');
  if (!suivis) suivis = ss.insertSheet('suivis');
  suivis.clearContents();
  suivis.getRange(1, 1, 1, 6).setValues([[
    'callId', 'prisPar', 'pris', 'note', 'resultat', 'cloture'
  ]]);
  suivis.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('white');

  SpreadsheetApp.flush();
  Logger.log('✅ Sheet initialisé avec succès');
}
