    // src/routes/tasas.js
    const express = require('express');
    const Tasas = require('../controllers/tasas');
    const router = express.Router();

    router.get('/', (req, res) => {
        const { i, r, ia, m } = req.query;

        try {
            const resultado = Tasas.resolver({
                i: i ? parseFloat(i) : undefined,
                r: r ? parseFloat(r) : undefined,
                ia: ia ? parseFloat(ia) : undefined,
                m: m ? parseInt(m, 10) : undefined,
            });

            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    module.exports = router;
