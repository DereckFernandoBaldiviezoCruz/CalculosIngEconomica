// src/routes/index.js
const express = require('express');
const valoresRoutes = require('./valores');
const tasasRoutes = require('./tasas');
const factoresRoutes = require('./factores');
const gradientesRoutes = require('./src/routes/gradientes');

const router = express.Router();

router.use('/valores', valoresRoutes);
router.use('/tasas', tasasRoutes);
router.use('/factores', factoresRoutes);
router.use('/gradientes',gradientesRoutes);

module.exports = router;
