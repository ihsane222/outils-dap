// ============================================
// DAP Bureau Uccle — Google Apps Script Backend
// ============================================
// À coller dans : Google Sheets > Extensions > Apps Script
// Puis : Déployer > Nouvelle déploiement > Application web
//   - Exécuter en tant que : Moi
//   - Accès : Toute personne
// Copier l'URL du déploiement dans bureau-uccle-pixel.html (APPS_SCRIPT_URL)
// ============================================

// Nom de la feuille utilisée pour stocker les réservations
const SHEET_NAME = 'Reservations';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['key', 'data', 'updatedAt', 'updatedBy']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// GET — Lire toutes les réservations
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const reservations = {};

    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const key = data[i][0];
      const value = data[i][1];
      if (key && value) {
        try {
          reservations[key] = JSON.parse(value);
        } catch (err) {
          // Skip malformed rows
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, reservations }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// POST — Sauvegarder une réservation
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { key, data, user } = body;

    if (!key) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Missing key' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getOrCreateSheet();
    const keys = sheet.getRange('A:A').getValues().flat();
    const rowIndex = keys.indexOf(key);

    const now = new Date().toISOString();
    const jsonData = JSON.stringify(data);

    if (rowIndex > 0) {
      // Update existing row
      sheet.getRange(rowIndex + 1, 2).setValue(jsonData);
      sheet.getRange(rowIndex + 1, 3).setValue(now);
      sheet.getRange(rowIndex + 1, 4).setValue(user || '');
    } else {
      // New row
      sheet.appendRow([key, jsonData, now, user || '']);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
