// Test file. It will be done with jest. Coming soon.

/* 

TODO:

Web implementation.
Testing,
Reorganise some functions in iterator.js into functions.js for clarity sake. IDK


*/

const { modeOfGame } = require("./main.js")

const {
    instancingAllPlayersRegular,
    instancingAllPlayersPersonalised,
    manageStrategies,
    personaliseAllPlayersPool,
    mainPlayersInitializing,
    executingMethods,
    printingPlayersPool,
    reorderNonActiveRegistry,
    instancingPlayersFromFiles,
    savePlayersToFile,
    capitalize,
    aleatoryPlayersInitializing
} = require("./functions.js")

const {
    random,
    askQuestion
} = require("./utils.js")

const {
    ActivePlayer,
    NonActivePlayer
} = require("./classes.js")

const {
    roundsOfPlay,
    prank
} = require("./iterator.js")