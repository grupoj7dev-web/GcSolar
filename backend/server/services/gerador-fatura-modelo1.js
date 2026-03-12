import { calcularSplitBase } from './gerador-fatura-base.js';

class GeradorFaturaModelo1 {
  static calcular(data) {
    return calcularSplitBase(data, { modelo: 1, shared: false, hasFioB: false });
  }
}

export default GeradorFaturaModelo1;

