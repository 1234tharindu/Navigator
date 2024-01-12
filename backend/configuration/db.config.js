const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mssql",
    port: 1433,
    dialectOptions: {
      instanceName: "MSSQLSERVER",
      options: {
        encrypt: false,
    },
    },
    timezone:"+05:30",
  }
);


module.exports = sequelize;



