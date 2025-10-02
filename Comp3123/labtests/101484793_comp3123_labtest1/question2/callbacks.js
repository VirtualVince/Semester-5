const readline = require("readline");

const resolvedPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Delayed success!" });
        }, 500);
    });
};

const rejectedPromise = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject({ error: "Delayed exception!" });
        }, 500);
    });
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Type 'success' or 'error' to test a promise: ", (answer) => {
    if (answer.toLowerCase() === "success") {
        resolvedPromise()
            .then(result => console.log("Result:", result))
            .catch(err => console.error("Error:", err))
            .finally(() => rl.close());
    } else if (answer.toLowerCase() === "error") {
        rejectedPromise()
            .then(result => console.log("Result:", result))
            .catch(err => console.error("Error:", err))
            .finally(() => rl.close());
    } else {
        console.log("Invalid input. Try 'success' or 'error'.");
        rl.close();
    }
});