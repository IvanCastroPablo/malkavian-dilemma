const {
    ActivePlayer,
    NonActivePlayer,
} = require('./classes.js');

const {
    askQuestion,
    random
} = require('./utils.js')

const fs = require('fs');
const path = require('path');

// minifunción para capitalizar palabras
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Función estándar para instanciar a todos los jugadores y a 15 de pool
function instancingAllPlayersRegular() {
    global.prey = new NonActivePlayer({name: "Prey"});
    global.grandprey = new NonActivePlayer({name: "Grandprey"});
    global.grandpredator = new NonActivePlayer({name: "Grandpredator"});
    global.predator = new NonActivePlayer({name: "Predator"});
    global.crosstable = new NonActivePlayer({name: "Crosstable"});
    NonActivePlayer.nonActiveRegistry.push(prey);
    NonActivePlayer.nonActiveRegistry.push(grandprey);
    NonActivePlayer.nonActiveRegistry.push(grandpredator);
    NonActivePlayer.nonActiveRegistry.push(predator);
}

// función para instanciar a los jugadores de forma personalizada (num de jugadores) y random
async function instancingAllPlayersPersonalised(arg = "no-random") {
    let numberOfPlayers = null;
    if (arg === "no-random") {
        while (![2, 3, 4, 5].includes(numberOfPlayers)) {
            const answer = await askQuestion(`Between 2 and 5, how many players would you like to be at the table? `);
            numberOfPlayers = parseInt(answer);
            if (![2, 3, 4, 5].includes(numberOfPlayers)) {
                console.log("Please, choose a number of players between 2 and 5!");
            }
        }
    } else if (arg === "random") {
        numberOfPlayers = (2 + random(4)) // A minimum of 2 players, of course
        console.log(`${numberOfPlayers} players will be playing at the game.`)
    }

    global.actingPlayer = new ActivePlayer({name: "acting player"});
    if (numberOfPlayers === 2) {
        instancingAllPlayersRegular();
        NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(item => item == prey);
    }
    else if (numberOfPlayers === 3) {
        instancingAllPlayersRegular();
        NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(item => item == prey || item == predator);
    } else if (numberOfPlayers === 4) {
        instancingAllPlayersRegular();
        NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(item => item == prey || item == predator);
        NonActivePlayer.nonActiveRegistry.push(crosstable);
    } else if (numberOfPlayers === 5) {
        instancingAllPlayersRegular()
    }
}

// Función que activa la selección de estrategia para cada jugador
async function manageStrategies() {
    await actingPlayer.selectActiveStrategy()
    await NonActivePlayer.selectStrategyAllNonActive()
}

async function manageStrategiesRandom() {
    await actingPlayer.selectRandomActiveStrategy()
    await NonActivePlayer.selectStrategyAllNonActive("random")
}
// función para personalizar el pool de todos los jugadores
async function personaliseAllPlayersPool(arg = "no-random") {
    // parte para jugador activo
    let validInput = false;
    while (!validInput) {
        let answer;
        if (arg === "random") {
            answer = (1 + random(30));
            console.log(`Assigned random pool value of ${answer} to acting player.`);
        } else {
            answer = await askQuestion(`What is the starting amount of pool for the acting player? `);
        }

        if (typeof answer === "number" && !isNaN(answer)) {
            const startingPool = parseInt(answer);
            global.actingPlayer.pool = startingPool;
            validInput = true;
        } else {
            console.log(`Please, provide a numeric value for the acting player's starting pool.`);
        }
    }

    // parte para jugadores no activos
    for (const player of NonActivePlayer.nonActiveRegistry) {
        let validInput = false;
        while (!validInput) {
            let answer;
            if (arg === "random") {
                answer = (1 + random(30));
                console.log(`Assigned random pool value of ${answer} to ${player.name}.`);
            } else {
                answer = await askQuestion(`What is the starting amount of pool for ${player.name}? `);
            }

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

async function aleatoryPlayersInitializing() {
    await instancingAllPlayersPersonalised("random")
    await personaliseAllPlayersPool("random")
    await manageStrategiesRandom()
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
            .map(([key, value]) => `${capitalize(key)}: ${value}`)
            .join('\n')
    );
}
// to execute strategies of all players
function executingMethods() {
    for (const player of NonActivePlayer.nonActiveRegistry) {
        player.chosenStrategy.call(player)
    }
    actingPlayer.chosenStrategy.call(actingPlayer);
    opponent.chosenStrategy.call(opponent);
}


function reorderNonActiveRegistry() {
    const length = NonActivePlayer.nonActiveRegistry.length;

    if (length === 4) {
        NonActivePlayer.nonActiveRegistry = [prey, grandprey, grandpredator, predator];
    } else if (length === 3) {
        NonActivePlayer.nonActiveRegistry = [prey, crosstable, predator];
    } else if (length === 2) {
        NonActivePlayer.nonActiveRegistry = [prey, predator];
    } else if (length === 1) {
        NonActivePlayer.nonActiveRegistry = [prey];
    }
}

// Función para instanciar jugadores desde los archivos .json
function instancingPlayersFromFiles() {
    const playersData = [
        { file: 'actingplayer.json', class: ActivePlayer},
        { file: 'prey.json', class: NonActivePlayer},
        { file: 'grandprey.json', class: NonActivePlayer},
        { file: 'grandpredator.json', class: NonActivePlayer},
        { file: 'predator.json', class: NonActivePlayer},
        { file: 'crosstable.json', class: NonActivePlayer}
    ];

    playersData.forEach(({ file, class: playerClass }) => {
        const filePath = path.join(__dirname, '../savedfiles', file);
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const instanceName = path.basename(file, '.json');
            if (playerClass === ActivePlayer) {

                global.actingPlayer = new ActivePlayer(data);
                const strategyName = data.chosenStrategy;
                actingPlayer.chosenStrategy = ActivePlayer.prototype[strategyName]

            } else if (playerClass === NonActivePlayer) {

                const player = new NonActivePlayer(data);
                global[instanceName] = player;
                const strategyName = data.chosenStrategy;
                if (strategyName) {
                    global[instanceName].chosenStrategy = NonActivePlayer.prototype[strategyName]
                }
                NonActivePlayer.nonActiveRegistry.push(player);
            }
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

        const saveDir = path.join(__dirname, '../savedfiles');

        // Vaciado de carpeta
        if (fs.existsSync(saveDir)) {
            const files = fs.readdirSync(saveDir);
            files.forEach(file => {
                const filePath = path.join(saveDir, file);
                if (fs.lstatSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            });
            console.log('Previous saved files deleted.\n');
        } else {
            fs.mkdirSync(saveDir);
        }

        const actingPlayerData = {
            name: actingPlayer.name,
            pool: actingPlayer.pool,
            previousMod: actingPlayer.previousMod,
            victoryPoints: actingPlayer.victoryPoints,
            guess: actingPlayer.guess,
            previousGuess: actingPlayer.previousGuess,
            // guardar solo el nombre de la estrategia en lugar de la función completa!!
            chosenStrategy: actingPlayer.chosenStrategy.name
        };
        const actingPlayerFilePath = path.join(__dirname, '../savedfiles', 'actingplayer.json');
        fs.writeFileSync(actingPlayerFilePath, JSON.stringify(actingPlayerData, null, 2), 'utf8');
        console.log(`Saved Acting Player to a savefile succesfully.`);

        // Guardar las instancias de NonActivePlayer en el nonActiveRegistry
        NonActivePlayer.nonActiveRegistry.forEach(player => {
            const filePath = path.join(__dirname, '../savedfiles', `${player.name.toLowerCase()}.json`);
            const playerData = {
                name: player.name,
                pool: player.pool,
                previousMod: player.previousMod,
                victoryPoints: player.victoryPoints,
                choice: player.choice,
                previousChoice: player.previousChoice,
                // lo mismo, guardamos la estrategia solita
                chosenStrategy: player.chosenStrategy.name
            };

            fs.writeFileSync(filePath, JSON.stringify(playerData, null, 2), 'utf8');
            console.log(`Saved ${capitalize(player.name)} to a savefile succesfully.`);

        });
    } 
}

function eraseInstances() {
    const possibleInstances = ["actingPlayer", "prey", "grandprey", "grandpredator", "predator", "crossplayer"];

    for (const i of possibleInstances){
        if (i in globalThis) {
            globalThis[i] = null;
        }
    }
    // Creo una instancia que será utilizada en prank para hacer los cálculos comparativos
    global.opponent = new NonActivePlayer({})
    NonActivePlayer.nonActiveRegistry = [];
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
    savePlayersToFile,
    capitalize,
    aleatoryPlayersInitializing,
    eraseInstances
}

