const params = new URLSearchParams(window.location.search);

const downloadSignedBtn = document.getElementById("downloadSignedBtn");
const openSignedBtn = document.getElementById("openSignedBtn");
const recordLink = document.getElementById("recordLink");
const signatureImageLink = document.getElementById("signatureImageLink");
const signedName = document.getElementById("signedName");
const signedDocument = document.getElementById("signedDocument");
const signedAt = document.getElementById("signedAt");
const signedSubtitle = document.getElementById("signedSubtitle");

function decode(value) {
  return decodeURIComponent(String(value || ""));
}

function formatDocument(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  if (digits.length === 14) return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return value || "-";
}

const contractUrl = decode(params.get("contract"));
const proofUrl = decode(params.get("proof"));
const imageUrl = decode(params.get("image"));
const signer = decode(params.get("name"));
const documentValue = decode(params.get("document"));
const signedAtValue = decode(params.get("signedAt"));

const hasSignedContract = contractUrl.includes("/uploads/contracts/signed/");

if (downloadSignedBtn) {
  downloadSignedBtn.href = hasSignedContract ? contractUrl : "#";
  downloadSignedBtn.setAttribute("aria-disabled", hasSignedContract ? "false" : "true");
}
if (openSignedBtn) {
  openSignedBtn.href = hasSignedContract ? contractUrl : "#";
  openSignedBtn.setAttribute("aria-disabled", hasSignedContract ? "false" : "true");
}
if (recordLink) recordLink.href = proofUrl || "#";
if (signatureImageLink) signatureImageLink.href = imageUrl || "#";
if (signedName) signedName.textContent = signer || "-";
if (signedDocument) signedDocument.textContent = formatDocument(documentValue);
if (signedAt) {
  signedAt.textContent = signedAtValue ? new Date(signedAtValue).toLocaleString("pt-BR") : "-";
}
if (signedSubtitle && signer) {
  signedSubtitle.textContent = `O contrato de ${signer} foi assinado e o PDF final já está pronto para baixar.`;
}
if (signedSubtitle && !hasSignedContract) {
  signedSubtitle.textContent = "O PDF assinado ainda nao foi gerado por este backend. Reinicie a porta 3001 e refaça a assinatura para baixar o arquivo correto.";
}
