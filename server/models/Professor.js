const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Professor = sequelize.define(
  "Professor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.ENUM("Specialist", "Master", "Doctor"),
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "professors",
    timestamps: false,
  }
);

module.exports = Professor;
