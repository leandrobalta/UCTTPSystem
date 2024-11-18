const institutionService = require("../services/institutionService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const createInstitution = async (req, res) => {
  try {
    const institution = await institutionService.CreateInstitution(req.body);
    res.status(201).json(createEnvelope(true, "Institution created successfully", institution));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error creating institution" + error));
  }
};

// List all
const getInstitutions = async (req, res) => {
  try {
    const institutions = await institutionService.GetInstitutions();
    res.status(200).json(createEnvelope(true, "Institutions fetched successfully", institutions));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching institutions" + error));
  }
};

// Find by ID
const getInstitutionById = async (req, res) => {
  try {
    const institution = await institutionService.GetInstitutionById(req.params.id);
    if (!institution) {
      return res.status(404).json(createEnvelope(false, "Institution not found"));
    }
    res.status(200).json(createEnvelope(true, "Institution fetched successfully", institution));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error fetching institution" + error));
  }
};

// Update
const updateInstitution = async (req, res) => {
  try {
    const institution = await institutionService.UpdateInstitution(req.params.id, req.body);
    if (!institution) {
      return res.status(404).json(createEnvelope(false, "Institution not found"));
    }
    res.status(200).json(createEnvelope(true, "Institution updated successfully", institution));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error updating institution" + error));
  }
};

// Delete
const deleteInstitution = async (req, res) => {
  try {
    await institutionService.DeleteInstitution(req.params.id);
    res.status(200).json(createEnvelope(true, "Institution deleted successfully"));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error deleting institution" + error));
  }
};

module.exports = {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
};
