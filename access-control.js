import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  getIdTokenResult,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
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

const app = initializeApp(firebaseConfig, "gcsolar-access-control");
const auth = getAuth(app);
const db = getFirestore(app);
const DEBUG_KEY = "gcsolar_debug_auth";

function debugLog(event, payload = {}) {
  try {
    const enabled = localStorage.getItem(DEBUG_KEY) !== "0";
    if (!enabled) return;
    const page = window.location.pathname.split("/").pop() || "";
    const entry = {
      ts: new Date().toISOString(),
      module: "access-control",
      page,
      event,
      ...payload,
    };
    console.log("[GC-AUTH]", entry);
    const raw = sessionStorage.getItem("__gc_auth_trace__") || "[]";
    const arr = JSON.parse(raw);
    arr.push(entry);
    sessionStorage.setItem("__gc_auth_trace__", JSON.stringify(arr.slice(-80)));
  } catch (_) { }
}

const PAGE_PERMISSION_MAP = {
  "dashboard.html": "dashboard",
  "assinantes.html": "assinantes",
  "indicar-assinante.html": "indicarAssinante",
  "cadastrar-rateio.html": "rateio",
  "calcular-desconto.html": "rateio",
  "geradoras.html": "geradoras",
  "geradora-wizard.html": "geradoras",
  "fatura-manual.html": "faturas",
  "faturas-validacao.html": "faturas",
  "faturas-emitidas.html": "faturas",
  "procuracao.html": "procuracao",
  "procuracao-nova.html": "procuracao",
  "whatsapp.html": "whatsapp",
  "parceiros.html": "representantes",
  "asaas-config.html": "asaas",
  "nova-proposta.html": "propostas",
  "proposta-view.html": "propostas",
};

const NAV_PERMISSION_BY_HREF = {
  "dashboard.html": "dashboard",
  "assinantes.html": "assinantes",
  "indicar-assinante.html": "indicarAssinante",
  "cadastrar-rateio.html": "rateio",
  "calcular-desconto.html": "rateio",
  "geradoras.html": "geradoras",
  "fatura-manual.html": "faturas",
  "procuracao.html": "procuracao",
  "faturas-validacao.html": "faturas",
  "faturas-emitidas.html": "faturas",
  "whatsapp.html": "whatsapp",
  "parceiros.html": "representantes",
  "asaas-config.html": "asaas",
};

const DEFAULT_ENTRY_ORDER = [
  "dashboard.html",
  "indicar-assinante.html",
  "assinantes.html",
  "geradoras.html",
  "cadastrar-rateio.html",
  "faturas-validacao.html",
  "procuracao.html",
];

const BLOCKED_STATUSES = new Set(["inativo", "inactive", "bloqueado", "blocked", "suspenso"]);

function normalizeStatus(value) {
  return String(value || "").trim().toLowerCase();
}

function isBlockedStatus(value) {
  const normalized = normalizeStatus(value);
  if (!normalized) return false;
  if (BLOCKED_STATUSES.has(normalized)) return true;
  if (normalized.includes("inativ")) return true;
  if (normalized.includes("bloque")) return true;
  if (normalized.includes("suspens")) return true;
  return false;
}

function getPageName() {
  const file = window.location.pathname.split("/").pop() || "";
  return file.toLowerCase();
}

function safeRedirect(target) {
  if (!target) return;
  if (window.location.pathname.endsWith(target)) return;
  debugLog("redirect", { target });
  window.location.replace(target);
}

async function findAdminByUid(uid) {
  const q = query(collection(db, "gcredito_admins"), where("uid", "==", uid), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

async function findEmployeeByUid(uid) {
  const byUid = query(collection(db, "gcredito_funcionarios"), where("uid", "==", uid), limit(1));
  const byUidSnap = await getDocs(byUid);
  if (!byUidSnap.empty) {
    return { id: byUidSnap.docs[0].id, ...byUidSnap.docs[0].data() };
  }

  const byAuth = query(
    collection(db, "gcredito_funcionarios"),
    where("auth_user_id", "==", uid),
    limit(1)
  );
  const byAuthSnap = await getDocs(byAuth);
  if (byAuthSnap.empty) return null;
  return { id: byAuthSnap.docs[0].id, ...byAuthSnap.docs[0].data() };
}

function canAccessPermission(profile, permissionKey) {
  if (!permissionKey) return true;
  if (!profile) return false;
  if (profile.isSuperAdmin || profile.isAdmin) return true;
  if (profile.isBlocked) return false;
  if (permissionKey === "dashboard") return true;

  const permissions = profile.permissions || {};
  const direct = permissions[permissionKey];
  if (typeof direct === "boolean") return direct;

  if (permissionKey === "indicarAssinante") {
    if (typeof permissions.assinantes === "boolean") return permissions.assinantes;
  }
  if (permissionKey === "representantes") {
    if (typeof permissions.representantes === "boolean") return permissions.representantes;
  }
  if (permissionKey === "propostas") {
    if (typeof permissions.assinantes === "boolean") return permissions.assinantes;
  }

  return false;
}

function findFirstAllowedPage(profile) {
  for (const page of DEFAULT_ENTRY_ORDER) {
    const permission = PAGE_PERMISSION_MAP[page];
    if (canAccessPermission(profile, permission)) return page;
  }
  return "dashboard.html";
}

function applyNavPermissions(profile) {
  const navLinks = Array.from(document.querySelectorAll(".sidebar-nav a.nav-item[href]"));
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const permissionKey = NAV_PERMISSION_BY_HREF[href];
    if (!permissionKey) return;
    const allowed = canAccessPermission(profile, permissionKey);
    if (allowed) return;
    link.style.display = "none";
  });
}

async function buildProfile(user) {
  const token = await getIdTokenResult(user, true);
  const role = token.claims.role;
  const isSuperAdmin = token.claims.superadmin === true || role === "superadmin";
  if (isSuperAdmin) {
    return {
      uid: user.uid,
      isSuperAdmin: true,
      isAdmin: true,
      isBlocked: false,
      permissions: {},
    };
  }

  const admin = await findAdminByUid(user.uid);
  if (admin) {
    return {
      uid: user.uid,
      isSuperAdmin: false,
      isAdmin: true,
      isBlocked: false,
      permissions: {},
      tenantId: admin.tenantId || user.uid,
    };
  }

  const employee = await findEmployeeByUid(user.uid);
  if (!employee) {
    return {
      uid: user.uid,
      isSuperAdmin: false,
      isAdmin: false,
      isBlocked: false,
      permissions: {},
      tenantId: user.uid,
    };
  }

  return {
    uid: user.uid,
    isSuperAdmin: false,
    isAdmin: false,
    isBlocked: isBlockedStatus(employee.status),
    permissions: employee.permissions || {},
    tenantId: employee.tenantId || user.uid,
    employee,
  };
}

onAuthStateChanged(auth, async (user) => {
  const pageName = getPageName();
  const permissionNeeded = PAGE_PERMISSION_MAP[pageName];
  if (!permissionNeeded && !document.querySelector(".sidebar-nav")) return;

  debugLog("auth-state", {
    userPresent: !!user,
    uid: user?.uid || null,
    permissionNeeded,
  });

  if (!user) {
    // Importante: nao redirecionar aqui para evitar loop quando o auth state
    // do app auxiliar ainda nao sincronizou com o app principal.
    debugLog("skip-redirect-no-user", { reason: "aux-app-user-null" });
    return;
  }

  try {
    const profile = await buildProfile(user);
    debugLog("profile", {
      uid: profile.uid,
      isSuperAdmin: profile.isSuperAdmin,
      isAdmin: profile.isAdmin,
      isBlocked: profile.isBlocked,
      tenantId: profile.tenantId || null,
      permissions: profile.permissions || {},
    });
    if (profile.isBlocked) {
      await signOut(auth);
      debugLog("blocked-signout");
      safeRedirect("login.html");
      return;
    }

    applyNavPermissions(profile);

    if (!permissionNeeded) return;
    if (canAccessPermission(profile, permissionNeeded)) return;

    const fallback = findFirstAllowedPage(profile);
    debugLog("permission-denied", { permissionNeeded, fallback });
    safeRedirect(fallback);
  } catch (error) {
    console.error("Falha no controle de acesso:", error);
    debugLog("error", { message: String(error?.message || error) });
    // Evita loop de redirecionamento quando houver erro temporario de leitura
    // (ex.: regra/firestore indisponivel). A pagina original decide o fallback.
    return;
  }
});
