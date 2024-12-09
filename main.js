const { roundsOfPlay, prank } = require("./iterator")

const {
    mainPlayersInitializing,
    instancingAllPlayersRegular,
    manageStrategies,
    instancingPlayersFromFiles,
    savePlayersToFile
} = require("./functions.js")

const {
    askQuestion
} = require('./utils')


async function modeOfGame() {
    let validInput = false;
    while (!validInput) {
        const answer = await askQuestion("Do you prefer a standard mode of game, or a personalised one?\n1) Standard\n2) Personalised\n3) Saved Game\n");
        if (typeof answer === "number" && !isNaN(answer)) {
            validInput = true;
            const option = parseInt(answer)
            if (answer === 1){
                instancingAllPlayersRegular()
                await manageStrategies()
                await roundsOfPlay()
                await savePlayersToFile()
            } else if (answer === 2) {
                await mainPlayersInitializing()
                await roundsOfPlay()
                await savePlayersToFile()
            } else if (answer === 3) {
                instancingPlayersFromFiles()
                await roundsOfPlay()
                await savePlayersToFile()
            }
        } else {
            console.log("Please, choose between 1, 2 and 3 with your keypad.")
        }
    }
}

modeOfGame()