const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "Logs");

if (fs.existsSync(logsDir)) {
    const files = fs.readdirSync(logsDir);

    files.forEach((file) => {
        console.log(`delete files...${file}`);
        fs.unlinkSync(path.join(logsDir, file));
    });

    fs.rmdirSync(logsDir);
    console.log("Logs directory eviscerated.");
} else {
    console.log("No Logs directory found.");
}