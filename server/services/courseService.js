const Course = require("../models/Course");

// Create
const CreateCourse = async (data) => {
  const course = new Course(data);
  return await course.save();
};

// List all
const GetCourses = async () => {
  return await Course.findAll();
};

// Find by ID
const GetCourseById = async (id) => {
  return await Course.findByPk(id);
};

// Update
const UpdateCourse = async (id, data) => {
  const course = await Course.findByPk(id);
  return await course.update(data);
};

// Delete
const DeleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  return await course.destroy();
};

module.exports = {
  CreateCourse,
  GetCourses,
  GetCourseById,
  UpdateCourse,
  DeleteCourse,
};
