const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./config/database');
require('dotenv').config();

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const loginRoutes = require('./routes/login');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('./'));

// Conectar a la base de datos
conectarDB();

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Servidor conectado correctamente' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
