// src/controllers/factores.js

/**
 * Cálculos de factores financieros con detalle del factor y resultado.
 */
class Factores {
    /**
     * Calcula el factor según el tipo.
     * @param {string} tipo - Tipo de factor (P/F, F/P, A/F, F/A, P/A, A/P).
     * @param {number} i - Tasa de interés en decimal.
     * @param {number} n - Número de períodos.
     * @returns {number} Factor calculado basado en el tipo.
     */
    static calcularFactorBase(tipo, i, n) {
        switch (tipo) {
            case 'P/F':
                return Math.pow(1 + i, -n);
            case 'F/P':
                return Math.pow(1 + i, n);
            case 'A/F':
                return i / (Math.pow(1 + i, n) - 1);
            case 'F/A':
                return (Math.pow(1 + i, n) - 1) / i;
            case 'P/A':
                return (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n));
            case 'A/P':
                return (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
            default:
                throw new Error(`Tipo de factor desconocido: ${tipo}`);
        }
    }

    /**
     * Resuelve un cálculo de factor financiero.
     * @param {Object} params - Parámetros de entrada.
     * @param {string} params.tipo - Tipo de factor (P/F, F/P, A/F, etc.).
     * @param {number} params.valor - Valor inicial (presente, futuro, serie uniforme).
     * @param {number} params.i - Tasa de interés en decimal.
     * @param {number} params.n - Número de períodos.
     * @returns {Object} Resultado del cálculo.
     */
    static resolver(params) {
        const { tipo, valor, i, n } = params;

        if (!tipo || !valor || !i || !n) {
            throw new Error('Faltan parámetros: tipo, valor, i, n son obligatorios.');
        }

        const factor = this.calcularFactorBase(tipo, i, n);
        const resultado = valor * factor;

        return {
            tipo,
            valorEntrada: valor,
            tasaInteres: i.toFixed(5),
            periodos: n,
            factor: factor.toFixed(5),
            resultado: resultado.toFixed(5),
        };
    }
}

module.exports = Factores;
