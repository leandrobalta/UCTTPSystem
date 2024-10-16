const Professor = require("../models/Professor");

// Create
const CreateProfessor = async (data) => {
  const professor = new Professor(data);
  return await professor.save();
};

// List all
const GetProfessors = async () => {
  return await Professor.findAll();
};

// Find by ID
const GetProfessorById = async (id) => {
  return await Professor.findByPk(id);
};

// Update
const UpdateProfessor = async (id, data) => {
  const professor = await Professor.findByPk(id);
  return await professor.update(data);
};

// Delete
const DeleteProfessor = async (id) => {
  const professor = await Professor.findByPk(id);
  return await professor.destroy();
};

module.exports = {
  CreateProfessor,
  GetProfessors,
  GetProfessorById,
  UpdateProfessor,
  DeleteProfessor,
};
