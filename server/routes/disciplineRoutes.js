const express = require("express");
const router = express.Router();
const disciplineController = require("../controllers/disciplineController");

router.post("/discipline", disciplineController.createDiscipline);
router.get("/disciplines", disciplineController.getDisciplines);
router.get("/discipline/:id", disciplineController.getDisciplineById);
router.put("/discipline/:id", disciplineController.updateDiscipline);
router.delete("/discipline/:id", disciplineController.deleteDiscipline);

module.exports = router;
