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
                resultado = g * ((Math.pow(1 + i, n) - i * n - 1) / (i * i * Math.pow(1 + i, n)));
                break;
            case 'A/G': // Anualidad a Gradiente
                resultado = g * ((1 / i) - (n / (Math.pow(1 + i, n) - 1)));
                break;
            case 'F/G': // Futuro a Gradiente
                resultado = g * ((Math.pow(1 + i, n) - 1) / i - n);
                break;
            case 'G/P': // Gradiente a Presente
                resultado = g / ((Math.pow(1 + i, n) - i * n - 1) / (i * i * Math.pow(1 + i, n)));
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
     * Calcular el gradiente \( G \) a partir del aumento y \( n \).
     * @param {number} cantidadBase - La cantidad base (CF1 o inicial).
     * @param {number} ultimaCantidad - La cantidad final (CFn).
     * @param {number} n - El número de períodos.
     * @returns {number} El gradiente calculado.
     */
    static calcularGradienteDesdeAumento(cantidadBase, ultimaCantidad, n) {
        if (isNaN(cantidadBase) || isNaN(ultimaCantidad) || isNaN(n) || n <= 1) {
            throw new Error('Valores no válidos para calcular el gradiente.');
        }

        const aumento = ultimaCantidad - cantidadBase;
        const gradiente = aumento / (n - 1);
        return gradiente.toFixed(5);
    }

    /**
     * Calcular \( CF_n \) (Cantidad Final) a partir de cantidad base y gradiente.
     * @param {number} cantidadBase - La cantidad base (CF1 o inicial).
     * @param {number} gradiente - El gradiente.
     * @param {number} n - El número de períodos.
     * @returns {number} La cantidad final calculada.
     */
    static calcularCantidadFinal(cantidadBase, gradiente, n) {
        if (isNaN(cantidadBase) || isNaN(gradiente) || isNaN(n) || n <= 0) {
            throw new Error('Valores no válidos para calcular la cantidad final.');
        }

        const cantidadFinal = cantidadBase + (n - 1) * gradiente;
        return cantidadFinal.toFixed(5);
    }

    /**
     * Resolver los cálculos de gradientes con tipo, tasa y períodos.
     * @param {Object} params - Parámetros de entrada.
     * @param {string} params.tipo - El tipo de cálculo (P/G, A/G, F/G, G/P, G/A, G/F).
     * @param {number} [params.g] - El gradiente (opcional si se calcula con base en otro valor).
     * @param {number} [params.base] - Cantidad base (P, A o F) (opcional).
     * @param {number} [params.cantidadBase] - La cantidad inicial (CF1).
     * @param {number} [params.ultimaCantidad] - La cantidad final (CFn).
     * @param {number} params.i - La tasa de interés.
     * @param {number} params.n - El número de períodos.
     * @returns {Object} Resultado con el cálculo resuelto.
     */
    static resolver(params) {
        const { tipo, g, base, cantidadBase, ultimaCantidad, i, n } = params;

        if (!tipo && !cantidadBase && !ultimaCantidad) {
            throw new Error('Faltan parámetros o los valores proporcionados no son válidos.');
        }

        let resultado;

        if (g !== undefined) {
            resultado = this.calcular(tipo, g, i, n);
        } else if (base !== undefined) {
            resultado = this.calcularGradiente(tipo, base, i, n);
        } else if (cantidadBase !== undefined && ultimaCantidad !== undefined) {
            if (tipo === 'G') {
                resultado = this.calcularGradienteDesdeAumento(cantidadBase, ultimaCantidad, n);
            } else if (tipo === 'CFn') {
                const gradiente = this.calcularGradienteDesdeAumento(cantidadBase, ultimaCantidad, n);
                resultado = this.calcularCantidadFinal(cantidadBase, gradiente, n);
            } else {
                throw new Error('El tipo especificado no es válido. Usa G o CFn.');
            }
        }

        return {
            tipo,
            resultado,
        };
    }
}

module.exports = Gradientes;
