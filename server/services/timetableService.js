const generateTimetable = async (file) => {
    // execute python script and return the output
    console.log("timetable service", file);
    const { spawn } = require("child_process");
    const pythonProcess = spawn("../../script/venv/bin/python", ["../../script/main.py", file]);
    return new Promise((resolve, reject) => {
        pythonProcess.stdout.on("data", (data) => {
            resolve(data.toString());
        });
        pythonProcess.stderr.on("data", (data) => {
            reject(data.toString());
        });
    });
}

module.exports = {
    generateTimetable
};