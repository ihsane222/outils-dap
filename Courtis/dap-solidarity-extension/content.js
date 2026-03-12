// content.js — DAP Solidarity Extension
// Surveille la sélection en temps réel et la sauvegarde avant que le clic sur l'icône la fasse disparaître

let debounce;
document.addEventListener('selectionchange', () => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    const sel = window.getSelection().toString().trim();
    // On ne sauvegarde que si non vide — le popup supprime la valeur lui-même après lecture
    if (sel) chrome.storage.local.set({ dapLastSelection: sel });
  }, 80);
});
