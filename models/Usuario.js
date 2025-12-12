const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

module.exports = Usuario;
