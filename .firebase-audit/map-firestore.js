const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

const rootDir = path.resolve(__dirname, '..');
const keyPath = path.join(rootDir, 'gcredito-firebase-adminsdk-fbsvc-6aaab7801a.json');

if (!fs.existsSync(keyPath)) {
  console.error('Service account JSON not found:', keyPath);
  process.exit(1);
}

const serviceAccount = require(keyPath);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const SAMPLE_DOCS = 25;
const SUBCOLL_DOC_SAMPLE = 5;
const MAX_DEPTH = 2;

function typeOfValue(v) {
  if (v === null) return 'null';
  if (v instanceof Date) return 'date';
  if (v && typeof v.toDate === 'function') return 'timestamp';
  if (Array.isArray(v)) return 'array';
  if (Buffer.isBuffer(v)) return 'bytes';
  if (v && typeof v === 'object') {
    const cname = v.constructor && v.constructor.name;
    if (cname === 'GeoPoint') return 'geopoint';
    if (cname === 'DocumentReference') return 'reference';
    if (cname === 'FieldValue') return 'fieldvalue';
    return 'map';
  }
  return typeof v;
}

function mergeFieldTypes(target, data, prefix = '') {
  for (const [k, v] of Object.entries(data || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    const t = typeOfValue(v);
    if (!target[key]) target[key] = new Set();
    target[key].add(t);

    if (t === 'map' && v) {
      mergeFieldTypes(target, v, key);
    }

    if (t === 'array' && v.length > 0) {
      const arrTypes = new Set(v.map(typeOfValue));
      for (const at of arrTypes) {
        const arrKey = `${key}[]`;
        if (!target[arrKey]) target[arrKey] = new Set();
        target[arrKey].add(at);
      }
    }
  }
}

async function inspectCollection(colRef, depth = 0) {
  const result = {
    path: colRef.path,
    id: colRef.id,
    depth,
    sampleDocs: 0,
    estimatedCount: null,
    fields: {},
    subcollections: {},
  };

  try {
    const countSnap = await colRef.count().get();
    result.estimatedCount = countSnap.data().count;
  } catch (e) {
    result.estimatedCount = null;
    result.countError = e.message;
  }

  const sampleSnap = await colRef.limit(SAMPLE_DOCS).get();
  result.sampleDocs = sampleSnap.size;

  const fieldTypes = {};
  for (const doc of sampleSnap.docs) {
    mergeFieldTypes(fieldTypes, doc.data());
  }

  for (const [field, types] of Object.entries(fieldTypes)) {
    result.fields[field] = Array.from(types).sort();
  }

  if (depth < MAX_DEPTH && sampleSnap.docs.length > 0) {
    const docSubset = sampleSnap.docs.slice(0, SUBCOLL_DOC_SAMPLE);
    for (const doc of docSubset) {
      const subcols = await doc.ref.listCollections();
      for (const sub of subcols) {
        if (!result.subcollections[sub.id]) {
          result.subcollections[sub.id] = {
            discoveredUnderDoc: doc.id,
            samplePath: sub.path,
          };
        }
      }
    }
  }

  return result;
}

(async () => {
  const out = {
    projectId: serviceAccount.project_id,
    generatedAt: new Date().toISOString(),
    rootCollections: [],
  };

  const roots = await db.listCollections();
  for (const col of roots) {
    const info = await inspectCollection(col, 0);
    out.rootCollections.push(info);
  }

  out.rootCollections.sort((a, b) => (b.estimatedCount ?? 0) - (a.estimatedCount ?? 0));

  const outPath = path.join(__dirname, 'firestore-architecture.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

  console.log('OK');
  console.log(`Project: ${out.projectId}`);
  console.log(`Root collections: ${out.rootCollections.length}`);
  console.log(`Output: ${outPath}`);
})();
