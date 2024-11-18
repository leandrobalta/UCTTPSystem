const professorService = require("../services/professorService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const createProfessor = async (req, res) => {
  try {
    const professor = await professorService.CreateProfessor(req.body);
    res.status(201).json(createEnvelope(true, "Professor created successfully", professor));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error creating professor"));
  }
};

// List all
const getProfessors = async (req, res) => {
  try {
    const professors = await professorService.GetProfessors();
    res.status(200).json(createEnvelope(true, "Professors fetched successfully", professors));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching professors"));
  }
};

// Find by ID
const getProfessorById = async (req, res) => {
  try {
    const professor = await professorService.GetProfessorById(req.params.id);
    if (!professor) {
      return res.status(404).json(createEnvelope(false, "Professor not found"));
    }
    res.status(200).json(createEnvelope(true, "Professor fetched successfully", professor));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching professor"));
  }
};

// Update
const updateProfessor = async (req, res) => {
  try {
    const professor = await professorService.UpdateProfessor(req.params.id, req.body);
    res.status(200).json(createEnvelope(true, "Professor updated successfully", professor));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error updating professor"));
  }
};

// Delete
const deleteProfessor = async (req, res) => {
  try {
    await professorService.DeleteProfessor(req.params.id);
    res.status(200).json(createEnvelope(true, "Professor deleted successfully"));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error deleting professor"));
  }
};

module.exports = {
  createProfessor,
  getProfessors,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
};
