const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Institution = require("./Institution");

const Classroom = sequelize.define(
  "Classroom",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    institutionFk: {
      type: DataTypes.STRING(15),
      allowNull: false,
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
    tableName: "classrooms",
    timestamps: false,
  }
);

module.exports = Classroom;
