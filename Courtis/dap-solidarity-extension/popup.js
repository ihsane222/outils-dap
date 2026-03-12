// popup.js — DAP Solidarity Extension

document.addEventListener('DOMContentLoaded', async () => {
  const stateNoUrl  = document.getElementById('stateNoUrl');
  const stateOnDap  = document.getElementById('stateOnDap');
  const stateSearch = document.getElementById('stateSearch');
  const searchInput = document.getElementById('searchInput');
  const btnSearch   = document.getElementById('btnSearch');
  const btnSettings = document.getElementById('btnSettings');
  const btnConfigure= document.getElementById('btnConfigure');
  const autoChip    = document.getElementById('autoChip');
  const autoText    = document.getElementById('autoText');

  // Ouvrir les options
  btnSettings.addEventListener('click', () => chrome.runtime.openOptionsPage());
  btnConfigure.addEventListener('click', () => chrome.runtime.openOptionsPage());

  // Récupérer l'URL configurée
  const { dapUrl } = await chrome.storage.sync.get('dapUrl');

  if (!dapUrl) {
    stateNoUrl.style.display = 'block';
    return;
  }

  // Vérifier si l'onglet actif est déjà sur DAP Solidarity
  let tab;
  try {
    [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const tabUrl = tab?.url || '';
    if (tabUrl.startsWith(dapUrl)) {
      stateOnDap.style.display = 'block';
      return;
    }
  } catch (e) {}

  // Afficher le formulaire de recherche
  stateSearch.style.display = 'block';
  searchInput.focus();

  // Lire la dernière sélection sauvegardée par content.js
  try {
    const { dapLastSelection } = await chrome.storage.local.get('dapLastSelection');
    if (dapLastSelection) {
      searchInput.value = dapLastSelection;
      autoText.textContent = dapLastSelection.length > 30 ? dapLastSelection.slice(0, 30) + '…' : dapLastSelection;
      autoChip.style.display = 'flex';
      searchInput.select();
      // Effacer après lecture pour ne pas réutiliser à la prochaine ouverture
      chrome.storage.local.remove('dapLastSelection');
    }
  } catch (e) {}
  searchInput.focus();

  // Lancer la recherche
  btnSearch.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  function doSearch() {
    const q = searchInput.value.trim();
    if (!q) {
      searchInput.style.borderColor = '#ef4444';
      setTimeout(() => { searchInput.style.borderColor = ''; }, 1200);
      return;
    }
    const base = dapUrl.replace(/\/$/, ''); // Enlever le slash final dans tous les cas
    chrome.tabs.create({ url: `${base}?search=${encodeURIComponent(q)}` });
    window.close();
  }
});
