class Gradientes {
    /**
     * Cálculo de los factores financieros relacionados con gradientes aritméticos.
     * @param {string} tipo - El tipo de cálculo (P/G, A/G, F/G, G/P, G/A, G/F).
     * @param {number} g - El gradiente.
     * @param {number} i - La tasa de interés (decimal, no porcentaje).
     * @param {number} n - El número de períodos.
     * @returns {number} El resultado del cálculo.
     */
    static calcular(tipo, g, i, n) {
        if (isNaN(g) || isNaN(i) || isNaN(n) || n <= 0 || i <= 0) {
            throw new Error('Los valores para g, i o n no son válidos.');
        }

        let resultado;

        switch (tipo) {
            case 'P/G': // Presente a Gradiente
                resultado = g * ((1 / i) - (n / (Math.pow(1 + i, n) - 1)));
                break;
            case 'A/G': // Anualidad a Gradiente
                resultado = g * ((1 / i) - (n / (Math.pow(1 + i, n) - 1)));
                break;
            case 'F/G': // Futuro a Gradiente
                resultado = g * ((Math.pow(1 + i, n) - 1) / i - n);
                break;
            case 'G/P': // Gradiente a Presente
                resultado = g / ((1 / i) - (n / (Math.pow(1 + i, n) - 1)));
                break;
            case 'G/A': // Gradiente a Anualidad
                resultado = g / ((1 / i) - (n / (Math.pow(1 + i, n) - 1)));
                break;
            case 'G/F': // Gradiente a Futuro
                resultado = g / (((Math.pow(1 + i, n) - 1) / i) - n);
                break;
            default:
                throw new Error('El tipo especificado no es válido. Usa P/G, A/G, F/G, G/P, G/A o G/F.');
        }

        return resultado.toFixed(5);
    }

    /**
     * Resolver los cálculos de gradientes con tipo, tasa y períodos.
     * @param {Object} params - Parámetros de entrada.
     * @param {string} params.tipo - El tipo de cálculo (P/G, A/G, F/G, G/P, G/A, G/F).
     * @param {number} params.g - El gradiente.
     * @param {number} params.i - La tasa de interés.
     * @param {number} params.n - El número de períodos.
     * @returns {Object} Resultado con el cálculo resuelto.
     */
    static resolver(params) {
        const { tipo, g, i, n } = params;

        if (!tipo || isNaN(g) || isNaN(i) || isNaN(n)) {
            throw new Error('Faltan parámetros o los valores proporcionados no son válidos.');
        }

        const resultado = this.calcular(tipo, g, i, n);

        return {
            tipo,
            resultado,
        };
    }
}

module.exports = Gradientes;
