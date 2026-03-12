import { calcularSplitBase } from './gerador-fatura-base.js';

class GeradorFaturaModelo2 {
  static calcular(data) {
    return calcularSplitBase(data, { modelo: 2, shared: true, hasFioB: false });
  }
}

export default GeradorFaturaModelo2;

