const professorDisciplineService = require("../services/professorDisciplineService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const assignProfessorToDiscipline = async (req, res) => {
  try {
    const assignment = await professorDisciplineService.AssignProfessorToDiscipline(req.body);
    res.status(201).json(createEnvelope(true, "Professor assigned to discipline successfully", assignment));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error assigning professor to discipline"));
  }
};

// List all
const getAssignments = async (req, res) => {
  try {
    const assignments = await professorDisciplineService.GetAssignments();
    res.status(200).json(createEnvelope(true, "Assignments fetched successfully", assignments));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching assignments"));
  }
};

// Find by ID
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await professorDisciplineService.GetAssignmentById(req.params.id);
    if (!assignment) {
      return res.status(404).json(createEnvelope(false, "Assignment not found"));
    }
    res.status(200).json(createEnvelope(true, "Assignment fetched successfully", assignment));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching assignment"));
  }
};

// Update
const updateAssignment = async (req, res) => {
  try {
    const assignment = await professorDisciplineService.UpdateAssignment(req.params.id, req.body);
    if (!assignment) {
      return res.status(404).json(createEnvelope(false, "Assignment not found"));
    }
    res.status(200).json(createEnvelope(true, "Assignment updated successfully", assignment));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error updating assignment"));
  }
};

// Delete
const deleteAssignment = async (req, res) => {
  try {
    await professorDisciplineService.DeleteAssignment(req.params.id);
    res.status(200).json(createEnvelope(true, "Assignment deleted successfully"));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error deleting assignment"));
  }
};

module.exports = {
  assignProfessorToDiscipline,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
