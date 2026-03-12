import { calcularSplitBase } from './gerador-fatura-base.js';

class GeradorFaturaModelo6 {
  static async calcular(data) {
    return calcularSplitBase(data, { modelo: 6, shared: true, hasFioB: true });
  }
}

export default GeradorFaturaModelo6;

