const express = require('express');
const Gradientes = require('../controllers/gradientes'); // Controlador con los métodos
const router = express.Router();

router.get('/', (req, res) => {
    const { tipo, g, i, n, cantidadBase, ultimaCantidad, gradiente } = req.query;

    try {
        let resultado;

        if (tipo === 'G') {
            if (cantidadBase && ultimaCantidad && n) {
                resultado = Gradientes.calcularGradienteDesdeAumento(
                    parseFloat(cantidadBase),
                    parseFloat(ultimaCantidad),
                    parseInt(n, 10)
                );
                res.json({ tipo, gradiente: resultado });
            } else {
                throw new Error('Faltan parámetros para calcular el gradiente.');
            }
        } else if (tipo === 'CFn') {
            // Calcular cantidad final basado en cantidadBase y gradiente
            if (cantidadBase && gradiente && n) {
                resultado = Gradientes.calcularCantidadFinal(
                    parseFloat(cantidadBase),
                    parseFloat(gradiente),
                    parseInt(n, 10)
                );
                res.json({ tipo, cantidadFinal: resultado });
            } else {
                throw new Error('Faltan parámetros para calcular la cantidad final.');
            }
        } else {
            // Otros cálculos financieros (P/G, A/G, etc.)
            resultado = Gradientes.resolver({
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
