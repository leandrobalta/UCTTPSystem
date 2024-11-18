const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Professor = require("./Professor");
const Discipline = require("./Discipline");

const ProfessorDiscipline = sequelize.define(
  "ProfessorDiscipline",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    professorRegistration: {
      type: DataTypes.STRING(255),
      references: {
        model: Professor,
        key: "registrationNumber",
      },
      allowNull: false,
    },
    disciplineCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    courseCode: {
      type: DataTypes.STRING(15),
      allowNull: false,
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
    tableName: "professor_discipline",
    timestamps: false,
  }
);

ProfessorDiscipline.belongsTo(Discipline, {
  foreignKey: {
    name: "disciplineCode",
    allowNull: false,
  },
});

module.exports = ProfessorDiscipline;
