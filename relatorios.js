import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, getIdTokenResult, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, getDocs, getDocsFromServer, getFirestore, limit, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

const COLL_EMITIDAS = "gcredito_faturas_emitidas";
const COLL_SUBSCRIBERS = "gcredito_subscribers";
const themeKey = "gcsolar_theme";
const collapsedKey = "gcsolar_sidebar_collapsed";

const appShell = document.getElementById("appShell");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const logoutBtn = document.getElementById("logoutBtn");
const themeBtn = document.getElementById("themeBtn");
const refreshBtn = document.getElementById("refreshBtn");
const updatedAtLabel = document.getElementById("updatedAtLabel");

const generatorFilter = document.getElementById("generatorFilter");
const yearFilter = document.getElementById("yearFilter");
const referenceFilter = document.getElementById("referenceFilter");
const searchInput = document.getElementById("searchInput");
const dueStartFilter = document.getElementById("dueStartFilter");
const dueEndFilter = document.getElementById("dueEndFilter");
const paymentStartFilter = document.getElementById("paymentStartFilter");
const paymentEndFilter = document.getElementById("paymentEndFilter");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

const kpiCount = document.getElementById("kpiCount");
const kpiPaid = document.getElementById("kpiPaid");
const kpiManagement = document.getElementById("kpiManagement");
const kpiInvestor = document.getElementById("kpiInvestor");
const resultsLabel = document.getElementById("resultsLabel");
const footerInvestorTotal = document.getElementById("footerInvestorTotal");
const reportTableBody = document.getElementById("reportTableBody");

let scope = null;
let rawInvoices = [];
let subscribers = [];
let generators = [];
let activeLinks = [];

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

toggleSidebarBtn?.addEventListener("click", () => {
  if (isMobile()) {
    appShell.classList.toggle("mobile-open");
    return;
  }
  const collapsed = appShell.classList.toggle("sidebar-collapsed");
  localStorage.setItem(collapsedKey, collapsed ? "1" : "0");
});

window.addEventListener("resize", () => {
  if (!isMobile()) appShell.classList.remove("mobile-open");
  applySidebarState();
});

document.addEventListener("click", (event) => {
  if (!isMobile()) return;
  const clickedToggle = event.target.closest("#toggleSidebar");
  const clickedSidebar = event.target.closest("#sidebar");
  if (!clickedToggle && !clickedSidebar) appShell.classList.remove("mobile-open");
});

logoutBtn?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(themeKey, next);
});

refreshBtn?.addEventListener("click", () => {
  loadReport().catch((error) => {
    console.error("Erro ao atualizar relatório:", error);
    renderError("Falha ao atualizar relatório.");
  });
});

[
  generatorFilter,
  yearFilter,
  referenceFilter,
  searchInput,
  dueStartFilter,
  dueEndFilter,
  paymentStartFilter,
  paymentEndFilter,
].forEach((el) => el?.addEventListener(el.tagName === "INPUT" ? "input" : "change", applyFilters));

clearFiltersBtn?.addEventListener("click", () => {
  generatorFilter.value = "";
  yearFilter.value = "";
  referenceFilter.value = "";
  searchInput.value = "";
  dueStartFilter.value = "";
  dueEndFilter.value = "";
  paymentStartFilter.value = "";
  paymentEndFilter.value = "";
  applyFilters();
});

function normalizeText(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function onlyDigits(value) {
  return String(value || "").replace(/\D+/g, "");
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function brl(value) {
  return toNumber(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
}

function formatKwh(value) {
  return `${toNumber(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} kWh`;
}

function asDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value?.toDate === "function") return value.toDate();
  if (typeof value?.seconds === "number") return new Date(value.seconds * 1000);
  if (typeof value?._seconds === "number") return new Date(value._seconds * 1000);
  if (typeof value === "string") {
    const raw = value.trim();
    const br = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:[,\s]+(\d{2}):(\d{2})(?::(\d{2}))?)?$/);
    if (br) {
      const d = new Date(Number(br[3]), Number(br[2]) - 1, Number(br[1]), Number(br[4] || 0), Number(br[5] || 0), Number(br[6] || 0));
      return Number.isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function toIsoDate(value) {
  const d = asDate(value);
  if (!d) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDate(value) {
  const d = asDate(value);
  if (!d) return "-";
  return d.toLocaleDateString("pt-BR");
}

function normalizeDoc(value) {
  const digits = onlyDigits(value);
  if (digits.length === 11 || digits.length === 14) return digits;
  return "";
}

function normalizeUc(value) {
  const raw = String(value || "").trim();
  const digits = onlyDigits(raw);
  return digits || raw.replace(/\s+/g, "").toUpperCase();
}

function getInvoiceSortTimestamp(item) {
  return asDate(item.updated_at)?.getTime() || asDate(item.created_at)?.getTime() || asDate(resolveVencimento(item))?.getTime() || 0;
}

function dedupeInvoices(items) {
  const map = new Map();
  items.forEach((item) => {
    const key = `${normalizeUc(resolveUc(item))}|${String(resolveReferencia(item) || "").trim().toUpperCase()}|${normalizeDoc(resolveDocumento(item))}`;
    const current = map.get(key);
    if (!current || getInvoiceSortTimestamp(item) >= getInvoiceSortTimestamp(current)) {
      map.set(key, item);
    }
  });
  return [...map.values()];
}

function belongsToScope(item) {
  const itemUser = String(item.user_id || item.uid || "");
  const itemTenant = String(item.tenantId || item.tenant_id || "");
  if (itemTenant && scope.tenantId && itemTenant === scope.tenantId) return true;
  if (itemUser && itemUser === scope.uid) return true;
  return false;
}

async function getUserScope(user) {
  const result = { uid: user.uid, tenantId: user.uid, email: user.email || "" };

  const adminQ = query(collection(db, "gcredito_admins"), where("uid", "==", user.uid), limit(1));
  const adminSnap = await getDocs(adminQ);
  if (!adminSnap.empty) {
    const data = adminSnap.docs[0].data();
    result.tenantId = data.tenantId || result.tenantId;
    return result;
  }

  const funcQ = query(collection(db, "gcredito_funcionarios"), where("auth_user_id", "==", user.uid), limit(1));
  const funcSnap = await getDocs(funcQ);
  if (!funcSnap.empty) {
    const data = funcSnap.docs[0].data();
    result.tenantId = data.tenantId || result.tenantId;
    return result;
  }

  return result;
}

function flattenGenerators(list, source) {
  const flat = [];
  list.forEach((item) => {
    const plants = Array.isArray(item.plants) && item.plants.length ? item.plants : [null];
    plants.forEach((plant, plantIndex) => {
      const owner = item.owner || {};
      const distributorLogin = item.distributor_login || item.distributorLogin || {};
      flat.push({
        key: `${source}:${item.id}:${plantIndex}`,
        scopeKey: `${source}:${item.id}`,
        generatorId: item.id,
        source,
        nickname: plant?.apelido || owner.nome || owner.name || `Geradora ${item.id}`,
        uc: String(plant?.uc || distributorLogin.uc || ""),
        raw: item,
      });
    });
  });
  return flat;
}

function resolveGeneratorFeePercent(generator) {
  if (!generator?.raw) return 0;
  const raw = generator.raw;
  const candidates = [
    raw.gestoraPercentual,
    raw.gestora_percentage,
    raw.gestoraFeePercent,
    raw.managementFeePercent,
    raw.management_fee_percent,
    raw.taxaGestaoPercentual,
    raw.taxa_gestao_percentual,
    raw.taxaAdministrativa,
    raw.taxa_administrativa,
    raw.financeiro?.gestoraPercentual,
    raw.financeiro?.taxaGestaoPercentual,
    raw.financeiro?.managementFeePercent,
    raw.financial?.managementFeePercent,
  ];
  return candidates.map((value) => toNumber(value)).find((value) => value > 0) || 0;
}

function resolveUc(item) {
  return item.uc || item.consumer_unit || item.dados_calculados?.dadosExtraidos?.uc || item.dados_calculados?.full_result?.dados_extraidos?.consumer_unit || "-";
}

function resolveDocumento(item) {
  return item.subscriber_documento || item.subscriber_cpf_cnpj || item.documento || item.document || item.cnpj_cpf || item.dados_calculados?.dadosExtraidos?.cpfCnpj || item.dados_calculados?.full_result?.dados_extraidos?.cnpj_cpf || "-";
}

function resolveNome(item) {
  return item.subscriber_name || item.subscriber?.fullName || item.subscriber?.companyName || item.subscriber?.name || item.nome_cliente || item.legal_name || item.nome || item.dados_calculados?.dadosExtraidos?.nome || item.dados_calculados?.full_result?.dados_extraidos?.legal_name || "-";
}

function resolveReferencia(item) {
  return item.referencia || item.month_reference || item.mes_referencia || "-";
}

function resolveVencimento(item) {
  return item.vencimento || item.data_vencimento || item.due_date || item.expiration_date || item?.extraction_result?.dados_extraidos?.expiration_date || item?.dados_calculados?.full_result?.dados_extraidos?.expiration_date || "";
}

function resolvePaymentStatus(item) {
  return String(item.status_pagamento || item.payment_status || "pendente").toLowerCase().trim();
}

function resolvePaymentDate(item) {
  const candidates = [
    item.data_pagamento,
    item.payment_date,
    item.paid_at,
    item.recebido_em,
    item.received_at,
    item.asaas_payment_received_at,
    resolvePaymentStatus(item) === "pago" ? item.updated_at : null,
  ];
  return candidates.map((value) => asDate(value)).find(Boolean) || null;
}

function resolveExtractedData(item) {
  return item?.extraction_result?.dados_extraidos || item?.dados_calculados?.full_result?.dados_extraidos || item?.dados_calculados?.dadosExtraidos || {};
}

function resolveInvoiceTotals(item) {
  const v2 = item?.dados_calculados?.fatura_calculada_v2?.totals || item?.dados_calculados?.full_result?.fatura_calculada_v2?.totals || item?.fatura_calculada_v2?.totals || {};
  const split = item?.dados_calculados?.fatura_calculada?.split || item?.dados_calculados?.full_result?.fatura_calculada?.split || item?.fatura_calculada?.split || {};
  return {
    payable: toNumber(v2.payable ?? split.total_pagar ?? item.invoice_value ?? item.valor_total ?? 0),
    company: toNumber(v2.goldtech ?? split.goldtech_liquido ?? 0),
    economy: toNumber(v2.economy ?? split.economia_real ?? 0),
    repasse: toNumber(split.repasse_encargos ?? 0),
  };
}

function subscriberMatchesInvoice(subscriber, uc, doc) {
  const ucCandidates = [
    normalizeUc(subscriber.uc),
    normalizeUc(subscriber.energy_account?.uc),
    ...(Array.isArray(subscriber.energyAccounts) ? subscriber.energyAccounts.map((account) => normalizeUc(account?.uc)) : []),
  ].filter(Boolean);
  if (uc && ucCandidates.includes(uc)) return true;

  const docCandidates = [
    normalizeDoc(subscriber.cpfCnpj),
    normalizeDoc(subscriber.subscriber?.cpfCnpj),
    normalizeDoc(subscriber.subscriber?.cpf),
    normalizeDoc(subscriber.subscriber?.cnpj),
    normalizeDoc(subscriber.energy_account?.cpfCnpj),
  ].filter(Boolean);
  return !!doc && docCandidates.includes(doc);
}

function escapeHtml(value) {
  return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderError(message) {
  reportTableBody.innerHTML = `<tr><td colspan="14" class="empty-row">${escapeHtml(message)}</td></tr>`;
  kpiCount.textContent = "0";
  kpiPaid.textContent = "R$ 0,00";
  kpiManagement.textContent = "R$ 0,00";
  kpiInvestor.textContent = "R$ 0,00";
  resultsLabel.textContent = "0 itens";
  footerInvestorTotal.textContent = "R$ 0,00";
}

function buildGeneratorIndexes() {
  const byScopeKey = new Map();
  const byUc = new Map();
  generators.forEach((generator) => {
    const scopeList = byScopeKey.get(generator.scopeKey) || [];
    scopeList.push(generator);
    byScopeKey.set(generator.scopeKey, scopeList);

    const uc = normalizeUc(generator.uc);
    if (uc && !byUc.has(uc)) byUc.set(uc, generator);
  });
  return { byScopeKey, byUc };
}

function buildRows() {
  const subscriberById = new Map(subscribers.map((item) => [String(item.id || ""), item]));
  const linksBySubscriberId = new Map();
  activeLinks.forEach((link) => {
    const subscriberId = String(link.subscriber_id || "").trim();
    if (!subscriberId) return;
    const list = linksBySubscriberId.get(subscriberId) || [];
    list.push(link);
    linksBySubscriberId.set(subscriberId, list);
  });

  const generatorIndexes = buildGeneratorIndexes();

  return rawInvoices.map((item) => {
    const totals = resolveInvoiceTotals(item);
    const extracted = resolveExtractedData(item);
    const ucKey = normalizeUc(resolveUc(item));
    const docKey = normalizeDoc(resolveDocumento(item));
    const explicitSubscriberId = String(item.subscriber_id || item.subscriberId || "").trim();
    const subscriber = subscriberById.get(explicitSubscriberId) || subscribers.find((candidate) => subscriberMatchesInvoice(candidate, ucKey, docKey)) || null;

    const invoiceGeneratorUc = normalizeUc(extracted.uc_geradora || item.uc_geradora || item.generator_uc || "");
    let generator = invoiceGeneratorUc ? generatorIndexes.byUc.get(invoiceGeneratorUc) || null : null;

    if (!generator && subscriber) {
      const links = linksBySubscriberId.get(String(subscriber.id || "")) || [];
      const link = links.filter((candidate) => candidate.is_active !== false).sort((a, b) => toNumber(a.priority) - toNumber(b.priority))[0] || null;
      if (link) {
        const key = `${String(link.generator_source || link.source || "gcredito_generators")}:${String(link.generator_id || "")}`;
        const options = generatorIndexes.byScopeKey.get(key) || [];
        generator = (invoiceGeneratorUc ? options.find((candidate) => normalizeUc(candidate.uc) === invoiceGeneratorUc) : null) || options[0] || null;
      }
    }

    const managementRate = resolveGeneratorFeePercent(generator);
    const managementValue = Number((totals.company * (managementRate / 100)).toFixed(2));
    const investorValue = Number(Math.max(0, totals.company - managementValue).toFixed(2));
    const paymentStatus = resolvePaymentStatus(item);
    const paymentDate = resolvePaymentDate(item);
    const paymentValue = paymentStatus === "pago" ? toNumber(item.valor_pago ?? item.paid_amount ?? totals.payable) : 0;
    const discount20Value = Number(Math.max(0, totals.economy - totals.repasse).toFixed(2));
    const injectedEnergy = toNumber(extracted.compensated_energy ?? extracted.generated_energy ?? extracted.energia_compensada ?? 0);
    const reference = String(resolveReferencia(item) || "").toUpperCase();

    return {
      generatorKey: generator?.key || "",
      generatorLabel: generator?.nickname || "Sem geradora vinculada",
      generatorUc: generator?.uc || invoiceGeneratorUc || "-",
      reference,
      year: reference.split("/")[1] || String(asDate(resolveVencimento(item))?.getFullYear() || ""),
      uc: resolveUc(item),
      name: resolveNome(item),
      document: resolveDocumento(item),
      injectedEnergy,
      discount20Value,
      fioBAndTaxesValue: totals.repasse,
      invoicePayableValue: totals.payable,
      paidValue: paymentValue,
      managementValue,
      investorValue,
      dueDate: asDate(resolveVencimento(item)),
      dueDateLabel: formatDate(resolveVencimento(item)),
      paymentDate,
      paymentDateLabel: formatDate(paymentDate),
      searchText: normalizeText([generator?.nickname, generator?.uc, resolveUc(item), resolveNome(item), resolveDocumento(item), reference].join(" ")),
    };
  });
}

function populateFilters(rows) {
  const currentGenerator = generatorFilter.value;
  const currentYear = yearFilter.value;
  const currentReference = referenceFilter.value;

  const generatorOptions = [...new Map(rows.filter((row) => row.generatorKey).map((row) => [row.generatorKey, { key: row.generatorKey, label: `${row.generatorLabel} (${row.generatorUc})` }])).values()]
    .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
  const yearOptions = [...new Set(rows.map((row) => row.year).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
  const referenceOptions = [...new Set(rows.map((row) => row.reference).filter(Boolean))].sort((a, b) => b.localeCompare(a, "pt-BR"));

  generatorFilter.innerHTML = '<option value="">Todas</option>' + generatorOptions.map((item) => `<option value="${escapeHtml(item.key)}">${escapeHtml(item.label)}</option>`).join("");
  yearFilter.innerHTML = '<option value="">Todos</option>' + yearOptions.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");
  referenceFilter.innerHTML = '<option value="">Todas</option>' + referenceOptions.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");

  generatorFilter.value = generatorOptions.some((item) => item.key === currentGenerator) ? currentGenerator : "";
  yearFilter.value = yearOptions.includes(currentYear) ? currentYear : "";
  referenceFilter.value = referenceOptions.includes(currentReference) ? currentReference : "";
}

function renderRows(rows) {
  if (!rows.length) {
    renderError("Nenhuma fatura encontrada com os filtros selecionados.");
    return;
  }

  reportTableBody.innerHTML = rows.map((row) => `
    <tr>
      <td><div class="generator-cell"><span class="generator-name">${escapeHtml(row.generatorLabel)}</span><span class="generator-meta">UC geradora: ${escapeHtml(row.generatorUc)}</span></div></td>
      <td>${escapeHtml(row.uc)}</td>
      <td>${escapeHtml(row.name)}</td>
      <td>${escapeHtml(row.document)}</td>
      <td>${escapeHtml(formatKwh(row.injectedEnergy))}</td>
      <td class="money-positive">${escapeHtml(brl(row.discount20Value))}</td>
      <td>${escapeHtml(brl(row.fioBAndTaxesValue))}</td>
      <td>${escapeHtml(brl(row.invoicePayableValue))}</td>
      <td>${escapeHtml(brl(row.paidValue))}</td>
      <td>${escapeHtml(brl(row.managementValue))}</td>
      <td class="money-positive">${escapeHtml(brl(row.investorValue))}</td>
      <td>${escapeHtml(row.reference || "-")}</td>
      <td>${escapeHtml(row.dueDateLabel)}</td>
      <td class="${row.paymentDate ? "" : "muted-cell"}">${escapeHtml(row.paymentDateLabel)}</td>
    </tr>
  `).join("");

  const totalPaid = rows.reduce((sum, row) => sum + row.paidValue, 0);
  const totalManagement = rows.reduce((sum, row) => sum + row.managementValue, 0);
  const totalInvestor = rows.reduce((sum, row) => sum + row.investorValue, 0);

  kpiCount.textContent = String(rows.length);
  kpiPaid.textContent = brl(totalPaid);
  kpiManagement.textContent = brl(totalManagement);
  kpiInvestor.textContent = brl(totalInvestor);
  resultsLabel.textContent = `${rows.length} ${rows.length === 1 ? "item" : "itens"}`;
  footerInvestorTotal.textContent = brl(totalInvestor);
}

function applyFilters() {
  const allRows = buildRows();
  populateFilters(allRows);

  const generatorKey = generatorFilter.value;
  const year = yearFilter.value;
  const reference = normalizeText(referenceFilter.value);
  const search = normalizeText(searchInput.value);
  const dueStart = dueStartFilter.value || "";
  const dueEnd = dueEndFilter.value || "";
  const paymentStart = paymentStartFilter.value || "";
  const paymentEnd = paymentEndFilter.value || "";

  const filtered = allRows.filter((row) => {
    if (generatorKey && row.generatorKey !== generatorKey) return false;
    if (year && row.year !== year) return false;
    if (reference && normalizeText(row.reference) !== reference) return false;
    if (search && !row.searchText.includes(search)) return false;

    const dueIso = row.dueDate ? toIsoDate(row.dueDate) : "";
    if (dueStart && (!dueIso || dueIso < dueStart)) return false;
    if (dueEnd && (!dueIso || dueIso > dueEnd)) return false;

    const paymentIso = row.paymentDate ? toIsoDate(row.paymentDate) : "";
    if (paymentStart && (!paymentIso || paymentIso < paymentStart)) return false;
    if (paymentEnd && (!paymentIso || paymentIso > paymentEnd)) return false;

    return true;
  });

  renderRows(filtered);
}

async function loadReport() {
  updatedAtLabel.textContent = "Atualizando dados...";
  reportTableBody.innerHTML = '<tr><td colspan="14" class="empty-row">Carregando relatório...</td></tr>';

  const [emitidasSnap, gcreditoGeneratorsSnap, legacyGeneratorsSnap, linksSnap, subscribersSnap] = await Promise.all([
    getDocsFromServer(collection(db, COLL_EMITIDAS)),
    getDocs(collection(db, "gcredito_generators")),
    getDocs(collection(db, "generators")),
    getDocs(collection(db, "generator_subscribers")),
    getDocs(collection(db, COLL_SUBSCRIBERS)),
  ]);

  rawInvoices = dedupeInvoices(
    emitidasSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() })).filter((item) => belongsToScope(item))
  );

  const gcreditoGenerators = gcreditoGeneratorsSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() })).filter((item) => belongsToScope(item));
  const legacyGenerators = legacyGeneratorsSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() })).filter((item) => belongsToScope(item));

  generators = [...flattenGenerators(gcreditoGenerators, "gcredito_generators"), ...flattenGenerators(legacyGenerators, "generators")]
    .sort((a, b) => `${a.nickname} ${a.uc}`.localeCompare(`${b.nickname} ${b.uc}`, "pt-BR"));

  activeLinks = linksSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() })).filter((item) => belongsToScope(item)).filter((item) => item.is_active !== false);
  subscribers = subscribersSnap.docs.map((snap) => ({ id: snap.id, ...snap.data() })).filter((item) => belongsToScope(item));

  updatedAtLabel.textContent = `Atualizado em ${new Date().toLocaleString("pt-BR")}`;
  applyFilters();
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const token = await getIdTokenResult(user, true);
  const role = token.claims.role;
  const isAllowed = token.claims.superadmin === true || role === "superadmin" || !!user.uid;
  if (!isAllowed) {
    window.location.href = "index.html";
    return;
  }

  scope = await getUserScope(user);
  applySidebarState();
  initTheme();

  try {
    await loadReport();
  } catch (error) {
    console.error("Erro ao carregar relatório:", error);
    updatedAtLabel.textContent = "Falha ao atualizar";
    renderError("Falha ao carregar relatório do investidor.");
  }
});
