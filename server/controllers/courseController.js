const courseService = require("../services/courseService");

// Create
const createCourse = async (req, res) => {
  try {
    const course = await courseService.CreateCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: "Error creating course" });
  }
};

// List all
const getCourses = async (req, res) => {
  try {
    const courses = await courseService.GetCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
};

// Find by ID
const getCourseById = async (req, res) => {
  try {
    const course = await courseService.GetCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Error fetching course" });
  }
};

// Update
const updateCourse = async (req, res) => {
  try {
    const course = await courseService.UpdateCourse(req.params.id, req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Error updating course" });
  }
};

// Delete
const deleteCourse = async (req, res) => {
  try {
    await courseService.DeleteCourse(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting course" });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
