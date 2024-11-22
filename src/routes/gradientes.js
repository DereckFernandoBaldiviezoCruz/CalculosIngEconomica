const express = require('express');
const GradienteAritmetico = require('../controllers/gradientes'); // Controlador con los métodos
const router = express.Router();

router.get('/', (req, res) => {
    const { tipo, g, i, n, cantidadBase, ultimaCantidad } = req.query;

    try {
        let resultado;

        if (tipo === 'G') {
            // Cálculo del gradiente basado en la cantidad base y la cantidad final
            if (cantidadBase && ultimaCantidad && n) {
                resultado = GradienteAritmetico.calcularGradienteDesdeAumento(
                    parseFloat(cantidadBase),
                    parseFloat(ultimaCantidad),
                    parseInt(n, 10)
                );
                res.json({ tipo, gradiente: resultado });
            } else {
                throw new Error('Faltan parámetros para calcular el gradiente.');
            }
        } else {
            // Otros cálculos financieros (P/G, A/G, etc.)
            resultado = GradienteAritmetico.resolver({
                tipo,
                g: g ? parseFloat(g) : undefined,
                i: i ? parseFloat(i) : undefined,
                n: n ? parseInt(n, 10) : undefined,
            });

            res.json(resultado);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
