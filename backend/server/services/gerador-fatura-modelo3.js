import { calcularSplitBase } from './gerador-fatura-base.js';

class GeradorFaturaModelo3 {
  static calcular(data) {
    return calcularSplitBase(data, { modelo: 3, shared: false, hasFioB: true });
  }
}

export default GeradorFaturaModelo3;

