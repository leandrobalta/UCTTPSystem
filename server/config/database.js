const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("stp", "stp", "stp", {
  host: "localhost",
  port: 3306, // Porta padrão do MySQL
  dialect: "mysql",
  logging: false, // Desativa logs SQL no console (opcional)
});

module.exports = sequelize;
