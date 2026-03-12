(function () {
  const titleText = document.getElementById("titleText");
  const stage = document.getElementById("stage");
  const openOriginalBtn = document.getElementById("openOriginalBtn");
  const closeBtn = document.getElementById("closeBtn");

  function readPayload() {
    const params = new URLSearchParams(window.location.search);
    const key = String(params.get("k") || "").trim();
    if (!key) return null;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function renderEmpty(message) {
    stage.innerHTML = `<div class="empty">${message}</div>`;
    openOriginalBtn.disabled = true;
  }

  function mountIframe(src, srcdoc) {
    const iframe = document.createElement("iframe");
    iframe.className = "frame";
    if (src) iframe.src = src;
    if (srcdoc) iframe.srcdoc = srcdoc;
    stage.innerHTML = "";
    stage.appendChild(iframe);
  }

  const payload = readPayload();
  if (!payload) {
    renderEmpty("Preview indisponível. Gere novamente pela tela de faturas.");
  } else {
    const title = String(payload.title || "Fatura").trim();
    const invoiceUrl = String(payload.invoiceUrl || "").trim();
    const html = String(payload.html || "").trim();
    titleText.textContent = title;

    if (invoiceUrl) mountIframe(invoiceUrl, "");
    else if (html) mountIframe("", html);
    else renderEmpty("Sem conteúdo de visualização para esta fatura.");

    openOriginalBtn.addEventListener("click", () => {
      if (!invoiceUrl) return;
      window.open(invoiceUrl, "_blank", "noopener,noreferrer");
    });
  }

  closeBtn.addEventListener("click", () => window.close());
})();
