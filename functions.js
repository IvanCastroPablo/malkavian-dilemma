const {
    ActivePlayer,
    NonActivePlayer,
} = require('./classes.js');

const {
    askQuestion
} = require('./utils.js')


// crear un objeto jugador no activo para reemplazar a los que pierdan, y sacarlo del registry
function createReplacer() {
    global.crossTable = new NonActivePlayer({name: "Cross-Table player", pool: 0})
    NonActivePlayer.nonActiveRegistry.pop()
}

// Función estándar para instanciar a todos los jugadores y a 15 de pool
function instancingAllPlayersRegular() {
    global.actingPlayer = new ActivePlayer({name: "Acting player"});
    global.prey = new NonActivePlayer({name: "Prey"});
    global.grandprey = new NonActivePlayer({name: "Grandprey"});
    global.grandpredator = new NonActivePlayer({name: "Grandpredator"});
    global.predator = new NonActivePlayer({name: "Predator"});
    createReplacer()
}

// función para instanciar a los jugadores de forma personalizada (num de jugadores)
async function instancingAllPlayersPersonalised() {
    try {
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
            createReplacer()
        } else if (numberOfPlayers === 4) {
            global.actingPlayer = new ActivePlayer({name: "acting player"});
            global.prey = new NonActivePlayer({name: "prey"});
            global.crossTable = new NonActivePlayer({name: "cross-table player"});
            global.predator = new NonActivePlayer({name: "predator"});
            createReplacer()
        } else if (numberOfPlayers === 5) {
            instancingAllPlayersRegular()
        }
    } catch (e) {
        console.log(e.message);
    }
}

// Función que activa la selección de estrategia para cada jugador
async function manageStrategies() {
    await actingPlayer.selectActiveStrategy()
    await NonActivePlayer.selectStrategyAllNonActive()
}

// función para personalizar el pool de todos los jugadores
async function personaliseAllPlayersPool(){
    // parte para jugador activo
    try {
        const answer = await askQuestion(`What is the starting amount of pool for the acting player? `);
        if (typeof answer === "number") {
            const startingPool = parseInt(answer);
            actingPlayer.pool = startingPool;
        } else {
            console.log(`Please, provide a numeric value for the acting player's starting pool.`);
        }
    } catch (e) {
        console.log(e)
    }

    // parte para jugadores no activos
    try {
        for (const player of NonActivePlayer.nonActiveRegistry) {
            const answer = await askQuestion(`What is the starting amount of pool for ${player.name}? `);
            if (typeof answer === "number") {
                const startingPool = parseInt(answer);
                player.pool = startingPool;
            } else {
                console.log(`Please, provide a numeric value for ${player.name}'s starting pool.`);
            }
        } 
    } catch (e) {
        console.log(e)
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

module.exports = {
    instancingAllPlayersRegular,
    instancingAllPlayersPersonalised,
    manageStrategies,
    personaliseAllPlayersPool,
    mainPlayersInitializing,
    executingMethods,
    printingPlayersPool,
    reorderNonActiveRegistry
}





