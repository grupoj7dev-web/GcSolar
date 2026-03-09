import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const SETTINGS_FILE = path.join(__dirname, 'settings.json');
const COUNTER_FILE = path.join(__dirname, 'proposal_counter.json');
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBAvlI0PCXZYL-Cbot-TUkZzHgXzzMuPRI';
const MAX_TEXT_SIZE = 22000;

app.use(cors());
app.use(express.json());

const normalizeSpaces = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const onlyDigits = (value) => String(value || '').replace(/[^\d]/g, '');
const toNumber = (value) => {
    const n = Number(String(value || '').replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
};
const normalizeNetwork = (value) => {
    const v = String(value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    if (v.includes('mono')) return 'monofasico';
    if (v.includes('tri')) return 'trifasico';
    if (v.includes('bi')) return 'bifasico';
    return '';
};
const sanitizeClientName = (value) => {
    let name = normalizeSpaces(value);
    if (!name) return '';
    name = name.replace(
        /^(RESIDENCIAL|COMERCIAL|INDUSTRIAL|RURAL|SERVICOS?\s+E\s+OUTRAS\s+ATIVIDADES|PODER\s+PUBLICO)\s+/i,
        ''
    );
    if (/CONVENCIONAL/i.test(name)) {
        name = name.split(/CONVENCIONAL/i).pop();
    }
    name = name
        .replace(/\b(CNPJ|CPF|UC|INSTALACAO|ENDERECO|CEP|FATURA|CONSUMO)\b.*$/i, '')
        .replace(/[|;:_-]{2,}.*/g, '')
        .trim();
    return name.length >= 4 ? name : '';
};

const parseGeminiJson = (text) => {
    if (!text) return null;
    const cleaned = String(text).replace(/```json/gi, '').replace(/```/g, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch (_) {
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start >= 0 && end > start) {
            try {
                return JSON.parse(cleaned.slice(start, end + 1));
            } catch (_) {
                return null;
            }
        }
        return null;
    }
};

const buildGeminiPrompt = (invoiceText, fileName = '') => `
Extraia os campos da fatura de energia em JSON puro.
Retorne SOMENTE JSON com estas chaves:
{
  "clientName": "string",
  "cnpj": "string",
  "installationId": "string",
  "monthlyConsumption": number,
  "currentRate": number,
  "publicLighting": number,
  "distributor": "string",
  "networkType": "monofasico|bifasico|trifasico"
}

Regras:
- Nao inventar dados.
- Se nao encontrar um campo, retorne string vazia (ou 0 para numero).
- installationId deve ser a UC/numero da instalacao correto (somente digitos quando possivel).
- clientName deve ser apenas nome/razao social, sem endereco e sem outros rotulos.
- clientName nao pode incluir classes como "RESIDENCIAL", "CONVENCIONAL", "SERVICOS E OUTRAS ATIVIDADES".
- publicLighting deve ser o valor de CIP/COSIP/Contribuicao de Iluminacao Publica em R$.
- O arquivo original pode ajudar na UC. Nome do arquivo: ${String(fileName || '')}

Texto da fatura:
${String(invoiceText || '').slice(0, MAX_TEXT_SIZE)}
`.trim();

const normalizeExtraction = (raw = {}) => ({
    clientName: sanitizeClientName(raw.clientName || ''),
    cnpj: String(raw.cnpj || '').trim(),
    installationId: onlyDigits(raw.installationId || ''),
    monthlyConsumption: toNumber(raw.monthlyConsumption),
    currentRate: toNumber(raw.currentRate),
    publicLighting: toNumber(raw.publicLighting),
    distributor: normalizeSpaces(raw.distributor || ''),
    networkType: normalizeNetwork(raw.networkType || ''),
});

// Get settings
app.get('/api/settings', (req, res) => {
    fs.readFile(SETTINGS_FILE, 'utf8', (err, data) => {
        if (err) {
            // If file doesn't exist, return defaults
            if (err.code === 'ENOENT') {
                return res.json({});
            }
            return res.status(500).json({ error: 'Failed to read settings' });
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseError) {
            res.status(500).json({ error: 'Failed to parse settings' });
        }
    });
});

// Save settings
app.post('/api/settings', (req, res) => {
    const newSettings = req.body;
    fs.writeFile(SETTINGS_FILE, JSON.stringify(newSettings, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save settings' });
        }
        res.json({ success: true, settings: newSettings });
    });
});

// Get next proposal code
app.get('/api/proposal-code', (req, res) => {
    fs.readFile(COUNTER_FILE, 'utf8', (err, data) => {
        let counter = 1001; // Start from 1001

        if (!err && data) {
            try {
                const parsed = JSON.parse(data);
                counter = parsed.lastCode + 1;
            } catch (parseError) {
                // If parse fails, use default
            }
        }

        // Save the new counter
        fs.writeFile(COUNTER_FILE, JSON.stringify({ lastCode: counter }, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Failed to save counter:', writeErr);
            }
        });

        res.json({ proposalCode: counter.toString() });
    });
});

app.post('/api/extract-invoice', async (req, res) => {
    try {
        const invoiceText = String(req.body?.text || '').trim();
        const fileName = String(req.body?.fileName || '').trim();
        if (!invoiceText) {
            return res.status(400).json({ error: 'Missing required field: text' });
        }

        if (!GEMINI_API_KEY) {
            return res.status(503).json({ error: 'Gemini API key not configured on server' });
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
        const prompt = buildGeminiPrompt(invoiceText, fileName);

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.1,
                    responseMimeType: 'application/json',
                },
            }),
        });

        if (!response.ok) {
            const body = await response.text();
            return res.status(502).json({
                error: 'Gemini request failed',
                status: response.status,
                details: body.slice(0, 400),
            });
        }

        const payload = await response.json();
        const modelText = payload?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const parsed = parseGeminiJson(modelText);

        if (!parsed || typeof parsed !== 'object') {
            return res.status(502).json({ error: 'Gemini returned invalid JSON' });
        }

        const data = normalizeExtraction(parsed);
        return res.json({ data });
    } catch (error) {
        console.error('Invoice extraction failed:', error);
        return res.status(500).json({ error: 'Invoice extraction failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
