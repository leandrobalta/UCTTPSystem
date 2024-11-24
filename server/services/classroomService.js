const Classroom = require("../models/Classroom");

// Create
const CreateClassroom = async (data) => {
  const classroom = new Classroom(data);
  return await classroom.save();
};

// List all
const GetClassrooms = async () => {
  return await Classroom.findAll();
};

// Find by ID
const GetClassroomById = async (id) => {
  return await Classroom.findByPk(id);
};

// Update
const UpdateClassroom = async (id, data) => {
  const classroom = await Classroom.findByPk(id);
  if (!classroom) {
    throw new Error(`Classroom with ID ${id} not found`);
  }
  return await classroom.update(data);
};

// Delete
const DeleteClassroom = async (id) => {
  const classroom = await Classroom.findByPk(id);
  if (!classroom) {
    throw new Error(`Classroom with ID ${id} not found`);
  }
  return await classroom.destroy();
};

module.exports = {
  CreateClassroom,
  GetClassrooms,
  GetClassroomById,
  UpdateClassroom,
  DeleteClassroom,
};
