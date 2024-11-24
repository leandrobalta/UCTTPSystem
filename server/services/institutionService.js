const Institution = require("../models/Institution");

// Create
const CreateInstitution = async (data) => {
  const institution = new Institution(data);
  return await institution.save();
};

// List all
const GetInstitutions = async () => {
  return await Institution.findAll();
};

// Find by ID (sigla)
const GetInstitutionById = async (sigla) => {
  return await Institution.findByPk(sigla);
};

// Update
const UpdateInstitution = async (sigla, data) => {
  const institution = await Institution.findByPk(sigla);
  if (!institution) {
    throw new Error(`Institution with sigla ${sigla} not found`);
  }
  return await institution.update(data);
};

// Delete
const DeleteInstitution = async (sigla) => {
  const institution = await Institution.findByPk(sigla);
  if (!institution) {
    throw new Error(`Institution with sigla ${sigla} not found`);
  }
  return await institution.destroy();
};

module.exports = {
  CreateInstitution,
  GetInstitutions,
  GetInstitutionById,
  UpdateInstitution,
  DeleteInstitution,
};
