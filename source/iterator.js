const {
    NonActivePlayer,
} = require('./classes.js');

const {
    printingPlayersPool,
    executingMethods,
    reorderNonActiveRegistry,
    capitalize
} = require('./functions.js')

const {
    askQuestion,
    random
} = require('./utils')

// función para manejar la eliminación de jugadores cuando hay cinco jugando. Muy abstracta!
function handleEliminationFiveplayers(player) {
    // genera el cross-table player para sustituir a quien muera
    global.crosstable = new NonActivePlayer({name: "Cross-Table player", pool: 0}) 
    if (player === "prey") {
        actingPlayer.pool += 6;
        actingPlayer.previousMod += 6;
        actingPlayer.victoryPoints += 1;
        console.log("The Prey has been ousted! Your former Grandprey is now your Prey and your Grandpredator is now the Cross-Table player.\n");
        playerSubstitutionFivePlayers(grandprey, prey, grandpredator, crosstable);
    }  else if (player === "grandprey") {
        prey.pool += 6;
        prey.previousMod += 6;
        prey.victoryPoints += 1;
        console.log("The GradPrey has been ousted! Your former GrandPredator is now the Cross-Table player.\n");
        playerSubstitutionFivePlayers(grandpredator, crosstable);
    } else if (player === "grandpredator") {
        grandprey.pool += 6;
        grandprey.previousMod +=6;
        grandprey.victoryPoints += 1;
        console.log("The GrandPredator has been ousted! Your Grandprey is now the Cross-Table player.\n")
        playerSubstitutionFivePlayers(grandprey, crosstable);
    } else if (player === "predator") {
        grandpredator.pool += 6;
        grandpredator.previousMod += 6;
        grandpredator.victoryPoints += 1;
        console.log("The Predator has been ousted! Your Grandprey is now the Cross-Table player, and your Grandpredator is your new predator.\n")
        playerSubstitutionFivePlayers(grandpredator, predator, grandprey, crosstable);
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
    NonActivePlayer.nonActiveRegistry.push(crosstable);
    reorderNonActiveRegistry();
}

// manejar eliminación. lo mismo que con cinco, pero un pelín más sencilla
function handleEliminationFourPlayers(player) {
    if (player === "prey") {
        actingPlayer.pool += 6;
        actingPlayer.previousMod += 6;
        actingPlayer.victoryPoints += 1;
        console.log("The Prey has been ousted! The former Cross-Table player is now your Prey.\n");
        playerSubstitutionFourPlayers(crosstable, prey)
    } else if (player === "crosstable") {
        prey.pool += 6;
        prey.previousMod += 6;
        prey.victoryPoints += 1;
        console.log("The Cross-Table player has been ousted!\n")
        playerSubstitutionFourPlayers()
    } else if (player === "predator") {
        crosstable.pool += 6;
        crosstable.previousMod +=6;
        crosstable.victoryPoints += 1;
        console.log("The Predator has been ousted! The Cross-Table player is your new Predator.\n");
        playerSubstitutionFourPlayers(crosstable, predator)
    }
}

// creamos copias, reasignamos y eliminamos el crosstableplayer
async function playerSubstitutionFourPlayers(displaced1= null, replacer1= null){
    if (displaced1 && replacer1) {
        const { name, ...rest } = displaced1;
        Object.assign(replacer1, rest);
    }
    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== crosstable);
    reorderNonActiveRegistry();
}

//de nuevo, manejar eliminación. Mucho más sencilla que para cinco
function handleEliminationThreePlayers(player) {
    if(player === "prey") {
        actingPlayer.pool += 6;
        actingPlayer.previousMod += 6;
        actingPlayer.victoryPoints += 1;
        console.log("The Prey has been ousted! Your Predator will be called Prey.\n");
        playerSubstitutionThreePlayers(predator)
    } else if (player === "predator") {
        prey.pool += 6;
        prey.previousMod += 6;
        prey.victoryPoints += 1;
        console.log("The Predator has been ousted!\n");
        playerSubstitutionThreePlayers(prey)
    }
}

// shallow copy para prey, en caso de que sea el depredador quien sea eliminado
async function playerSubstitutionThreePlayers(player){
    if (player === "predator") {
        const {name, ...rest} = predator;
        Object.assign(prey, rest);
    }
    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== predator)
    reorderNonActiveRegistry();

}

function prank() {
    let index = 0;
    while (index < NonActivePlayer.nonActiveRegistry.length){
        // señalo al jugador al que le toca
        const turntaker = NonActivePlayer.nonActiveRegistry[index];
        // utizo a la instancia genérica para copiar los valores del jugador pertinente
        Object.assign(opponent, turntaker);
        // se ejecutan los métodos de todas las instancias existentes
        executingMethods();
        // reordenar el registro de para que la lógica funcione hayan los jugadores que hayan
        reorderNonActiveRegistry();
        console.log(`${capitalize(opponent.name)} has chosen ${opponent.choice}`);
        console.log(`Acting player guess ${actingPlayer.guess}\n`);
        // Lógica principal
        if (actingPlayer.guess === opponent.choice) {
            console.log("Right Guess!");
            if (opponent.pool > opponent.choice) {
                actingPlayer.pool += opponent.choice;
                opponent.pool -= opponent.choice;
                actingPlayer.previousMod = opponent.choice;
                opponent.previousMod = opponent.choice;
                console.log(`${capitalize(opponent.name)}'s pool is now ${opponent.pool}`);
                console.log(`Acting player pool is now ${actingPlayer.pool}\n`);
                // devuelvo los valores al jugador pertinente una vez hechos los cálculos
                Object.assign(turntaker, opponent);
                index ++;
            } else {
                actingPlayer.pool += opponent.pool;
                actingPlayer.previousMod = opponent.pool;
                opponent.pool = 0;
                Object.assign(turntaker, opponent);
                // Verificar si un jugador ha sido eliminado
                if (NonActivePlayer.nonActiveRegistry.length === 4) {
                    handleEliminationFiveplayers(opponent.name);
                } else if (NonActivePlayer.nonActiveRegistry.length === 3) {
                    handleEliminationFourPlayers(opponent.name);
                } else if (NonActivePlayer.nonActiveRegistry.length === 2) {
                    handleEliminationThreePlayers(opponent.name);
                } else {
                    actingPlayer.pool += 6;
                    actingPlayer.previousMod += 6;
                    actingPlayer.victoryPoints += 1;
                    console.log("The Prey has been ousted!\nThe active player has won the game.");
                    NonActivePlayer.nonActiveRegistry = NonActivePlayer.nonActiveRegistry.filter(player => player !== prey);
                }
            }

        } else {
            console.log("Wrong guess!");
            opponent.pool += opponent.choice;
            opponent.previousMod = opponent.choice;
            console.log(`${capitalize(opponent.name)}'s pool is now ${opponent.pool}\n`);
            index ++;
            }
    }
}

async function roundsOfPlay(arg = "no-random") {
    let validInput = false;
    while (!validInput) {
        let answer;
        if (arg === "random") {
            answer = (1 + (random(5))); 
            console.log(`Randomly selected ${answer} rounds to play.`);
        } else {
            answer = await askQuestion("How many rounds do you want to play?\n");
        }
        const rounds = parseInt(answer);
        if (Number.isInteger(rounds) && rounds > 0) {
            for (let i = 0; i < rounds; i++) {
                console.log("\nRound", i + 1, "\n");
                prank();
                if (i == rounds) { 
                    console.log("\nNext Malkavian Prank\n\n"); 
                }
                printingPlayersPool();
                if (NonActivePlayer.nonActiveRegistry.length === 0) {
                    console.log("No more players left.");
                    break;
                }
            }
            console.log("\nEnd of test\n\n");
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
