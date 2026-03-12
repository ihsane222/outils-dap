// options.js — DAP Solidarity Extension

document.addEventListener('DOMContentLoaded', async () => {
  const urlInput = document.getElementById('urlInput');
  const btnSave  = document.getElementById('btnSave');
  const toast    = document.getElementById('toast');

  // Charger l'URL enregistrée
  const { dapUrl } = await chrome.storage.sync.get('dapUrl');
  if (dapUrl) urlInput.value = dapUrl;

  btnSave.addEventListener('click', async () => {
    const url = urlInput.value.trim().replace(/\/$/, ''); // Enlever le slash final

    if (!url) {
      showToast('Veuillez entrer une URL.', 'error');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      showToast('L\'URL doit commencer par https://', 'error');
      return;
    }

    await chrome.storage.sync.set({ dapUrl: url });
    showToast('✅ URL enregistrée avec succès !', 'success');
  });

  function showToast(msg, type) {
    toast.textContent = msg;
    toast.className = `toast ${type}`;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
  }
});
