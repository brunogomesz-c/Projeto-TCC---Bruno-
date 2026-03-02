
# Analista de Tela (MV3)

Extensão Chrome que analisa conteúdo visível (DOM e OCR) e compara/armazenha informações em uma base local de verdades.

## Como carregar no Chrome
1. Abra `chrome://extensions`
2. Ative **Developer mode**
3. Clique em **Load unpacked** e selecione a pasta deste projeto (`meu-analista`)
4. Fixe o ícone e abra o popup

## Observações
- Para OCR, coloque os binários do Tesseract (JS/WASM) em `ocr/` (arquivos **tesseract.min.js**, **worker.min.js**, **tesseract.wasm**). Não utilize CDN em MV3.
- `tabs.captureVisibleTab()` requer `activeTab` ou `<all_urls>` e deve ser chamado fora do content script.
- Service worker não tem acesso ao DOM e não suporta `localStorage`; use `chrome.storage` ou IndexedDB.

Estou fazendo uma alteração ------------->
