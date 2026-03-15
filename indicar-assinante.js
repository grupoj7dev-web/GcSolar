import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, getIdTokenResult, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

const COLL_PENDING = "assinantes_pendentes";
const COLL_COLLABORATORS = "gcredito_funcionarios";
const COLL_SUBSCRIBERS = "gcredito_subscribers";

const appShell = document.getElementById("appShell");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const themeBtn = document.getElementById("themeBtn");

const updatedText = document.getElementById("updatedText");
const statusMsg = document.getElementById("statusMsg");
const listSection = document.getElementById("listSection");
const wizardCard = document.getElementById("wizardCard");
const kanbanSection = document.getElementById("kanbanSection");
const kanbanBoard = document.getElementById("kanbanBoard");
const indicacoesTableBody = document.getElementById("indicacoesTableBody");
const vendedorHead = document.getElementById("vendedorHead");
const novaIndicacaoTopBtn = document.getElementById("novaIndicacaoTopBtn");
const voltarListaTopBtn = document.getElementById("voltarListaTopBtn");
const voltarListaBtn = document.getElementById("voltarListaBtn");
const indicacaoModal = document.getElementById("indicacaoModal");
const indicacaoModalBody = document.getElementById("indicacaoModalBody");
const indicacaoModalStatus = document.getElementById("indicacaoModalStatus");
const indicacaoModalCloseBtn = document.getElementById("indicacaoModalCloseBtn");
const indicacaoModalCancelBtn = document.getElementById("indicacaoModalCancelBtn");
const indicacaoEditBtn = document.getElementById("indicacaoEditBtn");
const indicacaoRateioBtn = document.getElementById("indicacaoRateioBtn");
const indicacaoAssinarBtn = document.getElementById("indicacaoAssinarBtn");
const indicacaoApproveBtn = document.getElementById("indicacaoApproveBtn");
const indicacaoRejectBtn = document.getElementById("indicacaoRejectBtn");
const contractModal = document.getElementById("contractModal");
const contractModalName = document.getElementById("contractModalName");
const contractModalMessage = document.getElementById("contractModalMessage");
const contractModalSubtitle = document.getElementById("contractModalSubtitle");
const contractModalLink = document.getElementById("contractModalLink");
const contractModalCopyBtn = document.getElementById("contractModalCopyBtn");
const contractModalFeedback = document.getElementById("contractModalFeedback");
const contractModalOpenBtn = document.getElementById("contractModalOpenBtn");
const contractModalCloseBtn = document.getElementById("contractModalCloseBtn");
const contractModalCancelBtn = document.getElementById("contractModalCancelBtn");

const statusFilters = document.getElementById("statusFilters");
const searchIndicacoes = document.getElementById("searchIndicacoes");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const statusFiltersKanban = document.getElementById("statusFiltersKanban");
const searchIndicacoesKanban = document.getElementById("searchIndicacoesKanban");
const clearFiltersBtnKanban = document.getElementById("clearFiltersBtnKanban");
const viewListBtn = document.getElementById("viewListBtn");
const viewKanbanBtn = document.getElementById("viewKanbanBtn");
const novaIndicacaoTopBtnKanban = document.getElementById("novaIndicacaoTopBtnKanban");

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
let editingIndicacaoId = "";
let editingIndicacaoData = null;
let partnerFingerprints = {
  docs: new Set(),
  emails: new Set(),
  phones: new Set(),
};
let sellerByUid = new Map();
let activeIndicacaoModalId = "";
let activeStatusFilter = "all";
let searchTerm = "";
let viewMode = "kanban";
let draggingIndicacaoId = "";
let activeContractSignUrl = "";
let contractModalFeedbackTimer = 0;
let lastKanbanRefreshAt = 0;
const PUBLIC_APP_ORIGIN = "https://app.gc.solar";

const FLOW_META = {
  aguardando_aprovacao: {
    label: "Aguardando aprovação",
    pillClass: "pending",
    badgeClass: "pending",
    step: 1,
    helper: "Pré-cadastro recebido e aguardando revisão interna.",
  },
  pendente_assinatura: {
    label: "Aguardando assinatura",
    pillClass: "signature",
    badgeClass: "signature",
    step: 2,
    helper: "Cadastro aprovado. Aguardando assinatura do contrato.",
  },
  pendente_rateio: {
    label: "Aguardando rateio",
    pillClass: "rateio",
    badgeClass: "rateio",
    step: 3,
    helper: "Contrato assinado. Próximo passo: criar o rateio da UC.",
  },
  rejeitado: {
    label: "Rejeitado",
    pillClass: "rejected",
    badgeClass: "rejected",
    step: 0,
    helper: "Cadastro encerrado sem avanço no fluxo.",
  },
  ativo: {
    label: "Virou assinante",
    pillClass: "done",
    badgeClass: "approved",
    step: 4,
    helper: "Fluxo concluído e cadastro já migrado para assinantes.",
  },
};

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

function isLocalDevHost() {
  const host = String(window.location.hostname || "").toLowerCase();
  return host === "localhost" || host === "127.0.0.1";
}

function buildBackendEndpoints(path) {
  const normalizedPath = String(path || "").startsWith("/") ? String(path) : `/${path}`;
  const endpoints = [`${window.location.origin}${normalizedPath}`];
  if (isLocalDevHost()) {
    if (window.location.port === "3001") endpoints.push(normalizedPath);
    endpoints.push(`http://127.0.0.1:3001${normalizedPath}`);
    endpoints.push(`http://localhost:3001${normalizedPath}`);
  }
  return [...new Set(endpoints)];
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body?.ok === false) {
    throw new Error(body?.error || `HTTP ${response.status}`);
  }
  return body;
}

async function callBackend(path, payload, method = "POST") {
  const endpoints = buildBackendEndpoints(path);

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      if (method === "POST") return await postJson(endpoint, payload);
      const response = await fetch(endpoint, { method: "GET" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || body?.ok === false) throw new Error(body?.error || `HTTP ${response.status}`);
      return body;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Backend indisponível.");
}

function updateSaveButtonLabel() {
  if (!salvarBtn) return;
  if (editingIndicacaoId) salvarBtn.textContent = "Salvar alterações";
  else salvarBtn.textContent = "Salvar como aguardando aprovacao";
}

function existingDocUrl(key) {
  return String(editingIndicacaoData?.documentos?.[key] || "");
}

function isFirebaseStorageUrl(url) {
  const value = String(url || "").toLowerCase();
  return value.includes("firebasestorage.googleapis.com") || value.includes("googleapis.com/v0/b/");
}

function hasUsableExistingDocUrl(key) {
  const url = existingDocUrl(key);
  return Boolean(url) && !isFirebaseStorageUrl(url);
}

function showListMode() {
  showKanbanMode();
}

function showCadastroMode() {
  listSection?.classList.add("hidden");
  wizardCard?.classList.remove("hidden");
  kanbanSection?.classList.add("hidden");
}

function showKanbanMode() {
  listSection?.classList.add("hidden");
  wizardCard?.classList.add("hidden");
  kanbanSection?.classList.remove("hidden");
}

function getContaNoNome() {
  return contaNoNomeInputs.find((item) => item.checked)?.value || "sim";
}

function getModalidade() {
  return modalidadeInputs.find((item) => item.checked)?.value || "nao_mudar_titularidade";
}

function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatCnpj(value) {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatCpfCnpj(value) {
  const digits = onlyDigits(value);
  return digits.length <= 11 ? formatCpf(digits) : formatCnpj(digits);
}

function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function normalizePublicAppUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return raw
    .replace(/^http:\/\/127\.0\.0\.1:3001/i, PUBLIC_APP_ORIGIN)
    .replace(/^http:\/\/localhost:3001/i, PUBLIC_APP_ORIGIN);
}

function formatCep(value) {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, "$1-$2");
}

function formatUc(value) {
  return onlyDigits(value).slice(0, 20);
}

function formatUf(value) {
  return String(value || "")
    .replace(/[^a-z]/gi, "")
    .toUpperCase()
    .slice(0, 2);
}

function applyInputMask(input) {
  if (!input) return;
  const mask = input.dataset.mask || "";
  const current = input.value || "";

  if (mask === "cpf") input.value = formatCpf(current);
  else if (mask === "cnpj") input.value = formatCnpj(current);
  else if (mask === "cpf-cnpj") input.value = formatCpfCnpj(current);
  else if (mask === "phone") input.value = formatPhone(current);
  else if (mask === "cep") input.value = formatCep(current);
  else if (mask === "uc") input.value = formatUc(current);
  else if (mask === "uf") input.value = formatUf(current);
}

function bindInputMasks() {
  document.querySelectorAll("[data-mask]").forEach((input) => {
    applyInputMask(input);
    input.addEventListener("input", () => applyInputMask(input));
    input.addEventListener("blur", () => applyInputMask(input));
  });
}

function refreshFormMasks() {
  document.querySelectorAll("[data-mask]").forEach((input) => applyInputMask(input));
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

function normalizeIndicacaoStatus(value) {
  const raw = String(value || "").toLowerCase();
  if (!raw) return "aguardando_aprovacao";
  if (raw.includes("rejeit")) return "rejeitado";
  if (raw.includes("assinatura") || raw.includes("assinar")) return "pendente_assinatura";
  if (raw.includes("aguardando_aprov") || raw.includes("aprovacao")) return "aguardando_aprovacao";
  if (raw.includes("pendente_rateio") || raw.includes("rateio")) return "pendente_rateio";
  if (raw.includes("contrato_enviado")) return "pendente_assinatura";
  if (raw === "aprovado" || raw.includes("aprovad")) return "pendente_assinatura";
  if (raw.includes("aguardando")) return "aguardando_aprovacao";
  if (raw.includes("ativo")) return "ativo";
  return "aguardando_aprovacao";
}

function getIndicacaoFlowMeta(item) {
  const key = normalizeIndicacaoStatus(item?.status || item?.statusLabel);
  return { key, ...FLOW_META[key] };
}

function statusPill(item) {
  const meta = getIndicacaoFlowMeta(item);
  return `<span class="status-pill ${meta.pillClass}">${escapeHtml(meta.label)}</span>`;
}

function statusLabel(item) {
  return getIndicacaoFlowMeta(item).label;
}

function canReviewIndicacao(item) {
  return normalizeIndicacaoStatus(item?.status || item?.statusLabel) === "aguardando_aprovacao";
}

function buildFlowTimeline(item) {
  const meta = getIndicacaoFlowMeta(item);
  const steps = [
    { number: 1, title: "Triagem", desc: "Aprovar ou reprovar o pré-assinante." },
    { number: 2, title: "Assinatura", desc: "Coletar assinatura do contrato." },
    { number: 3, title: "Rateio", desc: "Após assinatura, preparar o rateio da unidade." },
    { number: 4, title: "Assinante", desc: "Concluir a migração para a base ativa." },
  ];

  return `
    <section class="flow-strip">
      ${steps.map((step) => {
        const stateClass = meta.step === 0
          ? "blocked"
          : step.number < meta.step
            ? "done"
            : step.number === meta.step
              ? "current"
              : "todo";
        return `
          <article class="flow-step ${stateClass}">
            <span class="flow-step-number">${step.number}</span>
            <div class="flow-step-copy">
              <strong>${escapeHtml(step.title)}</strong>
              <small>${escapeHtml(step.desc)}</small>
            </div>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function buildStatusFilters() {
  const filterHosts = [statusFilters, statusFiltersKanban].filter(Boolean);
  if (!filterHosts.length) return;
  const counts = indicacoesCache.reduce((acc, item) => {
    const key = normalizeIndicacaoStatus(item.status || item.statusLabel);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chips = [
    { key: "all", label: "Todos", count: indicacoesCache.length },
    { key: "aguardando_aprovacao", label: FLOW_META.aguardando_aprovacao.label, count: counts.aguardando_aprovacao || 0 },
    { key: "pendente_assinatura", label: FLOW_META.pendente_assinatura.label, count: counts.pendente_assinatura || 0 },
    { key: "pendente_rateio", label: FLOW_META.pendente_rateio.label, count: counts.pendente_rateio || 0 },
    { key: "ativo", label: FLOW_META.ativo.label, count: counts.ativo || 0 },
    { key: "rejeitado", label: FLOW_META.rejeitado.label, count: counts.rejeitado || 0 },
  ];

  const html = chips
    .map((chip) => `
      <button type="button" class="status-chip ${activeStatusFilter === chip.key ? "active" : ""}" data-status="${chip.key}">
        ${escapeHtml(chip.label)} <span>${chip.count}</span>
      </button>
    `)
    .join("");

  filterHosts.forEach((host) => {
    host.innerHTML = html;
  });
}

function filteredIndicacoes() {
  return indicacoesCache.filter((item) => {
    const key = normalizeIndicacaoStatus(item.status || item.statusLabel);
    if (activeStatusFilter !== "all" && key !== activeStatusFilter) return false;
    if (!searchTerm) return true;
    const nome = cleanText(item.nome || item.razaoSocial || item.nomeFantasia || "");
    const doc = onlyDigits(item.cpfCnpj || item.cpf || item.cnpj || "");
    const uc = onlyDigits(item.uc || "");
    const hay = `${nome} ${doc} ${uc}`.toLowerCase();
    return hay.includes(searchTerm);
  });
}

function getTableColspan() {
  return scope?.isSuperAdmin ? 7 : 6;
}

function resolveSellerName(item) {
  const uid = String(item.createdBy || item.user_id || item.created_by || "");
  const mapped = uid ? sellerByUid.get(uid) : "";
  return cleanText(mapped || item.nomeAdmin || item.createdByName || item.createdByEmail || uid || "-");
}

function renderIndicacoesList() {
  if (vendedorHead) vendedorHead.classList.toggle("hidden", !scope?.isSuperAdmin);
  if (!indicacoesTableBody) return;
  const filtered = filteredIndicacoes();
  if (!indicacoesCache.length) {
    indicacoesTableBody.innerHTML =
      `<tr><td colspan="${getTableColspan()}" class="empty-row">Nenhuma indicação encontrada.</td></tr>`;
    return;
  }
  if (!filtered.length) {
    indicacoesTableBody.innerHTML =
      `<tr><td colspan="${getTableColspan()}" class="empty-row">Nenhuma indicação encontrada para o filtro atual.</td></tr>`;
    return;
  }

  indicacoesTableBody.innerHTML = filtered
    .map((item) => {
      const nome = cleanText(item.nome || item.razaoSocial || item.nomeFantasia || "-");
      const doc = onlyDigits(item.cpfCnpj || item.cpf || item.cnpj || "-");
      const uc = onlyDigits(item.uc || "-");
      const vendedor = resolveSellerName(item);
      const created = formatDate(item.createdAt || item.createdAtISO || item.created_at);
      return `
      <tr class="indicacao-row">
        <td>
          <div class="cell-primary">
            <strong>${escapeHtml(nome || "-")}</strong>
          </div>
        </td>
        <td>
          <span class="cell-code">${escapeHtml(doc || "-")}</span>
        </td>
        <td>
          <span class="cell-code">${escapeHtml(uc || "-")}</span>
        </td>
        ${scope?.isSuperAdmin ? `<td><span class="cell-muted">${escapeHtml(vendedor || "-")}</span></td>` : ""}
        <td>${statusPill(item)}</td>
        <td>
          <span class="cell-date">${escapeHtml(created)}</span>
        </td>
        <td class="actions-cell">
          <div class="list-actions">
            <button type="button" class="btn-secondary action-btn action-btn-view" data-view-id="${escapeHtml(item.id)}">
              <i class="ph ph-eye"></i>
              Ver detalhes
            </button>
            <button type="button" class="btn-secondary action-btn action-btn-edit" data-edit-id="${escapeHtml(item.id)}">
              <i class="ph ph-pencil-simple"></i>
              Editar
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
}

function renderKanbanBoard() {
  if (!kanbanBoard) return;
  const filtered = filteredIndicacoes();
  const grouped = filtered.reduce((acc, item) => {
    const key = normalizeIndicacaoStatus(item.status || item.statusLabel);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const columns = [
    { key: "aguardando_aprovacao", label: FLOW_META.aguardando_aprovacao.label },
    { key: "pendente_assinatura", label: FLOW_META.pendente_assinatura.label },
    { key: "pendente_rateio", label: FLOW_META.pendente_rateio.label },
    { key: "ativo", label: FLOW_META.ativo.label },
    { key: "rejeitado", label: FLOW_META.rejeitado.label },
  ];

  kanbanBoard.innerHTML = columns.map((col) => {
    const items = grouped[col.key] || [];
    return `
      <div class="kanban-col" data-status-col="${col.key}">
        <h3>${escapeHtml(col.label)} <span class="kanban-count">${items.length}</span></h3>
        <div class="kanban-cards">
          ${items.length ? items.map((item) => {
            const nome = cleanText(item.nome || item.razaoSocial || item.nomeFantasia || "-");
            const doc = onlyDigits(item.cpfCnpj || item.cpf || item.cnpj || "-");
            const uc = onlyDigits(item.uc || "-");
            return `
              <article class="kanban-card-item" data-view-id="${escapeHtml(item.id)}" data-drag-id="${escapeHtml(item.id)}" draggable="true" role="button" tabindex="0" aria-label="Abrir ${escapeHtml(nome || "-")}">
                <strong>${escapeHtml(nome || "-")}</strong>
                <div class="kanban-meta">
                  <span><span class="kanban-meta-label">Doc</span> ${escapeHtml(doc || "-")}</span>
                  <span><span class="kanban-meta-label">UC</span> ${escapeHtml(uc || "-")}</span>
                </div>
                <div class="kanban-card-actions">
                  <span class="kanban-card-foot">Clique para abrir</span>
                  <button type="button" class="kanban-edit-btn" data-edit-id="${escapeHtml(item.id)}">
                    <i class="ph ph-pencil-simple"></i>
                    Editar
                  </button>
                </div>
              </article>
            `;
          }).join("") : `<div class="kanban-empty">Sem itens nesta etapa</div>`}
        </div>
      </div>
    `;
  }).join("");
}

function resetToNewIndicacaoForm(message) {
  editingIndicacaoId = "";
  editingIndicacaoData = null;
  form.reset();
  tipoPessoaInput.value = "fisica";
  estadoInput.value = "";
  updateTypeUI();
  updateTitularidadeUI();
  refreshFormMasks();
  updateSummary();
  setStep(1);
  showCadastroMode();
  updateSaveButtonLabel();
  setStatus(message);
}

function populateFormForEdit(item) {
  if (!item) return;
  editingIndicacaoId = String(item.id || "");
  editingIndicacaoData = item;

  const tipoPessoa = item.tipoPessoa === "juridica" ? "juridica" : "fisica";
  tipoPessoaInput.value = tipoPessoa;
  updateTypeUI();

  nomeCompletoInput.value = item.nome || "";
  cpfInput.value = item.cpf || item.cpfCnpj || "";
  dataNascimentoInput.value = item.dataNascimento || "";

  razaoSocialInput.value = item.razaoSocial || "";
  nomeFantasiaInput.value = item.nomeFantasia || "";
  cnpjInput.value = item.cnpj || item.cpfCnpj || "";
  nomeRepresentanteInput.value = item.nomeRepresentante || "";
  dataFundacaoInput.value = item.dataFundacao || "";

  emailInput.value = item.email || "";
  telefoneInput.value = item.telefone || "";
  ucInput.value = item.uc || "";
  consumoMedioInput.value = String(item.consumoMedio ?? "");
  descontoInput.value = String(item.desconto ?? "");
  isencaoImpostosInput.checked = Boolean(item.isencaoImpostos);
  isencaoFioBInput.checked = Boolean(item.isencaoFioB);

  cepInput.value = item.endereco?.cep || "";
  logradouroInput.value = item.endereco?.logradouro || "";
  numeroInput.value = item.endereco?.numero || "";
  complementoInput.value = item.endereco?.complemento || "";
  bairroInput.value = item.endereco?.bairro || "";
  cidadeInput.value = item.endereco?.cidade || "";
  estadoInput.value = item.endereco?.estado || "";

  const contaNoNomeValue = item.contaEnergiaNoNomeDoContratante ? "sim" : "nao";
  contaNoNomeInputs.forEach((input) => {
    input.checked = input.value === contaNoNomeValue;
  });
  updateTitularidadeUI();

  nomeDonoContaInput.value = item.nomeDonoConta || "";
  cpfCnpjDonoContaInput.value = item.cpfCnpjDonoConta || "";
  dataNascimentoDonoContaInput.value = item.dataNascimentoDonoConta || "";

  const modalidadeValue = item.modalidade === "mudar_titularidade"
    ? "mudar_titularidade"
    : "nao_mudar_titularidade";
  modalidadeInputs.forEach((input) => {
    input.checked = input.value === modalidadeValue;
  });

  refreshFormMasks();
  docContaEnergiaInput.value = "";
  docIdentificacaoInput.value = "";
  docContratoSocialInput.value = "";
  docTerceiroInput.value = "";

  updateSummary();
  updateUploadRules();
  setStep(1);
  showCadastroMode();
  updateSaveButtonLabel();
  setStatus("Modo edição: ajuste os dados e reenvie documentos se necessário.");
  setUpdated("edicao");
}

function startEditIndicacao(item) {
  if (!item) return;
  closeIndicacaoModal();
  populateFormForEdit(item);
}

function buildDocLink(label, url, description = "") {
  if (!url) return "";
  return `
    <a class="dossier-doc-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
      <span class="dossier-doc-icon"><i class="ph ph-file-arrow-down"></i></span>
      <span class="dossier-doc-meta">
        <small>${escapeHtml(description || "Documento disponível")}</small>
        <strong>${escapeHtml(label)}</strong>
      </span>
      <i class="ph ph-arrow-up-right dossier-doc-open"></i>
    </a>
  `;
}

function buildDetailField(label, value, wide = false) {
  return `<div class="dossier-item ${wide ? "wide" : ""}"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value || "-")}</strong></div>`;
}

function prettyTipoPessoa(value) {
  return String(value || "").toLowerCase() === "juridica" ? "Pessoa Jurídica" : "Pessoa Física";
}

function prettyModalidade(value) {
  return String(value || "") === "mudar_titularidade"
    ? "Mudar titularidade (autoconsumo remoto)"
    : "Não mudar titularidade (geração compartilhada)";
}

function buildIndicacaoDetails(item, signUrl = "") {
  if (!item) return "";
  const endereco = item?.endereco || {};
  const docs = item?.documentos || {};
  const nomePrincipal = item.nome || item.razaoSocial || item.nomeFantasia || "-";
  const flowMeta = getIndicacaoFlowMeta(item);
  const tipoPessoa = prettyTipoPessoa(item.tipoPessoa);
  const vendedor = resolveSellerName(item);
  const criadoEm = formatDate(item.createdAt || item.createdAtISO || item.created_at);
  const consumo = item.consumoMedio ? `${item.consumoMedio} kWh` : "-";
  const desconto = item.desconto ? `${item.desconto}%` : "-";
  const titularidade = item.contaEnergiaNoNomeDoContratante
    ? "Conta no nome do contratante"
    : "Conta em nome de terceiro";
  const contratoPdfUrl = normalizePublicAppUrl(item?.contrato?.pdfUrl || item?.contratoPdfUrl || docs.contratoPdfUrl || "");
  const stage = normalizeIndicacaoStatus(item.status || item.statusLabel);
  const contractActionUrl = stage === "pendente_assinatura" ? (signUrl || contratoPdfUrl) : "";
  const contractActionLabel = signUrl ? "Assinar contrato" : "Abrir contrato";
  const contractActionDescription = signUrl
    ? "Link da página de assinatura com confirmação por WhatsApp"
    : "PDF disponível para assinatura e conferência";
  const docLinks = stage === "pendente_assinatura"
    ? [buildDocLink(contractActionLabel, contractActionUrl, contractActionDescription)].filter(Boolean)
    : [
      buildDocLink("Conta de energia", docs.contaEnergiaUrl, "Fatura da unidade consumidora"),
      buildDocLink("Documento principal", docs.cnhUrl, "CNH ou RG do titular"),
      buildDocLink("Contrato social", docs.contratoSocialUrl, "Documento societário da empresa"),
      buildDocLink("Documento do terceiro", docs.cnhDonoContaUrl, "CNH ou RG do titular da conta"),
      buildDocLink(contractActionLabel, contractActionUrl, contractActionDescription),
    ].filter(Boolean);
  const contractActionCard = stage === "pendente_assinatura" && contractActionUrl
    ? `
    <section class="dossier-section">
      <div class="dossier-section-head">
        <h4>Contrato para assinatura</h4>
        <p>Use este link para abrir o contrato enquanto o status estiver em aguardando assinatura.</p>
      </div>
      <div class="dossier-docs">
        ${buildDocLink("Assinar contrato", contractActionUrl, "Link da página de assinatura com confirmação por WhatsApp")}
      </div>
    </section>
  `
    : "";

  return `
    <section class="dossier-hero">
      <div class="dossier-hero-main">
        <span class="dossier-kicker">Pré-assinante em análise</span>
        <h4>${escapeHtml(nomePrincipal)}</h4>
        <p>${escapeHtml(tipoPessoa)} • Documento ${escapeHtml(item.cpfCnpj || "-")} • UC ${escapeHtml(item.uc || "-")}</p>
      </div>
      <div class="dossier-hero-side">
        <span class="dossier-status-badge ${flowMeta.badgeClass}">${escapeHtml(flowMeta.label)}</span>
        <div class="dossier-hero-meta">
          <span><i class="ph ph-calendar-blank"></i>${escapeHtml(criadoEm)}</span>
          <span><i class="ph ph-user-circle"></i>${escapeHtml(vendedor || "-")}</span>
        </div>
      </div>
    </section>
    ${buildFlowTimeline(item)}
    <section class="dossier-summary-grid">
      <article class="dossier-summary-card">
        <small>Contato principal</small>
        <strong>${escapeHtml(item.email || "-")}</strong>
        <span>${escapeHtml(item.telefone || "-")}</span>
      </article>
      <article class="dossier-summary-card">
        <small>Consumo e desconto</small>
        <strong>${escapeHtml(consumo)}</strong>
        <span>${escapeHtml(desconto)} de desconto contratado</span>
      </article>
      <article class="dossier-summary-card">
        <small>Modalidade</small>
        <strong>${escapeHtml(prettyModalidade(item.modalidade))}</strong>
        <span>${escapeHtml(titularidade)}</span>
      </article>
      <article class="dossier-summary-card">
        <small>Etapa atual</small>
        <strong>${escapeHtml(flowMeta.label)}</strong>
        <span>${escapeHtml(flowMeta.helper)}</span>
      </article>
    </section>
    <section class="dossier-section">
      <div class="dossier-section-head">
        <h4>Próximos passos</h4>
        <p>Controle a jornada do pré-assinante até ele virar assinante ativo.</p>
      </div>
      <div class="dossier-grid">
        ${buildDetailField("Etapa atual", flowMeta.label)}
        ${buildDetailField("Próxima ação", flowMeta.step === 1 ? "Aprovar ou reprovar" : flowMeta.step === 2 ? "Coletar assinatura" : flowMeta.step === 3 ? "Criar e concluir rateio" : flowMeta.step === 4 ? "Fluxo finalizado" : "Cadastro encerrado")}
      </div>
    </section>
    ${contractActionCard}
    <section class="dossier-section">
      <div class="dossier-section-head">
        <h4>Cadastro</h4>
        <p>Dados cadastrais e comerciais do titular indicado.</p>
      </div>
      <div class="dossier-grid">
        ${buildDetailField("Tipo de pessoa", tipoPessoa)}
        ${buildDetailField("Nome / Razão social", nomePrincipal)}
        ${buildDetailField("Nome fantasia", item.nomeFantasia)}
        ${buildDetailField("Representante", item.nomeRepresentante)}
        ${buildDetailField("CPF/CNPJ", item.cpfCnpj)}
        ${buildDetailField("Nascimento/Fundação", item.dataNascimento || item.dataFundacao)}
        ${buildDetailField("Criado em", criadoEm)}
        ${buildDetailField("Vendedor", vendedor)}
      </div>
    </section>
    <section class="dossier-section">
      <div class="dossier-section-head">
        <h4>Contato e Energia</h4>
        <p>Informações de comunicação e parâmetros da unidade consumidora.</p>
      </div>
      <div class="dossier-grid">
        ${buildDetailField("E-mail", item.email)}
        ${buildDetailField("Telefone", item.telefone)}
        ${buildDetailField("UC", item.uc)}
        ${buildDetailField("Consumo médio", consumo)}
        ${buildDetailField("Desconto", desconto)}
        ${buildDetailField("Modalidade", prettyModalidade(item.modalidade), true)}
        ${buildDetailField("Isenção de impostos", item.isencaoImpostos ? "Sim" : "Não")}
        ${buildDetailField("Isenção de fio B", item.isencaoFioB ? "Sim" : "Não")}
      </div>
    </section>
    <section class="dossier-section">
      <div class="dossier-section-head">
        <h4>Endereço e Titularidade</h4>
        <p>Endereço da instalação e vínculo entre contratante e titular da conta.</p>
      </div>
      <div class="dossier-grid">
        ${buildDetailField("CEP", endereco.cep)}
        ${buildDetailField("Cidade/UF", `${endereco.cidade || "-"} / ${endereco.estado || "-"}`)}
        ${buildDetailField("Logradouro", endereco.logradouro, true)}
        ${buildDetailField("Número", endereco.numero)}
        ${buildDetailField("Complemento", endereco.complemento)}
        ${buildDetailField("Bairro", endereco.bairro)}
        ${buildDetailField("Titularidade", titularidade, true)}
        ${buildDetailField("Nome do titular na conta", item.nomeDonoConta)}
        ${buildDetailField("CPF/CNPJ do titular na conta", item.cpfCnpjDonoConta)}
        ${buildDetailField("Nascimento/Fundação do titular na conta", item.dataNascimentoDonoConta)}
      </div>
    </section>
    <section class="dossier-section">
      <div class="dossier-section-head">
        <h4>Documentos enviados</h4>
        <p>Acesse os arquivos anexados para revisão antes da aprovação.</p>
      </div>
      <div class="dossier-docs">
        ${docLinks.length ? docLinks.join("") : '<p class="dossier-empty-docs">Nenhum documento encontrado para este cadastro.</p>'}
      </div>
    </section>
  `;
}

async function openIndicacaoModal(item) {
  if (!item) return;
  activeIndicacaoModalId = String(item.id || "");
  indicacaoModalStatus.textContent = `Status: ${statusLabel(item)}`;
  const stage = normalizeIndicacaoStatus(item.status || item.statusLabel);
  indicacaoModalBody.innerHTML = '<div class="empty-row">Carregando dossiê...</div>';
  let signUrl = "";
  if (stage === "pendente_assinatura" && (item?.contrato?.pdfUrl || item?.contratoPdfUrl || item?.documentos?.contratoPdfUrl)) {
    try {
      signUrl = await buildContractSignUrl(
        { url: item?.contrato?.pdfUrl || item?.contratoPdfUrl || item?.documentos?.contratoPdfUrl || "" },
        item
      );
    } catch (error) {
      console.error("Falha ao gerar link de assinatura para o dossiê", error);
    }
  }
  indicacaoModalBody.innerHTML = buildIndicacaoDetails(item, signUrl);
  indicacaoEditBtn?.classList.remove("hidden");
  indicacaoApproveBtn.classList.toggle("hidden", stage !== "aguardando_aprovacao");
  indicacaoRejectBtn.classList.toggle("hidden", stage !== "aguardando_aprovacao");
  indicacaoRateioBtn.classList.toggle("hidden", stage !== "pendente_rateio");
  indicacaoAssinarBtn?.classList.toggle("hidden", stage !== "pendente_assinatura");
  if (indicacaoAssinarBtn) indicacaoAssinarBtn.textContent = "Marcar rateio pendente";
  if (indicacaoRateioBtn) indicacaoRateioBtn.textContent = "Ir para rateio";
  indicacaoModal.classList.remove("hidden");
}

function closeIndicacaoModal() {
  activeIndicacaoModalId = "";
  indicacaoModalBody.innerHTML = "";
  indicacaoModalStatus.textContent = "";
  indicacaoModal.classList.add("hidden");
}

async function buildContractSignUrl(contract, item) {
  const response = await callBackend("/api/contracts/create-sign-link", {
    pendingId: String(item?.id || ""),
    contractUrl: normalizePublicAppUrl(String(contract?.url || "")),
    signerName: String(item?.nome || item?.razaoSocial || item?.nomeFantasia || ""),
    signerDocument: String(item?.cpfCnpj || ""),
    signerPhone: String(item?.telefone || item?.phone || ""),
    senderUserId: String(scope?.uid || ""),
  });
  const token = String(response?.token || "");
  if (!token) throw new Error("Nao foi possivel criar o link de assinatura.");
  return `${window.location.origin}/api/contracts/s/${encodeURIComponent(token)}`;
}

async function openContractModal(contract, item) {
  const stage = normalizeIndicacaoStatus(item?.status || item?.statusLabel);
  if (!contractModal || !contract?.url || stage !== "pendente_assinatura") return;
  const nome = item?.nome || item?.razaoSocial || item?.nomeFantasia || "assinante";
  const normalizedContractUrl = normalizePublicAppUrl(contract.url);
  let signUrl = "";
  try {
    signUrl = await buildContractSignUrl(contract, item);
  } catch (error) {
    console.warn("Nao foi possivel gerar o link de assinatura. Abrindo modal com o contrato.", error);
  }
  activeContractSignUrl = signUrl || normalizedContractUrl;
  if (contractModalName) contractModalName.textContent = `Contrato de ${nome}`;
  if (contractModalSubtitle) {
    contractModalSubtitle.textContent = signUrl
      ? "O contrato foi gerado com sucesso e o link de assinatura já está disponível."
      : "O contrato foi gerado, mas o link de assinatura não pôde ser criado agora.";
  }
  if (contractModalMessage) {
    contractModalMessage.textContent = signUrl
      ? "Contrato enviado para o WhatsApp do cliente."
      : "Abra o contrato e tente gerar/copiar o link de assinatura novamente em instantes.";
  }
  if (contractModalLink) contractModalLink.href = normalizedContractUrl;
  if (contractModalOpenBtn) contractModalOpenBtn.href = normalizedContractUrl;
  if (contractModalCopyBtn) contractModalCopyBtn.disabled = !activeContractSignUrl;
  if (contractModalFeedback) {
    contractModalFeedback.classList.toggle("hidden", !!signUrl);
    if (!signUrl) {
      contractModalFeedback.textContent = "Link de assinatura indisponível no momento. O contrato pode ser aberto normalmente.";
    }
  }
  contractModal.classList.remove("hidden");
}

function closeContractModal() {
  window.clearTimeout(contractModalFeedbackTimer);
  contractModalFeedbackTimer = 0;
  activeContractSignUrl = "";
  if (contractModalLink) contractModalLink.removeAttribute("href");
  if (contractModalOpenBtn) contractModalOpenBtn.removeAttribute("href");
  if (contractModalCopyBtn) contractModalCopyBtn.disabled = false;
  if (contractModalFeedback) contractModalFeedback.classList.add("hidden");
  contractModal?.classList.add("hidden");
}

function buildContractPayload(item) {
  return {
    subscriber: {
      id: item.id || "",
      tipoPessoa: item.tipoPessoa || "fisica",
      nome: item.nome || "",
      razaoSocial: item.razaoSocial || "",
      nomeFantasia: item.nomeFantasia || "",
      nomeRepresentante: item.nomeRepresentante || "",
      cpfCnpj: item.cpfCnpj || "",
      email: item.email || "",
      telefone: item.telefone || "",
      uc: item.uc || "",
      consumoMedio: Number(item.consumoMedio || 0),
      desconto: Number(item.desconto || 0),
      modalidade: item.modalidade || "",
      isencaoImpostos: Boolean(item.isencaoImpostos),
      isencaoFioB: Boolean(item.isencaoFioB),
      contaEnergiaNoNomeDoContratante: Boolean(item.contaEnergiaNoNomeDoContratante),
      nomeDonoConta: item.nomeDonoConta || "",
      cpfCnpjDonoConta: item.cpfCnpjDonoConta || "",
      dataNascimentoDonoConta: item.dataNascimentoDonoConta || "",
      endereco: item.endereco || {},
    },
  };
}

function buildSubscriberPayloadFromIndicacao(item) {
  const isCompany = String(item.tipoPessoa || "").toLowerCase() === "juridica";
  const holderType = isCompany ? "company" : "person";
  const holderName = item.nome || item.razaoSocial || item.nomeFantasia || "";
  const cpfCnpj = item.cpfCnpj || "";
  const nowIso = new Date().toISOString();
  const contratoPdfUrl = item?.contrato?.pdfUrl || item?.contratoPdfUrl || item?.documentos?.contratoPdfUrl || "";
  const docs = item?.documentos || {};
  const documents = {
    contract: contratoPdfUrl ? { url: contratoPdfUrl, name: "Contrato gerado" } : null,
    energyBill: docs.contaEnergiaUrl ? { url: docs.contaEnergiaUrl, name: "Conta de energia" } : null,
    cnh: docs.cnhUrl ? { url: docs.cnhUrl, name: "CNH ou RG do titular" } : null,
    contractSocial: docs.contratoSocialUrl ? { url: docs.contratoSocialUrl, name: "Contrato social" } : null,
    thirdPartyDocument: docs.cnhDonoContaUrl ? { url: docs.cnhDonoContaUrl, name: "Documento do terceiro" } : null,
    procuracao: docs.procuracaoUrl ? { url: docs.procuracaoUrl, name: "Procuracao" } : null,
  };

  return {
    user_id: item.createdBy || item.user_id || scope.uid,
    tenantId: item.tenantId || scope.tenantId,
    status: "active",
    concessionaria: item.concessionaria || "Equatorial",
    subscriber: {
      fullName: isCompany ? "" : holderName,
      companyName: isCompany ? holderName : "",
      cpf: isCompany ? "" : cpfCnpj,
      cnpj: isCompany ? cpfCnpj : "",
      email: item.email || "",
      phone: item.telefone || "",
      observations: item.modalidade || "",
      partnerNumber: "",
      contacts: {},
    },
    energy_account: {
      holderType,
      cpfCnpj,
      holderName,
      uc: item.uc || "",
      partnerNumber: "",
    },
    plan_details: {
      contractedKwh: Number(item.consumoMedio || 0),
      discountPercentage: Number(item.desconto || 0),
    },
    plan_contract: {
      contractedKwh: Number(item.consumoMedio || 0),
      discountPercentage: Number(item.desconto || 0),
    },
    documents,
    documentos: {
      ...docs,
      contratoPdfUrl,
    },
    contrato: contratoPdfUrl ? {
      pdfUrl: contratoPdfUrl,
      generatedAt: item?.contrato?.generatedAt || item?.contratoGeradoEm || nowIso,
    } : {},
    contratoPdfUrl,
    created_at: item.createdAtISO || nowIso,
    updated_at: nowIso,
    pending_source_id: item.id,
  };
}

async function approveIndicacao(item) {
  const nowIso = new Date().toISOString();
  await updateDoc(doc(db, COLL_PENDING, item.id), {
    status: "pendente_assinatura",
    statusLabel: "Aguardando assinatura",
    approved_by: scope.uid,
    approved_at: nowIso,
    updatedAt: serverTimestamp(),
    updatedAtISO: nowIso,
  });
}

async function rejectIndicacao(item) {
  await updateDoc(doc(db, COLL_PENDING, item.id), {
    status: "rejeitado",
    reviewed_by: scope.uid,
    reviewed_at: new Date().toISOString(),
    updatedAt: serverTimestamp(),
    updatedAtISO: new Date().toISOString(),
  });
}

async function updateIndicacaoStatus(item, statusKey) {
  const meta = FLOW_META[statusKey] || FLOW_META.aguardando_aprovacao;
  const nowIso = new Date().toISOString();
  await updateDoc(doc(db, COLL_PENDING, item.id), {
    status: statusKey,
    statusLabel: meta.label,
    updatedAt: serverTimestamp(),
    updatedAtISO: nowIso,
  });
}

async function completeIndicacaoRateio(item) {
  const subscriberPayload = {
    ...buildSubscriberPayloadFromIndicacao(item),
    status: "active",
    onboarding_stage: "rateio_concluido",
    onboarding_origin_status: normalizeIndicacaoStatus(item.status || item.statusLabel),
    migrated_at: new Date().toISOString(),
  };
  await addDoc(collection(db, COLL_SUBSCRIBERS), subscriberPayload);
  await deleteDoc(doc(db, COLL_PENDING, item.id));
}

async function completeIndicacaoAssinatura(item) {
  const nowIso = new Date().toISOString();
  await updateDoc(doc(db, COLL_PENDING, item.id), {
    status: "pendente_rateio",
    statusLabel: "Aguardando rateio",
    updatedAt: serverTimestamp(),
    updatedAtISO: nowIso,
  });
}

async function syncSignedIndicacoes(items) {
  const pendentes = (items || []).filter(
    (item) => normalizeIndicacaoStatus(item?.status || item?.statusLabel) === "pendente_assinatura"
  );
  if (!pendentes.length) return items;

  let response;
  try {
    response = await callBackend("/api/contracts/signed-status", {
      pendingIds: pendentes.map((item) => String(item.id || "")),
    });
  } catch (error) {
    console.warn("Nao foi possivel sincronizar assinaturas concluídas.", error);
    return items;
  }

  const statuses = response?.statuses || {};
  const updates = [];
  const signedMap = new Map();

  pendentes.forEach((item) => {
    const match = statuses[String(item.id || "")];
    if (!match?.signedAt) return;
    signedMap.set(String(item.id || ""), match);
    updates.push(
      updateDoc(doc(db, COLL_PENDING, item.id), {
        status: "pendente_rateio",
        statusLabel: "Aguardando rateio",
        assinaturaConcluidaEm: match.signedAt,
        contrato: {
          ...(item.contrato || {}),
          signedPdfUrl: String(match.signedContractUrl || item?.contrato?.signedPdfUrl || ""),
        },
        contratoAssinadoUrl: String(match.signedContractUrl || item?.contratoAssinadoUrl || ""),
        assinaturaComprovanteUrl: String(match.signatureRecordUrl || item?.assinaturaComprovanteUrl || ""),
        assinaturaImagemUrl: String(match.signatureImageUrl || item?.assinaturaImagemUrl || ""),
        updatedAt: serverTimestamp(),
        updatedAtISO: new Date().toISOString(),
      }).catch((error) => {
        console.warn(`Falha ao sincronizar assinatura da indicação ${item.id}.`, error);
      })
    );
  });

  if (updates.length) {
    await Promise.all(updates);
  }

  return items.map((item) => {
    const match = signedMap.get(String(item.id || ""));
    if (!match?.signedAt) return item;
    return {
      ...item,
      status: "pendente_rateio",
      statusLabel: "Aguardando rateio",
      assinaturaConcluidaEm: match.signedAt,
      contrato: {
        ...(item.contrato || {}),
        signedPdfUrl: String(match.signedContractUrl || item?.contrato?.signedPdfUrl || ""),
      },
      contratoAssinadoUrl: String(match.signedContractUrl || item?.contratoAssinadoUrl || ""),
      assinaturaComprovanteUrl: String(match.signatureRecordUrl || item?.assinaturaComprovanteUrl || ""),
      assinaturaImagemUrl: String(match.signatureImageUrl || item?.assinaturaImagemUrl || ""),
    };
  });
}

async function generateIndicacaoContract(item) {
  const response = await callBackend("/api/contracts/generate", buildContractPayload(item));
  const contract = response?.contract;
  if (!contract?.url) {
    throw new Error("Contrato não retornou URL.");
  }

  const nowIso = contract.generatedAt || new Date().toISOString();
  const currentDocs = item.documentos || {};
  await updateDoc(doc(db, COLL_PENDING, item.id), {
    contrato: {
      pdfUrl: normalizePublicAppUrl(contract.url),
      generatedAt: nowIso,
      fileName: contract.fileName || "",
    },
    contratoPdfUrl: normalizePublicAppUrl(contract.url),
    contratoGeradoEm: nowIso,
    documentos: {
      ...currentDocs,
      contratoPdfUrl: normalizePublicAppUrl(contract.url),
    },
    updatedAt: serverTimestamp(),
    updatedAtISO: nowIso,
  });

  return contract;
}

async function handleIndicacaoMove(item, targetStatus) {
  const currentStatus = normalizeIndicacaoStatus(item?.status || item?.statusLabel);
  const nextStatus = normalizeIndicacaoStatus(targetStatus);
  if (!item || !nextStatus || currentStatus === nextStatus) return { moved: false, contract: null };

  if (currentStatus === "aguardando_aprovacao" && nextStatus === "pendente_assinatura") {
    const contract = await generateIndicacaoContract(item);
    await approveIndicacao(item);
    return { moved: true, contract };
  }

  if (currentStatus === "pendente_assinatura" && nextStatus === "pendente_rateio") {
    await completeIndicacaoAssinatura(item);
    return { moved: true, contract: null };
  }

  if (currentStatus === "pendente_rateio" && nextStatus === "ativo") {
    await completeIndicacaoRateio(item);
    return { moved: true, contract: null };
  }

  if (nextStatus === "rejeitado") {
    await rejectIndicacao(item);
    return { moved: true, contract: null };
  }

  await updateIndicacaoStatus(item, nextStatus);
  return { moved: true, contract: null };
}

function isPartnerLikeRecord(item) {
  const cargo = cleanText(item?.cargo).toLowerCase();
  const role = cleanText(item?.role).toLowerCase();
  if (["parceiro", "vendedor", "representante"].includes(cargo)) return true;
  if (["parceiro", "vendedor", "representante"].includes(role)) return true;
  const perms = item?.permissions || {};
  return perms.representantes === true;
}

function normalizeEmail(value) {
  return cleanText(value).toLowerCase();
}

function normalizePhone(value) {
  return onlyDigits(value);
}

function buildPartnerFingerprints(list) {
  const docs = new Set();
  const emails = new Set();
  const phones = new Set();

  list.forEach((p) => {
    const doc = onlyDigits(p.cpfCnpj || p.cpf || p.cnpj || "");
    const email = normalizeEmail(p.email || p.mail || "");
    const phone = normalizePhone(p.telefone || p.phone || "");
    if (doc) docs.add(doc);
    if (email) emails.add(email);
    if (phone) phones.add(phone);
  });

  partnerFingerprints = { docs, emails, phones };
}

function matchesPartner(item) {
  const doc = onlyDigits(item.cpfCnpj || item.cpf || item.cnpj || "");
  const email = normalizeEmail(item.email || item.mail || "");
  const phone = normalizePhone(item.telefone || item.phone || "");
  if (doc && partnerFingerprints.docs.has(doc)) return true;
  if (email && partnerFingerprints.emails.has(email)) return true;
  if (phone && partnerFingerprints.phones.has(phone)) return true;
  return false;
}

function isPreAssinanteRecord(item) {
  if (!item || typeof item !== "object") return false;

  const hasPartnerSignals =
    Boolean(cleanText(item.cargo)) ||
    Boolean(cleanText(item.role)) ||
    Boolean(item.permissions && typeof item.permissions === "object") ||
    Boolean(cleanText(item.auth_user_id)) ||
    Boolean(cleanText(item.uid));
  if (hasPartnerSignals) return false;

  const hasCoreFields =
    Boolean(cleanText(item.nome || item.razaoSocial || item.nomeFantasia)) &&
    Boolean(onlyDigits(item.cpfCnpj || item.cpf || item.cnpj)) &&
    Boolean(onlyDigits(item.uc));
  if (!hasCoreFields) return false;

  const hasIndicacaoShape =
    Object.prototype.hasOwnProperty.call(item, "contaEnergiaNoNomeDoContratante") ||
    Object.prototype.hasOwnProperty.call(item, "modalidade") ||
    Object.prototype.hasOwnProperty.call(item, "desconto") ||
    Object.prototype.hasOwnProperty.call(item, "consumoMedio");

  return hasIndicacaoShape;
}

async function loadIndicacoesList() {
  if (!scope) return;
  indicacoesTableBody.innerHTML =
    `<tr><td colspan="${getTableColspan()}" class="empty-row">Carregando indicações...</td></tr>`;

  try {
    const collabsQueries = scope.isSuperAdmin
      ? [query(collection(db, COLL_COLLABORATORS))]
      : [
        query(collection(db, COLL_COLLABORATORS), where("tenantId", "==", scope.tenantId)),
        query(collection(db, COLL_COLLABORATORS), where("tenant_id", "==", scope.tenantId)),
        query(collection(db, COLL_COLLABORATORS), where("user_id", "==", scope.uid)),
        query(collection(db, COLL_COLLABORATORS), where("user_id", "==", scope.tenantId)),
      ];
    const collabsSnaps = await Promise.all(
      collabsQueries.map(async (q) => {
        try {
          return await getDocs(q);
        } catch {
          return { docs: [] };
        }
      })
    );
    const partnerMap = new Map();
    sellerByUid = new Map();
    collabsSnaps.forEach((snap) => {
      snap.docs.forEach((d) => {
        const data = { id: d.id, ...d.data() };
        const sellerUid = String(data.auth_user_id || data.uid || "");
        const sellerName = cleanText(data.nome || data.name || data.email || "");
        if (sellerUid) sellerByUid.set(sellerUid, sellerName || sellerUid);
        if (isPartnerLikeRecord(data)) partnerMap.set(d.id, data);
      });
    });
    buildPartnerFingerprints(Array.from(partnerMap.values()));

    let pendingDocs = [];
    if (scope.isSuperAdmin) {
      const allSnap = await getDocs(query(collection(db, COLL_PENDING)));
      pendingDocs = allSnap.docs;
    } else if (scope.isEmployee) {
      const ownQueries = [
        query(collection(db, COLL_PENDING), where("createdBy", "==", scope.uid)),
        query(collection(db, COLL_PENDING), where("user_id", "==", scope.uid)),
      ];
      const ownSnaps = await Promise.all(
        ownQueries.map(async (q) => {
          try {
            return await getDocs(q);
          } catch {
            return { docs: [] };
          }
        })
      );
      const byId = new Map();
      ownSnaps.forEach((snap) => snap.docs.forEach((d) => byId.set(d.id, d)));
      pendingDocs = Array.from(byId.values());
    } else {
      const byTenantQ = query(collection(db, COLL_PENDING), where("tenantId", "==", scope.tenantId));
      const snap = await getDocs(byTenantQ);
      pendingDocs = snap.docs;
    }

    indicacoesCache = pendingDocs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter(isPreAssinanteRecord)
      .filter((x) => !isPartnerLikeRecord(x))
      .sort((a, b) => {
        const ad = asDate(a.createdAt || a.createdAtISO || a.created_at)?.getTime() || 0;
        const bd = asDate(b.createdAt || b.createdAtISO || b.created_at)?.getTime() || 0;
        return bd - ad;
      });

    indicacoesCache = await syncSignedIndicacoes(indicacoesCache);

    buildStatusFilters();
    renderIndicacoesList();
    renderKanbanBoard();
    setUpdated("lista");
  } catch (error) {
    console.error(error);
    indicacoesTableBody.innerHTML =
      `<tr><td colspan="${getTableColspan()}" class="empty-row">Falha ao carregar indicações.</td></tr>`;
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
  const docLabel = data.cpfCnpj ? formatCpfCnpj(data.cpfCnpj) : "-";
  const phoneLabel = data.telefone ? formatPhone(data.telefone) : "-";
  const modalidadeLabel = prettyModalidade(data.modalidade);
  summaryBar.innerHTML = `Cliente: <strong>${escapeHtml(data.nome || "-")}</strong> | Documento: <strong>${escapeHtml(docLabel)}</strong> | WhatsApp: <strong>${escapeHtml(phoneLabel)}</strong> | UC: <strong>${escapeHtml(data.uc || "-")}</strong> | Modalidade: <strong>${escapeHtml(modalidadeLabel)}</strong>`;
}

function resetKanbanFilters() {
  activeStatusFilter = "all";
  searchTerm = "";
  if (searchIndicacoes) searchIndicacoes.value = "";
  if (searchIndicacoesKanban) searchIndicacoesKanban.value = "";
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
    setStatus("Não foi possível encontrar endereco para o CEP informado.", "error");
    return false;
  }

  cepInput.value = data.cep;
  if (!logradouroInput.value.trim()) logradouroInput.value = data.logradouro;
  if (!bairroInput.value.trim()) bairroInput.value = data.bairro;
  cidadeInput.value = data.cidade || cidadeInput.value;
  estadoInput.value = (data.estado || estadoInput.value).toUpperCase();

  setStatus("Endereço preenchido com base no CEP.", "success");
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

  }
}

async function getUserScope(user) {
  const token = await getIdTokenResult(user, true);
  const email = String(user?.email || "").toLowerCase().trim();
  const isSuperAdmin = email === "jheferson@gmail.com";
  const result = {
    uid: user.uid,
    tenantId: user.uid,
    email: user.email || "",
    name: "",
    isSuperAdmin,
    isEmployee: false,
    isAdmin: false,
  };

  if (isSuperAdmin) {
    result.isAdmin = true;
    result.name = user.email || "";
    return result;
  }

  const adminQ = query(collection(db, "gcredito_admins"), where("uid", "==", user.uid), limit(1));
  const adminSnap = await getDocs(adminQ);
  if (!adminSnap.empty) {
    const d = adminSnap.docs[0].data();
    result.tenantId = d.tenantId || result.tenantId;
    result.name = d.name || "";
    result.isAdmin = true;
    return result;
  }

  const funcQ = query(collection(db, "gcredito_funcionarios"), where("auth_user_id", "==", user.uid), limit(1));
  const funcSnap = await getDocs(funcQ);
  if (!funcSnap.empty) {
    const d = funcSnap.docs[0].data();
    result.tenantId = d.tenantId || result.tenantId;
    result.name = d.nome || d.name || "";
    result.isEmployee = true;
    return result;
  }

  return result;
}

async function uploadDocumentViaBackend(file) {
  const endpoints = buildBackendEndpoints("/api/uploads/doc");

  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || body?.error) {
        throw new Error(body?.error || `HTTP ${response.status}`);
      }
      const url = body.url
        ? (String(body.url).startsWith("http") ? body.url : `${window.location.origin}${body.url}`)
        : "";
      return url;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Backend indisponível para upload.");
}

async function uploadDocument(file, key) {
  if (!file) return "";

  return uploadDocumentViaBackend(file);
}

function validateStep2Files() {
  const hasContaEnergia = docContaEnergiaInput.files?.length || hasUsableExistingDocUrl("contaEnergiaUrl");
  if (!hasContaEnergia) {
    setStatus("Reenvie a conta de energia. Links antigos do Firebase foram desativados.", "error");
    docContaEnergiaInput.reportValidity();
    return false;
  }

  const hasIdentificacao = docIdentificacaoInput.files?.length || hasUsableExistingDocUrl("cnhUrl");
  if (!hasIdentificacao) {
    setStatus("Reenvie o documento principal. Links antigos do Firebase foram desativados.", "error");
    docIdentificacaoInput.reportValidity();
    return false;
  }

  const isPj = tipoPessoaInput.value === "juridica";
  const hasContratoSocial = docContratoSocialInput.files?.length || hasUsableExistingDocUrl("contratoSocialUrl");
  if (isPj && !hasContratoSocial) {
    setStatus("Reenvie o contrato social. Links antigos do Firebase foram desativados.", "error");
    docContratoSocialInput.reportValidity();
    return false;
  }

  const isTerceiro = getContaNoNome() === "nao";
  const hasDocTerceiro = docTerceiroInput.files?.length || hasUsableExistingDocUrl("cnhDonoContaUrl");
  if (isTerceiro && !hasDocTerceiro) {
    setStatus("Reenvie o documento do terceiro. Links antigos do Firebase foram desativados.", "error");
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
        contaEnergiaUrl: contaEnergiaUrl || existingDocUrl("contaEnergiaUrl"),
        cnhUrl: cnhUrl || existingDocUrl("cnhUrl"),
        contratoSocialUrl: contratoSocialUrl || existingDocUrl("contratoSocialUrl"),
        cnhDonoContaUrl: cnhDonoContaUrl || existingDocUrl("cnhDonoContaUrl"),
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

    if (editingIndicacaoId) {
      delete payload.createdAt;
      delete payload.createdAtISO;
      await updateDoc(doc(db, COLL_PENDING, editingIndicacaoId), payload);
    } else {
      await addDoc(collection(db, COLL_PENDING), payload);
    }

    resetKanbanFilters();
    await loadIndicacoesList();
    setStep(3);
    setStatus(editingIndicacaoId ? "Indicação atualizada com sucesso." : "Indicacao salva com sucesso.", "success");
    setUpdated(editingIndicacaoId ? "atualizado" : "salvo");
    editingIndicacaoId = "";
    editingIndicacaoData = null;
    updateSaveButtonLabel();
  } catch (error) {
    console.error(error);
    setStatus(`Falha ao salvar indicacao: ${error.message || "erro desconhecido"}`, "error");
  } finally {
    salvarBtn.disabled = false;
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
      setStatus("Preencha os campos obrigatórios da fase 1.", "error");
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

  [
    nomeCompletoInput,
    cpfInput,
    dataNascimentoInput,
    razaoSocialInput,
    nomeFantasiaInput,
    cnpjInput,
    nomeRepresentanteInput,
    dataFundacaoInput,
    emailInput,
    telefoneInput,
    ucInput,
    consumoMedioInput,
    descontoInput,
    cepInput,
    logradouroInput,
    numeroInput,
    complementoInput,
    bairroInput,
    cidadeInput,
    estadoInput,
    nomeDonoContaInput,
    cpfCnpjDonoContaInput,
    dataNascimentoDonoContaInput,
  ].forEach((input) => {
    input?.addEventListener("input", () => {
      if (input === estadoInput) estadoInput.value = formatUf(estadoInput.value);
      updateSummary();
    });
  });

  [
    isencaoImpostosInput,
    isencaoFioBInput,
    ...contaNoNomeInputs,
    ...modalidadeInputs,
  ].forEach((input) => {
    input?.addEventListener("change", () => {
      updateSummary();
    });
  });

  cepInput?.addEventListener("blur", () => {
    if (onlyDigits(cepInput.value).length === 8) fillAddressFromCep();
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!step2Panel.classList.contains("hidden")) saveIndicacao();
  });

  novaIndicacaoBtn?.addEventListener("click", () => {
    resetToNewIndicacaoForm("Formulario limpo para nova indicacao.");
  });

  novaIndicacaoTopBtn?.addEventListener("click", () => {
    resetToNewIndicacaoForm("Preencha os dados e avance para o upload.");
  });

  novaIndicacaoTopBtnKanban?.addEventListener("click", () => {
    resetToNewIndicacaoForm("Preencha os dados e avance para o upload.");
  });

  voltarListaTopBtn?.addEventListener("click", async () => {
    await loadIndicacoesList();
    showListMode();
    setStatus("Kanban de indicações atualizado.");
  });

  voltarListaBtn?.addEventListener("click", async () => {
    await loadIndicacoesList();
    showListMode();
    setStatus("Kanban de indicações atualizado.");
  });

  indicacoesTableBody?.addEventListener("click", async (event) => {
    const editBtn = event.target.closest("[data-edit-id]");
    if (editBtn) {
      const id = String(editBtn.getAttribute("data-edit-id") || "");
      const item = indicacoesCache.find((x) => String(x.id) === id);
      if (item) startEditIndicacao(item);
      return;
    }

    const viewBtn = event.target.closest("[data-view-id]");
    if (viewBtn) {
      const id = String(viewBtn.getAttribute("data-view-id") || "");
      const item = indicacoesCache.find((x) => String(x.id) === id);
      if (item) openIndicacaoModal(item);
      return;
    }

  });

  kanbanBoard?.addEventListener("click", async (event) => {
    const editBtn = event.target.closest("[data-edit-id]");
    if (editBtn) {
      const id = String(editBtn.getAttribute("data-edit-id") || "");
      const item = indicacoesCache.find((x) => String(x.id) === id);
      if (item) startEditIndicacao(item);
      return;
    }
    const viewBtn = event.target.closest("[data-view-id]");
    if (viewBtn) {
      const id = String(viewBtn.getAttribute("data-view-id") || "");
      const item = indicacoesCache.find((x) => String(x.id) === id);
      if (item) openIndicacaoModal(item);
      return;
    }
  });

  kanbanBoard?.addEventListener("dragstart", (event) => {
    const card = event.target.closest("[data-drag-id]");
    if (!card) return;
    draggingIndicacaoId = String(card.getAttribute("data-drag-id") || "");
    card.classList.add("is-dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggingIndicacaoId);
    }
  });

  kanbanBoard?.addEventListener("dragend", (event) => {
    const card = event.target.closest("[data-drag-id]");
    if (card) card.classList.remove("is-dragging");
    draggingIndicacaoId = "";
    kanbanBoard.querySelectorAll(".kanban-col.drag-over").forEach((col) => col.classList.remove("drag-over"));
  });

  kanbanBoard?.addEventListener("dragover", (event) => {
    const col = event.target.closest("[data-status-col]");
    if (!col || !draggingIndicacaoId) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  });

  kanbanBoard?.addEventListener("dragenter", (event) => {
    const col = event.target.closest("[data-status-col]");
    if (!col || !draggingIndicacaoId) return;
    col.classList.add("drag-over");
  });

  kanbanBoard?.addEventListener("dragleave", (event) => {
    const col = event.target.closest("[data-status-col]");
    if (!col) return;
    const related = event.relatedTarget;
    if (related && col.contains(related)) return;
    col.classList.remove("drag-over");
  });

  kanbanBoard?.addEventListener("drop", async (event) => {
    const col = event.target.closest("[data-status-col]");
    if (!col) return;
    event.preventDefault();
    col.classList.remove("drag-over");
    const draggedId = draggingIndicacaoId || event.dataTransfer?.getData("text/plain") || "";
    draggingIndicacaoId = "";
    if (!draggedId) return;

    const item = indicacoesCache.find((x) => String(x.id) === String(draggedId));
    if (!item) return;

    const targetStatus = String(col.getAttribute("data-status-col") || "");
    const currentStatus = normalizeIndicacaoStatus(item.status || item.statusLabel);
    if (!targetStatus || currentStatus === targetStatus) return;

    try {
      const { contract } = await handleIndicacaoMove(item, targetStatus);
      await loadIndicacoesList();
      if (contract) {
        await openContractModal(contract, item);
        setStatus("Contrato gerado após mover a indicação para aguardando assinatura.", "success");
      } else {
        setStatus(`Indicação movida para ${FLOW_META[targetStatus]?.label || targetStatus}.`, "success");
      }
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível mover a indicação entre as colunas.", "error");
    }
  });

  indicacaoModalCloseBtn?.addEventListener("click", closeIndicacaoModal);
  indicacaoModalCancelBtn?.addEventListener("click", closeIndicacaoModal);
  indicacaoEditBtn?.addEventListener("click", () => {
    if (!activeIndicacaoModalId) return;
    const item = indicacoesCache.find((x) => String(x.id) === activeIndicacaoModalId);
    if (item) startEditIndicacao(item);
  });
  indicacaoModal?.addEventListener("click", (event) => {
    if (event.target === indicacaoModal) closeIndicacaoModal();
  });
  contractModalCloseBtn?.addEventListener("click", closeContractModal);
  contractModalCancelBtn?.addEventListener("click", closeContractModal);
  contractModalCopyBtn?.addEventListener("click", async () => {
    if (!activeContractSignUrl) return;
    try {
      await navigator.clipboard.writeText(activeContractSignUrl);
      if (contractModalFeedback) {
        contractModalFeedback.textContent = "Link para assinatura copiado. Agora ele pode ser enviado ao cliente.";
        contractModalFeedback.classList.remove("hidden");
      }
      window.clearTimeout(contractModalFeedbackTimer);
      contractModalFeedbackTimer = window.setTimeout(() => {
        contractModalFeedback?.classList.add("hidden");
      }, 4000);
      setStatus("Link para assinatura copiado.", "success");
    } catch (error) {
      console.error(error);
      if (contractModalFeedback) {
        contractModalFeedback.textContent = "Não foi possível copiar o link para assinatura.";
        contractModalFeedback.classList.remove("hidden");
      }
      setStatus("Não foi possível copiar o link para assinatura.", "error");
    }
  });
  contractModal?.addEventListener("click", (event) => {
    if (event.target === contractModal) closeContractModal();
  });

  const handleStatusFilterClick = (event) => {
    const btn = event.target.closest("[data-status]");
    if (!btn) return;
    activeStatusFilter = btn.dataset.status || "all";
    buildStatusFilters();
    renderIndicacoesList();
    renderKanbanBoard();
  };
  statusFilters?.addEventListener("click", handleStatusFilterClick);
  statusFiltersKanban?.addEventListener("click", handleStatusFilterClick);

  const handleSearchInput = (value) => {
    searchTerm = String(value || "").trim().toLowerCase();
    if (searchIndicacoes && searchIndicacoes !== document.activeElement) searchIndicacoes.value = value;
    if (searchIndicacoesKanban && searchIndicacoesKanban !== document.activeElement) searchIndicacoesKanban.value = value;
    renderIndicacoesList();
    renderKanbanBoard();
  };
  searchIndicacoes?.addEventListener("input", () => handleSearchInput(searchIndicacoes.value));
  searchIndicacoesKanban?.addEventListener("input", () => handleSearchInput(searchIndicacoesKanban.value));

  const handleClearFilters = () => {
    activeStatusFilter = "all";
    searchTerm = "";
    if (searchIndicacoes) searchIndicacoes.value = "";
    if (searchIndicacoesKanban) searchIndicacoesKanban.value = "";
    buildStatusFilters();
    renderIndicacoesList();
    renderKanbanBoard();
  };
  clearFiltersBtn?.addEventListener("click", handleClearFilters);
  clearFiltersBtnKanban?.addEventListener("click", handleClearFilters);

  viewListBtn?.addEventListener("click", () => {
    viewMode = "kanban";
    showKanbanMode();
    renderKanbanBoard();
  });

  viewKanbanBtn?.addEventListener("click", () => {
    viewMode = "kanban";
    showKanbanMode();
    renderKanbanBoard();
  });

  indicacaoApproveBtn?.addEventListener("click", async () => {
    if (!activeIndicacaoModalId) return;
    const item = indicacoesCache.find((x) => String(x.id) === activeIndicacaoModalId);
    if (!item || !canReviewIndicacao(item)) return;
    const ok = window.confirm(`Aprovar o pré-assinante "${item.nome || item.razaoSocial || "-"}" e gerar o contrato?`);
    if (!ok) return;
    indicacaoApproveBtn.disabled = true;
    indicacaoRejectBtn.disabled = true;
    try {
      const { contract } = await handleIndicacaoMove(item, "pendente_assinatura");
      await loadIndicacoesList();
      const updated = indicacoesCache.find((x) => String(x.id) === activeIndicacaoModalId);
      if (updated) openIndicacaoModal(updated);
      if (contract) {
        await openContractModal(contract, item);
        setStatus("Pré-assinante aprovado. Contrato gerado e etapa movida para aguardando assinatura.", "success");
      } else {
        setStatus("Pré-assinante aprovado, mas o contrato não foi gerado.", "error");
      }
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível aprovar o pré-assinante.", "error");
    } finally {
      indicacaoApproveBtn.disabled = false;
      indicacaoRejectBtn.disabled = false;
    }
  });

  indicacaoRejectBtn?.addEventListener("click", async () => {
    if (!activeIndicacaoModalId) return;
    const item = indicacoesCache.find((x) => String(x.id) === activeIndicacaoModalId);
    const stage = normalizeIndicacaoStatus(item?.status || item?.statusLabel);
    if (!item || stage !== "aguardando_aprovacao") return;
    const ok = window.confirm(`Rejeitar o pré-assinante "${item.nome || item.razaoSocial || "-"}"?`);
    if (!ok) return;
    indicacaoApproveBtn.disabled = true;
    indicacaoRejectBtn.disabled = true;
    try {
      await rejectIndicacao(item);
      await loadIndicacoesList();
      const updated = indicacoesCache.find((x) => String(x.id) === activeIndicacaoModalId);
      if (updated) openIndicacaoModal(updated);
      setStatus("Pré-assinante rejeitado com sucesso.", "success");
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível rejeitar o pré-assinante.", "error");
    } finally {
      indicacaoApproveBtn.disabled = false;
      indicacaoRejectBtn.disabled = false;
    }
  });

  indicacaoRateioBtn?.addEventListener("click", async () => {
    if (!activeIndicacaoModalId) return;
    const item = indicacoesCache.find((x) => String(x.id) === activeIndicacaoModalId);
    if (!item || normalizeIndicacaoStatus(item.status || item.statusLabel) !== "pendente_rateio") return;
    const ok = window.confirm(`Abrir a tela de rateio para "${item.nome || item.razaoSocial || "-"}"? Ele só vira assinante depois de ser vinculado e salvo em algum rateio.`);
    if (!ok) return;
    indicacaoRateioBtn.disabled = true;
    try {
      const target = new URL("cadastrar-rateio.html", window.location.href);
      target.searchParams.set("pendingId", String(item.id || ""));
      target.searchParams.set("uc", String(item.uc || ""));
      target.searchParams.set("name", String(item.nome || item.razaoSocial || item.nomeFantasia || ""));
      window.location.href = target.toString();
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível abrir a tela de rateio.", "error");
    } finally {
      indicacaoRateioBtn.disabled = false;
    }
  });

  indicacaoAssinarBtn?.addEventListener("click", async () => {
    if (!activeIndicacaoModalId) return;
    const item = indicacoesCache.find((x) => String(x.id) === activeIndicacaoModalId);
    if (!item || normalizeIndicacaoStatus(item.status || item.statusLabel) !== "pendente_assinatura") return;
    const ok = window.confirm(`Confirmar a assinatura de "${item.nome || item.razaoSocial || "-"}" e enviar para rateio?`);
    if (!ok) return;
    indicacaoAssinarBtn.disabled = true;
    try {
      await handleIndicacaoMove(item, "pendente_rateio");
      closeIndicacaoModal();
      await loadIndicacoesList();
      setStatus("Assinatura concluída. Cadastro movido para aguardando rateio.", "success");
    } catch (error) {
      console.error(error);
      setStatus("Não foi possível concluir a assinatura.", "error");
    } finally {
      indicacaoAssinarBtn.disabled = false;
    }
  });

  window.addEventListener("resize", applySidebarState);
}

function initUi() {
  initTheme();
  applySidebarState();
  updateTypeUI();
  updateTitularidadeUI();
  bindInputMasks();
  updateSummary();
  setStep(1);
  showKanbanMode();
  updateSaveButtonLabel();
  bindEvents();
}

async function refreshIndicacoesOnReturn() {
  if (!scope?.uid) return;
  const now = Date.now();
  if (now - lastKanbanRefreshAt < 2500) return;
  lastKanbanRefreshAt = now;
  try {
    await loadIndicacoesList();
  } catch (error) {
    console.warn("Falha ao atualizar o kanban ao retornar para a página.", error);
  }
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
    setStatus("Selecione uma indicação no kanban ou clique em Nova indicação.");
  } catch (error) {
    console.error(error);
    setStatus("Falha ao carregar contexto do usuário.", "error");
  }
});

window.addEventListener("focus", () => {
  refreshIndicacoesOnReturn();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshIndicacoesOnReturn();
  }
});

initUi();
