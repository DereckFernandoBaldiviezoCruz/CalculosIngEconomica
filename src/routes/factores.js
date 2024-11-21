// src/routes/factores.js
const express = require('express');
const Factores = require('../controllers/factores');
const router = express.Router();

router.get('/', (req, res) => {
    const { tipo, valor, i, n } = req.query;

    try {
        const resultado = Factores.resolver({
            tipo,
            valor: parseFloat(valor),
            i: parseFloat(i),
            n: parseInt(n, 10),
        });

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
