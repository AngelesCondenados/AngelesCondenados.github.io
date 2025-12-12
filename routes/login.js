const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Miembro = require('../models/Miembro');

// POST - Login de usuario
router.post('/', async (req, res) => {
  try {
    const { usuario, clave } = req.body;

    if (!usuario || !clave) {
      return res.status(400).json({ error: 'Usuario y clave son requeridos' });
    }

    const usuarioEncontrado = await Usuario.findOne({
      where: { usuario },
      include: [Miembro]
    });

    if (!usuarioEncontrado) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // TODO: Comparar clave encriptada con bcrypt
    if (usuarioEncontrado.clave !== clave) {
      return res.status(401).json({ error: 'Clave incorrecta' });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuarioEncontrado.id,
        usuario: usuarioEncontrado.usuario,
        miembro: usuarioEncontrado.Miembro
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
