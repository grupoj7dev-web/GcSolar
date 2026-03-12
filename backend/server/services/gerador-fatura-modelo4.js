import { calcularSplitBase } from './gerador-fatura-base.js';

class GeradorFaturaModelo4 {
  static calcular(data) {
    return calcularSplitBase(data, { modelo: 4, shared: false, hasFioB: true });
  }
}

export default GeradorFaturaModelo4;

