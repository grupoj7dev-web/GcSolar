class AneelService {
  static async getFlagForDate(month, year) {
    const mm = String(month || '').padStart(2, '0');
    const yy = String(year || '');
    if (!mm || !yy) return null;

    // Placeholder resiliente: mantém contrato da rota sem quebrar em falha externa.
    // Quando houver endpoint oficial estável da ANEEL no projeto, trocar aqui.
    return null;
  }
}

export default AneelService;

