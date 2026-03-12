import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import GeminiService from './gemini-service.js';

const toNumber = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const n = Number(String(value).replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();

class PDFExtractor {
  static async extractText(pdfPath) {
    const dataBuffer = await fs.promises.readFile(pdfPath);
    const parser = new PDFParse({ data: dataBuffer });
    const data = await parser.getText();
    await parser.destroy();
    return String(data?.text || '');
  }

  static parseMoney(value) {
    return toNumber(value);
  }

  static formatCpfCnpj(digits) {
    const clean = String(digits || '').replace(/[^\d]/g, '');
    if (clean.length === 11) {
      return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    if (clean.length === 14) {
      return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return '';
  }

  static extractDocument(text) {
    const content = String(text || '');
    if (!content) return { cpf: '', cnpj: '', cpf_cnpj: '' };
    const ucDigits = String(this.extractConsumerUnit(content) || '').replace(/[^\d]/g, '');

    const labeled =
      content.match(/(?:CPF\/CNPJ|CNPJ\/CPF|CPF|CNPJ)\s*[:\-]?\s*([0-9.\-\/]{11,20})/i)?.[1] || '';
    const labelLine = content.match(/(?:CPF\/CNPJ|CNPJ\/CPF|CPF|CNPJ)[^\n]{0,120}/i)?.[0] || '';
    const cpfMasked = content.match(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/)?.[0] || '';
    const cnpjMasked = content.match(/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/)?.[0] || '';
    const cpfSpaced = content.match(/\b\d{3}[.\s]?\d{3}[.\s]?\d{3}[-\s]?\d{2}\b/)?.[0] || '';
    const cnpjSpaced = content.match(/\b\d{2}[.\s]?\d{3}[.\s]?\d{3}[\/\s]?\d{4}[-\s]?\d{2}\b/)?.[0] || '';

    const fromLabelDigits = String(labeled || labelLine).replace(/[^\d]/g, '');
    let cpf = cpfMasked;
    let cnpj = cnpjMasked;

    if (!cpf && fromLabelDigits.length === 11) cpf = this.formatCpfCnpj(fromLabelDigits);
    if (!cnpj && fromLabelDigits.length === 14) cnpj = this.formatCpfCnpj(fromLabelDigits);
    if (!cpf && cpfSpaced) cpf = this.formatCpfCnpj(cpfSpaced.replace(/[^\d]/g, ''));
    if (!cnpj && cnpjSpaced) cnpj = this.formatCpfCnpj(cnpjSpaced.replace(/[^\d]/g, ''));

    if (!cpf && !cnpj) {
      const nearName = content.match(/(?:CPF|CNPJ)[^\n]{0,40}/i)?.[0] || '';
      const nearDigits = nearName.replace(/[^\d]/g, '');
      if (nearDigits.length === 11) cpf = this.formatCpfCnpj(nearDigits);
      if (nearDigits.length === 14) cnpj = this.formatCpfCnpj(nearDigits);
    }

    // Proteção: evita retornar UC como CPF quando OCR bagunça labels.
    const cpfDigits = String(cpf).replace(/[^\d]/g, '');
    if (cpfDigits && ucDigits && cpfDigits === ucDigits) cpf = '';

    return {
      cpf,
      cnpj,
      cpf_cnpj: cpf || cnpj || '',
    };
  }

    static extractConsumerUnit(text) {
    if (!text || text.length < 5) return '00000000';
    const specificLabels = text.match(/(?:CÓDIGO\s+ÚNICO|INSTALAÇÃO|SEU\s+CÓDIGO|UNIDADE\s+CONSUMIDORA)[^\d]{0,20}(\d{8,11})/i);
    if (specificLabels) return specificLabels[1];
    const monthRefMatch = text.match(/[A-Z]{3}\/\d{4}[\r?\n\s]+(\d{8,11})/);
    if (monthRefMatch) return monthRefMatch[1];

    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const match = line.match(/^(\d{8,12})$/);
      if (match) {
        const uc = match[1];
        if (uc.startsWith('202')) continue;
        const prev = (lines[i - 1] || '').toUpperCase();
        const current = line.toUpperCase();
        if (prev.includes('PARCEIRO') || current.includes('PARCEIRO')) continue;
        if (prev.includes('INJEÇÃO') || current.includes('INJEÇÃO')) continue;
        if (prev.includes('GERAÇÃO') || current.includes('GERAÇÃO')) continue;
        if (prev.includes('CNPJ') || current.includes('CPF')) continue;
        return uc;
      }
    }

    const matches = [...text.matchAll(/UC\s+(\d{8,12})/gi)];
    for (const m of matches) {
      const context = text.substring(Math.max(0, m.index - 40), Math.min(text.length, m.index + 40)).toUpperCase();
      if (!context.includes('INJEÇÃO') && !context.includes('GERAÇÃO') && !context.includes('GD')) return m[1];
    }
    return '00000000';
  }

    static extractLegalName(text) {
    if (!text || text.length < 5) return 'Desconhecido';
    let name = 'Desconhecido';

    const cpfMatch = text.match(/([A-Z\s\n]{10,})(?:\s{2,}|[\r\n]+).*?(?:CNPJ\/CPF|CPF\/CNPJ)/i);
    if (cpfMatch) {
      const lines = cpfMatch[1].split('\n').map((l) => l.trim()).filter((l) => l.length > 5);
      name = lines[lines.length - 1] || name;
    }

    if (name === 'Desconhecido' || name.includes('CONVENCIONAL')) {
      const clienteMatch = text.match(/Cliente:\s*([A-Z\s]{5,})(?:\r?\n|CPF:)/i);
      if (clienteMatch) name = clienteMatch[1].trim();
    }

    if (name === 'Desconhecido' || name.includes('CONVENCIONAL')) {
      const lines = text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Classificação:') && lines[i + 1]) {
          const possibleName = lines[i + 1].trim();
          if (possibleName.length > 5 && !possibleName.includes(':')) {
            name = possibleName;
            break;
          }
        }
      }
    }

    name = name
      .replace(/RURAL|CONVENCIONAL|AGROPECUÁRIA|ILUMINAÇÃO/gi, '')
      .replace(/CONSUMO\s+N[ÃA]O\s+COMPENSADO.*$/i, '')
      .replace(/kWh.*$/i, '')
      .trim();

    if (!name || name.length < 4) return 'Desconhecido';
    return name;
  }

  static extractAddress(text) {
    const m1 = text.match(
      /((?:RUA|AV|ALAMEDA|TRAVESSA|ESTRADA|RODOVIA)[\s\S]{6,160}?CEP:\s*\d{5}-?\d{3})/i,
    );
    return m1 ? normalizeText(m1[1]) : null;
  }

  static extractInvoiceValue(text) {
    const patterns = [
      /VALOR\s+A\s+PAGAR\D{0,20}([\d.]+,\d{2})/i,
      /TOTAL\s+DA\s+NOTA\s+FISCAL\D{0,20}([\d.]+,\d{2})/i,
      /PAGO\s+[Ã€A]\s+EQUATORIAL\D{0,20}([\d.]+,\d{2})/i,
      /TOTAL\s+A\s+PAGAR\D{0,20}([\d.]+,\d{2})/i,
      /VALOR\s+TOTAL\D{0,20}([\d.]+,\d{2})/i,
      /R\$\s*([\d.]+,\d{2})\s+Vencimento/i,
    ];
    for (const pattern of patterns) {
      const m = text.match(pattern);
      if (m) {
        const v = this.parseMoney(m[1]);
        if (v > 0) return v;
      }
    }
    return 0;
  }

  static extractMonthReference(text) {
    const mm1 = text.match(/\b(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\/(20\d{2})\b/i);
    if (mm1) return `${mm1[1].toUpperCase()}/${mm1[2]}`;
    const mm2 = text.match(/\b(0?[1-9]|1[0-2])\/(20\d{2})\b/);
    if (mm2) return `${mm2[1].padStart(2, '0')}/${mm2[2]}`;
    return null;
  }

  static extractDueDate(text) {
    const due =
      text.match(/Vencimento\D{0,20}(\d{2}\/\d{2}\/\d{4})/i) ||
      text.match(/Data\s+de\s+Vencimento\D{0,20}(\d{2}\/\d{2}\/\d{4})/i);
    return due ? due[1] : null;
  }

  static extractReadingDates(text) {
    const all = [...text.matchAll(/(\d{2}\/\d{2}\/\d{4})/g)].map((m) => m[1]);
    if (all.length < 2) return { anterior: null, atual: null };
    const parse = (s) => {
      const [d, m, y] = s.split('/').map(Number);
      return new Date(y, (m || 1) - 1, d || 1).getTime();
    };
    const d1 = all[0];
    const d2 = all[1];
    return parse(d1) <= parse(d2)
      ? { anterior: d1, atual: d2 }
      : { anterior: d2, atual: d1 };
  }

    static extractMeasuredEnergy(text) {
    if (!text || text.length < 5) return 0;
    const hasNCLine = text.match(/CONSUMO\s+N[ÃA]O\s+COMPENSADO/i);
    if (!hasNCLine) return 0;

    const ncLineMatch = text.match(/CONSUMO\s+N[ÃA]O\s+COMPENSADO[\s\S]{0,50}?kWh\s*(?:[0-9]+,[0-9]{6})?\s*([0-9]+[.,][0-9]{2})/i);
    if (ncLineMatch) {
      const val = this.parseMoney(ncLineMatch[1]);
      if (val >= 0 && val < 100000) return val;
    }

    const historySegment = text.match(/Consumo\s+faturado\(kWh\)[\s\S]{0,150}?(\d+[.\d,]{1,6})[\s\S]{0,50}?(\d+[.\d,]{1,6})/i);
    if (historySegment) {
      const val = this.parseMoney(historySegment[2]);
      if (val > 10) return val;
    }

    const ativMatch = text.match(/ENERGIA\s+ATIVA.*?kWh\s*(\d{5})\s*(\d{1,5})/i) ||
      text.match(/ENERGIA\s+ATIVA.*?kWh\s*(\d{5})(\d{1,5})/i);
    if (ativMatch) {
      const val = parseFloat(ativMatch[2]);
      if (val > 5 && val < 5000) return val;
    }

    const genericHist = text.match(/Consumo\s+faturado\(kWh\)[^\r\n]*?[\r\n]+(\d+[.\d,]{1,6})/i);
    if (genericHist) return this.parseMoney(genericHist[1]);

    return 0;
  }

    static extractCompensatedEnergy(text) {
    if (!text || text.length < 5) return 0;
    const injMatches = [...text.matchAll(/INJEÇÃO\s+SCEE.*?kWh\s*(?:\d+,\d{4,6})?\s*(\d+[.\d,]*)/gi)];
    let total = injMatches.reduce((sum, match) => {
      const valStr = match[1].replace(/\./g, '').replace(',', '.');
      const value = parseFloat(valStr);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    if (total > 0) return parseFloat(total.toFixed(2));

    const m1 = text.match(/CONSUMO\s+SCEE\s*:\s*([\d.]+,\d{2})\s*kWh/i) || text.match(/CONSUMO\s+SCEE.*?kWh\d+,\d+,\d+,\d+(\d+,\d+)/i);
    if (m1) return this.parseMoney(m1[1]);

    return 0;
  }

    static extractCompensatedEnergyBreakdown(text) {
    const ucMap = new Map();
    const injMatches = [...text.matchAll(/INJEÇÃO\s+SCEE.*?UC\s+(\d+).*?kWh\s*(?:\d+,\d{4,6})?\s*(\d+[.\d,]*)/gi)];

    for (const m of injMatches) {
      const uc = m[1];
      const valStr = m[2].replace(/\./g, '').replace(',', '.');
      const valNum = parseFloat(valStr);
      if (!isNaN(valNum)) ucMap.set(uc, (ucMap.get(uc) || 0) + valNum);
    }

    if (ucMap.size > 0) {
      const parts = [];
      for (const [uc, total] of ucMap) {
        const formatted = total.toFixed(2).replace('.', ',');
        parts.push(`UC ${uc}: ${formatted}`);
      }
      return parts.join('; ');
    }

    const genericMatches = [...text.matchAll(/INJEÇÃO\s+SCEE.*?kWh\d+,\d{6}(\d+,\d+)/gi)];
    if (genericMatches.length > 0) return genericMatches.map((m) => `Geral: ${m[1]}`).join('; ');
    return null;
  }

    static extractIluminacaoPublica(text) {
    if (!text || text.length < 5) return 0;
    const matches = [...text.matchAll(/ILUM[\.\s]+P[ÚU]BLICA[^\n]{0,50}?([\d]{1,3}(?:\.[\d]{3})*,[\d]{2})(?!\d)/gi)];
    const uniqueMatches = [...new Set(matches.map((m) => m[0].trim()))];
    const values = uniqueMatches.map((m) => {
      const valMatch = m.match(/([\d]{1,3}(?:\.[\d]{3})*,[\d]{2})/);
      return valMatch ? this.parseMoney(valMatch[1]) : 0;
    });
    const total = values.reduce((sum, v) => sum + v, 0);

    if (total === 0) {
      const m1 = text.match(/CONTRIB\.\s+ILUM\.\s+P[ÚU]BLICA[\s\S]{0,40}?([\d.]+,\d{2})/i);
      if (m1) {
        const val = this.parseMoney(m1[1]);
        if (val < 200) return val;
      }
    }

    return total;
  }

  static extractJuros(text) {
    const matches = [...text.matchAll(/JUROS[^\d]{0,20}([\d.]+,\d{2})/gi)];
    return Number(matches.reduce((sum, m) => sum + this.parseMoney(m[1]), 0).toFixed(2));
  }

  static extractMulta(text) {
    const matches = [...text.matchAll(/MULTA[^\d]{0,20}([\d.]+,\d{2})/gi)];
    return Number(matches.reduce((sum, m) => sum + this.parseMoney(m[1]), 0).toFixed(2));
  }

  static extractOutros(text) {
    const patterns = [
      /RELIGA[Ã‡C][ÃƒA]O[^\d]{0,20}([\d.]+,\d{2})/gi,
      /IPCA[^\d]{0,20}([\d.]+,\d{2})/gi,
      /REVELIA[^\d]{0,20}([\d.]+,\d{2})/gi,
    ];
    let total = 0;
    for (const p of patterns) {
      for (const m of text.matchAll(p)) total += this.parseMoney(m[1]);
    }
    return Number(total.toFixed(2));
  }

  static extractRetroativos(text) {
    const matches = [...text.matchAll(/RET(?:ROATIVO)?[^\d]{0,25}([\d.]+,\d{2})/gi)];
    return Number(matches.reduce((sum, m) => sum + this.parseMoney(m[1]), 0).toFixed(2));
  }

  static extractTaxes(text) {
    const icms = text.match(/ICMS[^\d]{0,20}(\d{1,2}(?:,\d{1,4})?)%/i);
    const pis = text.match(/PIS[^\d]{0,20}(\d{1,2}(?:,\d{1,4})?)%/i);
    const cofins = text.match(/COFINS[^\d]{0,20}(\d{1,2}(?:,\d{1,4})?)%/i);
    const pisValue = pis ? this.parseMoney(pis[1]) : 1.0455;
    const cofinsValue = cofins ? this.parseMoney(cofins[1]) : 4.8306;
    const icmsValue = icms ? this.parseMoney(icms[1]) : 19;
    return {
      icms_aliq: icmsValue > 5 && icmsValue < 35 ? icmsValue : 19,
      pis_aliq: pisValue > 0.5 && pisValue < 3 ? pisValue : 1.0455,
      cofins_aliq: cofinsValue > 2 && cofinsValue < 12 ? cofinsValue : 4.8306,
    };
  }

    static extractTarifas(text) {
    if (!text || text.length < 5) return { nc: 0, scee: 0, scee_inj: 0, nc_sem_tributos: 0 };

    const sceeMatch = text.match(/CONSUMO\s+BR\s+SCEE.*?kWh\s*(0,\d{6})/i) ||
      text.match(/CONSUMO\s+SCEE.*?kWh\s*(0,\d{6})/i);
    let sceeConsumo = sceeMatch ? parseFloat(sceeMatch[1].replace(',', '.')) : 0;

    const injMatch = text.match(/INJEÇÃO\s+SCEE.*?kWh\s*(0,\d{6})/i);
    const sceeInjecao = injMatch ? parseFloat(injMatch[1].replace(',', '.')) : 0;

    const ncLine = text.match(/CONSUMO\s+N[ÃA]O\s+COMPENSADO[^\n]+/i);
    let ncTarifa = 0;
    let ncSemTributos = 0;

    if (ncLine) {
      const line = ncLine[0];
      const tariffMatches = [...line.matchAll(/(0,\d{6}|[1-4],\d{6})/g)];
      if (tariffMatches.length > 0) ncTarifa = parseFloat(tariffMatches[0][1].replace(',', '.'));
      const zeroRates = [...line.matchAll(/(0,\d{6})/g)].map((m) => m[1]);
      if (zeroRates.length > 0) ncSemTributos = parseFloat(zeroRates[zeroRates.length - 1].replace(',', '.'));
    }

    if (ncTarifa === 0) {
      const brMatch = text.match(/CONSUMO\s+BR\s+S[^\n]*?kWh\s*(0,\d{6})/i);
      if (brMatch) ncTarifa = parseFloat(brMatch[1].replace(',', '.'));
    }

    const checkTariffSanity = (t) => {
      if (t > 5.0) {
        const measuredEnergy = this.extractMeasuredEnergy(text);
        if (measuredEnergy > 10 && Math.abs((t / measuredEnergy) - 1.1) < 0.5) return t / measuredEnergy;
      }
      return t;
    };

    ncTarifa = checkTariffSanity(ncTarifa);
    sceeConsumo = checkTariffSanity(sceeConsumo);

    return { nc: ncTarifa, scee: sceeConsumo, scee_inj: sceeInjecao, nc_sem_tributos: ncSemTributos };
  }

  static extractFioB(text, compensatedEnergy = 0) {
    const lineMatches = [...text.matchAll(/(?:FIO\s*B|PARC\s+INJET)[^\n]{0,120}/gi)].map((m) => m[0]);
    if (!lineMatches.length) return { value: 0, rate: 0 };

    let rate = 0;
    let value = 0;
    for (const line of lineMatches) {
      const r = line.match(/(0,\d{5,6})/);
      if (r && rate === 0) rate = this.parseMoney(r[1]);
      const vals = [...line.matchAll(/(\d{1,5},\d{2})/g)].map((m) => this.parseMoney(m[1]));
      if (vals.length) value += vals[vals.length - 1];
    }
    value = Number(value.toFixed(2));
    if (value <= 0 && rate > 0 && compensatedEnergy > 0) value = Number((rate * compensatedEnergy).toFixed(2));
    return { value, rate };
  }

  static extractBandeiras(text) {
    const all = [...text.matchAll(/BANDEIRA[^\d]{0,20}(\d+,\d{4,6})/gi)].map((m) => this.parseMoney(m[1]));
    return { b1: all[0] || 0, b2: all[1] || 0 };
  }

  static extractEnergyStats(text) {
    const saldo = text.match(/SALDO(?:\s+KWH|\s+ACUMULADO|\s+ANTERIOR)?[^\d]{0,20}([\d.]+,\d{2})/i);
    const excedente = text.match(/EXCEDENTE\s+RECEBIDO[^\d]{0,20}([\d.]+,\d{2})/i);
    const ciclo = text.match(/CICLO\s*\(?(\d{1,2}\/\d{4})\)?/i);
    return {
      saldo: saldo ? this.parseMoney(saldo[1]) : 0,
      excedente_recebido: excedente ? this.parseMoney(excedente[1]) : 0,
      ciclo: ciclo ? ciclo[1] : 'N/A',
    };
  }

  static extractGeneratorUC(text) {
    const m = text.match(/(?:INJE[Ã‡C][ÃƒA]O|INJET).*?UC\s+(\d{8,12})/i);
    return m ? m[1] : 'N/A';
  }

  static extractAjustes(text) {
    const m = text.match(/ENERGIA\s+COMP.*?N[ÃƒA]O\s+ISENTA[^\d-]{0,20}(-?[\d.]+,\d{2})/i);
    return m ? this.parseMoney(m[1]) : 0;
  }

  static extractAjustesBreakdown(text) {
    const matches = [...text.matchAll(/ENERGIA\s+COMP.*?N[ÃƒA]O\s+ISENTA.*?UC\s+(\d{8,12}).*?(-?[\d.]+,\d{2})/gi)];
    if (!matches.length) return null;
    return matches.map((m) => `UC ${m[1]}: ${m[2]}`).join('; ');
  }

  static extractImpostosScee(text) {
    const pis = [...text.matchAll(/PIS\/PASEP\s+SOBRE\s+SCEE[^\d]{0,20}([\d.]+,\d{2})/gi)]
      .reduce((sum, m) => sum + this.parseMoney(m[1]), 0);
    const cofins = [...text.matchAll(/COFINS\s+SOBRE\s+SCEE[^\d]{0,20}([\d.]+,\d{2})/gi)]
      .reduce((sum, m) => sum + this.parseMoney(m[1]), 0);
    const icms = [...text.matchAll(/ICMS\s+SOBRE\s+SCEE[^\d]{0,20}([\d.]+,\d{2})/gi)]
      .reduce((sum, m) => sum + this.parseMoney(m[1]), 0);
    return { pisCofins: Number((pis + cofins).toFixed(2)), icms: Number(icms.toFixed(2)) };
  }

  static buildRegexResult(text) {
    const measuredEnergy = this.extractMeasuredEnergy(text);
    const compensatedEnergy = this.extractCompensatedEnergy(text);
    const tarifas = this.extractTarifas(text);
    const bandeiras = this.extractBandeiras(text);
    const taxes = this.extractTaxes(text);
    const stats = this.extractEnergyStats(text);
    const reading = this.extractReadingDates(text);
    const fioBData = this.extractFioB(text, compensatedEnergy);
    const juros = this.extractJuros(text);
    const multa = this.extractMulta(text);
    const impScee = this.extractImpostosScee(text);
    let invoiceValue = this.extractInvoiceValue(text);
    const doc = this.extractDocument(text);

    if (invoiceValue <= 0) {
      const estimated = (measuredEnergy * (tarifas.nc || tarifas.scee || 0)) + fioBData.value + this.extractIluminacaoPublica(text) + juros + multa;
      invoiceValue = Number(estimated.toFixed(2));
    }

    const consumerUnit = this.extractConsumerUnit(text);
    let ucGeradora = this.extractGeneratorUC(text);
    if (ucGeradora === consumerUnit) ucGeradora = 'N/A';

    return {
      invoice_value: invoiceValue,
      consumer_unit: this.extractConsumerUnit(text),
      legal_name: this.extractLegalName(text),
      cpf: doc.cpf,
      cnpj: doc.cnpj,
      cpf_cnpj: doc.cpf_cnpj,
      address: this.extractAddress(text),
      month_reference: this.extractMonthReference(text),
      expiration_date: this.extractDueDate(text),
      data_leitura_anterior: reading.anterior,
      data_leitura_atual: reading.atual,
      measured_energy: measuredEnergy,
      invoice_consume: measuredEnergy,
      compensated_energy: compensatedEnergy,
      compensated_energy_breakdown: this.extractCompensatedEnergyBreakdown(text),
      ajustes_breakdown: this.extractAjustesBreakdown(text),
      iluminacaoPublica: this.extractIluminacaoPublica(text),
      juros_multa: Number((juros + multa).toFixed(2)),
      fioB: fioBData.value,
      fioB_rate: fioBData.rate,
      outros: this.extractOutros(text),
      retroativos: this.extractRetroativos(text),
      tarifa_com_tributos: tarifas.nc,
      tarifa_scee: tarifas.scee,
      tarifa_scee_inj: tarifas.scee_inj,
      tarifa_nc_sem_tributos: tarifas.nc_sem_tributos,
      bandeira_1: bandeiras.b1,
      bandeira_2: bandeiras.b2,
      saldo_acumulado: stats.saldo,
      saldo_anterior: stats.saldo,
      saldo_pdf: stats.saldo,
      uc_geradora: ucGeradora,
      excedente_recebido: stats.excedente_recebido,
      ciclo_geracao: stats.ciclo,
      ajustes: this.extractAjustes(text),
      PIS_COFINS_SCEE: impScee.pisCofins,
      ICMS_SCEE: impScee.icms,
      pis_aliq: taxes.pis_aliq,
      cofins_aliq: taxes.cofins_aliq,
      icms_aliq: taxes.icms_aliq,
      is_baixa_renda: /BAIXA\s+RENDA|TARIFA\s+SOCIAL/i.test(text),
      extraction_source: 'local_regex',
      extraction_confidence: measuredEnergy > 0 ? 'high' : 'medium',
      status: 'local_fallback',
    };
  }

  static async extractWithAI(pdfPath) {
    try {
      const dataBuffer = await fs.promises.readFile(pdfPath);
      const aiData = await GeminiService.extractInvoiceData(dataBuffer);
      if (!aiData) return null;

      const text = await this.extractText(pdfPath);
      const regexData = this.buildRegexResult(text);

    const result = {
      invoice_value: toNumber(aiData.invoice_value),
      consumer_unit: String(aiData.consumer_unit || '00000000').replace(/[^\d]/g, '') || '00000000',
      legal_name: normalizeText(aiData.client_name || aiData.legal_name || 'Desconhecido'),
      cpf: normalizeText(aiData.cpf || ''),
      cnpj: normalizeText(aiData.cnpj || ''),
      cpf_cnpj: normalizeText(aiData.cpf_cnpj || ''),
      address: normalizeText(aiData.address || ''),
      month_reference: normalizeText(aiData.month_reference || ''),
      expiration_date: normalizeText(aiData.due_date || aiData.expiration_date || ''),
      data_leitura_anterior: null,
      data_leitura_atual: null,
      measured_energy: toNumber(aiData.measured_energy),
      invoice_consume: toNumber(aiData.measured_energy),
      compensated_energy: toNumber(aiData.compensated_energy),
      compensated_energy_breakdown: null,
      ajustes_breakdown: null,
      iluminacaoPublica: toNumber(aiData.iluminacao_publica),
      juros_multa: toNumber(aiData.juros_multa),
      fioB: toNumber(aiData.fio_b_total),
      fioB_rate: toNumber(aiData.fio_b_rate),
      outros: 0,
      retroativos: 0,
      tarifa_com_tributos: toNumber(aiData.tarifa_cheia_com_impostos),
      tarifa_scee: toNumber(aiData.tarifa_scee_consumo),
      tarifa_scee_inj: toNumber(aiData.tarifa_scee_inj),
      tarifa_nc_sem_tributos: toNumber(aiData.tarifa_sem_impostos),
      bandeira_1: toNumber(aiData.bandeira_1_rate),
      bandeira_2: toNumber(aiData.bandeira_2_rate),
      saldo_acumulado: toNumber(aiData.saldo_pdf || aiData.saldo_acumulado),
      saldo_anterior: toNumber(aiData.saldo_anterior),
      saldo_pdf: toNumber(aiData.saldo_pdf || aiData.saldo_acumulado),
      uc_geradora: normalizeText(aiData.uc_geradora || 'N/A'),
      excedente_recebido: toNumber(aiData.excedente_recebido),
      ciclo_geracao: normalizeText(aiData.ciclo_geracao || 'N/A'),
      ajustes: toNumber(aiData.ajustes),
      PIS_COFINS_SCEE: toNumber(aiData.PIS_COFINS_SCEE),
      ICMS_SCEE: toNumber(aiData.ICMS_SCEE),
      pis_aliq: toNumber(aiData?.taxes?.pis_aliq || aiData.pis_aliq || 1.0455),
      cofins_aliq: toNumber(aiData?.taxes?.cofins_aliq || aiData.cofins_aliq || 4.8306),
      icms_aliq: toNumber(aiData?.taxes?.icms_aliq || aiData.icms_aliq || 19),
      is_baixa_renda: Boolean(aiData.is_baixa_renda),
      is_shared: Boolean(aiData.is_shared),
      extraction_source: 'gemini_multimodal',
      extraction_confidence: 'medium',
      status: 'success_ai',
    };

    // Auditoria hÃ­brida: regex tem prioridade nos campos crÃ­ticos financeiros.
    if (regexData.consumer_unit && regexData.consumer_unit !== '00000000') result.consumer_unit = regexData.consumer_unit;
    if (regexData.iluminacaoPublica > 0) result.iluminacaoPublica = regexData.iluminacaoPublica;
    result.pis_aliq = regexData.pis_aliq || result.pis_aliq;
    result.cofins_aliq = regexData.cofins_aliq || result.cofins_aliq;
    result.icms_aliq = regexData.icms_aliq || result.icms_aliq;
    if (regexData.compensated_energy > 0 && Math.abs(regexData.compensated_energy - result.compensated_energy) > 1) {
      result.compensated_energy = regexData.compensated_energy;
    }
    if (regexData.measured_energy > 0 && (result.measured_energy <= 0 || Math.abs(regexData.measured_energy - result.measured_energy) > 0.5)) {
      result.measured_energy = regexData.measured_energy;
      result.invoice_consume = regexData.measured_energy;
    }
    if (regexData.tarifa_scee > 0) result.tarifa_scee = regexData.tarifa_scee;
    if (regexData.tarifa_scee_inj > 0) result.tarifa_scee_inj = regexData.tarifa_scee_inj;
    if (regexData.tarifa_com_tributos > 0) result.tarifa_com_tributos = regexData.tarifa_com_tributos;
    if (regexData.tarifa_nc_sem_tributos > 0) result.tarifa_nc_sem_tributos = regexData.tarifa_nc_sem_tributos;
    result.fioB = regexData.fioB;
    result.fioB_rate = regexData.fioB_rate;
    result.juros_multa = regexData.juros_multa;
    if (!result.address || result.address.length < 10) result.address = regexData.address || result.address;
    if (!result.cpf) result.cpf = regexData.cpf || '';
    if (!result.cnpj) result.cnpj = regexData.cnpj || '';
    if (!result.cpf_cnpj) result.cpf_cnpj = result.cpf || result.cnpj || regexData.cpf_cnpj || '';
    if (regexData.expiration_date && regexData.expiration_date !== result.expiration_date) result.expiration_date = regexData.expiration_date;
    if (regexData.month_reference && regexData.month_reference !== result.month_reference) result.month_reference = regexData.month_reference;
    result.data_leitura_anterior = regexData.data_leitura_anterior;
    result.data_leitura_atual = regexData.data_leitura_atual;
    result.compensated_energy_breakdown = regexData.compensated_energy_breakdown;
    result.ajustes_breakdown = regexData.ajustes_breakdown;
    result.outros = regexData.outros;
    result.retroativos = regexData.retroativos;
    result.ajustes = regexData.ajustes;
    result.PIS_COFINS_SCEE = regexData.PIS_COFINS_SCEE;
    result.ICMS_SCEE = regexData.ICMS_SCEE;
    result.uc_geradora = regexData.uc_geradora;
    result.excedente_recebido = regexData.excedente_recebido;
    result.ciclo_geracao = regexData.ciclo_geracao;
    result.bandeira_1 = regexData.bandeira_1 || result.bandeira_1;
    result.bandeira_2 = regexData.bandeira_2 || result.bandeira_2;
    result.saldo_acumulado = regexData.saldo_acumulado || result.saldo_acumulado;
    result.saldo_pdf = regexData.saldo_pdf || result.saldo_pdf;
    result.saldo_anterior = regexData.saldo_anterior || result.saldo_anterior || result.saldo_pdf;

      if (result.consumer_unit === '00000000') return null;
      return result;
    } catch (error) {
      console.warn('[PDF EXTRACTOR] extractWithAI falhou:', error.message);
      return null;
    }
  }

  static async extractAll(pdfPath) {
    try {
      const aiResult = await this.extractWithAI(pdfPath);
      if (aiResult && aiResult.consumer_unit !== '00000000') {
        console.log('[PDF EXTRACTOR] Sucesso via Gemini Multimodal (HÃ­brido)');
        return aiResult;
      }
      console.warn('[PDF EXTRACTOR] IA falhou. Usando fallback Regex.');
      const text = await this.extractText(pdfPath);
      const regexOnly = this.buildRegexResult(text);
      if (!text || text.trim().length < 30) {
        regexOnly.status = 'unreadable_pdf';
        regexOnly.extraction_confidence = 'low';
      }
      return regexOnly;
    } catch (error) {
      console.error('[PDF EXTRACTOR] Erro:', error.message);
      return null;
    }
  }
}

export default PDFExtractor;

