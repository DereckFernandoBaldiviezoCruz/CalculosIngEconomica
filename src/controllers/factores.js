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
     * Cálculo del gradiente aritmético basado en tipo.
     * @param {string} tipo - Tipo de gradiente (P/G, A/G).
     * @param {number} i - Tasa de interés en decimal.
     * @param {number} n - Número de períodos.
     * @returns {number} Factor para gradiente aritmético.
     */
    static calcularGradiente(tipo, i, n) {
        switch (tipo) {
            case 'P/G':
                return (1 / i) * (((Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n))) - n / Math.pow(1 + i, n));
            case 'A/G':
                return (1 / i) - (n / (Math.pow(1 + i, n) - 1));
            default:
                throw new Error(`Tipo de gradiente desconocido: ${tipo}`);
        }
    }

    /**
     * Resuelve un cálculo de factor financiero o gradiente aritmético.
     * @param {Object} params - Parámetros de entrada.
     * @param {string} params.tipo - Tipo de cálculo (P/F, F/P, A/F, etc., o P/G, A/G).
     * @param {number} params.valor - Valor inicial (presente, futuro, serie uniforme o gradiente).
     * @param {number} params.i - Tasa de interés en decimal.
     * @param {number} params.n - Número de períodos.
     * @returns {Object} Resultado del cálculo.
     */
    static resolver(params) {
        const { tipo, valor, i, n } = params;

        if (!tipo || !valor || !i || !n) {
            throw new Error('Faltan parámetros: tipo, valor, i, n son obligatorios.');
        }

        let factor;
        if (['P/F', 'F/P', 'A/F', 'F/A', 'P/A', 'A/P'].includes(tipo)) {
            factor = this.calcularFactorBase(tipo, i, n);
        } else if (['P/G', 'A/G'].includes(tipo)) {
            factor = this.calcularGradiente(tipo, i, n);
        } else {
            throw new Error(`Tipo de cálculo desconocido: ${tipo}`);
        }

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
