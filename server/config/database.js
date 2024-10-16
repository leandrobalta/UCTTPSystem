const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("stp", "root", "13310550", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
