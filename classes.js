const {
    random,
    askQuestion,
} = require('./utils.js')

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
        this.guess = (3 + random(2));
    }

    delusional() {
        this.guess = 4;
    }

    pessimist() {
        this.guess = (1 + random(2));
    }

    aleatory() {
        this.guess = (1 + random(4));
    }

    // Diccionario de nombres para estrategias activas
    static activeStrategyNames = {
        optimist: 'optimist',
        delusional: 'delusional',
        pessimist: 'pessimist',
        aleatory: 'aleatory'
    };

    // Mapa de estrategias por índice
    static activeStrategyMap = {
        1: 'optimist',
        2: 'delusional',
        3: 'pessimist',
        4: 'aleatory'
    };

    // Función para seleccionar una estrategia del jugador activo
    async selectActiveStrategy() {
        while (true) {
            const answer = await askQuestion("Select one option among the following strategies for acting player:\n1) Optimist\n2) Delusional\n3) Pessimist\n4) Aleatory\n ", [1, 2, 3, 4]);
            
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
        const randomIndex = 1 + random(4)
        const strategyName = ActivePlayer.activeStrategyMap[randomIndex];
        this.chosenStrategy = this[strategyName];  

        console.log(`The randomly selected strategy for the active player is: ${strategyName}.`);
    }
}

class NonActivePlayer {
    // corazón del programa. NO TOCAR
    static nonActiveRegistry = [];

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
        
        NonActivePlayer.nonActiveRegistry.push(this);
    }

    conservative() {
        if (this.pool <= 15) {
            this.choice = 1;
        } else {
            this.choice = 2;
        }
    }

    aggressive() {
        if (this.pool <= 15) {
            this.choice = 3;
        } else {
            this.choice = 4;
        }
    }

    clever() {
        if (this.pool == 1) {
            this.choice = (3 + random(2));
        } else if (1 < this.pool && this.pool < 5) {
            this.choice = (1 + random(3));
        } else {
            this.choice = (1 + random(4));
        }
    }

    randomChoice() {
        this.choice = (1 + random(4));
    }

    // Diccionario de nombres para estrategias no activas
    static nonActiveStrategyNames = {
        conservative: "Conservative",
        aggressive: "Aggressive",
        clever: "Clever",
        randomChoice: "Random Choice"
    }

    // Mapa de estrategias por índice
    static nonActiveStrategyMap = {
        1: 'conservative',
        2: 'aggressive',
        3: 'clever',
        4: 'randomChoice'
    }

    // Función para seleccionar la estrategia de un jugador no activo dado
    async selectNonActiveStrategy() {
        while (true) {
            let answer = await askQuestion(
                `Select one option among the following strategies for ${this.name}:\n1) Conservative\n2) Aggressive\n3) Clever\n4) Random Choice\n`, [1, 2, 3, 4]);

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
        const randomIndex = (1 + random(4)); // Seleccionar un índice aleatorio
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

