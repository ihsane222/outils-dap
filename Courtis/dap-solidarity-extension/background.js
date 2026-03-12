// background.js — DAP Solidarity Extension
// Service worker : gère le menu contextuel (clic droit)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'dap-search',
    title: 'Rechercher "%s" dans DAP Solidarity',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'dap-search') return;

  const { dapUrl } = await chrome.storage.sync.get('dapUrl');

  if (!dapUrl) {
    // URL non configurée → ouvre les options
    chrome.runtime.openOptionsPage();
    return;
  }

  const q = info.selectionText.trim();
  if (!q) return;

  const base = dapUrl.endsWith('/') ? dapUrl : dapUrl + '/';
  chrome.tabs.create({ url: `${base}?search=${encodeURIComponent(q)}` });
});
