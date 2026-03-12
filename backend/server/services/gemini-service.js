const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBAvlI0PCXZYL-Cbot-TUkZzHgXzzMuPRI';
const MODEL_CANDIDATES = [
  'models/gemini-2.5-pro',
  'models/gemini-2.5-flash',
  'models/gemini-2.0-flash',
  'models/gemini-2.0-flash-lite',
];

class GeminiService {
  static buildPrompt() {
    return `
Extraia dados de uma fatura de energia e retorne SOMENTE JSON válido.
Campos obrigatórios:
{
  "invoice_value": number,
  "consumer_unit": "string",
  "client_name": "string",
  "address": "string",
  "month_reference": "MMM/YYYY ou MM/YYYY",
  "due_date": "DD/MM/YYYY",
  "measured_energy": number,
  "compensated_energy": number,
  "tarifa_cheia_com_impostos": number,
  "tarifa_sem_impostos": number,
  "tarifa_scee_consumo": number,
  "tarifa_scee_inj": number,
  "fio_b_total": number,
  "fio_b_rate": number,
  "iluminacao_publica": number,
  "juros_multa": number,
  "bandeira_1_rate": number,
  "bandeira_2_rate": number,
  "excedente_recebido": number,
  "saldo_pdf": number,
  "is_shared": boolean,
  "taxes": {
    "pis_aliq": number,
    "cofins_aliq": number,
    "icms_aliq": number
  }
}
Regras:
- Não invente dados. Se não encontrar, use 0, "" ou false.
- Valores devem ser numéricos com ponto decimal.
- consumer_unit deve conter apenas dígitos.
    `.trim();
  }

  static async tryModel(modelName, prompt, pdfBuffer) {
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: this.buildPrompt() },
              {
                inlineData: {
                  mimeType: 'application/pdf',
                  data: Buffer.from(pdfBuffer).toString('base64'),
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0,
          topP: 1,
          topK: 1,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`${modelName} failed (${response.status}): ${body.slice(0, 200)}`);
    }

    const payload = await response.json();
    const modelText = payload?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleaned = String(modelText).replace(/```json/gi, '').replace(/```/g, '').trim();
    if (!cleaned) return null;

    try {
      return JSON.parse(cleaned);
    } catch {
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start >= 0 && end > start) {
        return JSON.parse(cleaned.slice(start, end + 1));
      }
      return null;
    }
  }

  static async extractInvoiceData(pdfBuffer) {
    if (!GEMINI_API_KEY) return null;
    if (!pdfBuffer || !pdfBuffer.length) return null;

    const prompt = this.buildPrompt();
    let lastError = null;

    for (const modelName of MODEL_CANDIDATES) {
      try {
        const parsed = await this.tryModel(modelName, prompt, pdfBuffer);
        if (parsed && typeof parsed === 'object') {
          console.log(`[Gemini] Sucesso com: ${modelName}`);
          return parsed;
        }
        throw new Error(`${modelName} returned empty/invalid payload`);
      } catch (error) {
        lastError = error;
        console.warn(`[Gemini] Falha com ${modelName}: ${error.message}`);
      }
    }

    if (lastError) throw lastError;
    return null;
  }
}

export default GeminiService;
