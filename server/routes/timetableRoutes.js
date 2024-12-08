const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.post("/timetable", timetableController.createClassroom);

module.exports = router;
