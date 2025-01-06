// funcioncita personalizada para generar randoms
function random(max) {
    return Math.floor(Math.random() * max);
}

// Readline para todas las interacciones.
function askQuestion(query, validOptions = [], validate = null) {
    return new Promise((resolve) => {
        const readline = require("readline");
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        rl.question(query, (answer) => {
            rl.close();
            if (validate == "str") {
                resolve(answer.replace(/\s+/g, '').toLocaleLowerCase());
            }
            else {
                const parsedAnswer = parseInt(answer);
                if (isNaN(parsedAnswer) || (validOptions.length > 0 && !validOptions.includes(parsedAnswer))) {
                    console.log(`Invalid option!`);
                    resolve(null);  // Return null for invalid input
                } else {
                    resolve(parsedAnswer);  // Return the valid number
                }
            }
        });
    });
}

//minifunción para obtener fecha
function time() {
    const now = new Date().toISOString();
    return now;
}

module.exports = {
    random,
    askQuestion,
    time
}