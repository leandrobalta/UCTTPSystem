const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Institution = sequelize.define(
  "Institution",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    sigla: {
      type: DataTypes.STRING(15),
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
    tableName: "institution",
    timestamps: false,
  }
);

module.exports = Institution;
