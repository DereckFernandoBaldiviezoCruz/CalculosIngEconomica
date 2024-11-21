// src/routes/valores.js
const express = require('express');
const Valores = require('../controllers/valores');
const router = express.Router();

router.get('/', (req, res) => {
    const { VF, VP, i, n } = req.query;

    try {
        if (VF && VP && n) {
            // Calcular Tasa (i)
            const resultado = Valores.calcularTasa(parseFloat(VF), parseFloat(VP), parseFloat(n));
            return res.json({ VF: parseFloat(VF), VP: parseFloat(VP), n: parseFloat(n), i: resultado.toFixed(4) });
        } else if (VF && VP && i) {
            // Calcular Número de Periodos (n)
            const resultado = Valores.calcularPeriodos(parseFloat(VF), parseFloat(VP), parseFloat(i));
            return res.json({ VF: parseFloat(VF), VP: parseFloat(VP), i: parseFloat(i), n: resultado.toFixed(2) });
        } else if (VP && i && n) {
            // Calcular Valor Futuro (VF)
            const resultado = Valores.calcularVF(parseFloat(VP), parseFloat(i), parseFloat(n));
            return res.json({ VP: parseFloat(VP), i: parseFloat(i), n: parseFloat(n), VF: resultado.toFixed(2) });
        } else if (VF && i && n) {
            // Calcular Valor Presente (VP)
            const resultado = Valores.calcularVP(parseFloat(VF), parseFloat(i), parseFloat(n));
            return res.json({ VF: parseFloat(VF), i: parseFloat(i), n: parseFloat(n), VP: resultado.toFixed(2) });
        } else {
            return res.status(400).json({ error: 'Faltan parámetros necesarios.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al realizar el cálculo.' });
    }
});

module.exports = router;
