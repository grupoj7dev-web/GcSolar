class ModeloIdentificador {
  static identificar(data) {
    if (!data) {
      return { modelo: 0, nome: 'Dados inválidos', justificativa: 'Objeto de dados não fornecido.' };
    }

    const toNumber = (val) => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      const n = Number(String(val).replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
      return Number.isFinite(n) ? n : 0;
    };

    const fioBTotal = toNumber(data.fio_b_total || data.fioB);
    const tarifaFioB = toNumber(data.fio_b_rate || data.fioB_rate);
    const tarifaSceeConsumo = toNumber(data.tarifa_scee);
    const tarifaSceeInjecao = toNumber(data.tarifa_scee_inj);
    const consumoNC = toNumber(data.invoice_consume || data.measured_energy || data['CONSUMO NÃO COMPENSADO']);
    const hasUc = /^\d{8,12}$/.test(String(data.consumer_unit || data.uc || '')) && String(data.consumer_unit || data.uc) !== '00000000';
    const hasName = String(data.client_name || data.legal_name || '').trim().toLowerCase() !== 'desconhecido';

    const temFioB = fioBTotal > 0.01 || tarifaFioB > 0.001;
    const temSceeDetalhado = tarifaSceeConsumo > 0 && tarifaSceeInjecao > 0;
    const temConsumoNC = consumoNC > 0;

    const isSharedKeyword = data.is_shared === true;
    const clientName = String(data.client_name || data.legal_name || '').toUpperCase();
    const isClientInvoice = !clientName.includes('GOLDTECH');
    const temSceeDiferenciado =
      temSceeDetalhado && Math.abs(tarifaSceeConsumo - tarifaSceeInjecao) > 0.001;

    const regimeCompartilhado = isClientInvoice && (isSharedKeyword || temSceeDiferenciado || true);

    const semSinaisMinimos =
      !hasUc &&
      !hasName &&
      fioBTotal <= 0 &&
      tarifaSceeConsumo <= 0 &&
      tarifaSceeInjecao <= 0 &&
      consumoNC <= 0;

    if (data.status === 'unreadable_pdf' || semSinaisMinimos) {
      return {
        modelo: 0,
        nome: 'Modelo não identificado',
        justificativa: 'Dados insuficientes para classificar o modelo com segurança.',
      };
    }

    if (!temFioB) {
      if (regimeCompartilhado) {
        return {
          modelo: 2,
          nome: 'Modelo 2 (GD1 - Consumo Compartilhado)',
          justificativa: 'Sem Fio B e fatura de cliente final (compartilhado).',
        };
      }
      return {
        modelo: 1,
        nome: 'Modelo 1 (GD1 - Consumo Remoto)',
        justificativa: 'Sem Fio B e titularidade remota.',
      };
    }

    if (!regimeCompartilhado) {
      return {
        modelo: temConsumoNC ? 3 : 4,
        nome: temConsumoNC
          ? 'Modelo 3 (GD2 - Consumo Remoto com NC)'
          : 'Modelo 4 (GD2 - Consumo Remoto sem NC)',
        justificativa: temConsumoNC ? 'GD2 remoto com NC.' : 'GD2 remoto sem NC.',
      };
    }

    return {
      modelo: temConsumoNC ? 5 : 6,
      nome: temConsumoNC
        ? 'Modelo 5 (GD2 - Consumo Compartilhado com NC)'
        : 'Modelo 6 (GD2 - Consumo Compartilhado sem NC)',
      justificativa: temConsumoNC ? 'GD2 compartilhado com NC.' : 'GD2 compartilhado sem NC.',
    };
  }
}

export default ModeloIdentificador;
