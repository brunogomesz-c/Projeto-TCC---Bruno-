const out = document.getElementById('out');
const show = (o) => out.textContent = typeof o === 'string' ? o : JSON.stringify(o, null, 2);

document.getElementById('btnDom').onclick = async () => {
  const rsp = await chrome.runtime.sendMessage({ type: 'ANALYSE_DOM' });
  if (!rsp?.ok) return show(rsp?.error || 'Falha');
  show(rsp.text.slice(0, 5000) + (rsp.text.length > 5000 ? ' ...' : ''));
};

document.getElementById('btnOcr').onclick = async () => {
  const rsp = await chrome.runtime.sendMessage({ type: 'ANALYSE_OCR' });
  if (!rsp?.ok) return show(rsp?.error || 'Falha');

  // Carrega Tesseract empacotado localmente (MV3: sem CDN)
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('../ocr/tesseract.min.js');
  script.onload = async () => {
    const { createWorker } = Tesseract;
    const worker = await createWorker('por'); // ajuste idiomas conforme sua necessidade
    const { data } = await worker.recognize(rsp.png);
    await worker.terminate();
    show(data.text);
  };
  document.body.appendChild(script);
};
