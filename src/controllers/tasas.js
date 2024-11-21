// src/controllers/tasas.js

/**
 * Cálculos relacionados con tasas nominales, efectivas y de capitalización continua.
 */

class Tasas {
    /**
     * Calcula la tasa nominal anual (r) dada la tasa efectiva por período (i) y los períodos por año (m).
     * @param {number} i - Tasa efectiva por período (en decimal).
     * @param {number} m - Número de períodos por año.
     * @returns {number} Tasa nominal anual (r).
     */
    static calcularNominalAnual(i, m) {
        return i * m;
    }

    /**
     * Calcula la tasa efectiva por período (i) dada la tasa nominal anual (r) y los períodos por año (m).
     * @param {number} r - Tasa nominal anual (en decimal).
     * @param {number} m - Número de períodos por año.
     * @returns {number} Tasa efectiva por período (i).
     */
    static calcularEfectivaPeriodo(r, m) {
        return r / m;
    }

    /**
     * Calcula la tasa efectiva anual (ia) dada la tasa efectiva por período (i) y los períodos por año (m).
     * @param {number} i - Tasa efectiva por período (en decimal).
     * @param {number} m - Número de períodos por año.
     * @returns {number} Tasa efectiva anual (ia).
     */
    static calcularEfectivaAnual(i, m) {
        return Math.pow(1 + i, m) - 1;
    }

    /**
     * Calcula la tasa efectiva por período (i) dada la tasa efectiva anual (ia) y los períodos por año (m).
     * @param {number} ia - Tasa efectiva anual (en decimal).
     * @param {number} m - Número de períodos por año.
     * @returns {number} Tasa efectiva por período (i).
     */
    static calcularEfectivaPorPeriodoDesdeAnual(ia, m) {
        return Math.pow(1 + ia, 1 / m) - 1;
    }

    /**
     * Calcula la tasa efectiva continua (i) dada la tasa nominal continua (r).
     * @param {number} r - Tasa nominal continua (en decimal).
     * @returns {number} Tasa efectiva continua (i).
     */
    static calcularEfectivaContinua(r) {
        return Math.exp(r) - 1;
    }

    /**
     * Calcula la tasa nominal continua (r) dada la tasa efectiva continua (i).
     * @param {number} i - Tasa efectiva continua (en decimal).
     * @returns {number} Tasa nominal continua (r).
     */
    static calcularNominalContinua(i) {
        return Math.log(1 + i);
    }

    /**
     * Resuelve dinámicamente los cálculos de tasas según los valores proporcionados.
     * @param {Object} params - Parámetros de entrada.
     * @param {number} [params.i] - Tasa efectiva por período.
     * @param {number} [params.r] - Tasa nominal anual.
     * @param {number} [params.ia] - Tasa efectiva anual.
     * @param {number} [params.m] - Número de períodos por año.
     * @returns {Object} Resultados de los cálculos.
     */
    static resolver(params) {
        const { i, r, ia, m } = params;

        // Resolver dinámicamente
        if (i && m) {
            return {
                r: this.calcularNominalAnual(i, m).toFixed(5),
                ia: this.calcularEfectivaAnual(i, m).toFixed(5),
            };
        } else if (r && m) {
            return {
                i: this.calcularEfectivaPeriodo(r, m).toFixed(5),
                ia: this.calcularEfectivaAnual(this.calcularEfectivaPeriodo(r, m), m).toFixed(5),
            };
        } else if (ia && m) {
            return {
                i: this.calcularEfectivaPorPeriodoDesdeAnual(ia, m).toFixed(5),
                r: this.calcularNominalAnual(this.calcularEfectivaPorPeriodoDesdeAnual(ia, m), m).toFixed(5),
            };
        } else if (i) {
            return {
                r: this.calcularNominalContinua(i).toFixed(5),
            };
        } else if (r) {
            return {
                i: this.calcularEfectivaContinua(r).toFixed(5),
            };
        } else {
            throw new Error('Faltan parámetros necesarios para calcular.');
        }
    }
}

module.exports = Tasas;
