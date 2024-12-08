const generateTimetable = async (csv) => {
    // remove the timetable.csv file if exists

    const fs = require("fs");
    const file = "../script/timetable.csv";
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }

    fs.writeFileSync(file, csv.content);

    const { spawn } = require("child_process");
    const pythonProcess = spawn("../script/venv/bin/python", ["../script/main.py"]);
    // the generated timetable will be saved ../script/timetable.json file, read and return as response
    return new Promise((resolve, reject) => {
        pythonProcess.stdout.on("data", (data) => {
            const timetable = fs.readFileSync("../script/timetable.json");
            resolve(JSON.parse(timetable));
        });

        pythonProcess.stderr.on("data", (data) => {
            reject(data.toString());
        });
    });
}

module.exports = {
    generateTimetable
};