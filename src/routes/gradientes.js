const express = require('express');
const GradienteAritmetico = require('../controllers/gradientes');
const router = express.Router();

router.get('/', (req, res) => {
    const { tipo, g, i, n } = req.query;

    try {
        const resultado = GradienteAritmetico.resolver({
            tipo,
            g: parseFloat(g),
            i: parseFloat(i),
            n: parseInt(n, 10),
        });

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
