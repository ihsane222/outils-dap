// ================================================================
//  DAP — Formulaires Web : Réception et stockage Google Sheets
//  Google Apps Script — à déployer comme Web App
// ================================================================
//
//  INSTRUCTIONS DE DÉPLOIEMENT (5 minutes, 100% gratuit) :
//
//  1. Ouvrir https://script.google.com → "Nouveau projet"
//  2. Coller tout ce code dans l'éditeur
//  3. Remplacer VOTRE_ID_SPREADSHEET par l'ID de votre Google Sheet
//     (l'ID se trouve dans l'URL du fichier Google Sheets :
//      https://docs.google.com/spreadsheets/d/ --> ICI <-- /edit)
//  4. Déployer → "Nouveau déploiement"
//     → Type : Application Web
//     → Exécuter en tant que : Moi
//     → Accès : Tout le monde
//  5. Copier l'URL générée (https://script.google.com/macros/s/...)
//  6. Coller cette URL dans assets/form.js (variable WEBHOOK_URL)
//
// ================================================================

const SPREADSHEET_ID = '1u1BssZtxSMdY6AmqlrnRqWg5pGLPKW5YjFHZaNeu-Uc';

// Noms des onglets dans Google Sheets (créés automatiquement si absent)
const SHEET_NAMES = {
  'auto':        'Auto',
  'habitation':  'Habitation',
  'copropriete': 'Copropriété',
  'rcpro':       'RC Pro'
};

// Onglet du pipeline (suivi statut des dossiers)
const PIPELINE_SHEET = 'Pipeline';

// ── CONFIGURATION GESTIONNAIRES ────────────────────────────────
//
//  Chaque gestionnaire reçoit un code court unique (agent_ref).
//  Ce code est intégré dans l'URL partagée avec le client :
//    https://votre-site.com/formulaires/?ag=jean-dupont
//
//  Format : 'code-gestionnaire': { email, nom, bureau }
//  → 'general' est la boîte commune pour les clients sans courtier attitré.
//
const GESTIONNAIRES = {
  'general': { email: 'ife@dap.be', nom: 'Ihsane Fettache', bureau: 'DAP' },
  'ife':     { email: 'ife@dap.be', nom: 'Ihsane Fettache', bureau: 'DAP' },
};


// ── RÉCEPTION POST ─────────────────────────────────────────────

function doPost(e) {
  try {
    const raw = (e && e.postData) ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    // Ajouter horodatage lisible
    data.date_reception = Utilities.formatDate(
      new Date(), 'Europe/Brussels', 'dd/MM/yyyy HH:mm:ss'
    );

    const formType = (data.form_type || 'autre').toLowerCase();
    const sheetName = SHEET_NAMES[formType] || 'Autres';

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(sheetName);

    // Créer l'onglet s'il n'existe pas encore
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Gérer les en-têtes
    const keys = Object.keys(data);

    if (sheet.getLastRow() === 0) {
      // Premier envoi : créer les en-têtes
      sheet.appendRow(keys);
      formatHeaders(sheet, keys.length);
    }

    // Récupérer les colonnes existantes
    const lastCol = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    // Ajouter les nouvelles colonnes si le formulaire a évolué
    const newKeys = keys.filter(k => !headers.includes(k));
    if (newKeys.length > 0) {
      const updatedHeaders = [...headers, ...newKeys];
      sheet.getRange(1, 1, 1, updatedHeaders.length).setValues([updatedHeaders]);
      newKeys.forEach(k => headers.push(k));
    }

    // Construire la ligne dans l'ordre des colonnes
    const row = headers.map(header => {
      const val = data[header];
      if (Array.isArray(val)) return val.join(' | ');
      return (val !== undefined && val !== null) ? String(val) : '';
    });

    sheet.appendRow(row);

    // Mise en forme alternée des lignes (optionnel)
    const lastRow = sheet.getLastRow();
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, headers.length).setBackground('#f8f9fa');
    }

    // ── Enregistrement dans le Pipeline ────────────────────────
    writeToPipeline(data, formType);

    // ── Notification email au gestionnaire ─────────────────────
    sendNotificationEmail(data, formType);

    return buildResponse({ success: true, message: 'Données enregistrées avec succès.' });

  } catch (err) {
    console.error('Erreur DAP Formulaires :', err);
    return buildResponse({ success: false, error: err.toString() });
  }
}

// ── VÉRIFICATION ET PIPELINE (GET) ────────────────────────────
//
//  Actions disponibles (paramètre ?action=...) :
//
//  getPipeline               → retourne tous les dossiers du Pipeline en JSON
//  updateStatut&id=X&statut=Y → met à jour le statut du dossier X
//  (aucune action)           → ping de santé (réponse texte)
//
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';

  if (action === 'getPipeline') {
    return getPipelineJson();
  }

  if (action === 'updateStatut') {
    const id     = e.parameter.id     || '';
    const statut = e.parameter.statut || '';
    return updateStatutPipeline(id, statut);
  }

  return ContentService
    .createTextOutput('DAP Formulaires — API opérationnelle ✓\n' +
                      'Spreadsheet ID : ' + SPREADSHEET_ID)
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── PIPELINE : lecture ─────────────────────────────────────────

function getPipelineJson() {
  try {
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(PIPELINE_SHEET);
    if (!sheet || sheet.getLastRow() < 2) {
      return buildResponse({ success: true, dossiers: [] });
    }
    const rows    = sheet.getDataRange().getValues();
    const headers = rows[0];
    const dossiers = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i] !== undefined ? String(row[i]) : ''; });
      return obj;
    });
    return buildResponse({ success: true, dossiers });
  } catch (err) {
    return buildResponse({ success: false, error: err.toString() });
  }
}

// ── PIPELINE : mise à jour statut ─────────────────────────────

function updateStatutPipeline(id, statut) {
  const VALID = ['recu', 'en_cours', 'devis_envoye', 'relance', 'souscrit', 'perdu'];
  if (!id || !VALID.includes(statut)) {
    return buildResponse({ success: false, error: 'Paramètres invalides' });
  }
  try {
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(PIPELINE_SHEET);
    if (!sheet) return buildResponse({ success: false, error: 'Onglet Pipeline introuvable' });

    const rows    = sheet.getDataRange().getValues();
    const headers = rows[0];
    const idCol   = headers.indexOf('id');
    const statCol = headers.indexOf('statut');
    const mvtCol  = headers.indexOf('date_mouvement');
    if (idCol < 0 || statCol < 0) {
      return buildResponse({ success: false, error: 'Colonnes id/statut introuvables' });
    }

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][idCol] === id) {
        sheet.getRange(i + 1, statCol + 1).setValue(statut);
        if (mvtCol >= 0) {
          sheet.getRange(i + 1, mvtCol + 1).setValue(
            Utilities.formatDate(new Date(), 'Europe/Brussels', 'dd/MM/yyyy HH:mm:ss')
          );
        }
        return buildResponse({ success: true, updated: id, statut });
      }
    }
    return buildResponse({ success: false, error: 'Dossier ' + id + ' introuvable' });
  } catch (err) {
    return buildResponse({ success: false, error: err.toString() });
  }
}

// ── PIPELINE : bécriture (appelé par doPost) ───────────────────

function writeToPipeline(data, formType) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(PIPELINE_SHEET);

    if (!sheet) {
      sheet = ss.insertSheet(PIPELINE_SHEET);
      const headers = ['id', 'date', 'client', 'email', 'tel', 'type', 'agent_ref', 'gestionnaire', 'statut', 'date_mouvement'];
      sheet.appendRow(headers);
      formatHeaders(sheet, headers.length);
    }

    // Générer un ID unique pour ce dossier
    const lastRow = sheet.getLastRow();
    const id = 'DAP-' + String(lastRow).padStart(3, '0');

    const agentRef   = (data.agent_ref || 'general').toLowerCase();
    const gestionnaire = (GESTIONNAIRES[agentRef] || GESTIONNAIRES['general']).nom;
    const nomClient  = [data.prenom, data.nom].filter(Boolean).join(' ') ||
                       data.raison_sociale || 'Nouveau client';
    const now = Utilities.formatDate(new Date(), 'Europe/Brussels', 'dd/MM/yyyy HH:mm:ss');

    sheet.appendRow([
      id,
      now,
      nomClient,
      data.email || '',
      data.telephone || data.tel || '',
      formType,
      agentRef,
      gestionnaire,
      'recu',
      now,
    ]);
  } catch (err) {
    // Non-bloquant : le formulaire reste soumis même si le pipeline échoue
    console.error('Erreur writeToPipeline :', err);
  }
}

// ── HELPERS ───────────────────────────────────────────────────

function buildResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatHeaders(sheet, count) {
  const range = sheet.getRange(1, 1, 1, count);
  range
    .setFontWeight('bold')
    .setBackground('#1a1a2e')
    .setFontColor('#ffffff')
    .setWrap(true);
  sheet.setFrozenRows(1);

  // Auto-resize les colonnes
  for (let i = 1; i <= count; i++) {
    sheet.autoResizeColumn(i);
  }
}

// ── NOTIFICATION EMAIL ─────────────────────────────────────────

function sendNotificationEmail(data, formType) {
  try {
    // Résoudre le gestionnaire depuis agent_ref
    const agentRef = (data.agent_ref || 'general').toLowerCase();
    const gestionnaire = GESTIONNAIRES[agentRef] || GESTIONNAIRES['general'];

    const formLabels = {
      'auto':        'Assurance Auto',
      'habitation':  'Assurance Habitation/Incendie',
      'copropriete': 'Assurance Copropriété',
      'rcpro':       'RC Professionnelle'
    };
    const formLabel = formLabels[formType] || formType;

    // Infos client pour l'objet du mail
    const nomClient = [data.prenom, data.nom].filter(Boolean).join(' ') ||
                      data.raison_sociale || 'Nouveau client';
    const emailClient = data.email || '';
    const telClient   = data.telephone || data.tel || '';

    const subject = `[DAP] Nouvelle demande ${formLabel} — ${nomClient}`;

    const body = buildEmailBody({
      gestionnaire, formLabel, nomClient, emailClient, telClient,
      agentRef, data, formType
    });

    GmailApp.sendEmail(gestionnaire.email, subject, '', { htmlBody: body });

  } catch (err) {
    // L'email est non-bloquant : on log l'erreur sans faire échouer la soumission
    console.error('Erreur envoi email :', err);
  }
}

function buildEmailBody({ gestionnaire, formLabel, nomClient, emailClient, telClient, agentRef, data, formType }) {
  // Champs à exclure de la table récapitulative (techniques ou déjà affichés en haut)
  const EXCLUDE = ['form_type', 'timestamp', 'date_reception', 'agent_ref'];

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;

  // Lignes du tableau récapitulatif
  const rows = Object.entries(data)
    .filter(([k]) => !EXCLUDE.includes(k))
    .map(([k, v]) => {
      const label = k.replace(/_/g, ' ');
      const value = Array.isArray(v) ? v.join(', ') : (v || '—');
      return `<tr>
        <td style="padding:6px 12px; border-bottom:1px solid #e2e8f0; color:#6b7280; font-size:13px; white-space:nowrap;">${label}</td>
        <td style="padding:6px 12px; border-bottom:1px solid #e2e8f0; font-size:13px;">${value}</td>
      </tr>`;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<body style="margin:0; padding:0; background:#f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9; padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#1a1a2e,#0f3460); padding:28px 32px;">
          <p style="margin:0; color:rgba(255,255,255,0.6); font-size:12px; text-transform:uppercase; letter-spacing:1px;">Formulaires DAP</p>
          <h1 style="margin:8px 0 0; color:white; font-size:22px; font-weight:700;">Nouvelle demande reçue</h1>
        </td>
      </tr>

      <!-- Bandeau type formulaire -->
      <tr>
        <td style="background:#e8b84b; padding:10px 32px;">
          <p style="margin:0; color:#1a1a2e; font-weight:700; font-size:14px;">📋 ${formLabel}</p>
        </td>
      </tr>

      <!-- Infos client -->
      <tr>
        <td style="padding:24px 32px 8px;">
          <h2 style="margin:0 0 16px; font-size:15px; color:#1a1a2e;">Client</h2>
          <table cellpadding="0" cellspacing="0">
            <tr><td style="color:#6b7280; font-size:13px; padding-bottom:6px; padding-right:16px;">Nom</td><td style="font-size:13px; font-weight:600;">${nomClient}</td></tr>
            ${emailClient ? `<tr><td style="color:#6b7280; font-size:13px; padding-bottom:6px; padding-right:16px;">E-mail</td><td style="font-size:13px;"><a href="mailto:${emailClient}" style="color:#0f3460;">${emailClient}</a></td></tr>` : ''}
            ${telClient   ? `<tr><td style="color:#6b7280; font-size:13px; padding-bottom:6px; padding-right:16px;">Téléphone</td><td style="font-size:13px;">${telClient}</td></tr>` : ''}
          </table>
        </td>
      </tr>

      <!-- Destinataire -->
      <tr>
        <td style="padding:8px 32px 16px;">
          <p style="margin:0; font-size:12px; color:#9ca3af;">
            Assigné à <strong style="color:#1a1a2e;">${gestionnaire.nom}</strong>
            (${gestionnaire.bureau})
            · Référence : <code style="background:#f3f4f6; padding:2px 6px; border-radius:4px;">${agentRef}</code>
          </p>
        </td>
      </tr>

      <!-- Séparateur -->
      <tr><td style="padding:0 32px;"><hr style="border:none; border-top:1px solid #e2e8f0;"></td></tr>

      <!-- Tableau récapitulatif -->
      <tr>
        <td style="padding:20px 32px;">
          <h2 style="margin:0 0 12px; font-size:15px; color:#1a1a2e;">Détail du formulaire</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows}
          </table>
        </td>
      </tr>

      <!-- CTA Google Sheets -->
      <tr>
        <td style="padding:16px 32px 32px; text-align:center;">
          <a href="${sheetUrl}" style="display:inline-block; background:#1a1a2e; color:white; text-decoration:none; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:600;">
            Ouvrir Google Sheets →
          </a>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8f9fa; padding:16px 32px; border-top:1px solid #e2e8f0; text-align:center;">
          <p style="margin:0; color:#9ca3af; font-size:12px;">DAP Courtage d'assurances · Formulaires automatisés · info@dap.be</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── TEST MANUEL (depuis l'éditeur Apps Script) ─────────────────
// Pour tester sans passer par le formulaire HTML,
// sélectionnez cette fonction et cliquez "Exécuter"

function testEnvoi() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        form_type: 'auto',
        agent_ref: 'jean-dupont',   // ← tester avec un code gestionnaire réel
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@test.be',
        telephone: '0470 00 00 00',
        vehicule_marque: 'Volkswagen',
        vehicule_modele: 'Golf',
        solidarity: 'Un Pas de Côté'
      })
    }
  };
  const result = doPost(fakeEvent);
  console.log(result.getContent());
}
