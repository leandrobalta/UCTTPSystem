const professorService = require("../services/professorService");

// Create
const createProfessor = async (req, res) => {
  try {
    const professor = await professorService.CreateProfessor(req.body);
    res.status(201).json(professor);
  } catch (error) {
    res.status(500).json({ error: "Error creating professor" });
  }
};

// List all
const getProfessors = async (req, res) => {
  try {
    const professors = await professorService.GetProfessors();
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching professors" });
  }
};

// Find by ID
const getProfessorById = async (req, res) => {
  try {
    const professor = await professorService.GetProfessorById(req.params.id);
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ error: "Error fetching professor" });
  }
};

// Update
const updateProfessor = async (req, res) => {
  try {
    const professor = await professorService.UpdateProfessor(
      req.params.id,
      req.body
    );
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ error: "Error updating professor" });
  }
};

// Delete
const deleteProfessor = async (req, res) => {
  try {
    await professorService.DeleteProfessor(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting professor" });
  }
};

module.exports = {
  createProfessor,
  getProfessors,
  getProfessorById,
  updateProfessor,
  deleteProfessor,
};
