const disciplineService = require("../services/disciplineService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const createDiscipline = async (req, res) => {
  try {
    const discipline = await disciplineService.CreateDiscipline(req.body);
    res.status(201).json(createEnvelope(true, "Discipline created successfully", discipline));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error creating discipline" + error));
  }
};

// List all
const getDisciplines = async (req, res) => {
  try {
    const disciplines = await disciplineService.GetDisciplines();
    res.status(200).json(createEnvelope(true, "Disciplines fetched successfully", disciplines));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching disciplines" + error));
  }
};

// Find by ID
const getDisciplineById = async (req, res) => {
  try {
    const discipline = await disciplineService.GetDisciplineById(req.params.id);
    if (!discipline) {
      return res.status(404).json(createEnvelope(false, "Discipline not found"));
    }
    res.status(200).json(createEnvelope(true, "Discipline fetched successfully", discipline));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching discipline" + error));
  }
};

// Update
const updateDiscipline = async (req, res) => {
  try {
    const discipline = await disciplineService.UpdateDiscipline(req.params.id, req.body);
    if (!discipline) {
      return res.status(404).json(createEnvelope(false, "Discipline not found"));
    }
    res.status(200).json(createEnvelope(true, "Discipline updated successfully", discipline));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error updating discipline" + error));
  }
};

// Delete
const deleteDiscipline = async (req, res) => {
  try {
    await disciplineService.DeleteDiscipline(req.params.id);
    res.status(200).json(createEnvelope(true, "Discipline deleted successfully"));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error deleting discipline" + error));
  }
};

module.exports = {
  createDiscipline,
  getDisciplines,
  getDisciplineById,
  updateDiscipline,
  deleteDiscipline,
};
