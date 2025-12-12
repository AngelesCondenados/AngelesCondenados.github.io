const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Miembro = sequelize.define('Miembro', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apodo: {
    type: DataTypes.STRING(50),
    defaultValue: ''
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numTelefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  numEmergencia: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Miembro',
  timestamps: false
});

module.exports = Miembro;
