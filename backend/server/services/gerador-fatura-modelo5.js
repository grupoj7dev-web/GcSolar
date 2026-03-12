import { calcularSplitBase } from './gerador-fatura-base.js';

class GeradorFaturaModelo5 {
  static calcular(data) {
    return calcularSplitBase(data, { modelo: 5, shared: true, hasFioB: true });
  }
}

export default GeradorFaturaModelo5;

