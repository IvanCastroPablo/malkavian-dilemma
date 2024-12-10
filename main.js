const { roundsOfPlay, prank } = require("./iterator")

const {
    mainPlayersInitializing,
    instancingAllPlayersRegular,
    manageStrategies,
    instancingPlayersFromFiles,
    savePlayersToFile,
    aleatoryPlayersInitializing
} = require("./functions.js")

const {
    askQuestion,
} = require('./utils')


async function modeOfGame() {
    let validInput = false;
    while (!validInput) {
        const answer = await askQuestion("Do you prefer a standard mode of game, a personalised, a total random one, or to load a saved game?\n1) Standard\n2) Personalised\n3) Random\n4) Saved Game\n");
        if (!isNaN(answer)) {
            validInput = true;
            const option = parseInt(answer)
            if (answer === 1){
                instancingAllPlayersRegular()
                await manageStrategies()
                await roundsOfPlay()
            } else if (answer === 2) {
                await mainPlayersInitializing()
                await roundsOfPlay()
            } else if (answer === 3) {
                await aleatoryPlayersInitializing()
                await roundsOfPlay("random")
            } else if (answer === 4) {
                instancingPlayersFromFiles()
                if (typeof actingPlayer === "undefined") {
                    console.log("No save files detected.\nExiting the program.")
                    return;
                } else {
                    await roundsOfPlay()
                }
                
            }
            await savePlayersToFile()
        } else {
            console.log("Please, choose between 1, 2, 3 and 4 with your keypad.")
        }
    }
}

modeOfGame()

module.exports = {
    modeOfGame
}
