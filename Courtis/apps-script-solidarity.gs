// ═══════════════════════════════════════════════════════════════
//  DAP Solidarity — Apps Script backend
//  À déployer comme Web App dans Google Apps Script
//
//  Colonnes attendues dans le Google Sheet (ligne 1 = en-têtes) :
//  A: Preneur
//  B: Mail client
//  C: Numéro contrat
//  D: Produit
//  E: Date de souscription
//  F: Date de prise d'effet
//  G: Primes annuelles HT
//  H: Prime annuelle TTC
//  I: Fractionnement
//  J: Etat paiement
//  K: Date paiement
//  L: Contact DAP
//  M: Site DAP
//  N: Association choisie   ← à ajouter dans votre sheet si absente
//
//  Déploiement :
//  1. Extensions > Apps Script
//  2. Coller ce code > Enregistrer
//  3. Déployer > Nouveau déploiement > Web App
//     - Exécuter en tant que : Moi
//     - Accès : Toute personne de l'organisation
//  4. Copier l'URL et la coller dans l'outil HTML
// ═══════════════════════════════════════════════════════════════

const SHEET_NAME = 'DAP Solidarity'; // ← adapter si besoin

// Mapping colonnes (0-based index)
const COL = {
  preneur:     0,  // A
  mail:        1,  // B
  contrat:     2,  // C
  produit:     3,  // D
  dateSocket:  4,  // E
  dateEffet:   5,  // F
  primeHT:     6,  // G
  primeTTC:    7,  // H
  fraction:    8,  // I
  etatPaiement:9,  // J
  datePaiement:10, // K
  contactDap:  11, // L
  siteDap:     12, // M
  asso:        13, // N
};

function doGet(e) {
  const action = e.parameter.action || '';
  let result;

  try {
    if (action === 'search') {
      result = handleSearch(e.parameter.q || '');
    } else if (action === 'updateAsso') {
      result = handleUpdateAsso(e.parameter.contrat, e.parameter.asso);
    } else {
      result = { success: false, error: 'Action inconnue' };
    }
  } catch (err) {
    result = { success: false, error: err.toString() };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── RECHERCHE ─────────────────────────────────────────────────────
function handleSearch(q) {
  if (!q || q.length < 2) return { success: false, found: false };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, error: 'Feuille "' + SHEET_NAME + '" introuvable' };

  const data  = sheet.getDataRange().getValues();
  const qNorm = normalize(q);

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (
      normalize(row[COL.preneur]).includes(qNorm) ||
      normalize(row[COL.contrat]).includes(qNorm) ||
      normalize(row[COL.mail]).includes(qNorm)
    ) {
      return {
        success: true,
        found: true,
        client: rowToClient(row),
      };
    }
  }

  return { success: true, found: false };
}

// ── UPDATE ASSOCIATION ────────────────────────────────────────────
function handleUpdateAsso(contrat, asso) {
  if (!contrat) return { success: false, error: 'Contrat manquant' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return { success: false, error: 'Feuille introuvable' };

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (normalize(data[i][COL.contrat]) === normalize(contrat)) {
      sheet.getRange(i + 1, COL.asso + 1).setValue(asso);
      return { success: true };
    }
  }

  return { success: false, error: 'Contrat introuvable : ' + contrat };
}

// ── HELPERS ───────────────────────────────────────────────────────
function rowToClient(row) {
  return {
    preneur:      String(row[COL.preneur]     || ''),
    mail:         String(row[COL.mail]        || ''),
    contrat:      String(row[COL.contrat]     || ''),
    produit:      String(row[COL.produit]     || ''),
    dateSocket:   fmtDate(row[COL.dateSocket]),
    dateEffet:    fmtDate(row[COL.dateEffet]),
    primeHT:      fmtCurrency(row[COL.primeHT]),
    primeTTC:     fmtCurrency(row[COL.primeTTC]),
    fraction:     String(row[COL.fraction]    || ''),
    etatPaiement: String(row[COL.etatPaiement]|| ''),
    datePaiement: fmtDate(row[COL.datePaiement]),
    contactDap:   String(row[COL.contactDap]  || ''),
    siteDap:      String(row[COL.siteDap]     || ''),
    asso:         String(row[COL.asso]        || ''),
  };
}

function normalize(str) {
  return String(str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function fmtDate(val) {
  if (!val) return '';
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return String(val);
}

function fmtCurrency(val) {
  if (!val && val !== 0) return '';
  const n = parseFloat(String(val).replace(',', '.'));
  if (isNaN(n)) return String(val);
  return n.toFixed(2).replace('.', ',') + ' €';
}
