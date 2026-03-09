import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlBxFfzmhnapsLJbM1UeYOalrfWYOSr1I",
  authDomain: "gcredito.firebaseapp.com",
  projectId: "gcredito",
  storageBucket: "gcredito.firebasestorage.app",
  messagingSenderId: "697167575956",
  appId: "1:697167575956:web:7a641d00aae7f8676f6d81",
  measurementId: "G-ZS8XN2VECC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const COLL_PENDING = "assinantes_pendentes";

const appShell = document.getElementById("appShell");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const themeBtn = document.getElementById("themeBtn");

const updatedText = document.getElementById("updatedText");
const statusMsg = document.getElementById("statusMsg");
const listSection = document.getElementById("listSection");
const wizardCard = document.getElementById("wizardCard");
const indicacoesTableBody = document.getElementById("indicacoesTableBody");
const novaIndicacaoTopBtn = document.getElementById("novaIndicacaoTopBtn");
const voltarListaTopBtn = document.getElementById("voltarListaTopBtn");
const voltarListaBtn = document.getElementById("voltarListaBtn");

const step1Panel = document.getElementById("step1");
const step2Panel = document.getElementById("step2");
const successPanel = document.getElementById("successPanel");
const stepChip1 = document.getElementById("stepChip1");
const stepChip2 = document.getElementById("stepChip2");
const stepChip3 = document.getElementById("stepChip3");

const form = document.getElementById("indicacaoForm");
const summaryBar = document.getElementById("summaryBar");

const tipoPessoaInput = document.getElementById("tipoPessoa");
const typeButtons = Array.from(document.querySelectorAll(".type-card"));
const pfFields = document.getElementById("pfFields");
const pjFields = document.getElementById("pjFields");

const nomeCompletoInput = document.getElementById("nomeCompleto");
const cpfInput = document.getElementById("cpf");
const dataNascimentoInput = document.getElementById("dataNascimento");

const razaoSocialInput = document.getElementById("razaoSocial");
const nomeFantasiaInput = document.getElementById("nomeFantasia");
const cnpjInput = document.getElementById("cnpj");
const nomeRepresentanteInput = document.getElementById("nomeRepresentante");
const dataFundacaoInput = document.getElementById("dataFundacao");

const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const ucInput = document.getElementById("uc");
const consumoMedioInput = document.getElementById("consumoMedio");
const descontoInput = document.getElementById("desconto");
const isencaoImpostosInput = document.getElementById("isencaoImpostos");
const isencaoFioBInput = document.getElementById("isencaoFioB");

const cepInput = document.getElementById("cep");
const buscarCepBtn = document.getElementById("buscarCepBtn");
const logradouroInput = document.getElementById("logradouro");
const numeroInput = document.getElementById("numero");
const complementoInput = document.getElementById("complemento");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");

const contaNoNomeInputs = Array.from(document.querySelectorAll('input[name="contaNoNome"]'));
const terceiroFields = document.getElementById("terceiroFields");
const nomeDonoContaInput = document.getElementById("nomeDonoConta");
const cpfCnpjDonoContaInput = document.getElementById("cpfCnpjDonoConta");
const dataNascimentoDonoContaInput = document.getElementById("dataNascimentoDonoConta");

const modalidadeInputs = Array.from(document.querySelectorAll('input[name="modalidade"]'));

const continuarBtn = document.getElementById("continuarBtn");
const voltarBtn = document.getElementById("voltarBtn");
const extrairBtn = document.getElementById("extrairBtn");
const salvarBtn = document.getElementById("salvarBtn");
const novaIndicacaoBtn = document.getElementById("novaIndicacaoBtn");

const contratoSocialCard = document.getElementById("contratoSocialCard");
const docTerceiroCard = document.getElementById("docTerceiroCard");

const docContaEnergiaInput = document.getElementById("docContaEnergia");
const docIdentificacaoInput = document.getElementById("docIdentificacao");
const docContratoSocialInput = document.getElementById("docContratoSocial");
const docTerceiroInput = document.getElementById("docTerceiro");

const collapsedKey = "gcsolar_sidebar_collapsed";
const themeKey = "gcsolar_theme";

let scope = null;
let pdfjsLibPromise = null;
let tesseractPromise = null;
let indicacoesCache = [];

function onlyDigits(value) {
  return String(value || "").replace(/\D+/g, "");
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeAscii(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isMobile() {
  return window.matchMedia("(max-width: 960px)").matches;
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = themeBtn?.querySelector("i");
  if (!icon) return;
  icon.classList.remove("ph-moon", "ph-sun");
  icon.classList.add(theme === "dark" ? "ph-sun" : "ph-moon");
}

function initTheme() {
  const saved = localStorage.getItem(themeKey);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (systemDark ? "dark" : "light"));
}

function applySidebarState() {
  const collapsed = localStorage.getItem(collapsedKey) === "1";
  if (!isMobile() && collapsed) appShell.classList.add("sidebar-collapsed");
  else appShell.classList.remove("sidebar-collapsed");
}

function setStatus(message, type = "info") {
  statusMsg.textContent = message || "";
  if (type === "error") statusMsg.style.color = "#b91c1c";
  else if (type === "success") statusMsg.style.color = "#166534";
  else statusMsg.style.color = "";
}

function setUpdated(extra = "") {
  const suffix = extra ? ` (${extra})` : "";
  updatedText.textContent = `Atualizado em ${new Date().toLocaleString("pt-BR")}${suffix}`;
}

function showListMode() {
  listSection?.classList.remove("hidden");
  wizardCard?.classList.add("hidden");
}

function showCadastroMode() {
  listSection?.classList.add("hidden");
  wizardCard?.classList.remove("hidden");
}

function getContaNoNome() {
  return contaNoNomeInputs.find((item) => item.checked)?.value || "sim";
}

function getModalidade() {
  return modalidadeInputs.find((item) => item.checked)?.value || "nao_mudar_titularidade";
}

function updateTypeUI() {
  const tipo = tipoPessoaInput.value;
  const isPf = tipo === "fisica";

  pfFields.classList.toggle("hidden", !isPf);
  pjFields.classList.toggle("hidden", isPf);

  typeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.personType === tipo);
  });

  if (isPf) {
    nomeCompletoInput.required = true;
    cpfInput.required = true;
    dataNascimentoInput.required = true;

    razaoSocialInput.required = false;
    cnpjInput.required = false;
    nomeRepresentanteInput.required = false;
    dataFundacaoInput.required = false;
  } else {
    nomeCompletoInput.required = false;
    cpfInput.required = false;
    dataNascimentoInput.required = false;

    razaoSocialInput.required = true;
    cnpjInput.required = true;
    nomeRepresentanteInput.required = true;
    dataFundacaoInput.required = true;
  }

  updateUploadRules();
}

function updateTitularidadeUI() {
  const isTerceiro = getContaNoNome() === "nao";
  terceiroFields.classList.toggle("hidden", !isTerceiro);

  nomeDonoContaInput.required = isTerceiro;
  cpfCnpjDonoContaInput.required = isTerceiro;
  dataNascimentoDonoContaInput.required = isTerceiro;

  updateUploadRules();
}

function updateUploadRules() {
  const isPj = tipoPessoaInput.value === "juridica";
  const isTerceiro = getContaNoNome() === "nao";

  contratoSocialCard.classList.toggle("hidden", !isPj);
  docContratoSocialInput.required = isPj;

  docTerceiroCard.classList.toggle("hidden", !isTerceiro);
  docTerceiroInput.required = isTerceiro;
}

function setStep(step) {
  step1Panel.classList.toggle("hidden", step !== 1);
  step2Panel.classList.toggle("hidden", step !== 2);
  successPanel.classList.toggle("hidden", step !== 3);

  stepChip1.classList.toggle("active", step >= 1);
  stepChip2.classList.toggle("active", step >= 2);
  stepChip3.classList.toggle("active", step >= 3);
}

function asDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value.toDate === "function") return value.toDate();
  if (typeof value === "string") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "object") {
    if (typeof value.seconds === "number") return new Date(value.seconds * 1000);
    if (typeof value._seconds === "number") return new Date(value._seconds * 1000);
  }
  return null;
}

function formatDate(value) {
  const d = asDate(value);
  if (!d) return "-";
  return d.toLocaleDateString("pt-BR");
}

function statusPill(item) {
  const raw = String(item.status || item.statusLabel || "").toLowerCase();
  if (raw.includes("aprov") || raw.includes("ativo")) {
    return '<span class="status-pill done">Aprovado</span>';
  }
  if (raw.includes("rejeit")) {
    return '<span class="status-pill done">Rejeitado</span>';
  }
  return '<span class="status-pill pending">Aguardando aprovação</span>';
}

function renderIndicacoesList() {
  if (!indicacoesTableBody) return;
  if (!indicacoesCache.length) {
    indicacoesTableBody.innerHTML =
      '<tr><td colspan="5" class="empty-row">Nenhuma indicação encontrada.</td></tr>';
    return;
  }

  indicacoesTableBody.innerHTML = indicacoesCache
    .map((item) => {
      const nome = cleanText(item.nome || item.razaoSocial || item.nomeFantasia || "-");
      const doc = onlyDigits(item.cpfCnpj || item.cpf || item.cnpj || "-");
      const uc = onlyDigits(item.uc || "-");
      const created = formatDate(item.createdAt || item.createdAtISO || item.created_at);
      return `
      <tr>
        <td>${escapeHtml(nome || "-")}</td>
        <td>${escapeHtml(doc || "-")}</td>
        <td>${escapeHtml(uc || "-")}</td>
        <td>${statusPill(item)}</td>
        <td>${escapeHtml(created)}</td>
      </tr>
    `;
    })
    .join("");
}

async function loadIndicacoesList() {
  if (!scope) return;
  indicacoesTableBody.innerHTML =
    '<tr><td colspan="5" class="empty-row">Carregando indicações...</td></tr>';

  try {
    const byTenantQ = query(collection(db, COLL_PENDING), where("tenantId", "==", scope.tenantId));
    const snap = await getDocs(byTenantQ);

    indicacoesCache = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => {
        const ad = asDate(a.createdAt || a.createdAtISO || a.created_at)?.getTime() || 0;
        const bd = asDate(b.createdAt || b.createdAtISO || b.created_at)?.getTime() || 0;
        return bd - ad;
      });

    renderIndicacoesList();
    setUpdated("lista");
  } catch (error) {
    console.error(error);
    indicacoesTableBody.innerHTML =
      '<tr><td colspan="5" class="empty-row">Falha ao carregar indicações.</td></tr>';
  }
}

function readStep1Data() {
  const tipoPessoa = tipoPessoaInput.value;
  const contaNoNome = getContaNoNome();

  return {
    tipoPessoa,
    nome: tipoPessoa === "fisica" ? cleanText(nomeCompletoInput.value) : cleanText(razaoSocialInput.value),
    razaoSocial: cleanText(razaoSocialInput.value),
    nomeFantasia: cleanText(nomeFantasiaInput.value),
    nomeRepresentante: cleanText(nomeRepresentanteInput.value),
    cpfCnpj: tipoPessoa === "fisica" ? onlyDigits(cpfInput.value) : onlyDigits(cnpjInput.value),
    dataNascimento: dataNascimentoInput.value || "",
    dataFundacao: dataFundacaoInput.value || "",
    email: cleanText(emailInput.value),
    telefone: cleanText(telefoneInput.value),
    uc: onlyDigits(ucInput.value),
    consumoMedio: Number(consumoMedioInput.value || 0),
    desconto: Number(descontoInput.value || 0),
    isencaoImpostos: Boolean(isencaoImpostosInput.checked),
    isencaoFioB: Boolean(isencaoFioBInput.checked),
    endereco: {
      cep: onlyDigits(cepInput.value),
      logradouro: cleanText(logradouroInput.value),
      numero: cleanText(numeroInput.value),
      complemento: cleanText(complementoInput.value),
      bairro: cleanText(bairroInput.value),
      cidade: cleanText(cidadeInput.value),
      estado: cleanText(estadoInput.value).toUpperCase(),
    },
    contaEnergiaNoNomeDoContratante: contaNoNome === "sim",
    nomeDonoConta: cleanText(nomeDonoContaInput.value),
    cpfCnpjDonoConta: onlyDigits(cpfCnpjDonoContaInput.value),
    dataNascimentoDonoConta: dataNascimentoDonoContaInput.value || "",
    modalidade: getModalidade(),
  };
}

function updateSummary() {
  const data = readStep1Data();
  summaryBar.innerHTML = `Cliente: <strong>${escapeHtml(data.nome || "- ")}</strong> | Documento: <strong>${escapeHtml(data.cpfCnpj || "-")}</strong> | UC: <strong>${escapeHtml(data.uc || "-")}</strong> | Modalidade: <strong>${escapeHtml(data.modalidade)}</strong>`;
}

function validateStep1() {
  const required = [
    emailInput,
    telefoneInput,
    ucInput,
    consumoMedioInput,
    descontoInput,
    cepInput,
    logradouroInput,
    numeroInput,
    bairroInput,
    cidadeInput,
    estadoInput,
  ];

  if (tipoPessoaInput.value === "fisica") {
    required.push(nomeCompletoInput, cpfInput, dataNascimentoInput);
  } else {
    required.push(razaoSocialInput, cnpjInput, nomeRepresentanteInput, dataFundacaoInput);
  }

  if (getContaNoNome() === "nao") {
    required.push(nomeDonoContaInput, cpfCnpjDonoContaInput, dataNascimentoDonoContaInput);
  }

  for (const input of required) {
    if (!input.value || !String(input.value).trim()) {
      input.reportValidity();
      return false;
    }
  }

  return true;
}

async function lookupAddressByCep(rawCep) {
  const cep = onlyDigits(rawCep);
  if (cep.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) return null;

    const data = await response.json();
    if (data.erro) return null;

    return {
      cep: data.cep || rawCep,
      cidade: data.localidade || "",
      estado: data.uf || "",
      bairro: data.bairro || "",
      logradouro: data.logradouro || "",
    };
  } catch {
    return null;
  }
}

async function fillAddressFromCep() {
  const data = await lookupAddressByCep(cepInput.value);
  if (!data) {
    setStatus("Nao foi possivel encontrar endereco para o CEP informado.", "error");
    return false;
  }

  cepInput.value = data.cep;
  if (!logradouroInput.value.trim()) logradouroInput.value = data.logradouro;
  if (!bairroInput.value.trim()) bairroInput.value = data.bairro;
  cidadeInput.value = data.cidade || cidadeInput.value;
  estadoInput.value = (data.estado || estadoInput.value).toUpperCase();

  setStatus("Endereco preenchido com base no CEP.", "success");
  setUpdated("CEP");
  return true;
}

function sanitizeName(raw) {
  let text = cleanText(raw);
  if (!text) return "";

  text = normalizeAscii(text);
  text = text.replace(
    /^(RESIDENCIAL|COMERCIAL|INDUSTRIAL|RURAL|SERVICOS?\s+E\s+OUTRAS\s+ATIVIDADES|PODER\s+PUBLICO)\s+/i,
    ""
  );
  text = text.replace(/^(BAIXA\s+TENSAO|ALTA\s+TENSAO)\s+/i, "");
  text = text.replace(/\bCONVENCIONAL\b\s*/i, "");
  text = text.replace(/\b(CNPJ|CPF|UC|INSTALACAO|ENDERECO|CEP|FATURA|CONSUMO)\b.*$/i, "");
  text = cleanText(text);

  return text;
}

function sanitizeAddress(raw) {
  let text = cleanText(raw);
  if (!text) return "";
  text = text.replace(/^(ENDERECO|LOGRADOURO)\s*[:\-]?\s*/i, "");
  text = text.replace(/^DE\s+ENTREGA\s*[:\-]?\s*/i, "");
  return cleanText(text);
}

function extractDocumentNumber(text) {
  const cpfMatch = text.match(/(?:CPF|CNPJ\/CPF|CPF\/CNPJ)\s*[:\-]?\s*([\d.\/-]+)/i);
  if (cpfMatch) return onlyDigits(cpfMatch[1]);

  const generic = text.match(/\b\d{3}\.?\d{3}\.?\d{3}\-?\d{2}\b|\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}\b/);
  return onlyDigits(generic?.[0] || "");
}

function extractAddressFields(text) {
  const result = {};

  const cepMatch = text.match(/\b\d{5}\-?\d{3}\b/);
  if (cepMatch) result.cep = cepMatch[0];

  const cityStateMatch = text.match(/([A-Z\u00c0-\u00da\s]{3,})\s*[-\/]\s*([A-Z]{2})\b/i);
  if (cityStateMatch) {
    result.cidade = cleanText(cityStateMatch[1]);
    result.estado = cleanText(cityStateMatch[2]);
  }

  const enderecoMatch = text.match(/(?:ENDERECO|ENDERE\u00c7O|LOGRADOURO)\s*[:\-]?\s*(.+?)(?:\s+CEP\b|\s+CIDADE\b|\s+BAIRRO\b|\n|$)/i);
  if (enderecoMatch) result.endereco = sanitizeAddress(enderecoMatch[1]);

  return result;
}

function extractEnergyData(text) {
  const source = String(text || "");
  const data = {};

  const nomeMatch = source.match(/([A-Z\u00c0-\u00da][A-Z\u00c0-\u00da\s]{8,}?)\s+(?:CNPJ\/CPF|CPF\/CNPJ|CPF|CNPJ)\s*[:\-]/i);
  if (nomeMatch) {
    const nome = sanitizeName(nomeMatch[1]);
    if (nome) data.nome = nome;
  }

  const doc = extractDocumentNumber(source);
  if (doc) {
    if (doc.length === 14) {
      data.tipoPessoa = "juridica";
      data.cnpj = doc;
    } else if (doc.length === 11) {
      data.tipoPessoa = "fisica";
      data.cpf = doc;
    }
  }

  const ucMatch = source.match(/(?:UC|INSTALACAO|UNIDADE\s+CONSUMIDORA)\s*[:\-]?\s*(\d{6,12})/i);
  if (ucMatch) data.uc = onlyDigits(ucMatch[1]);

  const consumoMatch = source.match(/(?:CONSUMO(?:\s+MEDIO)?|TOTAL\s+KWH)\s*[:\-]?\s*(\d+[\.,]?\d*)\s*(?:KWH)?/i);
  if (consumoMatch) {
    data.consumoMedio = Number(String(consumoMatch[1]).replace(".", "").replace(",", ".")) || 0;
  }

  Object.assign(data, extractAddressFields(source));
  return data;
}

function extractIdentityData(text) {
  const source = String(text || "");
  const data = {};

  const nomeMatch = source.match(/(?:NOME(?:\s*E\s*SOBRENOME)?)\s*[:\-]?\s*([A-Z\u00c0-\u00da][A-Z\u00c0-\u00da\s]{8,})/i);
  if (nomeMatch) data.nome = cleanText(nomeMatch[1]);
  else {
    const firstBigLine = source.match(/\b([A-Z\u00c0-\u00da][A-Z\u00c0-\u00da\s]{14,})\b/);
    if (firstBigLine) data.nome = cleanText(firstBigLine[1]);
  }

  const cpfMatch = source.match(/CPF\s*[:\-]?\s*([\d.\-]{11,14})/i);
  if (cpfMatch) data.cpf = onlyDigits(cpfMatch[1]);

  const rgMatch = source.match(/(?:RG|IDENTIDADE|REGISTRO\s+GERAL)\s*[:\-]?\s*([\dA-Z.\-]{5,20})/i);
  if (rgMatch) data.rg = cleanText(rgMatch[1]);

  return data;
}

async function getPdfJsLib() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.mjs");
  }

  const pdfjsLib = await pdfjsLibPromise;
  if (pdfjsLib?.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.worker.mjs";
  }

  return pdfjsLib;
}

async function getTesseract() {
  if (!tesseractPromise) {
    tesseractPromise = import("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/+esm");
  }
  return tesseractPromise;
}

async function extractPdfText(file) {
  const pdfjsLib = await getPdfJsLib();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  const pages = Math.min(pdf.numPages, 3);
  for (let i = 1; i <= pages; i += 1) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    fullText += `${pageText}\n`;
  }

  return fullText;
}

async function extractImageText(file) {
  const tesseract = await getTesseract();
  const worker = await tesseract.createWorker("por");
  const { data } = await worker.recognize(file);
  await worker.terminate();
  return String(data?.text || "");
}

async function extractTextFromFile(file) {
  if (!file) return "";
  if (file.type === "application/pdf") return extractPdfText(file);
  return extractImageText(file);
}

async function applyExtractedData() {
  const billFile = docContaEnergiaInput.files?.[0];
  const idFile = docIdentificacaoInput.files?.[0];

  if (!billFile && !idFile) {
    setStatus("Selecione a conta de energia ou o documento para extracao.", "error");
    return;
  }

  extrairBtn.disabled = true;

  try {
    setStatus("Lendo documentos e extraindo dados...");

    const billText = billFile ? await extractTextFromFile(billFile) : "";
    const idText = idFile ? await extractTextFromFile(idFile) : "";

    const billData = extractEnergyData(billText);
    const idData = extractIdentityData(idText);

    if (billData.tipoPessoa && billData.tipoPessoa !== tipoPessoaInput.value) {
      tipoPessoaInput.value = billData.tipoPessoa;
      updateTypeUI();
    }

    if (tipoPessoaInput.value === "fisica") {
      if (idData.nome && !nomeCompletoInput.value.trim()) nomeCompletoInput.value = idData.nome;
      if (idData.cpf && !cpfInput.value.trim()) cpfInput.value = idData.cpf;
      if (billData.nome && !nomeCompletoInput.value.trim()) nomeCompletoInput.value = billData.nome;
      if (billData.cpf && !cpfInput.value.trim()) cpfInput.value = billData.cpf;
    } else {
      if (billData.nome && !razaoSocialInput.value.trim()) razaoSocialInput.value = billData.nome;
      if (billData.cnpj && !cnpjInput.value.trim()) cnpjInput.value = billData.cnpj;
      if (idData.nome && !nomeRepresentanteInput.value.trim()) nomeRepresentanteInput.value = idData.nome;
    }

    if (billData.uc && !ucInput.value.trim()) ucInput.value = billData.uc;
    if (billData.consumoMedio && !consumoMedioInput.value.trim()) consumoMedioInput.value = String(billData.consumoMedio);

    if (billData.cep && !cepInput.value.trim()) cepInput.value = billData.cep;
    if (billData.endereco && !logradouroInput.value.trim()) logradouroInput.value = billData.endereco;
    if (billData.cidade && !cidadeInput.value.trim()) cidadeInput.value = billData.cidade;
    if (billData.estado && !estadoInput.value.trim()) estadoInput.value = billData.estado;

    if (cepInput.value) {
      await fillAddressFromCep();
    }

    const count = [
      nomeCompletoInput.value,
      cpfInput.value,
      razaoSocialInput.value,
      cnpjInput.value,
      nomeRepresentanteInput.value,
      ucInput.value,
      consumoMedioInput.value,
      cepInput.value,
      logradouroInput.value,
      cidadeInput.value,
      estadoInput.value,
    ].filter(Boolean).length;

    setStatus(`Extracao concluida. ${count} campos preenchidos/atualizados.`, "success");
    setUpdated("extracao");
    updateSummary();
  } catch (error) {
    console.error(error);
    setStatus("Falha ao extrair dados dos documentos.", "error");
  } finally {
    extrairBtn.disabled = false;
  }
}

async function getUserScope(user) {
  const result = { uid: user.uid, tenantId: user.uid, email: user.email || "", name: "" };

  const adminQ = query(collection(db, "gcredito_admins"), where("uid", "==", user.uid), limit(1));
  const adminSnap = await getDocs(adminQ);
  if (!adminSnap.empty) {
    const d = adminSnap.docs[0].data();
    result.tenantId = d.tenantId || result.tenantId;
    result.name = d.name || "";
    return result;
  }

  const funcQ = query(collection(db, "gcredito_funcionarios"), where("auth_user_id", "==", user.uid), limit(1));
  const funcSnap = await getDocs(funcQ);
  if (!funcSnap.empty) {
    const d = funcSnap.docs[0].data();
    result.tenantId = d.tenantId || result.tenantId;
    result.name = d.nome || d.name || "";
    return result;
  }

  return result;
}

function makeSafeFileName(fileName) {
  return String(fileName || "arquivo")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .slice(-90);
}

async function uploadDocument(file, key) {
  if (!file) return "";

  const now = Date.now();
  const safeName = makeSafeFileName(file.name);
  const path = `assinantes_pendentes/${scope.tenantId}/${scope.uid}/${now}_${key}_${safeName}`;

  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, { contentType: file.type || "application/octet-stream" });
  return getDownloadURL(fileRef);
}

function validateStep2Files() {
  if (!docContaEnergiaInput.files?.length) {
    docContaEnergiaInput.reportValidity();
    return false;
  }

  if (!docIdentificacaoInput.files?.length) {
    docIdentificacaoInput.reportValidity();
    return false;
  }

  const isPj = tipoPessoaInput.value === "juridica";
  if (isPj && !docContratoSocialInput.files?.length) {
    docContratoSocialInput.reportValidity();
    return false;
  }

  const isTerceiro = getContaNoNome() === "nao";
  if (isTerceiro && !docTerceiroInput.files?.length) {
    docTerceiroInput.reportValidity();
    return false;
  }

  return true;
}

async function saveIndicacao() {
  if (!scope) {
    setStatus("Usuario ainda nao autenticado.", "error");
    return;
  }

  if (!validateStep2Files()) return;

  salvarBtn.disabled = true;
  extrairBtn.disabled = true;
  continuarBtn.disabled = true;
  voltarBtn.disabled = true;

  try {
    setStatus("Enviando documentos para o storage...");

    const [contaEnergiaUrl, cnhUrl, contratoSocialUrl, cnhDonoContaUrl] = await Promise.all([
      uploadDocument(docContaEnergiaInput.files?.[0], "conta_energia"),
      uploadDocument(docIdentificacaoInput.files?.[0], "doc_identificacao"),
      uploadDocument(docContratoSocialInput.files?.[0], "contrato_social"),
      uploadDocument(docTerceiroInput.files?.[0], "doc_terceiro"),
    ]);

    const data = readStep1Data();
    const nowIso = new Date().toISOString();

    const payload = {
      tipoPessoa: data.tipoPessoa,
      nome: data.nome,
      razaoSocial: data.razaoSocial,
      nomeFantasia: data.nomeFantasia,
      nomeRepresentante: data.nomeRepresentante,
      cpfCnpj: data.cpfCnpj,
      dataNascimento: data.dataNascimento,
      dataFundacao: data.dataFundacao,
      email: data.email,
      telefone: data.telefone,
      uc: data.uc,
      consumoMedio: data.consumoMedio,
      desconto: data.desconto,
      isencaoImpostos: data.isencaoImpostos,
      isencaoFioB: data.isencaoFioB,
      endereco: {
        cep: data.endereco.cep,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        complemento: data.endereco.complemento,
        bairro: data.endereco.bairro,
        cidade: data.endereco.cidade,
        estado: data.endereco.estado,
      },
      contaEnergiaNoNomeDoContratante: data.contaEnergiaNoNomeDoContratante,
      nomeDonoConta: data.nomeDonoConta || data.nome,
      cpfCnpjDonoConta: data.cpfCnpjDonoConta || data.cpfCnpj,
      dataNascimentoDonoConta: data.dataNascimentoDonoConta || data.dataNascimento || data.dataFundacao || "",
      modalidade: data.modalidade,
      documentos: {
        contaEnergiaUrl,
        cnhUrl,
        contratoSocialUrl: contratoSocialUrl || "",
        cnhDonoContaUrl: cnhDonoContaUrl || "",
      },
      status: "aguardando_aprovacao",
      statusLabel: "Aguardando Aprovacao",
      tenantId: scope.tenantId,
      createdBy: scope.uid,
      user_id: scope.uid,
      nomeAdmin: scope.name || scope.email || scope.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdAtISO: nowIso,
      updatedAtISO: nowIso,
    };

    await addDoc(collection(db, COLL_PENDING), payload);

    await loadIndicacoesList();
    setStep(3);
    setStatus("Indicacao salva com sucesso.", "success");
    setUpdated("salvo");
  } catch (error) {
    console.error(error);
    setStatus(`Falha ao salvar indicacao: ${error.message || "erro desconhecido"}`, "error");
  } finally {
    salvarBtn.disabled = false;
    extrairBtn.disabled = false;
    continuarBtn.disabled = false;
    voltarBtn.disabled = false;
  }
}

function bindEvents() {
  toggleSidebarBtn?.addEventListener("click", () => {
    if (isMobile()) {
      appShell.classList.toggle("mobile-open");
      return;
    }
    const collapsed = appShell.classList.toggle("sidebar-collapsed");
    localStorage.setItem(collapsedKey, collapsed ? "1" : "0");
  });

  themeBtn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(themeKey, next);
  });

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tipoPessoaInput.value = button.dataset.personType || "fisica";
      updateTypeUI();
    });
  });

  contaNoNomeInputs.forEach((input) => {
    input.addEventListener("change", updateTitularidadeUI);
  });

  continuarBtn?.addEventListener("click", () => {
    if (!validateStep1()) {
      setStatus("Preencha os campos obrigatorios da fase 1.", "error");
      return;
    }

    updateSummary();
    updateUploadRules();
    setStep(2);
    setStatus("Agora envie os documentos para concluir.");
  });

  voltarBtn?.addEventListener("click", () => {
    setStep(1);
    setStatus("Revise ou ajuste os dados da fase 1.");
  });

  buscarCepBtn?.addEventListener("click", () => {
    fillAddressFromCep();
  });

  cepInput?.addEventListener("blur", () => {
    if (onlyDigits(cepInput.value).length === 8) fillAddressFromCep();
  });

  extrairBtn?.addEventListener("click", () => {
    applyExtractedData();
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!step2Panel.classList.contains("hidden")) saveIndicacao();
  });

  novaIndicacaoBtn?.addEventListener("click", () => {
    form.reset();
    tipoPessoaInput.value = "fisica";
    updateTypeUI();
    updateTitularidadeUI();
    updateSummary();
    setStep(1);
    showCadastroMode();
    setStatus("Formulario limpo para nova indicacao.");
  });

  novaIndicacaoTopBtn?.addEventListener("click", () => {
    form.reset();
    tipoPessoaInput.value = "fisica";
    updateTypeUI();
    updateTitularidadeUI();
    updateSummary();
    setStep(1);
    showCadastroMode();
    setStatus("Preencha os dados e avance para o upload.");
  });

  voltarListaTopBtn?.addEventListener("click", async () => {
    await loadIndicacoesList();
    showListMode();
    setStatus("Lista de indicações atualizada.");
  });

  voltarListaBtn?.addEventListener("click", async () => {
    await loadIndicacoesList();
    showListMode();
    setStatus("Lista de indicações atualizada.");
  });

  window.addEventListener("resize", applySidebarState);
}

function initUi() {
  initTheme();
  applySidebarState();
  updateTypeUI();
  updateTitularidadeUI();
  updateSummary();
  setStep(1);
  showListMode();
  bindEvents();
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    scope = await getUserScope(user);
    if (!emailInput.value) emailInput.value = user.email || "";
    await loadIndicacoesList();
    setUpdated("autenticado");
    setStatus("Selecione uma indicação da lista ou clique em Nova indicação.");
  } catch (error) {
    console.error(error);
    setStatus("Falha ao carregar contexto do usuario.", "error");
  }
});

initUi();
