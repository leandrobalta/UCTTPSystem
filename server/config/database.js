const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("freedb_ucttp-system", "freedb_ucttp-user", "93y$MkA6Zc!nssz", {
  host: "sql.freedb.tech",
  port: 3306, // Porta padrão do MySQL
  dialect: "mysql",
  logging: false, // Desativa logs SQL no console (opcional)
});

module.exports = sequelize;
