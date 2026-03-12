const toNumber = (val) => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const n = Number(String(val).replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const round2 = (v) => Math.round((v + Number.EPSILON) * 100) / 100;
const round6 = (v) => Math.round((v + Number.EPSILON) * 1_000_000) / 1_000_000;

export function calcularSplitBase(data, { modelo = 0, shared = false, hasFioB = false } = {}) {
  const energiaCompensada = toNumber(data.compensated_energy);
  const consumoNC = toNumber(data.invoice_consume || data.measured_energy);
  const tarifaNC = toNumber(data.tarifa_com_tributos || data.tarifa_scee);
  const bandeira = toNumber(data.bandeira_1) + toNumber(data.bandeira_2);
  const tarifaReferencia = round6(tarifaNC + bandeira);
  const desconto = toNumber(data.desconto_cliente ?? data.desconto ?? data.discount_percent ?? 20);
  const tarifaGoldtech = round6(tarifaReferencia * ((100 - desconto) / 100));

  const valorGoldtechBruto = round2(energiaCompensada * tarifaGoldtech);
  const ilumPublica = toNumber(data.iluminacaoPublica);
  const jurosMulta = toNumber(data.juros_multa || data.juros || 0) + toNumber(data.multa || 0);
  const fioB = hasFioB ? toNumber(data.fioB || data.fio_b_total) : 0;

  const subtotalEquatorialCalc = round2(consumoNC * tarifaReferencia + ilumPublica + jurosMulta + fioB);
  const invoiceValueRaw = round2(toNumber(data.invoice_value));
  const valorSemSolar = round2((consumoNC + energiaCompensada) * tarifaReferencia + ilumPublica + jurosMulta);

  // Sanity: evita usar invoice_value absurdamente maior que o cenário sem solar.
  const invoiceSuspeito =
    invoiceValueRaw <= 0 ||
    (valorSemSolar > 0 && invoiceValueRaw > valorSemSolar * 1.35);

  const totalEquatorial = invoiceSuspeito ? subtotalEquatorialCalc : invoiceValueRaw;
  const repasse = shared
    ? round2(Math.max(0, Math.min(totalEquatorial - (consumoNC * tarifaReferencia + ilumPublica), valorGoldtechBruto)))
    : fioB;
  const valorGoldtechLiquido = round2(Math.max(0, valorGoldtechBruto - repasse));
  const totalPagar = round2(valorGoldtechLiquido + totalEquatorial);
  const economiaReal = round2(valorSemSolar - totalPagar);

  return {
    modelo,
    shared,
    hasFioB,
    energia_compensada_kwh: energiaCompensada,
    consumo_nao_compensado_kwh: consumoNC,
    tarifa_referencia: tarifaReferencia,
    tarifa_goldtech: tarifaGoldtech,
    split: {
      goldtech_bruto: valorGoldtechBruto,
      goldtech_liquido: valorGoldtechLiquido,
      equatorial_total: totalEquatorial,
      repasse_encargos: repasse,
      total_pagar: totalPagar,
      economia_real: economiaReal,
      valor_sem_solar: valorSemSolar,
    },
  };
}
