// funcioncita personalizada para generar randoms
function random(max) {
    return Math.floor(Math.random() * max);
}

// Readline para todas las interacciones.
function askQuestion(query, validOptions = []) {
    return new Promise((resolve) => {
        const readline = require("readline");
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        rl.question(query, (answer) => {
            rl.close();
            if (validOptions.length > 0 && !validOptions.includes(parseInt(answer))) {
                console.log(`Invalid option!`)
                resolve(null)
            } else {
            resolve(parseInt(answer))
            }
        });
    });
}

module.exports = {
    random, 
    askQuestion
}