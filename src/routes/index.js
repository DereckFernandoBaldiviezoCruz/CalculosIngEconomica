// src/routes/index.js
const express = require('express');
const valoresRoutes = require('./valores');
const tasasRoutes = require('./tasas');
const factoresRoutes = require('./factores');

const router = express.Router();

router.use('/valores', valoresRoutes);
router.use('/tasas', tasasRoutes);
router.use('/factores', factoresRoutes);

module.exports = router;
