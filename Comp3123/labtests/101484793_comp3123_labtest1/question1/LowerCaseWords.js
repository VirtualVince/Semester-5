const readline = require("readline");

const lowerCaseWords = (mixedArray) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(mixedArray)) {
            reject("Input is not an array");
        } else {
            const filtered = mixedArray
                .filter(item => typeof item === "string")
                .map(item => item.toLowerCase());
            resolve(filtered);
        }
    });
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter words separating each with commas: ", (answer) => {
    const mixedArray = answer.split(",").map(item => {
        item = item.trim();
        if (!isNaN(item)) return Number(item);
        if (item.toLowerCase() === "true") return true;
        if (item.toLowerCase() === "false") return false;
        return item;
    });

    lowerCaseWords(mixedArray)
        .then(result => {
            console.log("Result:", result);
            rl.close();
        })
        .catch(err => {
            console.error("Error:", err);
            rl.close();
        });
});