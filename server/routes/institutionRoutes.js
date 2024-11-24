const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/institutionController");

// Rota para criar uma nova instituição
router.post("/institution", institutionController.createInstitution);

// Rota para listar todas as instituições
router.get("/institutions", institutionController.getInstitutions);

// Rota para buscar uma instituição pelo ID (sigla)
router.get("/institution/:id", institutionController.getInstitutionById);

// Rota para atualizar uma instituição pelo ID (sigla)
router.put("/institution/:id", institutionController.updateInstitution);

// Rota para deletar uma instituição pelo ID (sigla)
router.delete("/institution/:id", institutionController.deleteInstitution);

module.exports = router;
