const courseService = require("../services/courseService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const createCourse = async (req, res) => {
  try {
    const course = await courseService.CreateCourse(req.body);
    res.status(201).json(createEnvelope(true, "Course created successfully", course));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error creating course" + error));
  }
};

// List all
const getCourses = async (req, res) => {
  try {
    const courses = await courseService.GetCourses();
    res.status(200).json(createEnvelope(true, "Courses fetched successfully", courses));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching courses" + error));
  }
};

// Find by ID
const getCourseById = async (req, res) => {
  try {
    const course = await courseService.GetCourseById(req.params.id);
    if (!course) {
      return res.status(404).json(createEnvelope(false, "Course not found"));
    }
    res.status(200).json(createEnvelope(true, "Course fetched successfully", course));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching course" + error));
  }
};

// Update
const updateCourse = async (req, res) => {
  try {
    const course = await courseService.UpdateCourse(req.params.id, req.body);
    res.status(200).json(createEnvelope(true, "Course updated successfully", course));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error updating course" + error));
  }
};

// Delete
const deleteCourse = async (req, res) => {
  try {
    await courseService.DeleteCourse(req.params.id);
    res.status(200).json(createEnvelope(true, "Course deleted successfully"));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error deleting course" + error));
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
