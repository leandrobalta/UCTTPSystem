const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Course = require("./Course");
const Institution = require("./Institution");

const Discipline = sequelize.define(
  "Discipline",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    workload: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    courseCode: {
      type: DataTypes.STRING(15),
      references: {
        model: Course,
        key: "code",
      },
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
    tableName: "disciplines",
    timestamps: false,
  }
);

module.exports = Discipline;
