// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', routes);
const PORT = process.env.PORT || 3000; // Usa el puerto de Render o el puerto 3000 como predeterminado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


module.exports = app;
