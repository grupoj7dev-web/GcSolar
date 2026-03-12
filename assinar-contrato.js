const signerNameInput = document.getElementById("signerName");
const signerDocumentInput = document.getElementById("signerDocument");
const signaturePad = document.getElementById("signaturePad");
const clearSignatureBtn = document.getElementById("clearSignatureBtn");
const saveSignatureBtn = document.getElementById("saveSignatureBtn");
const signatureModeSwitch = document.getElementById("signatureModeSwitch");
const typedSignatureBox = document.getElementById("typedSignatureBox");
const typedSignatureInput = document.getElementById("typedSignatureInput");
const typedSignatureFont = document.getElementById("typedSignatureFont");
const typedPreview = document.getElementById("typedPreview");
const pdfExternalLink = document.getElementById("pdfExternalLink");
const contractFrame = document.getElementById("contractFrame");
const statusMsg = document.getElementById("statusMsg");
const resultCard = document.getElementById("resultCard");
const signatureImageLink = document.getElementById("signatureImageLink");
const signedContractLink = document.getElementById("signedContractLink");
const signatureRecordLink = document.getElementById("signatureRecordLink");
const signatureMeta = document.getElementById("signatureMeta");
const signatureMetaDate = document.getElementById("signatureMetaDate");
const signatureMetaIp = document.getElementById("signatureMetaIp");
const signatureMetaEnv = document.getElementById("signatureMetaEnv");
const verificationHelp = document.getElementById("verificationHelp");
const sendCodeBtn = document.getElementById("sendCodeBtn");
const verificationCodeInput = document.getElementById("verificationCodeInput");

const params = new URLSearchParams(window.location.search);
const token = params.get("t") || "";
const signerPhoneParam = String(params.get("phone") || "").replace(/\D/g, "");
const senderUserParam = String(params.get("sender") || "").trim();
const senderInstanceParam = String(params.get("senderInstance") || "").trim();
const isLocalDevHost = ["127.0.0.1", "localhost"].includes(window.location.hostname);
const PUBLIC_APP_ORIGIN = "https://app.gc.solar";
let pendingId = "";
let contractUrl = "";
let signatureMode = "draw";
let clientLocation = null;
let signerPhone = signerPhoneParam || "";
let codeVerified = false;

function buildViewerlessPdfUrl(url) {
  if (!url) return "";
  return `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
}

function normalizePublicAppUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return raw
    .replace(/^http:\/\/127\.0\.0\.1:3001/i, PUBLIC_APP_ORIGIN)
    .replace(/^http:\/\/localhost:3001/i, PUBLIC_APP_ORIGIN);
}

function maskPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length < 4) return "";
  return `***${digits.slice(-4)}`;
}

function refreshVerificationHelp() {
  if (!verificationHelp) return;
  if (!signerPhone) {
    verificationHelp.textContent = "NÃ£o hÃ¡ WhatsApp cadastrado para este contrato. Solicite o ajuste do cadastro antes de assinar.";
  } else if (codeVerified) {
    verificationHelp.textContent = `CÃ³digo jÃ¡ confirmado para o WhatsApp ${maskPhone(signerPhone)}.`;
  } else {
    verificationHelp.textContent = `Para concluir a assinatura, envie e confirme o cÃ³digo recebido no WhatsApp ${maskPhone(signerPhone)}.`;
  }
  if (sendCodeBtn) sendCodeBtn.disabled = !signerPhone;
}

const ctx = signaturePad.getContext("2d");
ctx.lineWidth = 2.2;
ctx.lineCap = "round";
ctx.strokeStyle = "#111827";

let drawing = false;
let hasSignature = false;

function getPoint(event) {
  const rect = signaturePad.getBoundingClientRect();
  const source = event.touches?.[0] || event.changedTouches?.[0] || event;
  return {
    x: (source.clientX - rect.left) * (signaturePad.width / rect.width),
    y: (source.clientY - rect.top) * (signaturePad.height / rect.height),
  };
}

function updateTypedPreview() {
  const value = (typedSignatureInput?.value || signerNameInput.value || "").trim();
  const font = typedSignatureFont?.value || "Great Vibes";
  typedPreview.textContent = value || "Assinatura digitada";
  if (font === "Times New Roman") typedPreview.style.fontFamily = '"Times New Roman", serif';
  else typedPreview.style.fontFamily = `"${font}", cursive`;
  const length = value.length;
  if (length > 34) typedPreview.style.fontSize = "1.15rem";
  else if (length > 28) typedPreview.style.fontSize = "1.3rem";
  else if (length > 22) typedPreview.style.fontSize = "1.5rem";
  else if (length > 16) typedPreview.style.fontSize = "1.7rem";
  else typedPreview.style.fontSize = "1.9rem";
}

function setSignatureMode(mode) {
  signatureMode = mode === "type" ? "type" : "draw";
  signaturePad.classList.toggle("hidden", signatureMode !== "draw");
  typedSignatureBox?.classList.toggle("hidden", signatureMode !== "type");
  document.querySelectorAll(".signature-mode-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === signatureMode);
  });
  if (signatureMode === "type") {
    if (typedSignatureInput && !typedSignatureInput.value.trim()) {
      typedSignatureInput.value = signerNameInput.value.trim();
    }
    hasSignature = Boolean((typedSignatureInput?.value || signerNameInput.value || "").trim());
    updateTypedPreview();
  }
}

function startDraw(event) {
  if (signatureMode !== "draw") return;
  drawing = true;
  const point = getPoint(event);
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  event.preventDefault();
}

function moveDraw(event) {
  if (!drawing || signatureMode !== "draw") return;
  const point = getPoint(event);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
  hasSignature = true;
  event.preventDefault();
}

function endDraw(event) {
  if (!drawing) return;
  drawing = false;
  ctx.closePath();
  event.preventDefault();
}

function clearSignature() {
  ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
  if (typedSignatureInput) typedSignatureInput.value = "";
  updateTypedPreview();
  hasSignature = false;
  resultCard.classList.add("hidden");
  signatureMeta?.classList.add("hidden");
}

function buildTypedSignatureDataUrl() {
  const value = (typedSignatureInput?.value || signerNameInput.value || "").trim();
  const font = typedSignatureFont?.value || "Great Vibes";
  if (!value) return "";
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 280;
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#111827";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = font === "Times New Roman"
    ? '64px "Times New Roman", serif'
    : `64px "${font}", cursive`;
  context.fillText(value, canvas.width / 2, canvas.height / 2);
  return canvas.toDataURL("image/png");
}

function loadClientLocation() {
  if (!("geolocation" in navigator)) return;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      clientLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };
    },
    () => {
      clientLocation = null;
    },
    {
      enableHighAccuracy: false,
      timeout: 6000,
      maximumAge: 60000,
    }
  );
}

function getSignatureDataUrl() {
  return signatureMode === "type" ? buildTypedSignatureDataUrl() : signaturePad.toDataURL("image/png");
}

function buildSignedResultUrl(signature = {}) {
  const url = new URL("contrato-assinado.html", window.location.href);
  url.searchParams.set("contract", normalizePublicAppUrl(signature.signedContractUrl || contractUrl || ""));
  url.searchParams.set("proof", signature.recordUrl || "");
  url.searchParams.set("image", signature.signatureImageUrl || "");
  url.searchParams.set("name", signerNameInput.value.trim());
  url.searchParams.set("document", signerDocumentInput.value.trim());
  url.searchParams.set("signedAt", signature.signedAt || new Date().toISOString());
  return url.toString();
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body?.ok === false) {
    throw new Error(body?.error || `HTTP ${response.status}`);
  }
  return body;
}

async function getJson(url) {
  const response = await fetch(url, { method: "GET" });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body?.ok === false) {
    throw new Error(body?.error || `HTTP ${response.status}`);
  }
  return body;
}

function buildBackendCandidates(path) {
  const normalizedPath = String(path || "").startsWith("/") ? String(path) : `/${path}`;
  const candidates = [`${window.location.origin}${normalizedPath}`];
  if (isLocalDevHost) {
    candidates.push(`http://127.0.0.1:3001${normalizedPath}`, `http://localhost:3001${normalizedPath}`);
  }
  return [...new Set(candidates)];
}

async function callBackend(path, payload) {
  const candidates = buildBackendCandidates(path);
  let lastError = null;
  for (const candidate of candidates) {
    try {
      return await postJson(candidate, payload);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Backend indisponÃ­vel.");
}

async function callBackendGet(path) {
  const candidates = buildBackendCandidates(path);
  let lastError = null;
  for (const candidate of candidates) {
    try {
      return await getJson(candidate);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Backend indisponÃ­vel.");
}

async function loadSigningSession() {
  if (!token) {
    statusMsg.textContent = "Link de assinatura invÃ¡lido.";
    return;
  }

  try {
    const response = await callBackendGet(`/internal-api/contracts/sign-link/${encodeURIComponent(token)}`);
    const session = response.session || {};
    pendingId = session.pendingId || "";
    contractUrl = normalizePublicAppUrl(session.contractUrl || "");
    signerPhone = session.signerPhone || signerPhoneParam || "";
    codeVerified = Boolean(session?.signVerification?.verifiedAt);
    signerNameInput.value = session.signerName || "";
    signerDocumentInput.value = session.signerDocument || "";
    if (typedSignatureInput) typedSignatureInput.value = session.signerName || signerNameInput.value || "";
    updateTypedPreview();
    if (pdfExternalLink) pdfExternalLink.href = contractUrl;
    contractFrame.src = buildViewerlessPdfUrl(contractUrl);
    refreshVerificationHelp();
  } catch (error) {
    console.error(error);
    statusMsg.textContent = "NÃ£o foi possÃ­vel carregar o link de assinatura.";
  }
}

async function requestSignCode() {
  if (!token) throw new Error("Link de assinatura invÃ¡lido.");
  if (!signerPhone) throw new Error("NÃ£o hÃ¡ WhatsApp cadastrado para este contrato.");

  if (sendCodeBtn) sendCodeBtn.disabled = true;
  try {
    const response = await callBackend("/internal-api/contracts/request-sign-code", {
      token,
      signerPhone: signerPhone || signerPhoneParam,
      senderUserId: senderUserParam,
      senderInstanceName: senderInstanceParam,
    });
    signerPhone = signerPhone || signerPhoneParam;
    codeVerified = false;
    const devCode = String(response?.devCode || "").replace(/\D/g, "");
    if (isLocalDevHost && devCode && verificationCodeInput) {
      verificationCodeInput.value = devCode.slice(0, 6);
    }
    if (verificationHelp) {
      verificationHelp.textContent = devCode && isLocalDevHost
        ? "Codigo preenchido automaticamente para teste local."
        : `Codigo enviado para o WhatsApp ${response?.sentTo || signerPhone}. Digite os 6 digitos para concluir a assinatura.`;
    }
    statusMsg.textContent = devCode && isLocalDevHost
      ? "Codigo preenchido automaticamente para teste local."
      : "Codigo enviado no WhatsApp do assinante.";
  } finally {
    if (sendCodeBtn) sendCodeBtn.disabled = false;
  }
}

async function ensureVerifiedCode() {
  if (codeVerified) return;
  const code = String(verificationCodeInput?.value || "").replace(/\D/g, "");
  if (!code) {
    await requestSignCode();
    throw new Error("CÃ³digo enviado. Digite os 6 dÃ­gitos recebidos no WhatsApp.");
  }

  const response = await callBackend("/internal-api/contracts/verify-sign-code", {
    token,
    code,
  });
  codeVerified = true;
  if (verificationHelp) {
    verificationHelp.textContent = `Codigo confirmado em ${new Date(response?.verifiedAt || Date.now()).toLocaleString("pt-BR")}.`;
  }
}

async function saveSignature() {
  if (!pendingId || !contractUrl) {
    statusMsg.textContent = "Link de assinatura invÃ¡lido.";
    return;
  }
  if (!signerNameInput.value.trim() || !signerDocumentInput.value.trim()) {
    statusMsg.textContent = "Preencha nome e documento.";
    return;
  }
  if (signatureMode === "type") {
    hasSignature = Boolean((typedSignatureInput?.value || signerNameInput.value || "").trim());
  }
  if (!hasSignature) {
    statusMsg.textContent = "FaÃ§a a assinatura no campo indicado.";
    return;
  }

  saveSignatureBtn.disabled = true;
  statusMsg.textContent = "Registrando assinatura...";
  try {
    await ensureVerifiedCode();
    statusMsg.textContent = "Registrando assinatura...";
    const response = await callBackend("/internal-api/contracts/sign", {
      token,
      pendingId,
      contractUrl,
      signerName: signerNameInput.value.trim(),
      signerDocument: signerDocumentInput.value.trim(),
      signatureMode,
      signatureDataUrl: getSignatureDataUrl(),
      clientContext: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        platform: navigator.platform || "",
        location: clientLocation,
      },
    });

    const signature = response.signature || {};
    if (!signature.signedContractUrl || !String(signature.signedContractUrl).includes("/uploads/contracts/signed/")) {
      throw new Error("O backend nao retornou o PDF assinado. Reinicie o servidor da porta 3001 e assine novamente.");
    }
    signatureImageLink.href = signature.signatureImageUrl || "#";
    signedContractLink.href = signature.signedContractUrl;
    signatureRecordLink.href = signature.recordUrl || "#";
    resultCard.classList.remove("hidden");
    signatureMeta?.classList.remove("hidden");
    signatureMetaDate.textContent = `Assinado em: ${new Date(signature.signedAt || Date.now()).toLocaleString("pt-BR")}`;
    signatureMetaIp.textContent = `IP: ${signature.ipAddress || "-"}`;
    const locationText = signature.location?.latitude && signature.location?.longitude
      ? ` | Local: ${Number(signature.location.latitude).toFixed(5)}, ${Number(signature.location.longitude).toFixed(5)}`
      : "";
    signatureMetaEnv.textContent = `Ambiente: ${signature.timeZone || "-"} | ${signature.language || "-"} | ${signature.signatureMode || "-"}${locationText}`;
    statusMsg.textContent = "Assinatura registrada. O cadastro seguirÃ¡ para aguardando rateio no PrÃ©-assinante.";
    window.setTimeout(() => {
      window.location.href = buildSignedResultUrl(signature);
    }, 700);
  } catch (error) {
    console.error(error);
    statusMsg.textContent = error.message || "NÃ£o foi possÃ­vel registrar a assinatura.";
  } finally {
    saveSignatureBtn.disabled = false;
  }
}

clearSignatureBtn.addEventListener("click", clearSignature);
saveSignatureBtn.addEventListener("click", saveSignature);
sendCodeBtn?.addEventListener("click", async () => {
  try {
    statusMsg.textContent = "Enviando cÃ³digo no WhatsApp...";
    await requestSignCode();
  } catch (error) {
    console.error(error);
    statusMsg.textContent = error.message || "NÃ£o foi possÃ­vel enviar o cÃ³digo.";
  }
});
signatureModeSwitch?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  setSignatureMode(button.dataset.mode || "draw");
});
verificationCodeInput?.addEventListener("input", () => {
  verificationCodeInput.value = verificationCodeInput.value.replace(/\D/g, "").slice(0, 6);
  codeVerified = false;
});
typedSignatureInput?.addEventListener("input", () => {
  hasSignature = Boolean((typedSignatureInput.value || signerNameInput.value || "").trim());
  updateTypedPreview();
});
typedSignatureFont?.addEventListener("change", updateTypedPreview);
signerNameInput?.addEventListener("input", () => {
  if (typedSignatureInput && !typedSignatureInput.value.trim()) {
    typedSignatureInput.value = signerNameInput.value || "";
  }
  if (signatureMode === "type") updateTypedPreview();
});

signaturePad.addEventListener("mousedown", startDraw);
signaturePad.addEventListener("mousemove", moveDraw);
window.addEventListener("mouseup", endDraw);
signaturePad.addEventListener("touchstart", startDraw, { passive: false });
signaturePad.addEventListener("touchmove", moveDraw, { passive: false });
signaturePad.addEventListener("touchend", endDraw, { passive: false });

setSignatureMode("draw");
refreshVerificationHelp();
loadClientLocation();
loadSigningSession();

