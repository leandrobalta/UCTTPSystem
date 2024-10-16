const Discipline = require("../models/Discipline");

// Create
const CreateDiscipline = async (data) => {
  const discipline = new Discipline(data);
  return await discipline.save();
};

// List all
const GetDisciplines = async () => {
  return await Discipline.findAll();
};

// Find by ID
const GetDisciplineById = async (id) => {
  return await Discipline.findByPk(id);
};

// Update
const UpdateDiscipline = async (id, data) => {
  const discipline = await Discipline.findByPk(id);
  return await discipline.update(data);
};

// Delete
const DeleteDiscipline = async (id) => {
  const discipline = await Discipline.findByPk(id);
  return await discipline.destroy();
};

module.exports = {
  CreateDiscipline,
  GetDisciplines,
  GetDisciplineById,
  UpdateDiscipline,
  DeleteDiscipline,
};
