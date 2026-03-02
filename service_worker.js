// service_worker.js
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tab;
}

async function extractDomText() {
  const tab = await getCurrentTab();
  if (!tab?.id) return { ok: false, error: 'Sem aba ativa' };
  return await chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_VISIBLE_TEXT' });
}

async function captureVisible() {
  const png = await chrome.tabs.captureVisibleTab();
  return png; // data URL PNG
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg?.type === 'ANALYSE_DOM') {
      sendResponse(await extractDomText());
    } else if (msg?.type === 'ANALYSE_OCR') {
      sendResponse({ ok: true, png: await captureVisible() });
    }
  })().catch(e => sendResponse({ ok: false, error: String(e) }));
  return true;
});
