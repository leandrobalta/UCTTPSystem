const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Professor = require("./Professor");

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100],
      },
    },
    coordinatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Professor,
        key: "id",
      },
      validate: {
        isInt: true,
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
    tableName: "courses",
    timestamps: false,
  }
);

module.exports = Course;
