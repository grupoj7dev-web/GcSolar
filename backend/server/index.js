import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import multer from 'multer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import PDFExtractor from './services/pdf-extractor.js';
import ModeloIdentificador from './services/modelo-identificador.js';
import GeradorFaturaModelo1 from './services/gerador-fatura-modelo1.js';
import GeradorFaturaModelo2 from './services/gerador-fatura-modelo2.js';
import GeradorFaturaModelo3 from './services/gerador-fatura-modelo3.js';
import GeradorFaturaModelo4 from './services/gerador-fatura-modelo4.js';
import GeradorFaturaModelo5 from './services/gerador-fatura-modelo5.js';
import GeradorFaturaModelo6 from './services/gerador-fatura-modelo6.js';
import StandardizerService from './services/standardizer-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const SETTINGS_FILE = path.join(__dirname, 'settings.json');
const COUNTER_FILE = path.join(__dirname, 'proposal_counter.json');
const UPLOAD_DIR = path.join(__dirname, '.uploads');
const CACHE_FILE = path.join(__dirname, 'extract-cache.json');
const PUBLIC_UPLOADS_DIR = path.join(__dirname, 'public_uploads');
const CONTRACTS_DIR = path.join(PUBLIC_UPLOADS_DIR, 'contracts');
const CONTRACT_SIGNATURES_DIR = path.join(CONTRACTS_DIR, 'signatures');
const CONTRACT_SIGN_LINKS_DIR = path.join(CONTRACTS_DIR, 'links');
const CONTRACT_SIGNED_DIR = path.join(CONTRACTS_DIR, 'signed');
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBAvlI0PCXZYL-Cbot-TUkZzHgXzzMuPRI';
const EVOLUTION_API_URL = (process.env.EVOLUTION_API_URL || 'https://evo.iasolar.io').replace(/\/+$/, '');
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || 'b481614c40b92583c1763f5f07d1cb80';
const ASAAS_BASE_URLS = {
    production: 'https://api.asaas.com/v3',
    sandbox: 'https://sandbox.asaas.com/api/v3',
};
const PUBLIC_BASE_URL = String(process.env.PUBLIC_BASE_URL || 'https://app.gc.solar').replace(/\/+$/, '');
const CONTRACT_SIGN_WHATSAPP_INSTANCE =
    process.env.CONTRACT_SIGN_WHATSAPP_INSTANCE ||
    process.env.EVOLUTION_SIGN_INSTANCE ||
    '';
const CONTRACT_SIGN_CODE_TTL_MINUTES = Number(process.env.CONTRACT_SIGN_CODE_TTL_MINUTES || 10);
const DEV_SIGN_CODE_EXPOSE = ['1', 'true', 'yes', 'on'].includes(String(process.env.DEV_SIGN_CODE_EXPOSE || '').toLowerCase());
const MAX_TEXT_SIZE = 22000;

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());

fs.mkdirSync(UPLOAD_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_UPLOADS_DIR, { recursive: true });
fs.mkdirSync(CONTRACTS_DIR, { recursive: true });
fs.mkdirSync(CONTRACT_SIGNATURES_DIR, { recursive: true });
fs.mkdirSync(CONTRACT_SIGN_LINKS_DIR, { recursive: true });
fs.mkdirSync(CONTRACT_SIGNED_DIR, { recursive: true });

app.use('/uploads', express.static(PUBLIC_UPLOADS_DIR));

const upload = multer({
    dest: UPLOAD_DIR,
    limits: { fileSize: 20 * 1024 * 1024 },
});

const uploadPublic = multer({
    dest: PUBLIC_UPLOADS_DIR,
    limits: { fileSize: 10 * 1024 * 1024 },
});

const normalizeSpaces = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const onlyDigits = (value) => String(value || '').replace(/[^\d]/g, '');
const normalizeInstanceName = (value) =>
    String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 48);
const normalizeWhatsappNumber = (value) => {
    let digits = onlyDigits(value);
    if (!digits) return '';
    if (digits.startsWith('55') && digits.length >= 12) return digits;
    if (digits.length === 10 || digits.length === 11) return `55${digits}`;
    return digits;
};
const maskPhone = (value) => {
    const digits = normalizeWhatsappNumber(value);
    if (digits.length < 4) return '';
    return `***${digits.slice(-4)}`;
};
const hashSignCode = (token, code) =>
    crypto.createHash('sha256').update(`${String(token || '')}:${String(code || '')}`).digest('hex');
const normalizeAsaasEnvironment = (value) => {
    const env = String(value || '').trim().toLowerCase();
    return env === 'sandbox' ? 'sandbox' : 'production';
};
const buildAsaasHeaders = (apiKey) => ({
    accept: 'application/json',
    access_token: apiKey,
    'content-type': 'application/json',
});
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

const formatTariff = (value) => {
    const n = Number(value || 0);
    if (!Number.isFinite(n)) return '0,000000';
    return n.toFixed(6).replace('.', ',');
};

const readCache = async () => {
    try {
        const raw = await fs.promises.readFile(CACHE_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        return {};
    }
};

const writeCache = async (cache) => {
    await fs.promises.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
};

const readAsaasJson = async (response) => {
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message =
            body?.errors?.[0]?.description ||
            body?.message ||
            body?.error ||
            `HTTP ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        error.body = body;
        throw error;
    }
    return body || {};
};

const fetchAsaasPaymentById = async ({ environment, apiKey, paymentId }) => {
    const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
    const response = await fetch(`${baseUrl}/payments/${encodeURIComponent(paymentId)}`, {
        method: 'GET',
        headers: buildAsaasHeaders(apiKey),
    });
    return readAsaasJson(response);
};

const listAsaasPaymentsByExternalReference = async ({ environment, apiKey, externalReference }) => {
    const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
    const url = new URL(`${baseUrl}/payments`);
    url.searchParams.set('externalReference', externalReference);
    url.searchParams.set('limit', '100');
    const response = await fetch(url, {
        method: 'GET',
        headers: buildAsaasHeaders(apiKey),
    });
    const body = await readAsaasJson(response);
    return Array.isArray(body?.data) ? body.data : [];
};

const createAsaasCustomer = async ({ environment, apiKey, customer }) => {
    const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
    const payload = {
        name: normalizeSpaces(customer?.name || 'Cliente GC Solar'),
        cpfCnpj: onlyDigits(customer?.cpfCnpj || ''),
        email: normalizeSpaces(customer?.email || ''),
        phone: onlyDigits(customer?.phone || ''),
        mobilePhone: onlyDigits(customer?.phone || ''),
    };
    const response = await fetch(`${baseUrl}/customers`, {
        method: 'POST',
        headers: buildAsaasHeaders(apiKey),
        body: JSON.stringify(payload),
    });
    return readAsaasJson(response);
};

const createAsaasPayment = async ({ environment, apiKey, payment }) => {
    const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
    const response = await fetch(`${baseUrl}/payments`, {
        method: 'POST',
        headers: buildAsaasHeaders(apiKey),
        body: JSON.stringify(payment),
    });
    return readAsaasJson(response);
};

const getAsaasPixQrCode = async ({ environment, apiKey, paymentId }) => {
    const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
    const response = await fetch(`${baseUrl}/payments/${encodeURIComponent(paymentId)}/pixQrCode`, {
        method: 'GET',
        headers: buildAsaasHeaders(apiKey),
    });
    return readAsaasJson(response);
};

const getAsaasBoletoIdentification = async ({ environment, apiKey, paymentId }) => {
    const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
    const response = await fetch(`${baseUrl}/payments/${encodeURIComponent(paymentId)}/identificationField`, {
        method: 'GET',
        headers: buildAsaasHeaders(apiKey),
    });
    return readAsaasJson(response);
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

const sanitizeFileName = (value) =>
    normalizeSpaces(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9._-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80) || 'contrato';

const formatCpfCnpj = (value) => {
    const digits = onlyDigits(value);
    if (digits.length === 11) return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    if (digits.length === 14) return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return String(value || '').trim();
};

const formatPhone = (value) => {
    const digits = onlyDigits(value);
    if (digits.length === 11) return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (digits.length === 10) return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    return String(value || '').trim();
};

const formatDateBR = (value = new Date()) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
};

const formatNumberBR = (value, fractionDigits = 0) =>
    new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }).format(Number.isFinite(Number(value)) ? Number(value) : 0);

const formatAddressLine = (endereco = {}) => {
    const street = normalizeSpaces(endereco.logradouro || '');
    const number = normalizeSpaces(endereco.numero || 's/n');
    const complement = normalizeSpaces(endereco.complemento || '');
    const district = normalizeSpaces(endereco.bairro || '');
    const city = normalizeSpaces(endereco.cidade || '');
    const state = normalizeSpaces(endereco.estado || '');
    const cep = normalizeSpaces(endereco.cep || '');
    const parts = [
        street ? `${street}, ${number}` : '',
        complement,
        district,
        city && state ? `${city}/${state}` : city || state,
        cep ? `CEP: ${cep}` : '',
    ].filter(Boolean);
    return parts.join(', ');
};

const formatLongDateBR = (value = new Date()) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

const normalizePdfText = (value) =>
    String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\x20-\x7E]/g, ' ');

const buildPublicUrl = (req, relativePath) => {
    const normalized = String(relativePath || '').replace(/\\/g, '/').replace(/^\/+/, '');
    const forwardedHost = normalizeSpaces(req.headers['x-forwarded-host'] || '');
    const forwardedProto = normalizeSpaces(req.headers['x-forwarded-proto'] || '');
    const host = forwardedHost || req.get('host') || '';
    const protocol = forwardedProto || req.protocol || 'https';

    if (host && !/^127\.0\.0\.1(?::\d+)?$/i.test(host) && !/^localhost(?::\d+)?$/i.test(host)) {
        return `${protocol}://${host}/${normalized}`;
    }

    if (PUBLIC_BASE_URL) {
        return `${PUBLIC_BASE_URL}/${normalized}`;
    }

    return `http://127.0.0.1:${PORT}/${normalized}`;
};

const decodeDataUrl = (value) => {
    const match = String(value || '').match(/^data:(.+?);base64,(.+)$/);
    if (!match) return null;
    return {
        mimeType: match[1],
        buffer: Buffer.from(match[2], 'base64'),
    };
};

const resolveUploadPathFromUrl = (fileUrl) => {
    const parsed = new URL(String(fileUrl || ''), `http://127.0.0.1:${PORT}`);
    const relativePath = decodeURIComponent(parsed.pathname || '').replace(/^\/+/, '');
    if (!relativePath.startsWith('uploads/')) {
        throw new Error('URL do contrato fora da pasta publica esperada.');
    }
    const targetPath = path.resolve(PUBLIC_UPLOADS_DIR, relativePath.replace(/^uploads\//, ''));
    const allowedRoot = path.resolve(PUBLIC_UPLOADS_DIR);
    if (!targetPath.startsWith(allowedRoot)) {
        throw new Error('Caminho do contrato invalido.');
    }
    return targetPath;
};

const readContractPdfBuffer = async (contractUrl) => {
    try {
        const localPath = resolveUploadPathFromUrl(contractUrl);
        return await fs.promises.readFile(localPath);
    } catch (error) {
        const response = await fetch(String(contractUrl || ''));
        if (!response.ok) {
            throw new Error(`Nao foi possivel abrir o PDF do contrato (${response.status}).`);
        }
        return Buffer.from(await response.arrayBuffer());
    }
};

const createSignedContractPdfBuffer = async ({
    contractUrl,
    signatureBuffer,
    signerName,
    signerDocument,
    signedAt,
    ipAddress,
}) => {
    const originalBuffer = await readContractPdfBuffer(contractUrl);
    const pdfDoc = await PDFDocument.load(originalBuffer);
    const pages = pdfDoc.getPages();
    const basePage = pages[0];
    const signaturePage = pages[pages.length - 1];
    const pageSize = basePage.getSize();
    const pngImage = await pdfDoc.embedPng(signatureBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const inlineScale = Math.min(170 / pngImage.width, 58 / pngImage.height);
    const inlineWidth = pngImage.width * inlineScale;
    const inlineHeight = pngImage.height * inlineScale;
    const proofScale = Math.min(280 / pngImage.width, 120 / pngImage.height);
    const imageWidth = pngImage.width * proofScale;
    const imageHeight = pngImage.height * proofScale;
    const signatureLineX = 132;
    const signatureImageY = 642;
    const signatureMetaY = 665;

    signaturePage.drawImage(pngImage, {
        x: signatureLineX,
        y: signatureImageY,
        width: inlineWidth,
        height: inlineHeight,
        opacity: 0.98,
    });
    signaturePage.drawText(`Assinado em ${formatDateBR(signedAt)}`, {
        x: signatureLineX + inlineWidth + 18,
        y: signatureMetaY + 12,
        size: 8.5,
        font,
        color: rgb(0.22, 0.3, 0.26),
    });
    signaturePage.drawText('Assinatura eletronica validada', {
        x: signatureLineX + inlineWidth + 18,
        y: signatureMetaY,
        size: 8.5,
        font: fontBold,
        color: rgb(0.09, 0.26, 0.15),
    });

    const proofPage = pdfDoc.addPage([pageSize.width, pageSize.height]);
    const margin = 46;
    const cardX = margin;
    const cardY = 160;
    const cardWidth = pageSize.width - margin * 2;
    const cardHeight = pageSize.height - 250;

    proofPage.drawRectangle({
        x: 0,
        y: 0,
        width: pageSize.width,
        height: pageSize.height,
        color: rgb(0.985, 0.993, 0.986),
    });
    proofPage.drawText('Comprovante de assinatura do contrato', {
        x: margin,
        y: pageSize.height - 76,
        size: 22,
        font: fontBold,
        color: rgb(0.09, 0.26, 0.15),
    });
    proofPage.drawText('Este documento integra o contrato original e comprova a assinatura eletronica realizada pelo assinante.', {
        x: margin,
        y: pageSize.height - 102,
        size: 11,
        font,
        color: rgb(0.24, 0.32, 0.28),
        maxWidth: pageSize.width - margin * 2,
    });
    proofPage.drawRectangle({
        x: cardX,
        y: cardY,
        width: cardWidth,
        height: cardHeight,
        color: rgb(1, 1, 1),
        borderColor: rgb(0.13, 0.45, 0.24),
        borderWidth: 1.25,
    });
    proofPage.drawText('Assinatura validada', {
        x: cardX + 26,
        y: cardY + cardHeight - 38,
        size: 16,
        font: fontBold,
        color: rgb(0.09, 0.26, 0.15),
    });
    proofPage.drawImage(pngImage, {
        x: cardX + 24,
        y: cardY + cardHeight - 196,
        width: imageWidth,
        height: imageHeight,
    });
    const metaX = cardX + 24;
    let metaY = cardY + cardHeight - 232;
    [
        `Assinado por: ${normalizeSpaces(signerName || '-')}`,
        `CPF/CNPJ: ${formatCpfCnpj(signerDocument || '-')}`,
        `Data da assinatura: ${formatLongDateBR(signedAt)} às ${new Date(signedAt).toLocaleTimeString('pt-BR')}`,
        `Endereco IP: ${String(ipAddress || '-').slice(0, 48)}`,
        'Status: contrato assinado digitalmente com confirmacao por codigo WhatsApp.',
    ].forEach((line, index) => {
        proofPage.drawText(line, {
            x: metaX,
            y: metaY - index * 24,
            size: 11,
            font: index === 4 ? fontBold : font,
            color: rgb(0.18, 0.24, 0.21),
            maxWidth: cardWidth - 48,
        });
    });
    proofPage.drawText('GC Solar', {
        x: cardX + 24,
        y: cardY + 28,
        size: 12,
        font: fontBold,
        color: rgb(0.09, 0.26, 0.15),
    });
    proofPage.drawText(`Comprovante emitido em ${formatDateBR(signedAt)}.`, {
        x: cardX + 24,
        y: cardY + 12,
        size: 10,
        font,
        color: rgb(0.34, 0.42, 0.38),
    });

    return Buffer.from(await pdfDoc.save());
};

const buildContractParagraphs = (payload = {}) => {
    const nome = normalizePdfText(normalizeSpaces(payload.nome || payload.razaoSocial || payload.nomeFantasia || 'ASSINANTE'));
    const cpfCnpj = onlyDigits(payload.cpfCnpj || '');
    const email = normalizePdfText(normalizeSpaces(payload.email || ''));
    const telefone = onlyDigits(payload.telefone || '');
    const endereco = normalizePdfText(formatAddressLine(payload.endereco || {}));
    const uc = normalizeSpaces(payload.uc || '');
    const ucTitularidade = payload.contaEnergiaNoNomeDoContratante ? 'ASSINANTE' : normalizePdfText(normalizeSpaces(payload.nomeDonoConta || 'TERCEIRO'));
    const consumo = `${formatNumberBR(payload.consumoMedio || 0)} kWh/mes`;
    const descontoNumero = Number(payload.desconto || 0);
    const desconto = `${formatNumberBR(descontoNumero, descontoNumero % 1 ? 2 : 0)}%`;
    const geracaoCompartilhada = payload.modalidade === 'mudar_titularidade' ? '[ ]' : '[X]';
    const autoconsumoRemoto = payload.modalidade === 'mudar_titularidade' ? '[X]' : '[ ]';
    const dataAssinatura = normalizePdfText(formatLongDateBR(new Date()));
    const documentLabel = cpfCnpj.length > 11 ? 'CNPJ' : 'CPF';
    const assinanteDocRef = normalizePdfText(`${documentLabel}: ${cpfCnpj}`);

    return [
        { kind: 'title', text: 'CONTRATO DE ADESAO AO PROGRAMA DE ENERGIA POR ASSINATURA' },
        { kind: 'paragraph', text: 'Pelo presente instrumento particular, de um lado:' },
        {
            kind: 'paragraph',
            text: 'J7 EMPREENDIMENTOS E CONSULTORIA LTDA, nome fantasia INSTITUTO J7, inscrita no CNPJ sob no 14.375.534/0001-07, com sede na Rua CAETES, SN, QD 28, LT 008, SALA 04, JARDIM ELDORADO, APARECIDA DE GOIANIA/GO, CEP 74.993-040, telefone (62) 3140-7000, doravante denominada "J7", "LOCADORA" e/ou "GESTORA".',
        },
        { kind: 'paragraph', text: 'e, de outro lado:' },
        {
            kind: 'paragraph',
            text: `ASSINANTE/CONSUMIDOR: ${nome}, CPF ${cpfCnpj}, com endereco em ${endereco}, e-mail ${email}, telefone ${telefone}, doravante denominado "ASSINANTE";`,
        },
        { kind: 'paragraph', text: 'tem entre si justo e contratado o que segue:' },
        { kind: 'section', text: '1. QUADRO-RESUMO' },
        { kind: 'paragraph', text: 'Este Quadro-Resumo integra o contrato.' },
        { kind: 'item', text: '1.1. Distribuidora / Area de concessao' },
        { kind: 'paragraph', text: 'Equatorial Goias' },
        { kind: 'item', text: '1.2. Unidade(s) Consumidora(s) (UC) beneficiaria(s)' },
        { kind: 'paragraph', text: `No da UC (Unidade Consumidora): ${uc}` },
        { kind: 'paragraph', text: `Endereco da UC: ${endereco}` },
        { kind: 'paragraph', text: `Titularidade na distribuidora: ${ucTitularidade}` },
        { kind: 'item', text: '1.3. Modalidade do SCEE' },
        { kind: 'paragraph', text: `${geracaoCompartilhada} Geracao Compartilhada (consorcio/cooperativa/associacao civil)` },
        { kind: 'paragraph', text: `${autoconsumoRemoto} Autoconsumo Remoto (mesmo titular em UCs distintas, atendidas pela mesma distribuidora)` },
        { kind: 'paragraph', text: 'Modalidades previstas no Marco Legal da GD e regras correlatas.' },
        { kind: 'item', text: '1.4. kWh Contratado Mensal' },
        { kind: 'paragraph', text: `kWh Contratado Mensal (media): ${consumo}` },
        { kind: 'item', text: '1.5. Desconto do Programa' },
        { kind: 'paragraph', text: `${desconto} sobre o valor correspondente a energia efetivamente compensada vinculada ao Programa (Clausula 7).` },
        { kind: 'item', text: '1.6. Cobranca e Pagamento' },
        { kind: 'paragraph', text: 'Forma: Boleto com QR Code PIX (pagavel por boleto ou PIX)' },
        { kind: 'paragraph', text: 'Vencimento: na mesma data de vencimento da fatura da Equatorial Goias da UC beneficiaria.' },
        { kind: 'item', text: '1.7. Canais de atendimento (SAC/J7)' },
        { kind: 'paragraph', text: 'WhatsApp: (62) 98333-5756 / 3140-7000' },
        { kind: 'paragraph', text: 'E-mail: contato@energialivre.app' },
        { kind: 'section', text: '2. BASE LEGAL E CIENCIA DO MODELO (ENERGIA POR ASSINATURA / SCEE)' },
        { kind: 'item', text: '2.1. As Partes reconhecem que este contrato se baseia no Sistema de Compensacao de Energia Eletrica (SCEE), instituido e disciplinado pela Lei no 14.300/2022, e regulamentacao aplicavel da ANEEL.' },
        { kind: 'item', text: '2.2. A Equatorial Goias permanece responsavel pela distribuicao, medicao, faturamento e lancamento de credito/compensacao, conforme regras regulatorias vigentes.' },
        { kind: 'section', text: '3. DEFINICOES' },
        { kind: 'item', text: '3.1. SCEE: sistema no qual a energia ativa injetada e cedida a titulo de emprestimo gratuito e posteriormente compensada/creditada.' },
        { kind: 'item', text: '3.2. Credito de energia: excedente registrado para uso em ciclos subsequentes, conforme regras.' },
        { kind: 'item', text: '3.3. Energia compensada: energia consumida da rede e compensada pela energia injetada/excedente/creditos, limitada ao montante consumido, conforme conceito regulatorio.' },
        { kind: 'item', text: '3.4. Energia por Assinatura: servico prestado pela J7 de (i) locacao de participacao economica vinculada a usina/equipamentos e (ii) gestao/alocacao de creditos.' },
        { kind: 'section', text: '4. OBJETO' },
        { kind: 'item', text: '4.1. Este contrato tem por objeto:' },
        { kind: 'paragraph', text: 'a) a locacao, pela J7 ao ASSINANTE, do direito de participacao economica/uso de equipamentos/usina(s) de geracao de energia, sem transferencia de propriedade, exclusivamente para fins de viabilizar creditos no SCEE; e' },
        { kind: 'paragraph', text: 'b) a gestao, pela J7, da alocacao, administracao e acompanhamento de creditos do SCEE em favor do ASSINANTE, conforme a modalidade indicada no Quadro-Resumo.' },
        { kind: 'section', text: '5. MODALIDADES OPERACIONAIS' },
        { kind: 'item', text: '5.1. Geracao Compartilhada: quando a participacao ocorrer por consorcio/cooperativa/associacao civil admitida, com alocacao de creditos a(s) UC(s) do ASSINANTE atendida(s) pela mesma distribuidora.' },
        { kind: 'item', text: '5.2. Autoconsumo Remoto: quando a compensacao ocorrer entre UCs do mesmo titular, em local diverso da geracao, atendidas pela mesma distribuidora, conforme regras aplicaveis.' },
        { kind: 'section', text: '6. REFERENCIA DE CONSUMO E AJUSTE DE CREDITOS' },
        { kind: 'item', text: '6.1. kWh Contratado Mensal (referencia). O ASSINANTE informa a J7 sua media de consumo mensal (kWh/mes), indicada no Quadro-Resumo, a qual serve apenas como referencia inicial para dimensionamento do Programa.' },
        { kind: 'item', text: '6.2. Variacao de consumo. O ASSINANTE declara ciencia de que seu consumo pode aumentar ou diminuir ao longo do tempo, e que isso nao impede a continuidade do Programa.' },
        { kind: 'item', text: '6.3. Ajuste inteligente pela J7. A J7 ficara responsavel por ajustar de maneira inteligente a alocacao/destinacao de creditos de energia junto as usinas/geradoras, buscando manter, mes a mes, o abatimento (compensacao) na fatura do ASSINANTE o mais proximo possivel do consumo real, respeitando: a) o consumo efetivo do ASSINANTE no ciclo; b) a disponibilidade de energia/creditos nas estruturas e usinas vinculadas ao Programa; e c) os prazos e regras operacionais do SCEE e da Distribuidora (Equatorial Goias).' },
        { kind: 'item', text: '6.4. Limite do compromisso. O ASSINANTE reconhece que, embora a J7 faca os ajustes para aproximar o abatimento do consumo, a quantidade final de energia compensada podera variar por fatores operacionais e regulatorios (incluindo processamento da Distribuidora e regras do SCEE), nao se caracterizando descumprimento contratual quando a compensacao ficar acima ou abaixo do consumo do mes.' },
        { kind: 'section', text: `7. CONDICOES COMERCIAIS — DESCONTO DE ${desconto}` },
        { kind: 'item', text: `7.1. A J7 assegura ao ASSINANTE ${desconto} de desconto sobre o valor correspondente a energia efetivamente compensada (kWh) na(s) UC(s) do ASSINANTE quando decorrente dos creditos vinculados ao Programa de Energia por Assinatura.` },
        { kind: 'item', text: '7.2. O desconto incide apenas sobre a parcela de consumo compensavel e nao incide sobre itens tipicamente nao compensaveis (ex.: contribuicao de iluminacao publica e outros itens nao abatidos pelo SCEE).' },
        { kind: 'section', text: '8. METODOLOGIA DE COBRANCA (kWh COMPENSADO)' },
        { kind: 'item', text: '8.1. O valor mensal devido pelo ASSINANTE a J7 sera apurado por:' },
        { kind: 'paragraph', text: 'Valor J7: (R$ = Energia Compensada (Injetada) (kWh) x Tarifa da Equatorial Referente ao mes de abatimento (R$/kWh) x 0,85).' },
        { kind: 'item', text: '8.2. Energia Compensada do Programa (kWh): apurada a partir do que a Equatorial Goias efetivamente lancou/compensou na fatura do ciclo.' },
        { kind: 'item', text: '8.3. Tarifa de Referencia (R$/kWh): a tarifa efetiva aplicavel ao consumo compensado na fatura do ciclo (conforme demonstrativos).' },
        { kind: 'item', text: '8.4. Condicao de inicio da cobranca: a J7 somente cobrara apos existir compensacao lancada na fatura.' },
        { kind: 'item', text: '8.5. A J7 emitira boleto com QR PIX, com vencimento na mesma data da fatura da Equatorial Goias.' },
        { kind: 'section', text: '9. REMANEJAMENTO DE USINA/EQUIPAMENTOS' },
        { kind: 'item', text: `9.1. Para garantir continuidade operacional, disponibilidade de lastro e otimizacao de alocacao, a J7 podera, a seu criterio tecnico e operacional, remanejar o ASSINANTE entre usinas/equipamentos/arranjos equivalentes da carteira da J7 (ou estruturas vinculadas), desde que: a) preserve a finalidade do Programa (compensacao via SCEE); b) mantenha a metodologia de cobranca e o desconto de ${desconto}; d) respeite prazos e regras operacionais da Equatorial Goias e do SCEE.` },
        { kind: 'section', text: '10. PRAZOS OPERACIONAIS (ENTRADA)' },
        { kind: 'item', text: '10.1. O ASSINANTE reconhece que inclusao/alteracoes podem levar prazos operacionais (comumente 60 a 90 dias, a depender do ciclo e procedimentos), durante os quais podem ocorrer compensacoes residuais.' },
        { kind: 'item', text: '10.2. Em qualquer hipotese, o ASSINANTE pagara a J7 apenas o que for efetivamente compensado.' },
        { kind: 'section', text: '11. OBRIGACOES DA J7' },
        { kind: 'item', text: '11.1. Operar e manter a usina/equipamentos sob sua responsabilidade tecnica, em nivel necessario a execucao do Programa.' },
        { kind: 'item', text: '11.2. Realizar a gestao operacional/regulatoria necessaria para viabilizar a alocacao de creditos no SCEE, conforme modalidade aplicavel.' },
        { kind: 'item', text: '11.3. Disponibilizar atendimento e demonstrativos de calculo.' },
        { kind: 'section', text: '12. OBRIGACOES DO ASSINANTE' },
        { kind: 'item', text: '12.1. Manter a UC ativa, com cadastro correto e adimplente perante a Equatorial Goias.' },
        { kind: 'item', text: '12.2. Informar alteracoes relevantes (troca de titularidade, encerramento da UC, mudanca de classe, etc.) com antecedencia de no minimo 30 dias.' },
        { kind: 'section', text: '13. PROCURACAO — ANEXO I' },
        { kind: 'item', text: '13.1. O ASSINANTE outorga a J7 (ANEXO I) poderes especificos e limitados a operacionalizacao do SCEE perante a Equatorial Goias e atos correlatos necessarios, vedados atos estranhos ao objeto operacional.' },
        { kind: 'section', text: '14. INADIMPLENCIA, COBRANCA E REGULARIZACAO' },
        { kind: 'item', text: '14.1. Encargos por atraso. Em caso de atraso no pagamento, incidirao multa moratoria de 2%, juros de mora de 1% ao mes, e correcao monetaria pelo IPCA, calculados pro rata die.' },
        { kind: 'item', text: '14.2. Cobranca e negociacao. A J7 podera realizar comunicacoes de cobranca utilizando os canais informados pelo ASSINANTE (e-mail, telefone e WhatsApp).' },
        { kind: 'item', text: '14.3. Marco de 30 dias. Apos 30 dias de atraso, a J7 podera intensificar procedimentos de cobranca extrajudicial.' },
        { kind: 'item', text: '14.4. Marco de 60 dias — rescisao por inadimplencia. Se o atraso ultrapassar 60 dias, a J7 podera considerar este contrato rescindido por inadimplencia, mediante comunicacao.' },
        { kind: 'section', text: '15. LIMITACAO DE RESPONSABILIDADE (SEM "GARANTIA DE ECONOMIA")' },
        { kind: 'item', text: '15.1. A J7 nao garante economia em todos os meses, pois a compensacao depende de faturamento/lancamento pela distribuidora e condicoes operacionais/regulatorias.' },
        { kind: 'item', text: `15.2. Havendo compensacao do Programa, aplica-se o desconto de ${desconto} conforme Clausulas 6 e 7.` },
        { kind: 'section', text: '16. LGPD' },
        { kind: 'item', text: '16.1. As Partes tratarao dados pessoais estritamente para execucao do contrato, gestao do SCEE, atendimento e cobranca, com medidas de seguranca e confidencialidade.' },
        { kind: 'section', text: '17. CANCELAMENTO, PRAZO OPERACIONAL E ENCERRAMENTO' },
        { kind: 'item', text: '17.1. Vigencia. Este Contrato passa a valer na data da assinatura e tem prazo indeterminado.' },
        { kind: 'item', text: '17.2. Como o ASSINANTE pode cancelar. O ASSINANTE pode pedir o cancelamento a qualquer momento, desde que avise a J7 com no minimo 90 dias corridos de antecedencia.' },
        { kind: 'item', text: '17.3. Por que existe o prazo de 90 dias. Para permitir trâmites operacionais junto a Equatorial Goias e permitir a realocacao da alocacao de creditos.' },
        { kind: 'item', text: '17.4. Quando o cancelamento e considerado concluido. Quando a alocacao de creditos deixar de produzir efeitos na(s) UC(s) do ASSINANTE.' },
        { kind: 'item', text: '17.5. Pagamento durante o periodo de encerramento. O ASSINANTE permanece responsavel por pagar valores ja vencidos e creditos de energia efetivamente compensados enquanto o encerramento e processado.' },
        { kind: 'item', text: '17.6. Taxa Administrativa de Encerramento Antecipado. Se nao houver o aviso de 90 dias, sera devida uma Taxa proporcional ao periodo faltante.' },
        { kind: 'section', text: '18. FORO' },
        { kind: 'item', text: '18.1. Elegem as partes o foro da Comarca de Goiania para dirimir toda e qualquer controversia advinda do presente instrumento.' },
        { kind: 'section', text: '19. ASSINATURAS' },
        { kind: 'paragraph', text: `Goiania/GO, ${dataAssinatura}` },
        { kind: 'spacer', text: '' },
        { kind: 'spacer', text: '' },
        { kind: 'signature', text: 'J7 EMPREENDIMENTOS E CONSULTORIA LTDA' },
        { kind: 'paragraph', text: 'CNPJ: 14.375.534/0001-07' },
        { kind: 'spacer', text: '' },
        { kind: 'spacer', text: '' },
        { kind: 'signature', text: `ASSINANTE: ${nome}` },
        { kind: 'paragraph', text: `CPF: ${cpfCnpj}` },
        { kind: 'pagebreak', text: '' },
        { kind: 'title', text: 'ANEXO I - INSTRUMENTO PARTICULAR DE PROCURACAO' },
        {
            kind: 'paragraph',
            text: `OUTORGANTE: ${nome}, inscrito sob ${assinanteDocRef}, residente e domiciliado em ${endereco}.`,
        },
        {
            kind: 'paragraph',
            text: 'OUTORGADA: J7 EMPREENDIMENTOS E CONSULTORIA LTDA, CNPJ 14.375.534/0001-07. O OUTORGANTE concede poderes especificos para representar perante a distribuidora, solicitar ajustes cadastrais e praticar atos estritamente necessarios a operacionalizacao do SCEE vinculada a UC indicada neste contrato.',
        },
        { kind: 'paragraph', text: `UC vinculada: ${uc}.` },
        { kind: 'spacer', text: '' },
        { kind: 'signature', text: `OUTORGANTE: ${nome}` },
        { kind: 'paragraph', text: assinanteDocRef },
        { kind: 'spacer', text: '' },
        { kind: 'signature', text: 'OUTORGADA: J7 EMPREENDIMENTOS E CONSULTORIA LTDA' },
        { kind: 'paragraph', text: 'CNPJ: 14.375.534/0001-07' },
    ].map((block) => ({ ...block, text: normalizePdfText(block.text) }));
};

const drawWrappedText = (page, text, options) => {
    const {
        font,
        size,
        color = rgb(0.17, 0.24, 0.2),
        x,
        y,
        maxWidth,
        lineHeight = size * 1.4,
    } = options;
    const words = normalizePdfText(text).split(/\s+/).filter(Boolean);
    let line = '';
    let cursorY = y;

    for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        const width = font.widthOfTextAtSize(candidate, size);
        if (width <= maxWidth || !line) {
            line = candidate;
            continue;
        }
        page.drawText(line, { x, y: cursorY, size, font, color });
        cursorY -= lineHeight;
        line = word;
    }

    if (line) {
        page.drawText(line, { x, y: cursorY, size, font, color });
        cursorY -= lineHeight;
    }

    return cursorY;
};

const drawContractPageFrame = (page, fonts, meta) => {
    const { regularFont } = fonts;
    const { width } = page.getSize();
    const marginX = 64;

    page.drawText(`Pagina ${meta.pageNumber} de ${meta.pageCount}`, {
        x: width - marginX - 56,
        y: 34,
        size: 9,
        font: regularFont,
        color: rgb(0.45, 0.45, 0.45),
    });
};

const createContractPdfBuffer = async (payload = {}) => {
    const pdfDoc = await PDFDocument.create();
    const regularFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const pageSize = [595.28, 841.89];
    const marginX = 64;
    const topY = 752;
    const bottomY = 72;
    let page = pdfDoc.addPage(pageSize);
    let cursorY = topY;
    const paragraphs = buildContractParagraphs(payload);

    const ensurePage = (requiredHeight = 24) => {
        if (cursorY - requiredHeight >= bottomY) return;
        page = pdfDoc.addPage(pageSize);
        cursorY = topY;
    };

    for (const block of paragraphs) {
        if (block.kind === 'pagebreak') {
            page = pdfDoc.addPage(pageSize);
            cursorY = topY;
            continue;
        }

        if (block.kind === 'spacer') {
            cursorY -= 24;
            continue;
        }

        if (block.kind === 'title') {
            ensurePage(84);
            const maxWidth = page.getSize().width - marginX * 2;
            const titleLines = normalizePdfText(block.text).split(/\s+/).reduce((acc, word) => {
                const current = acc[acc.length - 1] || '';
                const candidate = current ? `${current} ${word}` : word;
                if (!current || boldFont.widthOfTextAtSize(candidate, 14.6) <= maxWidth) {
                    acc[acc.length - 1] = candidate;
                } else {
                    acc.push(word);
                }
                return acc;
            }, ['']);
            titleLines.forEach((line, index) => {
                const textWidth = boldFont.widthOfTextAtSize(line, 14.6);
                page.drawText(line, {
                    x: (page.getSize().width - textWidth) / 2,
                    y: cursorY - index * 20,
                    size: 14.6,
                    font: boldFont,
                    color: rgb(0.05, 0.05, 0.05),
                });
            });
            cursorY -= titleLines.length * 24 + 34;
            continue;
        }

        if (block.kind === 'section') {
            ensurePage(40);
            cursorY = drawWrappedText(page, block.text, {
                font: boldFont,
                size: 12.2,
                x: marginX,
                y: cursorY,
                maxWidth: page.getSize().width - marginX * 2,
                lineHeight: 21,
                color: rgb(0.04, 0.04, 0.04),
            });
            cursorY -= 12;
            continue;
        }

        if (block.kind === 'signature') {
            ensurePage(90);
            page.drawLine({
                start: { x: marginX, y: cursorY + 24 },
                end: { x: page.getSize().width - marginX, y: cursorY + 24 },
                thickness: 1,
                color: rgb(0.78, 0.8, 0.8),
            });
            cursorY = drawWrappedText(page, block.text, {
                font: boldFont,
                size: 11.3,
                x: marginX,
                y: cursorY,
                maxWidth: page.getSize().width - marginX * 2,
                lineHeight: 20,
                color: rgb(0.05, 0.05, 0.05),
            });
            cursorY -= 18;
            continue;
        }

        ensurePage(34);
        cursorY = drawWrappedText(page, block.text, {
            font: block.kind === 'item' ? boldFont : regularFont,
            size: block.kind === 'item' ? 10.9 : 11.3,
            x: marginX,
            y: cursorY,
            maxWidth: page.getSize().width - marginX * 2,
            lineHeight: block.kind === 'item' ? 19 : 21,
            color: rgb(0.08, 0.08, 0.08),
        });
        cursorY -= block.kind === 'item' ? 8 : 10;
    }

    const pages = pdfDoc.getPages();
    pages.forEach((currentPage, index) => {
        drawContractPageFrame(currentPage, { regularFont, boldFont }, {
            nome: normalizeSpaces(payload.nome || payload.razaoSocial || payload.nomeFantasia || 'ASSINANTE'),
            pageNumber: index + 1,
            pageCount: pages.length,
        });
    });

    return Buffer.from(await pdfDoc.save());
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

const evolutionHeaders = () => ({
    apikey: EVOLUTION_API_KEY,
    'Content-Type': 'application/json',
});

const normalizeWhatsappState = (value) => {
    const state = String(value || '').toLowerCase().trim();
    if (state === 'open') return 'open';
    if (state === 'connecting') return 'connecting';
    if (state === 'pending') return 'pending';
    return 'close';
};

const parseEvolutionResponse = async (response) => {
    const text = await response.text();
    let body = {};

    if (text) {
        try {
            body = JSON.parse(text);
        } catch (_) {
            body = { raw: text };
        }
    }

    if (!response.ok) {
        const error =
            body?.response?.message ||
            body?.message ||
            body?.error ||
            `Evolution API returned HTTP ${response.status}`;
        throw new Error(error);
    }

    return body;
};

const evolutionRequest = async (pathname, options = {}) => {
    if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
        throw new Error('Evolution API não configurada.');
    }

    const response = await fetch(`${EVOLUTION_API_URL}${pathname}`, {
        ...options,
        headers: {
            ...evolutionHeaders(),
            ...(options.headers || {}),
        },
    });

    return parseEvolutionResponse(response);
};

const readContractSignSession = async (token) => {
    const safeToken = normalizeSpaces(token);
    if (!safeToken) {
        throw new Error('token obrigatorio.');
    }
    const recordPath = path.join(CONTRACT_SIGN_LINKS_DIR, `${safeToken}.json`);
    const raw = await fs.promises.readFile(recordPath, 'utf8');
    return {
        recordPath,
        session: JSON.parse(raw),
    };
};

const writeContractSignSession = async (recordPath, session) => {
    await fs.promises.writeFile(recordPath, JSON.stringify(session, null, 2), 'utf8');
};

const sendWhatsappText = async (instanceName, phone, text) => {
    const normalizedInstance = normalizeInstanceName(instanceName);
    const normalizedPhone = normalizeWhatsappNumber(phone);
    if (!normalizedInstance) {
        throw new Error('Instancia de envio WhatsApp nao configurada.');
    }
    if (!normalizedPhone) {
        throw new Error('Telefone WhatsApp do assinante nao informado.');
    }

    return evolutionRequest(`/message/sendText/${encodeURIComponent(normalizedInstance)}`, {
        method: 'POST',
        body: JSON.stringify({
            number: normalizedPhone,
            text: String(text || ''),
        }),
    });
};

const sendWhatsappDocument = async (instanceName, phone, {
    fileName = 'documento.pdf',
    caption = '',
    media = '',
    mimeType = 'application/pdf',
} = {}) => {
    const normalizedInstance = normalizeInstanceName(instanceName);
    const normalizedPhone = normalizeWhatsappNumber(phone);
    if (!normalizedInstance) {
        throw new Error('Instancia de envio WhatsApp nao configurada.');
    }
    if (!normalizedPhone) {
        throw new Error('Telefone WhatsApp do destinatario nao informado.');
    }
    if (!String(media || '').trim()) {
        throw new Error('Arquivo PDF da fatura nao informado.');
    }

    return evolutionRequest(`/message/sendMedia/${encodeURIComponent(normalizedInstance)}`, {
        method: 'POST',
        body: JSON.stringify({
            number: normalizedPhone,
            mediatype: 'document',
            mimetype: mimeType,
            fileName: String(fileName || 'fatura.pdf'),
            caption: String(caption || ''),
            media,
        }),
    });
};

const fetchEvolutionInstances = async () => {
    const body = await evolutionRequest('/instance/fetchInstances', { method: 'GET' });
    return Array.isArray(body) ? body : [];
};

const getEvolutionInstance = async (instanceName) => {
    const instances = await fetchEvolutionInstances();
    return instances.find((item) => String(item?.name || '').trim() === String(instanceName || '').trim()) || null;
};

const ensureEvolutionInstance = async (instanceName) => {
    const existing = await getEvolutionInstance(instanceName);
    if (existing) return existing;

    const body = await evolutionRequest('/instance/create', {
        method: 'POST',
        body: JSON.stringify({
            instanceName,
            integration: 'WHATSAPP-BAILEYS',
            qrcode: true,
        }),
    });

    return {
        name: body?.instance?.instanceName || instanceName,
        connectionStatus: body?.instance?.status || 'connecting',
        qrcode: body?.qrcode || null,
        raw: body,
    };
};

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

app.post('/api/whatsapp/ensure-instance', async (req, res) => {
    try {
        const instanceName = String(req.body?.instanceName || '').trim().toLowerCase();
        if (!instanceName) {
            return res.status(400).json({ ok: false, error: 'instanceName é obrigatório.' });
        }

        const instance = await getEvolutionInstance(instanceName);
        return res.json({
            ok: true,
            instanceName,
            instance: {
                connectionStatus: normalizeWhatsappState(
                    instance?.connectionStatus || instance?.status || 'close'
                ),
            },
        });
    } catch (error) {
        console.error('WhatsApp ensure-instance failed:', error);
        return res.status(500).json({ ok: false, error: error.message || 'Falha ao preparar instância.' });
    }
});

app.post('/api/whatsapp/connect', async (req, res) => {
    try {
        const instanceName = String(req.body?.instanceName || '').trim().toLowerCase();
        const forceNewQr = req.body?.forceNewQr !== false;
        if (!instanceName) {
            return res.status(400).json({ ok: false, error: 'instanceName é obrigatório.' });
        }

        const existing = await getEvolutionInstance(instanceName);
        let state = normalizeWhatsappState(existing?.connectionStatus);
        let qr = null;

        if (!existing) {
            const created = await ensureEvolutionInstance(instanceName);
            state = normalizeWhatsappState(created?.connectionStatus || created?.status || 'connecting');
            qr = created?.qrcode?.base64 || null;
        } else if (state !== 'open') {
            if (forceNewQr) {
                try {
                    await evolutionRequest(`/instance/logout/${encodeURIComponent(instanceName)}`, {
                        method: 'DELETE',
                    });
                } catch (error) {
                    if (!/not found|does not exist|404|not connected/i.test(String(error?.message || ''))) {
                        throw error;
                    }
                }
            }

            const body = await evolutionRequest(`/instance/connect/${encodeURIComponent(instanceName)}`, {
                method: 'GET',
            });
            state = normalizeWhatsappState(body?.instance?.status || body?.instance?.state || 'connecting');
            qr = body?.base64 || body?.qrcode?.base64 || null;
        }

        return res.json({
            ok: true,
            instanceName,
            state,
            qr,
        });
    } catch (error) {
        console.error('WhatsApp connect failed:', error);
        return res.status(500).json({ ok: false, error: error.message || 'Falha ao conectar WhatsApp.' });
    }
});

app.get('/api/whatsapp/status/:instanceName', async (req, res) => {
    try {
        const instanceName = String(req.params?.instanceName || '').trim().toLowerCase();
        if (!instanceName) {
            return res.status(400).json({ ok: false, error: 'instanceName é obrigatório.' });
        }

        let state = normalizeWhatsappState((await getEvolutionInstance(instanceName))?.connectionStatus);
        try {
            const body = await evolutionRequest(`/instance/connectionState/${encodeURIComponent(instanceName)}`, {
                method: 'GET',
            });
            const liveState = normalizeWhatsappState(body?.instance?.state);
            if (liveState !== 'close' || state === 'close') {
                state = liveState;
            }
        } catch (error) {
            if (!/not exist|does not exist|404/i.test(String(error?.message || ''))) {
                throw error;
            }
        }

        return res.json({
            ok: true,
            instanceName,
            state,
        });
    } catch (error) {
        console.error('WhatsApp status failed:', error);
        return res.status(500).json({ ok: false, error: error.message || 'Falha ao consultar status.' });
    }
});

app.post('/api/whatsapp/disconnect', async (req, res) => {
    try {
        const instanceName = String(req.body?.instanceName || '').trim().toLowerCase();
        if (!instanceName) {
            return res.status(400).json({ ok: false, error: 'instanceName é obrigatório.' });
        }

        try {
            await evolutionRequest(`/instance/logout/${encodeURIComponent(instanceName)}`, {
                method: 'DELETE',
            });
        } catch (error) {
            if (!/not found|does not exist|404|not connected/i.test(String(error?.message || ''))) {
                throw error;
            }
        }

        return res.json({
            ok: true,
            instanceName,
            state: 'close',
        });
    } catch (error) {
        console.error('WhatsApp disconnect failed:', error);
        return res.status(500).json({ ok: false, error: error.message || 'Falha ao desconectar WhatsApp.' });
    }
});

app.post('/api/whatsapp/send-invoice', async (req, res) => {
    try {
        const phone = normalizeWhatsappNumber(req.body?.phone || '');
        const caption = String(req.body?.caption || '').trim();
        const fileName = normalizeSpaces(req.body?.fileName || 'fatura-energy-pay.pdf');
        const mimeType = normalizeSpaces(req.body?.mimeType || 'application/pdf');
        const senderUserId = normalizeSpaces(req.body?.senderUserId || '');
        const senderInstanceName = normalizeInstanceName(
            req.body?.senderInstanceName || (senderUserId ? `gcsolar-${senderUserId}` : '')
        );
        const pdfDataUrl = String(req.body?.pdfDataUrl || '').trim();

        if (!senderInstanceName) {
            return res.status(400).json({ ok: false, error: 'Instancia de envio WhatsApp nao configurada.' });
        }
        if (!phone) {
            return res.status(400).json({ ok: false, error: 'Telefone WhatsApp do cliente nao informado.' });
        }
        if (!pdfDataUrl.startsWith('data:application/pdf;base64,')) {
            return res.status(400).json({ ok: false, error: 'PDF da fatura invalido.' });
        }

        await sendWhatsappDocument(senderInstanceName, phone, {
            fileName,
            caption,
            mimeType,
            media: pdfDataUrl,
        });

        return res.json({
            ok: true,
            instanceName: senderInstanceName,
            sentTo: maskPhone(phone),
        });
    } catch (error) {
        console.error('WhatsApp invoice send failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao enviar fatura por WhatsApp.',
        });
    }
});

app.post('/api/contracts/generate', async (req, res) => {
    try {
        const payload = req.body?.subscriber || {};
        const documentNumber = onlyDigits(payload.cpfCnpj || payload.cpf || payload.cnpj || '');
        const uc = onlyDigits(payload.uc || '');
        const holderName = normalizeSpaces(payload.nome || payload.razaoSocial || payload.nomeFantasia || '');

        if (!holderName || !documentNumber || !uc) {
            return res.status(400).json({
                ok: false,
                error: 'Nome, CPF/CNPJ e UC sao obrigatorios para gerar o contrato.',
            });
        }

        const pdfBuffer = await createContractPdfBuffer(payload);
        const stamp = Date.now();
        const fileName = `${sanitizeFileName(holderName)}_${uc}_${stamp}.pdf`;
        const relativePath = path.posix.join('uploads', 'contracts', fileName);
        const targetPath = path.join(CONTRACTS_DIR, fileName);

        await fs.promises.writeFile(targetPath, pdfBuffer);

        return res.json({
            ok: true,
            contract: {
                fileName,
                url: buildPublicUrl(req, relativePath),
                relativeUrl: `/${relativePath}`,
                generatedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error('Contract generation failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao gerar contrato.',
        });
    }
});

app.get('/api/contracts/health', async (req, res) => {
    try {
        const contractsDirExists = fs.existsSync(CONTRACTS_DIR);
        const uploadsDirExists = fs.existsSync(PUBLIC_UPLOADS_DIR);
        const sampleFiles = contractsDirExists
            ? (await fs.promises.readdir(CONTRACTS_DIR)).slice(-10)
            : [];

        return res.json({
            ok: true,
            runtime: {
                cwd: process.cwd(),
                serverDir: __dirname,
                publicUploadsDir: PUBLIC_UPLOADS_DIR,
                contractsDir: CONTRACTS_DIR,
                uploadsDirExists,
                contractsDirExists,
            },
            sampleFiles,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao inspecionar diretorio de contratos.',
        });
    }
});

app.post('/api/contracts/create-sign-link', async (req, res) => {
    try {
        const pendingId = normalizeSpaces(req.body?.pendingId || '');
        const contractUrl = normalizeSpaces(req.body?.contractUrl || '');
        const signerName = normalizeSpaces(req.body?.signerName || '');
        const signerDocument = onlyDigits(req.body?.signerDocument || '');
        const signerPhone = normalizeWhatsappNumber(req.body?.signerPhone || '');
        const senderUserId = normalizeSpaces(req.body?.senderUserId || '');
        const senderInstanceName = normalizeInstanceName(
            req.body?.senderInstanceName || (senderUserId ? `gcsolar-${senderUserId}` : CONTRACT_SIGN_WHATSAPP_INSTANCE)
        );

        if (!pendingId || !contractUrl) {
            return res.status(400).json({
                ok: false,
                error: 'pendingId e contractUrl sao obrigatorios.',
            });
        }

        const token = crypto.randomBytes(9).toString('base64url');
        const recordPath = path.join(CONTRACT_SIGN_LINKS_DIR, `${token}.json`);
        await fs.promises.writeFile(recordPath, JSON.stringify({
            pendingId,
            contractUrl,
            signerName,
            signerDocument,
            signerPhone,
            senderInstanceName,
            createdAt: new Date().toISOString(),
        }, null, 2), 'utf8');

        return res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.error('Create sign link failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao criar link de assinatura.',
        });
    }
});

app.get('/api/contracts/sign-link/:token', async (req, res) => {
    try {
        const token = normalizeSpaces(req.params?.token || '');
        if (!token) {
            return res.status(400).json({ ok: false, error: 'token obrigatorio.' });
        }

        const { session } = await readContractSignSession(token);
        return res.json({ ok: true, session });
    } catch (error) {
        return res.status(404).json({
            ok: false,
            error: 'Link de assinatura nao encontrado.',
        });
    }
});

app.get('/api/contracts/s/:token', async (req, res) => {
    try {
        const token = normalizeSpaces(req.params?.token || '');
        if (!token) {
            return res.status(400).send('Token obrigatorio.');
        }

        await readContractSignSession(token);
        const target = new URL('/assinar-contrato.html', buildPublicUrl(req, '/'));
        target.searchParams.set('t', token);
        return res.redirect(302, target.toString());
    } catch (error) {
        return res.status(404).send('Link de assinatura nao encontrado.');
    }
});

app.get('/api/contracts/sign-link/:token/document', async (req, res) => {
    try {
        const token = normalizeSpaces(req.params?.token || '');
        if (!token) {
            return res.status(400).json({ ok: false, error: 'token obrigatorio.' });
        }

        const { session } = await readContractSignSession(token);
        const contractUrl = normalizeSpaces(session?.contractUrl || '');
        if (!contractUrl) {
            return res.status(404).json({ ok: false, error: 'Contrato nao encontrado para este link.' });
        }

        const buffer = await readContractPdfBuffer(contractUrl);
        const parsed = new URL(contractUrl, buildPublicUrl(req, '/'));
        const fileName = path.basename(decodeURIComponent(parsed.pathname || 'contrato.pdf')) || 'contrato.pdf';

        res.setHeader('content-type', 'application/pdf');
        res.setHeader('content-disposition', `inline; filename="${fileName.replace(/"/g, '')}"`);
        return res.send(buffer);
    } catch (error) {
        return res.status(404).json({
            ok: false,
            error: error.message || 'Nao foi possivel carregar o contrato deste link.',
        });
    }
});

app.post('/api/contracts/request-sign-code', async (req, res) => {
    try {
        const token = normalizeSpaces(req.body?.token || '');
        const { recordPath: sessionRecordPath, session } = await readContractSignSession(token);
        const signerPhone = normalizeWhatsappNumber(session?.signerPhone || req.body?.signerPhone || '');
        const senderUserId = normalizeSpaces(req.body?.senderUserId || '');
        const senderInstanceFromBody = normalizeInstanceName(req.body?.senderInstanceName || '');
        const senderInstanceName = normalizeInstanceName(
            senderInstanceFromBody ||
            session?.senderInstanceName ||
            (senderUserId ? `gcsolar-${senderUserId}` : CONTRACT_SIGN_WHATSAPP_INSTANCE)
        );

        if (!signerPhone) {
            return res.status(400).json({
                ok: false,
                error: 'Nao ha telefone WhatsApp cadastrado para este assinante.',
            });
        }

        if (!session?.signerPhone) {
            session.signerPhone = signerPhone;
        }
        if (!session?.senderInstanceName && senderInstanceName) {
            session.senderInstanceName = senderInstanceName;
        }

        const code = String(Math.floor(100000 + Math.random() * 900000));
        const expiresAt = new Date(Date.now() + CONTRACT_SIGN_CODE_TTL_MINUTES * 60 * 1000).toISOString();
        session.signVerification = {
            codeHash: hashSignCode(token, code),
            requestedAt: new Date().toISOString(),
            expiresAt,
            verifiedAt: null,
            attempts: 0,
            phone: signerPhone,
        };
        await writeContractSignSession(sessionRecordPath, session);

        await sendWhatsappText(
            senderInstanceName,
            signerPhone,
            `GC Solar: seu codigo para assinar o contrato e ${code}. Ele expira em ${CONTRACT_SIGN_CODE_TTL_MINUTES} minutos.`
        );

        if (DEV_SIGN_CODE_EXPOSE) {
            console.log(`[DEV SIGN CODE] token=${token} pendingId=${session?.pendingId || ''} code=${code}`);
        }

        const responseBody = {
            ok: true,
            sentTo: maskPhone(signerPhone),
            expiresAt,
        };
        if (DEV_SIGN_CODE_EXPOSE) {
            responseBody.devCode = code;
        }

        return res.json(responseBody);
    } catch (error) {
        console.error('Request contract sign code failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao enviar codigo de confirmacao por WhatsApp.',
        });
    }
});

app.post('/api/contracts/verify-sign-code', async (req, res) => {
    try {
        const token = normalizeSpaces(req.body?.token || '');
        const code = onlyDigits(req.body?.code || '');
        const { recordPath: sessionRecordPath, session } = await readContractSignSession(token);
        const verification = session?.signVerification || null;

        if (!verification?.codeHash || !verification?.expiresAt) {
            return res.status(400).json({
                ok: false,
                error: 'Solicite um codigo de confirmacao antes de assinar.',
            });
        }

        if (!code || code.length !== 6) {
            return res.status(400).json({
                ok: false,
                error: 'Informe o codigo de 6 digitos recebido no WhatsApp.',
            });
        }

        if (Date.parse(verification.expiresAt) < Date.now()) {
            return res.status(400).json({
                ok: false,
                error: 'O codigo expirou. Solicite um novo codigo.',
            });
        }

        if (hashSignCode(token, code) !== verification.codeHash) {
            verification.attempts = Number(verification.attempts || 0) + 1;
            session.signVerification = verification;
            await writeContractSignSession(sessionRecordPath, session);
            return res.status(400).json({
                ok: false,
                error: 'Codigo invalido.',
            });
        }

        verification.verifiedAt = new Date().toISOString();
        verification.verifiedCodeHash = verification.codeHash;
        delete verification.codeHash;
        session.signVerification = verification;
        await writeContractSignSession(sessionRecordPath, session);

        return res.json({
            ok: true,
            verifiedAt: verification.verifiedAt,
        });
    } catch (error) {
        console.error('Verify contract sign code failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao validar codigo de confirmacao.',
        });
    }
});

app.post('/api/contracts/sign', async (req, res) => {
    try {
        const token = normalizeSpaces(req.body?.token || '');
        const pendingId = normalizeSpaces(req.body?.pendingId || '');
        const signerName = normalizeSpaces(req.body?.signerName || '');
        const signerDocument = onlyDigits(req.body?.signerDocument || '');
        const contractUrl = normalizeSpaces(req.body?.contractUrl || '');
        const signatureMode = normalizeSpaces(req.body?.signatureMode || 'draw') || 'draw';
        const signatureData = decodeDataUrl(req.body?.signatureDataUrl || '');
        const clientContext = req.body?.clientContext || {};
        const { recordPath: sessionRecordPath, session } = await readContractSignSession(token);
        const verification = session?.signVerification || null;

        if (!token || !pendingId || !signerName || !signerDocument || !contractUrl || !signatureData?.buffer?.length) {
            return res.status(400).json({
                ok: false,
                error: 'token, pendingId, signerName, signerDocument, contractUrl e signatureDataUrl sao obrigatorios.',
            });
        }

        if (
            String(session?.pendingId || '') !== pendingId ||
            String(session?.contractUrl || '') !== contractUrl ||
            onlyDigits(session?.signerDocument || '') !== signerDocument
        ) {
            return res.status(400).json({
                ok: false,
                error: 'Os dados da assinatura nao conferem com o link informado.',
            });
        }

        if (!verification?.verifiedAt) {
            return res.status(400).json({
                ok: false,
                error: 'Confirme o codigo recebido no WhatsApp antes de assinar.',
            });
        }

        const stamp = Date.now();
        const baseName = `${sanitizeFileName(signerName)}_${pendingId}_${stamp}`;
        const signatureFileName = `${baseName}.png`;
        const recordFileName = `${baseName}.json`;
        const signaturePath = path.join(CONTRACT_SIGNATURES_DIR, signatureFileName);
        const signatureRecordPath = path.join(CONTRACT_SIGNATURES_DIR, recordFileName);
        const signedContractFileName = `${baseName}_contrato_assinado.pdf`;
        const signedContractPath = path.join(CONTRACT_SIGNED_DIR, signedContractFileName);
        const signedAt = new Date().toISOString();
        const forwardedFor = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
        const ipAddress = forwardedFor || req.socket?.remoteAddress || req.ip || '';
        const userAgent = String(clientContext.userAgent || req.headers['user-agent'] || '');
        const language = String(clientContext.language || '');
        const timeZone = String(clientContext.timeZone || '');
        const platform = String(clientContext.platform || '');
        const location = clientContext.location && typeof clientContext.location === 'object'
            ? {
                latitude: Number(clientContext.location.latitude || 0),
                longitude: Number(clientContext.location.longitude || 0),
                accuracy: Number(clientContext.location.accuracy || 0),
            }
            : null;

        await fs.promises.writeFile(signaturePath, signatureData.buffer);
        const signedPdfBuffer = await createSignedContractPdfBuffer({
            contractUrl,
            signatureBuffer: signatureData.buffer,
            signerName,
            signerDocument,
            signedAt,
            ipAddress,
        });
        await fs.promises.writeFile(signedContractPath, signedPdfBuffer);
        const signedContractUrl = buildPublicUrl(req, path.posix.join('uploads', 'contracts', 'signed', signedContractFileName));
        const recordUrl = buildPublicUrl(req, path.posix.join('uploads', 'contracts', 'signatures', recordFileName));

        const record = {
            pendingId,
            signerName,
            signerDocument,
            contractUrl,
            signedAt,
            signatureMode,
            verificationVerifiedAt: verification.verifiedAt,
            ipAddress,
            userAgent,
            language,
            timeZone,
            platform,
            location,
            signatureImageUrl: buildPublicUrl(req, path.posix.join('uploads', 'contracts', 'signatures', signatureFileName)),
            signedContractUrl,
            recordUrl,
        };
        await fs.promises.writeFile(signatureRecordPath, JSON.stringify(record, null, 2), 'utf8');

        session.signVerification = {
            ...(verification || {}),
            signedAt,
        };
        session.signedContractUrl = signedContractUrl;
        session.signatureImageUrl = record.signatureImageUrl;
        session.signatureRecordUrl = recordUrl;
        await writeContractSignSession(sessionRecordPath, session);

        return res.json({
            ok: true,
            signature: {
                signedAt,
                signatureMode,
                ipAddress,
                userAgent,
                language,
                timeZone,
                platform,
                location,
                signatureImageUrl: record.signatureImageUrl,
                recordUrl,
                signedContractUrl,
            },
        });
    } catch (error) {
        console.error('Contract sign failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao registrar assinatura.',
        });
    }
});

app.post('/api/contracts/signed-status', async (req, res) => {
    try {
        const pendingIds = Array.isArray(req.body?.pendingIds)
            ? req.body.pendingIds.map((value) => normalizeSpaces(value)).filter(Boolean)
            : [];

        if (!pendingIds.length) {
            return res.json({ ok: true, statuses: {} });
        }

        const entries = await fs.promises.readdir(CONTRACT_SIGN_LINKS_DIR, { withFileTypes: true });
        const pendingSet = new Set(pendingIds);
        const statuses = {};

        for (const entry of entries) {
            if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
            const entryPath = path.join(CONTRACT_SIGN_LINKS_DIR, entry.name);
            try {
                const raw = await fs.promises.readFile(entryPath, 'utf8');
                const session = JSON.parse(raw || '{}');
                const pendingId = normalizeSpaces(session?.pendingId || '');
                const signedAt = normalizeSpaces(session?.signVerification?.signedAt || '');
                if (!pendingSet.has(pendingId) || !signedAt) continue;

                const current = statuses[pendingId];
                if (!current || new Date(signedAt).getTime() > new Date(current.signedAt).getTime()) {
                    statuses[pendingId] = {
                        signedAt,
                        signedContractUrl: session?.signedContractUrl || '',
                        signatureImageUrl: session?.signatureImageUrl || '',
                        signatureRecordUrl: session?.signatureRecordUrl || '',
                    };
                }
            } catch {
                continue;
            }
        }

        return res.json({ ok: true, statuses });
    } catch (error) {
        console.error('Contract signed status lookup failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao consultar status de assinatura.',
        });
    }
});

app.post('/api/asaas-test', async (req, res) => {
    try {
        const environment = normalizeAsaasEnvironment(req.body?.environment || 'production');
        const apiKey = normalizeSpaces(req.body?.apiKey || '');

        if (!apiKey) {
            return res.status(400).json({
                ok: false,
                error: 'apiKey obrigatoria.',
            });
        }

        const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
        const response = await fetch(`${baseUrl}/myAccount`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                access_token: apiKey,
                'content-type': 'application/json',
            },
        });

        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
            return res.status(response.status || 500).json({
                ok: false,
                error: body?.errors?.[0]?.description || body?.message || `HTTP ${response.status}`,
            });
        }

        return res.json({
            ok: true,
            environment,
            account: body || {},
        });
    } catch (error) {
        console.error('ASAAS test failed:', error);
        return res.status(500).json({
            ok: false,
            error: error.message || 'Falha ao testar chave ASAAS.',
        });
    }
});

app.post('/api/asaas-create-charges', async (req, res) => {
    try {
        const environment = normalizeAsaasEnvironment(req.body?.environment || 'production');
        const apiKey = normalizeSpaces(req.body?.apiKey || '');
        const customerInput = req.body?.customer || {};
        const invoiceInput = req.body?.invoice || {};

        if (!apiKey) {
            return res.status(400).json({
                ok: false,
                error: 'apiKey obrigatoria.',
            });
        }

        const value = toNumber(invoiceInput?.value);
        const dueDate = normalizeSpaces(invoiceInput?.dueDate || '');
        const description = normalizeSpaces(invoiceInput?.description || '');
        const externalReference = normalizeSpaces(invoiceInput?.externalReference || '');

        if (!value || !dueDate || !externalReference) {
            return res.status(400).json({
                ok: false,
                error: 'invoice.value, invoice.dueDate e invoice.externalReference sao obrigatorios.',
            });
        }

        const customer = await createAsaasCustomer({
            environment,
            apiKey,
            customer: customerInput,
        });

        const commonPaymentPayload = {
            customer: customer?.id,
            value,
            dueDate,
            description,
            externalReference,
        };

        const [pixPayment, boletoPayment] = await Promise.all([
            createAsaasPayment({
                environment,
                apiKey,
                payment: {
                    ...commonPaymentPayload,
                    billingType: 'PIX',
                },
            }),
            createAsaasPayment({
                environment,
                apiKey,
                payment: {
                    ...commonPaymentPayload,
                    billingType: 'BOLETO',
                },
            }),
        ]);

        const [pixQr, boletoMeta] = await Promise.all([
            pixPayment?.id
                ? getAsaasPixQrCode({ environment, apiKey, paymentId: pixPayment.id }).catch(() => ({}))
                : Promise.resolve({}),
            boletoPayment?.id
                ? getAsaasBoletoIdentification({ environment, apiKey, paymentId: boletoPayment.id }).catch(() => ({}))
                : Promise.resolve({}),
        ]);

        return res.json({
            ok: true,
            environment,
            customer: {
                id: customer?.id || '',
                name: customer?.name || customerInput?.name || '',
                cpfCnpj: customer?.cpfCnpj || onlyDigits(customerInput?.cpfCnpj || ''),
            },
            charges: {
                pix: {
                    id: pixPayment?.id || '',
                    status: pixPayment?.status || '',
                    dueDate: pixPayment?.dueDate || dueDate,
                    value: pixPayment?.value ?? value,
                    payload: pixQr?.payload || pixQr?.encodedImage || '',
                    copyPaste: pixQr?.payload || '',
                    expirationDate: pixQr?.expirationDate || '',
                    qrCodeImage: pixQr?.encodedImage
                        ? `data:image/png;base64,${pixQr.encodedImage}`
                        : '',
                },
                boleto: {
                    id: boletoPayment?.id || '',
                    status: boletoPayment?.status || '',
                    dueDate: boletoPayment?.dueDate || dueDate,
                    value: boletoPayment?.value ?? value,
                    identificationField: boletoMeta?.identificationField || '',
                    barCode: boletoMeta?.barCode || '',
                    nossoNumero: boletoMeta?.nossoNumero || '',
                    bankSlipUrl: boletoPayment?.bankSlipUrl || '',
                    invoiceUrl: boletoPayment?.invoiceUrl || '',
                },
            },
        });
    } catch (error) {
        console.error('ASAAS create charges failed:', error);
        return res.status(error?.status || 500).json({
            ok: false,
            error: error.message || 'Falha ao criar cobrancas no ASAAS.',
        });
    }
});

app.post('/api/asaas-payment-status', async (req, res) => {
    try {
        const environment = normalizeAsaasEnvironment(req.body?.environment || 'production');
        const apiKey = normalizeSpaces(req.body?.apiKey || '');
        const paymentId = normalizeSpaces(req.body?.paymentId || '');
        const externalReference = normalizeSpaces(req.body?.externalReference || '');

        if (!apiKey) {
            return res.status(400).json({
                ok: false,
                error: 'apiKey obrigatoria.',
            });
        }

        let payment = null;

        if (paymentId) {
            payment = await fetchAsaasPaymentById({ environment, apiKey, paymentId });
        } else if (externalReference) {
            const matches = await listAsaasPaymentsByExternalReference({ environment, apiKey, externalReference });
            payment = matches[0] || null;
        } else {
            return res.status(400).json({
                ok: false,
                error: 'paymentId ou externalReference obrigatorio.',
            });
        }

        return res.json({
            ok: true,
            payment: payment || null,
        });
    } catch (error) {
        console.error('ASAAS payment status failed:', error);
        return res.status(error?.status || 500).json({
            ok: false,
            error: error.message || 'Falha ao consultar status do pagamento no ASAAS.',
        });
    }
});

app.post('/api/asaas-delete-charges', async (req, res) => {
    try {
        const environment = normalizeAsaasEnvironment(req.body?.environment || 'production');
        const apiKey = normalizeSpaces(req.body?.apiKey || '');
        const pixPaymentId = normalizeSpaces(req.body?.pixPaymentId || '');
        const boletoPaymentId = normalizeSpaces(req.body?.boletoPaymentId || '');
        const externalReference = normalizeSpaces(req.body?.externalReference || '');

        if (!apiKey) {
            return res.status(400).json({
                ok: false,
                error: 'apiKey obrigatoria.',
            });
        }

        const baseUrl = ASAAS_BASE_URLS[environment] || ASAAS_BASE_URLS.production;
        const targets = new Map();

        if (pixPaymentId) targets.set(pixPaymentId, { source: 'pixPaymentId' });
        if (boletoPaymentId) targets.set(boletoPaymentId, { source: 'boletoPaymentId' });

        if (externalReference) {
            const matches = await listAsaasPaymentsByExternalReference({ environment, apiKey, externalReference });
            matches.forEach((item) => {
                const id = normalizeSpaces(item?.id || '');
                if (id) targets.set(id, { source: 'externalReference' });
            });
        }

        if (!targets.size) {
            return res.status(400).json({
                ok: false,
                error: 'Nenhuma cobranca ASAAS informada para exclusao.',
            });
        }

        const deleted = [];
        const failed = [];

        for (const [id, meta] of targets.entries()) {
            try {
                const response = await fetch(`${baseUrl}/payments/${encodeURIComponent(id)}`, {
                    method: 'DELETE',
                    headers: buildAsaasHeaders(apiKey),
                });
                const body = await readAsaasJson(response);
                deleted.push({
                    id,
                    source: meta.source,
                    result: body,
                });
            } catch (error) {
                failed.push({
                    id,
                    source: meta.source,
                    error: error.message || 'Falha ao excluir cobranca.',
                });
            }
        }

        if (failed.length && !deleted.length) {
            return res.status(502).json({
                ok: false,
                error: 'Nenhuma cobranca foi excluida no ASAAS.',
                failed,
            });
        }

        return res.json({
            ok: true,
            deleted,
            failed,
        });
    } catch (error) {
        console.error('ASAAS delete charges failed:', error);
        return res.status(error?.status || 500).json({
            ok: false,
            error: error.message || 'Falha ao excluir cobrancas no ASAAS.',
        });
    }
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

app.post('/api/uploads/doc', uploadPublic.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Missing file' });

    try {
        const safeName = String(file.originalname || 'arquivo')
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9._-]/g, '')
            .slice(0, 120);
        const targetName = `${Date.now()}_${safeName || file.filename}`;
        const targetPath = path.join(PUBLIC_UPLOADS_DIR, targetName);
        await fs.promises.rename(file.path, targetPath);

        return res.json({
            url: `/uploads/${targetName}`,
            path: targetName,
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
            source: 'backend',
        });
    } catch (error) {
        console.error('Upload doc failed:', error);
        return res.status(500).json({ error: 'Upload failed' });
    }
});

app.post('/api/v2/extract', upload.single('invoice'), async (req, res) => {
    const file = req.file;
    if (!file?.path) {
        return res.status(400).json({ error: 'Missing invoice file' });
    }

    let cacheKey = '';
    try {
        const buffer = await fs.promises.readFile(file.path);
        cacheKey = crypto.createHash('sha256').update(buffer).digest('hex');
    } catch (err) {
        return res.status(500).json({ error: 'Failed to read uploaded file' });
    }

    try {
        const cache = await readCache();
        if (cacheKey && cache[cacheKey]) {
            res.set('X-Extract-Cache', 'HIT');
            return res.json(cache[cacheKey]);
        }

        const extracted = await PDFExtractor.extractAll(file.path);
        if (!extracted) {
            return res.status(422).json({ error: 'Invoice extraction failed' });
        }

        const info_fatura = {
            uc: extracted.consumer_unit || '',
            nome: extracted.legal_name || '',
            cpf: extracted.cpf || extracted.cnpj || extracted.cpf_cnpj || '',
            endereco: extracted.address || '',
            valor_total: Number(extracted.invoice_value || 0),
            mes_referencia: extracted.month_reference || '',
            vencimento: extracted.expiration_date || null,
        };

        const tarifas = {
            tarifa_scee: formatTariff(extracted.tarifa_scee),
            tarifa_scee_inj: formatTariff(extracted.tarifa_scee_inj),
            fio_b_rate: formatTariff(extracted.fioB_rate),
            bandeira_1: formatTariff(extracted.bandeira_1),
            bandeira_2: formatTariff(extracted.bandeira_2),
        };

        const modeloInfo = ModeloIdentificador.identificar(extracted);
        let faturaCalculada = null;
        switch (modeloInfo.modelo) {
            case 1:
                faturaCalculada = GeradorFaturaModelo1.calcular(extracted);
                break;
            case 2:
                faturaCalculada = GeradorFaturaModelo2.calcular(extracted);
                break;
            case 3:
                faturaCalculada = GeradorFaturaModelo3.calcular(extracted);
                break;
            case 4:
                faturaCalculada = GeradorFaturaModelo4.calcular(extracted);
                break;
            case 5:
                faturaCalculada = GeradorFaturaModelo5.calcular(extracted);
                break;
            case 6:
                faturaCalculada = await GeradorFaturaModelo6.calcular(extracted);
                break;
            default:
                faturaCalculada = null;
        }

        const responseData = {
            success: true,
            info_fatura,
            dados_extraidos: extracted,
            tarifas,
            modelo: modeloInfo.modelo,
            modelo_identificado: modeloInfo.nome,
            justificativa: modeloInfo.justificativa,
            fatura_calculada: faturaCalculada,
        };
        responseData.fatura_calculada_v2 = StandardizerService.standardize(responseData);
        responseData._cache_version = 'v2.5';
        responseData.cached_at = new Date().toISOString();

        if (cacheKey) {
            cache[cacheKey] = responseData;
            await writeCache(cache);
        }

        res.set('X-Extract-Cache', 'MISS');
        return res.json(responseData);
    } catch (error) {
        console.error('Invoice extraction v2 failed:', error);
        return res.status(500).json({ error: 'Invoice extraction failed' });
    } finally {
        fs.promises.unlink(file.path).catch(() => {});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
