const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'angeles-condenados',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'angeles12344321',
  {
    host: process.env.DB_HOST || 'angelescondenados.cx4i40qcm4ai.us-east-2.rds.amazonaws.com',
    port: process.env.DB_PORT || 1433,
    dialect: 'mssql',
    dialectOptions: {
      encrypt: true,
      trustServerCertificate: false
    }
  }
);

const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a SQL Server correctamente');
    await sequelize.sync();
    return sequelize;
  } catch (error) {
    console.error('Error conectando a SQL Server:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, conectarDB };
