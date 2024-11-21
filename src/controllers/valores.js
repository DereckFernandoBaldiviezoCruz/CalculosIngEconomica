// src/controllers/valores.js

/**
 * Calcula el Valor Futuro (VF), Valor Presente (VP), Tasa de Interés (i) o Número de Periodos (n)
 * dependiendo de los valores proporcionados.
 *
 * Fórmulas:
 * - VF = VP * (1 + i)^n
 * - VP = VF / (1 + i)^n
 */

class Valores {
    /**
     * Encuentra el Valor Futuro (VF).
     * @param {number} VP - Valor presente.
     * @param {number} i - Tasa de interés (en decimal, e.g., 0.05 para 5%).
     * @param {number} n - Número de periodos.
     * @returns {number} Valor Futuro (VF).
     */
    static calcularVF(VP, i, n) {
        return VP * Math.pow(1 + i, n);
    }

    /**
     * Encuentra el Valor Presente (VP).
     * @param {number} VF - Valor futuro.
     * @param {number} i - Tasa de interés (en decimal, e.g., 0.05 para 5%).
     * @param {number} n - Número de periodos.
     * @returns {number} Valor Presente (VP).
     */
    static calcularVP(VF, i, n) {
        return VF / Math.pow(1 + i, n);
    }

    /**
     * Encuentra la Tasa de Interés (i).
     * @param {number} VF - Valor futuro.
     * @param {number} VP - Valor presente.
     * @param {number} n - Número de periodos.
     * @returns {number} Tasa de interés (i).
     */
    static calcularTasa(VF, VP, n) {
        return Math.pow(VF / VP, 1 / n) - 1;
    }

    /**
     * Encuentra el Número de Periodos (n).
     * @param {number} VF - Valor futuro.
     * @param {number} VP - Valor presente.
     * @param {number} i - Tasa de interés (en decimal, e.g., 0.05 para 5%).
     * @returns {number} Número de periodos (n).
     */
    static calcularPeriodos(VF, VP, i) {
        return Math.log(VF / VP) / Math.log(1 + i);
    }
}

module.exports = Valores;
