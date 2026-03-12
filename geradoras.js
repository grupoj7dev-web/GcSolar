import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  getIdTokenResult,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
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

const appShell = document.getElementById("appShell");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const logoutBtn = document.getElementById("logoutBtn");
const themeBtn = document.getElementById("themeBtn");

const heroTotalTag = document.getElementById("heroTotalTag");
const heroActiveTag = document.getElementById("heroActiveTag");
const kpiTotal = document.getElementById("kpiTotal");
const kpiTotalMeta = document.getElementById("kpiTotalMeta");
const kpiCapacity = document.getElementById("kpiCapacity");
const kpiMonthly = document.getElementById("kpiMonthly");
const kpiStatus = document.getElementById("kpiStatus");
const listCountText = document.getElementById("listCountText");
const cardsGrid = document.getElementById("cardsGrid");
const searchInput = document.getElementById("searchInput");
const viewCardsBtn = document.getElementById("viewCardsBtn");
const viewTableBtn = document.getElementById("viewTableBtn");
const generatorsCardsView = document.getElementById("generatorsCardsView");
const generatorsTableView = document.getElementById("generatorsTableView");
const generatorsTableBody = document.getElementById("generatorsTableBody");
const exportBtn = document.getElementById("exportBtn");
const validationBar = document.getElementById("validationBar");

const detailModal = document.getElementById("detailModal");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailBody = detailModal?.querySelector(".detail-body");
const deleteGeneratorBtn = document.getElementById("deleteGeneratorBtn");

const collapsedKey = "gcsolar_sidebar_collapsed";
const themeKey = "gcsolar_theme";

let scope = null;
let generatorsList = [];
let selectedForDetail = null;
let currentView = "cards";
let searchTerm = "";

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

function showValidation(message, type = "error") {
  validationBar.textContent = message;
  validationBar.classList.remove("hidden", "error", "success");
  validationBar.classList.add(type);
}

function hideValidation() {
  validationBar.classList.add("hidden");
  validationBar.classList.remove("error", "success");
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function num(value) {
  return toNumber(value).toLocaleString("pt-BR");
}

function oneDecimal(value) {
  return toNumber(value).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function normalizeText(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function statusActive(value) {
  const s = String(value || "").toLowerCase().trim();
  if (!s) return true;
  if (s.includes("inativ")) return false;
  return s.includes("ativ") || s.includes("active") || s === "ok";
}

function belongsToScope(item) {
  const itemUser = String(item.user_id || item.uid || "");
  const itemTenant = String(item.tenantId || item.tenant_id || "");
  if (itemTenant && scope.tenantId && itemTenant === scope.tenantId) return true;
  if (itemUser && itemUser === scope.uid) return true;
  return false;
}

function resolveOwner(item) {
  const owner = item.owner || {};
  return (
    owner.razaoSocial ||
    owner.nomeFantasia ||
    owner.name ||
    owner.nome ||
    item.owner_name ||
    "Geradora sem propriet??rio"
  );
}

function resolveAddress(item, firstPlant) {
  const ownerAddress = item.owner?.address || {};
  const plantAddress = firstPlant?.address || {};
  const city = ownerAddress.cidade || plantAddress.cidade || item.cidade || "-";
  const state = ownerAddress.estado || plantAddress.estado || item.estado || "-";
  return `${city}, ${state}`;
}

function firstFilled(...values) {
  for (const value of values) {
    const normalized = normalizeText(value);
    if (normalized) return normalized;
  }
  return "-";
}

function renderField(label, value) {
  return `
    <article class="detail-field">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(firstFilled(value))}</strong>
    </article>
  `;
}

function renderPlantCard(plant = {}, index = 0) {
  const address = plant.address || {};
  const metrics = [
    ["UC", plant.uc || plant.consumerUnit || plant.unidadeConsumidora || ""],
    ["Usina", plant.nomeUsina || plant.name || `Usina ${index + 1}`],
    ["Status", plant.status || ""],
    ["Titular", plant.titular || plant.holderName || ""],
    ["Concessionária", plant.concessionaria || ""],
    ["Potência", `${oneDecimal(plant.potenciaTotalUsina || plant.potenciaUsina || plant.potenciaTotalInversores || 0)} kWp`],
    ["Geração Projetada", `${num(plant.geracaoProjetada || plant.generationEstimate || 0)} kWh/mês`],
    ["Cidade/UF", [address.cidade || plant.cidade || "", address.estado || plant.estado || ""].filter(Boolean).join(" / ")],
  ];

  return `
    <article class="plant-card">
      <header class="plant-card-header">
        <div>
          <h5>${escapeHtml(firstFilled(plant.nomeUsina, plant.name, `Usina ${index + 1}`))}</h5>
          <p>${escapeHtml(firstFilled(plant.concessionaria, "Sem concessionária"))}</p>
        </div>
        <span class="status-badge ${statusActive(plant.status) ? "" : "inactive"}">${escapeHtml(firstFilled(plant.status, "Ativa"))}</span>
      </header>
      <div class="detail-grid detail-grid-4">
        ${metrics.map(([label, value]) => renderField(label, value)).join("")}
      </div>
    </article>
  `;
}

function sumPlantField(plants, ...fields) {
  return plants.reduce((sum, plant) => {
    const value = fields.reduce((acc, field) => (acc ? acc : toNumber(plant?.[field])), 0);
    return sum + value;
  }, 0);
}

function mapGeneratorDoc(item, source) {
  const plants = Array.isArray(item.plants) && item.plants.length ? item.plants : [];
  const firstPlant = plants[0] || {};

  const usinas = plants.length || 1;
  const capacityKwp = sumPlantField(plants, "potenciaTotalUsina", "potenciaUsina", "potenciaTotalInversores");
  const monthlyKwh = sumPlantField(plants, "geracaoProjetada") || toNumber(item.geracaoProjetada || 0);
  const isActive = statusActive(item.status) || plants.some((p) => statusActive(p.status));

  return {
    key: `${source}:${item.id}`,
    source,
    docId: item.id,
    raw: item,
    ownerName: resolveOwner(item),
    concessionaria: firstPlant.concessionaria || item.concessionaria || "-",
    location: resolveAddress(item, firstPlant),
    isActive,
    usinas,
    capacityKwp,
    monthlyKwh,
    statusLabel: isActive ? "Ativa" : "Inativa",
  };
}

function renderKpis() {
  const total = generatorsList.length;
  const active = generatorsList.filter((x) => x.isActive).length;
  const capacity = generatorsList.reduce((sum, x) => sum + toNumber(x.capacityKwp), 0);
  const monthly = generatorsList.reduce((sum, x) => sum + toNumber(x.monthlyKwh), 0);
  const percentActive = total ? (active / total) * 100 : 0;

  heroTotalTag.textContent = `${total} geradoras`;
  heroActiveTag.textContent = `${active} ativas`;

  kpiTotal.textContent = num(total);
  kpiTotalMeta.textContent = `${num(active)} ativas`;
  kpiCapacity.textContent = `${oneDecimal(capacity)} kWp`;
  kpiMonthly.textContent = `${num(monthly)} kWh/mês`;
  kpiStatus.textContent = `${oneDecimal(percentActive)}%`;
}

function tableTemplate(item) {
  return `
    <tr>
      <td>${item.ownerName}</td>
      <td>${item.concessionaria}</td>
      <td>${item.location}</td>
      <td><span class="status-badge ${item.isActive ? "" : "inactive"}">${item.statusLabel}</span></td>
      <td>${num(item.usinas)}</td>
      <td>${oneDecimal(item.capacityKwp)} kWp</td>
      <td>${num(item.monthlyKwh)} kWh</td>
      <td class="actions-col">
        <div class="table-action-wrap">
          <button class="table-action-btn view" type="button" data-view="${item.key}">
            <i class="ph ph-eye"></i>
            Ver
          </button>
          <a class="table-action-btn edit" href="geradora-wizard.html?id=${item.docId}&source=${item.source}">
            <i class="ph ph-pencil-simple"></i>
            Editar
          </a>
        </div>
      </td>
    </tr>
  `;
}

function filterGenerators() {
  const term = normalizeText(searchTerm).toLowerCase();
  if (!term) return generatorsList;

  return generatorsList.filter((item) => {
    const haystack = [
      item.ownerName,
      item.concessionaria,
      item.location,
      item.statusLabel,
      item.raw?.owner?.document,
      item.raw?.owner?.cpfCnpj,
      item.raw?.owner?.cnpj,
      item.raw?.owner?.cpf,
    ]
      .map((x) => String(x || "").toLowerCase())
      .join(" ");
    return haystack.includes(term);
  });
}

function renderSummary(list) {
  const total = list.length;
  const active = list.filter((x) => x.isActive).length;
  heroTotalTag.textContent = `${total} geradoras`;
  heroActiveTag.textContent = `${active} ativas`;
  listCountText.textContent = `${num(total)} cadastradas`;
}

function generatorCardTemplate(item) {
  return `
    <article class="generator-card card">
      <header class="card-head">
        <div class="head-left">
          <span class="energy-icon"><i class="ph ph-lightning"></i></span>
          <div>
            <h3 class="owner-title">${item.ownerName}</h3>
            <p class="head-sub">${item.concessionaria}<br>${item.location}</p>
          </div>
        </div>
        <span class="status-badge ${item.isActive ? "" : "inactive"}">${item.statusLabel}</span>
      </header>

      <section class="metric-boxes">
        <article class="metric-box blue">
          <span>Quantidade de Usinas</span>
          <strong>${num(item.usinas)}</strong>
        </article>
        <article class="metric-box amber">
          <span>Capacidade</span>
          <strong>${oneDecimal(item.capacityKwp)} kWp</strong>
        </article>
      </section>

      <section class="generation-highlight">
        <span>Gera????o Mensal</span>
        <strong>${num(item.monthlyKwh)} kWh</strong>
      </section>

      <footer class="card-actions">
        <button class="ghost-btn" type="button" data-view="${item.key}">
          <i class="ph ph-eye"></i>
          Ver
        </button>
        <a class="edit-btn" href="geradora-wizard.html?id=${item.docId}&source=${item.source}">
          <i class="ph ph-pencil-simple"></i>
          Editar
        </a>
      </footer>
    </article>
  `;
}

function renderCards(list) {
  if (!list.length) {
    cardsGrid.innerHTML = '<article class="empty-state card">Nenhuma geradora encontrada.</article>';
    return;
  }
  cardsGrid.innerHTML = list.map(generatorCardTemplate).join("");
}

function renderTable(list) {
  if (!list.length) {
    generatorsTableBody.innerHTML = '<tr><td colspan="8" class="empty-row">Nenhuma geradora encontrada.</td></tr>';
    return;
  }
  generatorsTableBody.innerHTML = list.map(tableTemplate).join("");
}

function updateView() {
  const cardsActive = currentView === "cards";
  generatorsCardsView.classList.toggle("hidden", !cardsActive);
  generatorsTableView.classList.toggle("hidden", cardsActive);
  viewCardsBtn.classList.toggle("active", cardsActive);
  viewTableBtn.classList.toggle("active", !cardsActive);
  viewCardsBtn.setAttribute("aria-selected", String(cardsActive));
  viewTableBtn.setAttribute("aria-selected", String(!cardsActive));
}

function renderList() {
  const filtered = filterGenerators();
  renderSummary(filtered);
  renderCards(filtered);
  renderTable(filtered);
  updateView();
}

function openDetailModal(item) {
  selectedForDetail = item;
  const raw = item.raw || {};
  const owner = raw.owner || {};
  const ownerAddress = owner.address || {};
  const payment = raw.paymentData || raw.payment_data || {};
  const distributorLogin = raw.distributor_login || raw.distributorLogin || {};
  const plants = Array.isArray(raw.plants) ? raw.plants : [];

  detailTitle.textContent = item.ownerName;
  detailSubtitle.textContent = `${item.concessionaria} • ${item.location} • ${item.statusLabel}`;

  if (detailBody) {
    detailBody.innerHTML = `
      <section class="generator-hero-panel">
        <article class="generator-hero-card">
          <span>Usinas</span>
          <strong>${num(item.usinas)}</strong>
        </article>
        <article class="generator-hero-card">
          <span>Capacidade</span>
          <strong>${oneDecimal(item.capacityKwp)} kWp</strong>
        </article>
        <article class="generator-hero-card">
          <span>Geração Mensal</span>
          <strong>${num(item.monthlyKwh)} kWh</strong>
        </article>
        <article class="generator-hero-card">
          <span>Status</span>
          <strong>${escapeHtml(item.statusLabel)}</strong>
        </article>
      </section>

      <section class="detail-section">
        <div class="section-heading">
          <h4>Proprietário e Cadastro</h4>
          <p>Dados principais do titular e configuração de acesso.</p>
        </div>
        <div class="detail-grid detail-grid-3">
          ${renderField("ID", raw.id || item.docId)}
          ${renderField("Titular", item.ownerName)}
          ${renderField("Documento", owner.document || owner.cpfCnpj || owner.cnpj || owner.cpf)}
          ${renderField("Nome fantasia", owner.nomeFantasia || owner.fantasia)}
          ${renderField("E-mail", owner.email)}
          ${renderField("Telefone", owner.telefone || owner.phone)}
          ${renderField("Concessionária", item.concessionaria)}
          ${renderField("Status geral", raw.status || item.statusLabel)}
          ${renderField("Login distribuidora", distributorLogin.username || distributorLogin.user || distributorLogin.login)}
        </div>
      </section>

      <section class="detail-section">
        <div class="section-heading">
          <h4>Usinas Vinculadas</h4>
          <p>Informações operacionais e técnicas das unidades geradoras.</p>
        </div>
        <div class="plants-stack">
          ${plants.length ? plants.map(renderPlantCard).join("") : `<article class="empty-detail">Nenhuma usina vinculada encontrada.</article>`}
        </div>
      </section>

      <section class="detail-section">
        <div class="section-heading">
          <h4>Endereço, Recebimento e Banco</h4>
          <p>Dados financeiros e endereço usado no cadastro.</p>
        </div>
        <div class="detail-grid detail-grid-3">
          ${renderField("CEP", ownerAddress.cep)}
          ${renderField("Logradouro", ownerAddress.logradouro || ownerAddress.street)}
          ${renderField("Número", ownerAddress.numero || ownerAddress.number)}
          ${renderField("Bairro", ownerAddress.bairro || ownerAddress.district)}
          ${renderField("Cidade", ownerAddress.cidade || raw.cidade)}
          ${renderField("UF", ownerAddress.estado || raw.estado)}
          ${renderField("Recebedor", payment.recebedor || payment.receiverName || payment.nomeRecebedor)}
          ${renderField("Banco", payment.banco || payment.bank)}
          ${renderField("Agência/Conta", [payment.agencia || payment.branch, payment.conta || payment.account].filter(Boolean).join(" / "))}
          ${renderField("Chave PIX", payment.pix || payment.pixKey || payment.chavePix)}
          ${renderField("Favorecido", payment.favorecido || payment.beneficiary)}
          ${renderField("Documento recebedor", payment.documento || payment.cpfCnpj)}
        </div>
      </section>
    `;
  }

  detailModal.classList.remove("hidden");
}

function closeDetailModal() {
  detailModal.classList.add("hidden");
  selectedForDetail = null;
}

function exportCsv() {
  if (!generatorsList.length) {
    showValidation("Sem geradoras para exportar.", "error");
    return;
  }

  const header = ["Proprietario", "Concessionária", "Localizacao", "Status", "Usinas", "Capacidade_kWp", "Geração_kWh_mes"];
  const rows = generatorsList.map((x) => [
    x.ownerName,
    x.concessionaria,
    x.location,
    x.statusLabel,
    x.usinas,
    x.capacityKwp,
    x.monthlyKwh,
  ]);
  const csv = [header, ...rows]
    .map((line) => line.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(";"))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `geradoras_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function deleteSelectedGenerator() {
  if (!selectedForDetail) return;
  const confirmed = window.confirm(`Excluir geradora "${selectedForDetail.ownerName}"?`);
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, selectedForDetail.source, selectedForDetail.docId));
    generatorsList = generatorsList.filter((x) => x.key !== selectedForDetail.key);
    renderKpis();
    renderList();
    closeDetailModal();
    showValidation("Geradora exclu??da com sucesso.", "success");
  } catch (error) {
    console.error(error);
    showValidation("Falha ao excluir geradora.", "error");
  }
}

async function getUserScope(user) {
  const result = { uid: user.uid, tenantId: user.uid };

  const adminQ = query(collection(db, "gcredito_admins"), where("uid", "==", user.uid), limit(1));
  const adminSnap = await getDocs(adminQ);
  if (!adminSnap.empty) {
    const d = adminSnap.docs[0].data();
    result.tenantId = d.tenantId || result.tenantId;
    return result;
  }

  const funcQ = query(
    collection(db, "gcredito_funcionarios"),
    where("auth_user_id", "==", user.uid),
    limit(1)
  );
  const funcSnap = await getDocs(funcQ);
  if (!funcSnap.empty) {
    const d = funcSnap.docs[0].data();
    result.tenantId = d.tenantId || result.tenantId;
    return result;
  }
  return result;
}

async function loadGenerators() {
  hideValidation();
  cardsGrid.innerHTML = '<article class="empty-state card">Carregando geradoras...</article>';
  generatorsTableBody.innerHTML = '<tr><td colspan="8" class="empty-row">Carregando geradoras...</td></tr>';

  const [gcreditoSnap, legacySnap] = await Promise.all([
    getDocs(collection(db, "gcredito_generators")),
    getDocs(collection(db, "generators")),
  ]);

  const fromGcredito = gcreditoSnap.docs.map((d) => ({ id: d.id, ...d.data() })).filter(belongsToScope);
  const fromLegacy = legacySnap.docs.map((d) => ({ id: d.id, ...d.data() })).filter(belongsToScope);

  generatorsList = [
    ...fromGcredito.map((item) => mapGeneratorDoc(item, "gcredito_generators")),
    ...fromLegacy.map((item) => mapGeneratorDoc(item, "generators")),
  ].sort((a, b) => `${a.ownerName} ${a.location}`.localeCompare(`${b.ownerName} ${b.location}`, "pt-BR"));

  renderKpis();
  renderList();
}

toggleSidebarBtn.addEventListener("click", () => {
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

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(themeKey, next);
});

cardsGrid.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-view]");
  if (!btn) return;
  const key = btn.dataset.view;
  const found = generatorsList.find((x) => x.key === key);
  if (!found) return;
  openDetailModal(found);
});

generatorsTableBody.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-view]");
  if (!btn) return;
  const key = btn.dataset.view;
  const found = generatorsList.find((x) => x.key === key);
  if (!found) return;
  openDetailModal(found);
});

detailModal.addEventListener("click", (event) => {
  const shouldClose = event.target.closest("[data-close-modal]");
  if (shouldClose) closeDetailModal();
});

exportBtn.addEventListener("click", exportCsv);
deleteGeneratorBtn.addEventListener("click", deleteSelectedGenerator);

searchInput?.addEventListener("input", (event) => {
  searchTerm = event.target.value || "";
  renderList();
});

viewCardsBtn?.addEventListener("click", () => {
  currentView = "cards";
  updateView();
});

viewTableBtn?.addEventListener("click", () => {
  currentView = "table";
  updateView();
});

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
    await loadGenerators();
  } catch (error) {
    console.error("Erro ao carregar geradoras:", error);
    showValidation("Falha ao carregar geradoras.", "error");
  }
});

