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

function ensureField(map, key) {
  if (!map[key]) {
    map[key] = {
      occurrences: 0,
      nonNullOccurrences: 0,
      nullOccurrences: 0,
      types: new Set(),
    };
  }
  return map[key];
}

function collectFieldsFromData(fieldMap, data, prefix = '') {
  for (const [k, v] of Object.entries(data || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    const t = typeOfValue(v);
    const info = ensureField(fieldMap, key);
    info.occurrences += 1;
    if (t === 'null') info.nullOccurrences += 1;
    else info.nonNullOccurrences += 1;
    info.types.add(t);

    if (t === 'map' && v) {
      collectFieldsFromData(fieldMap, v, key);
    }

    if (t === 'array') {
      const arrKey = `${key}[]`;
      const arrInfo = ensureField(fieldMap, arrKey);
      if (v.length === 0) {
        arrInfo.occurrences += 1;
        arrInfo.types.add('empty');
      } else {
        const seen = new Set();
        for (const item of v) {
          const it = typeOfValue(item);
          if (seen.has(it)) continue;
          seen.add(it);
          arrInfo.occurrences += 1;
          arrInfo.types.add(it);
          if (it === 'null') arrInfo.nullOccurrences += 1;
          else arrInfo.nonNullOccurrences += 1;

          if (it === 'map' && item) {
            collectFieldsFromData(fieldMap, item, `${arrKey}`);
          }
        }
      }
    }
  }
}

function sortFieldEntries(fieldMap) {
  return Object.entries(fieldMap)
    .map(([name, info]) => ({
      name,
      occurrences: info.occurrences,
      nonNullOccurrences: info.nonNullOccurrences,
      nullOccurrences: info.nullOccurrences,
      types: Array.from(info.types).sort(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function safeMd(text) {
  return String(text).replace(/\|/g, '\\|');
}

async function inspectCollection(colRef, visited) {
  const pathKey = colRef.path;
  if (visited.has(pathKey)) return null;
  visited.add(pathKey);

  const result = {
    path: colRef.path,
    id: colRef.id,
    totalDocuments: 0,
    documentIds: [],
    fields: {},
    subcollections: [],
  };

  let docs = [];
  try {
    const snap = await colRef.get();
    docs = snap.docs;
  } catch (e) {
    result.error = e.message;
    return result;
  }

  result.totalDocuments = docs.length;

  for (const doc of docs) {
    result.documentIds.push(doc.id);
    collectFieldsFromData(result.fields, doc.data() || {});
  }

  const subcolMap = new Map();
  for (const doc of docs) {
    const subcols = await doc.ref.listCollections();
    for (const sub of subcols) {
      if (!subcolMap.has(sub.path)) {
        subcolMap.set(sub.path, sub);
      }
    }
  }

  for (const sub of subcolMap.values()) {
    const inspected = await inspectCollection(sub, visited);
    if (inspected) result.subcollections.push(inspected);
  }

  result.subcollections.sort((a, b) => a.path.localeCompare(b.path));
  return result;
}

function flattenCollections(node, acc = []) {
  acc.push(node);
  for (const sub of node.subcollections || []) {
    flattenCollections(sub, acc);
  }
  return acc;
}

function toMarkdown(report) {
  let md = '';
  md += '# Documentacao Completa do Firestore - Projeto gcredito\n\n';
  md += `Gerado em: ${report.generatedAt}\n\n`;
  md += `Project ID: ${report.projectId}\n\n`;
  md += `Total de colecoes mapeadas (incluindo subcolecoes): ${report.totalCollections}\n\n`;
  md += `Total de documentos mapeados: ${report.totalDocuments}\n\n`;

  md += '## Visao Geral das Colecoes\n\n';
  md += '| Caminho da colecao | Documentos | Campos unicos |\n';
  md += '|---|---:|---:|\n';
  for (const c of report.collectionsFlat) {
    md += `| ${safeMd(c.path)} | ${c.totalDocuments} | ${c.fieldsSorted.length} |\n`;
  }
  md += '\n';

  md += '## Estrutura Completa por Colecao\n\n';
  for (const c of report.collectionsFlat) {
    md += `### Colecao: ${c.path}\n\n`;
    md += `- ID da colecao: ${c.id}\n`;
    md += `- Quantidade de documentos: ${c.totalDocuments}\n`;
    md += `- Quantidade de campos unicos: ${c.fieldsSorted.length}\n\n`;

    md += '#### Document IDs\n\n';
    if (!c.documentIds || c.documentIds.length === 0) {
      md += '_Sem documentos._\n\n';
    } else {
      for (const docId of c.documentIds) {
        md += `- ${safeMd(docId)}\n`;
      }
      md += '\n';
    }

    md += '#### Campos (schema observado em 100% dos documentos desta colecao)\n\n';
    if (!c.fieldsSorted || c.fieldsSorted.length === 0) {
      md += '_Nenhum campo encontrado (colecao vazia)._\n\n';
    } else {
      md += '| Campo | Tipos observados | Presenca (docs com campo) | Nao nulo | Nulo |\n';
      md += '|---|---|---:|---:|---:|\n';
      for (const f of c.fieldsSorted) {
        md += `| ${safeMd(f.name)} | ${safeMd(f.types.join(', '))} | ${f.occurrences} | ${f.nonNullOccurrences} | ${f.nullOccurrences} |\n`;
      }
      md += '\n';
    }

    if (c.error) {
      md += `Erro ao ler colecao: ${safeMd(c.error)}\n\n`;
    }
  }

  md += '## Observacoes Tecnicas\n\n';
  md += '- Este documento foi gerado via leitura direta de todos os documentos encontrados no Firestore no momento da execucao.\n';
  md += '- Tipos em Firestore sao inferidos pelos valores efetivamente armazenados.\n';
  md += '- Um mesmo campo pode aparecer com tipos diferentes entre documentos.\n';
  md += '- Campos aninhados sao exibidos em notacao de ponto (ex.: `owner.address.cep`).\n';
  md += '- Arrays sao representados com sufixo `[]` para os tipos dos itens (ex.: `items[]`).\n';

  return md;
}

(async () => {
  const visited = new Set();
  const roots = await db.listCollections();
  const rootResults = [];

  for (const root of roots.sort((a, b) => a.path.localeCompare(b.path))) {
    const info = await inspectCollection(root, visited);
    if (info) rootResults.push(info);
  }

  const flat = [];
  for (const r of rootResults) flattenCollections(r, flat);

  for (const c of flat) {
    c.fieldsSorted = sortFieldEntries(c.fields);
    delete c.fields;
  }

  flat.sort((a, b) => a.path.localeCompare(b.path));

  const report = {
    projectId: serviceAccount.project_id,
    generatedAt: new Date().toISOString(),
    totalCollections: flat.length,
    totalDocuments: flat.reduce((sum, c) => sum + c.totalDocuments, 0),
    rootCollections: rootResults,
    collectionsFlat: flat,
  };

  const jsonOut = path.join(__dirname, 'firestore-full-report.json');
  fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2));

  const mdOut = path.join(rootDir, 'FIRESTORE_BANCO_COMPLETO.md');
  fs.writeFileSync(mdOut, toMarkdown(report), 'utf8');

  console.log('OK');
  console.log(`Collections: ${report.totalCollections}`);
  console.log(`Documents: ${report.totalDocuments}`);
  console.log(`JSON: ${jsonOut}`);
  console.log(`MD: ${mdOut}`);
})();
