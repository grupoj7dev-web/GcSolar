class StandardizerService {
  static standardize(responseData = {}) {
    const model = responseData.modelo || 0;
    const split = responseData.fatura_calculada?.split || {};
    const info = responseData.info_fatura || {};

    return {
      success: !!responseData.success,
      model,
      model_name: responseData.modelo_identificado || '',
      uc: info.uc || '',
      customer: info.nome || '',
      reference_month: info.mes_referencia || '',
      totals: {
        goldtech: split.goldtech_liquido ?? 0,
        equatorial: split.equatorial_total ?? 0,
        payable: split.total_pagar ?? 0,
        economy: split.economia_real ?? 0,
      },
    };
  }
}

export default StandardizerService;

