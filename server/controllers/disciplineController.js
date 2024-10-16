const disciplineService = require("../services/disciplineService");

// Create
const createDiscipline = async (req, res) => {
  try {
    const discipline = await disciplineService.CreateDiscipline(req.body);
    res.status(201).send(discipline);
  } catch (error) {
    res.status(500).send(error);
  }
};

// List all
const getDisciplines = async (req, res) => {
  try {
    const disciplines = await disciplineService.GetDisciplines();
    res.status(200).send(disciplines);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Find by ID
const getDisciplineById = async (req, res) => {
  try {
    const discipline = await disciplineService.GetDisciplineById(req.params.id);
    if (!discipline) {
      return res.status(404).send("Discipline not found");
    }
    res.status(200).send(discipline);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
const updateDiscipline = async (req, res) => {
  try {
    const discipline = await disciplineService.UpdateDiscipline(
      req.params.id,
      req.body
    );
    if (!discipline) {
      return res.status(404).send("Discipline not found");
    }
    res.status(200).send(discipline);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete
const deleteDiscipline = async (req, res) => {
  try {
    const discipline = await disciplineService.DeleteDiscipline(req.params.id);
    if (!discipline) {
      return res.status(404).send("Discipline not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createDiscipline,
  getDisciplines,
  getDisciplineById,
  updateDiscipline,
  deleteDiscipline,
};
