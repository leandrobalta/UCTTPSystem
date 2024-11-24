const classroomService = require("../services/classroomService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const createClassroom = async (req, res) => {
  try {
    const classroom = await classroomService.CreateClassroom(req.body);
    res.status(201).json(createEnvelope(true, "Classroom created successfully", classroom));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error creating classroom: " + error));
  }
};

// List all
const getClassrooms = async (req, res) => {
  try {
    const classrooms = await classroomService.GetClassrooms();
    res.status(200).json(createEnvelope(true, "Classrooms fetched successfully", classrooms));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching classrooms: " + error));
  }
};

// Find by ID
const getClassroomById = async (req, res) => {
  try {
    const classroom = await classroomService.GetClassroomById(req.params.id);
    if (!classroom) {
      return res.status(404).json(createEnvelope(false, "Classroom not found"));
    }
    res.status(200).json(createEnvelope(true, "Classroom fetched successfully", classroom));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching classroom: " + error));
  }
};

// Update
const updateClassroom = async (req, res) => {
  try {
    const classroom = await classroomService.UpdateClassroom(req.params.id, req.body);
    res.status(200).json(createEnvelope(true, "Classroom updated successfully", classroom));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error updating classroom: " + error));
  }
};

// Delete
const deleteClassroom = async (req, res) => {
  try {
    await classroomService.DeleteClassroom(req.params.id);
    res.status(200).json(createEnvelope(true, "Classroom deleted successfully"));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error deleting classroom: " + error));
  }
};

module.exports = {
  createClassroom,
  getClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
};
