const {
    NonActivePlayer,
} = require('./classes.js');

const {
    printingPlayersPool,
    executingMethods,
    reorderNonActiveRegistry
} = require('./functions.js')

const {
    askQuestion
} = require('./utils')

// función para manejar la eliminación de jugadores cuando hay cinco jugando. Muy abstracta!
function handleEliminationFiveplayers(player) {
    // genera el cross-table player para sustituir a quien muera
    global.crossTable = new NonActivePlayer({name: "Cross-Table player", pool: 0}) 
    if (player === prey) {
        actingPlayer.pool += 6;
        actingPlayer.victoryPoints += 1;
        console.log("The Prey has been ousted! Your former Grandprey is now your Prey and your Grandpredator is now the Cross-Table player.\n");
        playerSubstitutionFivePlayers(grandprey, prey, grandpredator, crossTable);
    }  else if (player === grandprey) {
        prey.pool += 6;
        prey.victoryPoints += 1;
        console.log("The GradPrey has been ousted! Your former GrandPredator is now the Cross-Table player.\n");
        playerSubstitutionFivePlayers(grandpredator, crossTable);
    } else if (player === grandpredator) {
        grandprey.pool += 6;
        grandprey.victoryPoints += 1;
        console.log("The GrandPredator has been ousted! Your Grandprey is now the Cross-Table player.\n")
        playerSubstitutionFivePlayers(grandprey, crossTable);
    } else if (player === predator) {
        grandpredator.pool += 6;
        grandpredator.victoryPoints += 1;
        console.log("The Predator has been ousted! Your Grandprey is now the Cross-Table player, and your Grandpredator is your new predator.\n")
        playerSubstitutionFivePlayers(grandpredator, predator, grandprey, crossTable);
    }
}

// función para crear shallow copies y modificar el registro de jugadores no activos, cinco jugadores
async function playerSubstitutionFivePlayers(displaced1, replacer1, displaced2 = null, replacer2 = null){
    const { name, ...rest } = displaced1;
    Object.assign(replacer1, rest);
    if (displaced2 && replacer2) {
        const { name, ...rest2 } = displaced2;
        Object.assign(replacer2, rest2);
    }
    // Eliminar jugadores desplazados del registro
    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== displaced1 && player !== displaced2);

    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== grandprey);
    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== grandpredator);
    NonActivePlayer.nonActiveRegistry.push(crossTable);
    reorderNonActiveRegistry();
}

// manejar eliminación. lo mismo que con cinco, pero un pelín más sencilla
function handleEliminationFourPlayers(player) {
    if (player === prey) {
        actingPlayer.pool += 6;
        actingPlayer.victoryPoints += 1;
        console.log("The Prey has been ousted! The former Cross-Table player is now your Prey.\n");
        playerSubstitutionFourPlayers(crossTable, prey)
    } else if (player === crossTable) {
        prey.pool += 6;
        prey.victoryPoints += 1;
        console.log("The Cross-Table player has been ousted!\n")
        playerSubstitutionFourPlayers()
    } else if (player === predator) {
        crossTable.pool += 6;
        crossTable.victoryPoints += 1;
        console.log("The Predator has been ousted! The Cross-Table player is your new Predator.\n");
        playerSubstitutionFourPlayers(crossTable, predator)
    }
}

// creamos copias, reasignamos y eliminamos el crosstableplayer
async function playerSubstitutionFourPlayers(displaced1= null, replacer1= null){
    if (displaced1 && replacer1) {
        const { name, ...rest } = displaced1;
        Object.assign(replacer1, rest);
    }
    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== crossTable);
    reorderNonActiveRegistry();
}

//de nuevo, manejar eliminación. Mucho más sencilla que para cinco
function handleEliminationThreePlayers(player) {
    if(player === prey) {
        actingPlayer.pool += 6;
        actingPlayer.victoryPoints += 1;
        console.log("The Prey has been ousted! Your Predator will be called Prey.\n");
        playerSubstitutionThreePlayers(predator)
    } else if (player === predator) {
        prey.pool += 6;
        prey.victoryPoints += 1;
        console.log("The Predator has been ousted!\n");
        playerSubstitutionThreePlayers(prey)
    }
}

// shallow copy para prey, en caso de que sea el depredador quien sea eliminado
async function playerSubstitutionThreePlayers(player){
    if (player === predator) {
        const {name, ...rest} = predator;
        Object.assign(prey, rest);
    }
    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== predator)
    reorderNonActiveRegistry();

}

function prank() {
    let index = 0;
    while (index < NonActivePlayer.nonActiveRegistry.length){
        executingMethods();
        reorderNonActiveRegistry();
        const otherPlayer = NonActivePlayer.nonActiveRegistry[index];
        console.log(`${otherPlayer.name} has chosen ${otherPlayer.choice}`);
        console.log(`Acting player guess ${actingPlayer.guess}\n`);

        // Lógica principal
        if (actingPlayer.guess === otherPlayer.choice) {
            console.log("Right Guess!");
            if (otherPlayer.pool > otherPlayer.choice) {
                actingPlayer.pool += otherPlayer.choice;
                otherPlayer.pool -= otherPlayer.choice;
            } else {
                actingPlayer.pool += otherPlayer.pool;
                otherPlayer.pool = 0;
            }
            // Verificar si un jugador ha sido eliminado
            if (otherPlayer.pool === 0) {
                if (NonActivePlayer.nonActiveRegistry.length === 4) {
                    handleEliminationFiveplayers(otherPlayer);
                } else if (NonActivePlayer.nonActiveRegistry.length === 3) {
                    handleEliminationFourPlayers(otherPlayer);
                } else if (NonActivePlayer.nonActiveRegistry.length === 2) {
                    handleEliminationThreePlayers(otherPlayer);
                } else {
                    actingPlayer.pool += 6;
                    actingPlayer.victoryPoints += 1;
                    console.log("The Prey has been ousted!\nThe active player has won the game.");
                    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== prey);
                }
            } else {
                console.log(`${otherPlayer.name} pool is now ${otherPlayer.pool}`);
                console.log(`Acting player pool is now ${actingPlayer.pool}\n`);
                index ++;
            }
        } else {
            console.log("Wrong guess!");
            otherPlayer.pool += otherPlayer.choice;
            console.log(`${otherPlayer.name} pool is now ${otherPlayer.pool}\n`);
            index ++;
            }
    }
}

async function roundsOfPlay() {
    let validInput = false;
    while (!validInput) {
        const answer = await askQuestion("How many rounds do you want to play?\n");
        if (typeof answer === "number" && !isNaN(answer)) {
            const rounds = parseInt(answer);
            for (let i = 0; i < rounds; i++) {
                console.log("\nRound", i + 1, "\n");
                prank();
                if (i == rounds) { console.log("\nNext Malkavian Prank\n\n"); }
                printingPlayersPool();
                if (NonActivePlayer.nonActiveRegistry.length == 0) {
                    console.log("No more players left.");
                    break;
                }
            }
            console.log("\nEnd of test");
            validInput = true;
        } else {
            console.log("Please, provide a valid number of rounds.");
        }
    }
}


module.exports = {
    roundsOfPlay,
    prank
}