const timetableService = require("../services/timetableService");
const createEnvelope = require("../utils/create-envelope.utils");

// Create
const createClassroom = async (req, res) => {
  try {
    const classroom = await timetableService.generateTimetable(req.body);
    console.log("response:",classroom);
    res.status(201).json(createEnvelope(true, "Timetable generated successfully", classroom));
  } catch (error) {
    res.status(500).json(createEnvelope(false, "Error generating timetable: " + error));
  }
};

module.exports = {
    createClassroom,
};