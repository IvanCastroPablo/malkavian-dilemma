const {
    ActivePlayer,
    NonActivePlayer,
} = require('./classes.js');

const {
    askQuestion
} = require('./utils.js')

const fs = require('fs');
const path = require('path');

// Función estándar para instanciar a todos los jugadores y a 15 de pool
function instancingAllPlayersRegular() {
    global.actingPlayer = new ActivePlayer({name: "Acting player"});
    global.prey = new NonActivePlayer({name: "Prey"});
    global.grandprey = new NonActivePlayer({name: "Grandprey"});
    global.grandpredator = new NonActivePlayer({name: "Grandpredator"});
    global.predator = new NonActivePlayer({name: "Predator"});
}

// función para instanciar a los jugadores de forma personalizada (num de jugadores)
async function instancingAllPlayersPersonalised() {
    let numberOfPlayers = null;
    while (![2, 3, 4, 5].includes(numberOfPlayers)) {
        const answer = await askQuestion(`Between 2 and 5, how many players would you like to be at the table? `);
        numberOfPlayers = parseInt(answer);
        if (![2, 3, 4, 5].includes(numberOfPlayers)) {
            console.log("Please, choose a number of players between 2 and 5!");
        }
    }

    if (numberOfPlayers === 2) {
        global.actingPlayer = new ActivePlayer({name: "acting player"});
        global.prey = new NonActivePlayer({name: "opponent"});   
    }
    else if (numberOfPlayers === 3) {
        global.actingPlayer = new ActivePlayer({name: "acting player"});
        global.prey = new NonActivePlayer({name: "prey"});
        global.predator = new NonActivePlayer({name: "predator"});
    } else if (numberOfPlayers === 4) {
        global.actingPlayer = new ActivePlayer({name: "acting player"});
        global.prey = new NonActivePlayer({name: "prey"});
        global.crossTable = new NonActivePlayer({name: "cross-table player"});
        global.predator = new NonActivePlayer({name: "predator"});
    } else if (numberOfPlayers === 5) {
        instancingAllPlayersRegular()
    }
}

// Función que activa la selección de estrategia para cada jugador
async function manageStrategies() {
    await actingPlayer.selectActiveStrategy()
    await NonActivePlayer.selectStrategyAllNonActive()
}

// función para personalizar el pool de todos los jugadores
async function personaliseAllPlayersPool() {
    // parte para jugador activo
    let validInput = false;
    while (!validInput) {
        const answer = await askQuestion(`What is the starting amount of pool for the acting player? `);
        if (typeof answer === "number" && !isNaN(answer)) {
            const startingPool = parseInt(answer);
            actingPlayer.pool = startingPool;
            validInput = true;
        } else {
            console.log(`Please, provide a numeric value for the acting player's starting pool.`);
        }
    }

    // parte para jugadores no activos
    for (const player of NonActivePlayer.nonActiveRegistry) {
        let validInput = false;
        while (!validInput) {
            const answer = await askQuestion(`What is the starting amount of pool for ${player.name}? `);
            if (typeof answer === "number" && !isNaN(answer)) {
                const startingPool = parseInt(answer);
                player.pool = startingPool;
                validInput = true;
            } else {
                console.log(`Please, provide a numeric value for ${player.name}'s starting pool.`);
            }
        }
    }
}

async function mainPlayersInitializing() {
    await instancingAllPlayersPersonalised()
    await personaliseAllPlayersPool()
    await manageStrategies()
    await printingPlayersPool()
}

// to get the pool value for each player
function gettingAllPlayersPool() {
    let allPlayersPool = {}
    for (const player of NonActivePlayer.nonActiveRegistry) {
        allPlayersPool[player.name] = player.pool;
    } 
    allPlayersPool[actingPlayer.name] = actingPlayer.pool;
    return allPlayersPool;
}

// printing player's pool:
async function printingPlayersPool(){
    const playersPool = gettingAllPlayersPool();
    console.log(
        Object.entries(playersPool)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')
    );
}
// to execute strategies of all players
function executingMethods() {
    for (const player of NonActivePlayer.nonActiveRegistry) {
        player.chosenStrategy.call(player)
    }
    actingPlayer.chosenStrategy.call(actingPlayer)
}


function reorderNonActiveRegistry() {
    const length = NonActivePlayer.nonActiveRegistry.length;

    if (length === 4) {
        NonActivePlayer.nonActiveRegistry = [prey, grandprey, grandpredator, predator];
    } else if (length === 3) {
        NonActivePlayer.nonActiveRegistry = [prey, crossTable, predator];
    } else if (length === 2) {
        NonActivePlayer.nonActiveRegistry = [prey, predator];
    } else if (length === 1) {
        NonActivePlayer.nonActiveRegistry = [prey];
    }
}

// Función para instanciar jugadores desde los archivos .json
function instancingPlayersFromFiles() {
    const playersData = [
        { file: 'actingplayer.json', class: ActivePlayer },
        { file: 'prey.json', class: NonActivePlayer },
        { file: 'grandprey.json', class: NonActivePlayer },
        { file: 'grandpredator.json', class: NonActivePlayer },
        { file: 'predator.json', class: NonActivePlayer },
        { file: 'cross-table.json', class: NonActivePlayer }
    ];

    playersData.forEach(({ file, class: playerClass }) => {
        const filePath = path.join(__dirname, 'savedfiles', file);

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (playerClass === ActivePlayer) {
                global.actingPlayer = new ActivePlayer(data);
            } else if (playerClass === NonActivePlayer) {
                new NonActivePlayer(data);
            }
        } else {
            console.log(`File ${file} not found.`);
        }
    });
}

// Función para guardar a los jugadores si el usuario lo desea
async function savePlayersToFile() {
    let answer = null;
    while (answer === null) {
        answer = await askQuestion('Would you like to save the state of the game?\n1) Yes\n2) No\n', [1, 2]);
    }

    if (answer === 1) {
        const actingPlayerData = {
            name: actingPlayer.name,
            pool: actingPlayer.pool,
            previousMod: actingPlayer.previousMod,
            chosenStrategy: actingPlayer.chosenStrategy,
            victoryPoints: actingPlayer.victoryPoints,
            guess: actingPlayer.guess,
            previousGuess: actingPlayer.previousGuess
        };
        const actingPlayerFilePath = path.join(__dirname, 'savedfiles', 'actingplayer.json');
        fs.writeFileSync(actingPlayerFilePath, JSON.stringify(actingPlayerData, null, 2), 'utf8');
        console.log(`Saved ${actingPlayer.name} to actingplayer.json`);

        // Guardar las instancias de NonActivePlayer en el nonActiveRegistry
        NonActivePlayer.nonActiveRegistry.forEach(player => {
            const filePath = path.join(__dirname, 'savedfiles', `${player.name.toLowerCase()}.json`);
            const playerData = {
                name: player.name,
                pool: player.pool,
                previousMod: player.previousMod,
                chosenStrategy: player.chosenStrategy,
                victoryPoints: player.victoryPoints,
                choice: player.choice,
                previousChoice: player.previousChoice
            };

            fs.writeFileSync(filePath, JSON.stringify(playerData, null, 2), 'utf8');
            console.log(`Saved ${player.name} to ${player.name.toLowerCase()}.json`);
        });
        console.log("Goodbye.")
    } 
    else if (answer === 2) {
        console.log('Goodbye.');
    }
}



module.exports = {
    instancingAllPlayersRegular,
    instancingAllPlayersPersonalised,
    manageStrategies,
    personaliseAllPlayersPool,
    mainPlayersInitializing,
    executingMethods,
    printingPlayersPool,
    reorderNonActiveRegistry,
    instancingPlayersFromFiles,
    savePlayersToFile
}
