const { roundsOfPlay, prank } = require("./iterator")

const {
    mainPlayersInitializing,
    instancingAllPlayersRegular,
    manageStrategies,
    instancingPlayersFromFiles,
    savePlayersToFile,
    aleatoryPlayersInitializing,
    eraseInstances
} = require("./functions.js")

const {
    askQuestion,
} = require('./utils')


async function modeOfGame() {
    console.log(`
          ╔══════════════════════════════════════════════════════════╗
          ║         Pray thee: enter the Malkavian Dilemma,          ║
          ║   where thy wits shall be seared and thy brains cooked.  ║
          ╚══════════════════════════════════════════════════════════╝
        `);
    let recur = false;
    while (!recur) {
        eraseInstances();
        let validInput = false;
        while (!validInput) {
            const answer = await askQuestion(
                "\nDo you prefer a standard mode of game, a personalised, a total random one, or to load a saved game?\n1) Standard\n2) Personalised\n3) Random\n4) Saved Game\n5) Exit\n"
            );
            if (!isNaN(answer)) {
                const option = parseInt(answer); 
                validInput = true; 
                switch (option) {
                    case 1:
                        instancingAllPlayersRegular();
                        await manageStrategies();
                        await roundsOfPlay();
                        break;
                    case 2:
                        await mainPlayersInitializing();
                        await roundsOfPlay();
                        break;
                    case 3:
                        await aleatoryPlayersInitializing();
                        await roundsOfPlay("random");
                        break;
                    case 4:
                        instancingPlayersFromFiles();
                        if (typeof actingPlayer === "undefined") {
                            console.log("No save files detected.\nExiting the program.");
                            return;
                        } else {
                            await roundsOfPlay();
                        }
                        break;
                    case 5:
                        recur = true;
                        console.log("Goodbye.");
                        break;
                    default:
                        console.log("Please, choose a valid option between 1 and 5.");
                        validInput = false; 
                }
                if (option >= 1 && option <= 4) {
                    await savePlayersToFile();
                }
            } else {
                console.log("Please, choose a valid option between 1 and 5.");
            }
        }
    }
}

modeOfGame()

module.exports = {
    modeOfGame
}
