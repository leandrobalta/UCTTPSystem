const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Institution = require("./Institution");

const Professor = sequelize.define(
  "Professor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    registrationNumber: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.ENUM("Specialist", "Master", "Doctor"),
    },
    institutionFk: {
      type: DataTypes.STRING(15),
      references: {
        model: Institution,
        key: "sigla",
      },
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      },
    },
  },
  {
    tableName: "professors",
    timestamps: false,
  }
);

module.exports = Professor;
