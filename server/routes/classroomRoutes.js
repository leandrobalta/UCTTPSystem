const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController");

router.post("/classroom", classroomController.createClassroom);
router.get("/classrooms", classroomController.getClassrooms);
router.get("/classroom/:id", classroomController.getClassroomById);
router.put("/classroom/:id", classroomController.updateClassroom);
router.delete("/classroom/:id", classroomController.deleteClassroom);

module.exports = router;
