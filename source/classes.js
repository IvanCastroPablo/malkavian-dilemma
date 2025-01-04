const {
    random,
    askQuestion,
} = require('./utils')

const activeStrategies = require('../strategies/activeStrategies.js');
const nonActiveStrategies = require('../strategies/nonActiveStrategies.js');

class ActivePlayer {
    constructor({
        name = "",
        pool = 15,
        previousMod = null,
        victoryPoints = 0,
        guess = null,
        previousGuess = null,
        chosenStrategy = null
    } = {}) {
        this.name = name;
        this.pool = pool;
        this.previousMod = previousMod;
        this.victoryPoints = victoryPoints;
        this.guess = guess;
        this.previousGuess = previousGuess;
        this.chosenStrategy = chosenStrategy;
    }

    optimist() {
        activeStrategies._optimist.call(this);
    }

    delusional() {
        activeStrategies._delusional.call(this);
    }

    pessimist() {
        activeStrategies._pessimist.call(this);
    }

    aleatory() {
        activeStrategies._aleatory.call(this);
    }

    
    test() {
        activeStrategies._test.call(this);
    }
    

    // Diccionario de nombres para estrategias activas
    static activeStrategyNames = {
        optimist: 'optimist',
        delusional: 'delusional',
        pessimist: 'pessimist',
        aleatory: 'aleatory',
        test: 'test'
    };

    // Mapa de estrategias por índice
    static activeStrategyMap = {
        1: 'optimist',
        2: 'delusional',
        3: 'pessimist',
        4: 'aleatory',
        5: 'test'
    };

    // Función para seleccionar una estrategia del jugador activo
    async selectActiveStrategy() {
        while (true) {
            const answer = await askQuestion("Select one option among the following strategies for acting player:\n1) Optimist\n2) Delusional\n3) Pessimist\n4) Aleatory\n5) Test\n", [1, 2, 3, 4, 5]);
            
            if (answer !== null) {
                // el nombre de la estrategia desde el mapa
                const strategyName = ActivePlayer.activeStrategyMap[answer];
                this.chosenStrategy = this[strategyName]; 

                console.log(`The selected strategy for the active player is: ${this.chosenStrategy.name}.`);
                return;
            }
        }
    }
    async selectRandomActiveStrategy() {
        const randomIndex = 1 + random(5) // <--- cámbialo a medida que vayas introduciendo nuevas estrategias (coincide con la key más alta de activeStrategyMap)
        const strategyName = ActivePlayer.activeStrategyMap[randomIndex];
        this.chosenStrategy = this[strategyName];  

        console.log(`The randomly selected strategy for the active player is: ${strategyName}.`);
    }
}

class NonActivePlayer {
    // corazón del programa. NO TOCAR
    static nonActiveRegistry = [];
    // corazón del programa. NO TOCAR

    constructor({
        name = "",
        pool = 15,
        previousMod = null,
        victoryPoints = 0,
        choice = null,
        previousChoice = null,
        chosenStrategy = null
    } = {}) {
        this.name = name;
        this.pool = pool;
        this.previousMod = previousMod;
        this.victoryPoints = victoryPoints;
        this.choice = choice;
        this.previousChoice = previousChoice;
        this.chosenStrategy = chosenStrategy;
        
        // Expresión para añadir los NonActive en cada instanciación: NonActivePlayer.nonActiveRegistry.push(this);
    }

    conservative() {
        nonActiveStrategies._conservative.call(this);
    }

    aggressive() {
        nonActiveStrategies._aggressive.call(this);
    }

    clever() {
        nonActiveStrategies._clever.call(this);
    }

    randomChoice() {
        nonActiveStrategies._randomChoice.call(this);
    }

    nonactivetest() {
        nonActiveStrategies._nonactivetest.call(this);
    }

    // Diccionario de nombres para estrategias no activas
    static nonActiveStrategyNames = {
        conservative: "Conservative",
        aggressive: "Aggressive",
        clever: "Clever",
        randomChoice: "Random Choice",
        nonactivetest: "nonactivetest"
    }

    // Mapa de estrategias por índice
    static nonActiveStrategyMap = {
        1: 'conservative',
        2: 'aggressive',
        3: 'clever',
        4: 'randomChoice',
        5: 'nonactivetest'
    }

    // Función para seleccionar la estrategia de un jugador no activo dado
    async selectNonActiveStrategy() {
        while (true) {
            let answer = await askQuestion(
                `Select one option among the following strategies for ${this.name}:\n1) Conservative\n2) Aggressive\n3) Clever\n4) Random Choice\n5) Non Active test\n`, [1, 2, 3, 4, 5]);

            if (answer !== null) {
                const strategyName = NonActivePlayer.nonActiveStrategyMap[answer];
                this.chosenStrategy = this[strategyName];  // Asignamos la función de la estrategia correspondiente

                console.log(`The selected strategy for ${this.name} is: ${NonActivePlayer.nonActiveStrategyNames[strategyName]}.`);
                return;
            }
        }
    }

    // Método para seleccionar una estrategia de forma aleatoria para un jugador no activo
    async selectRandomNonActiveStrategy() {
        const randomIndex = (1 + random(5)); // Seleccionar un índice aleatorio
        const strategyName = NonActivePlayer.nonActiveStrategyMap[randomIndex];
        this.chosenStrategy = this[strategyName];  // Asignamos la función de la estrategia correspondiente

        console.log(`The randomly selected strategy for ${this.name} is: ${NonActivePlayer.nonActiveStrategyNames[strategyName]}.`);
    }

    // Bucle para seleccionar la estrategia para cada jugador no activo
    static async selectStrategyAllNonActive(arg = "no-random") {
        for (const player of NonActivePlayer.nonActiveRegistry) {
            while (player.chosenStrategy === null) {
                if (arg === "random") {
                    await player.selectRandomNonActiveStrategy()
                } else {
                    await player.selectNonActiveStrategy();
                }
                
            }
        }
    }
}


module.exports = {
    ActivePlayer,
    NonActivePlayer,
}

