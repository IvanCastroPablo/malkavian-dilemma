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

    optimist(){
        this.guess = (3 + random(2));
    };

    delusional(){
        this.guess = 4;
    };

    pessimist() {
        this.guess = (1 + random(2));
    };

    aleatory() {
        this.guess = (1 + random(4));
    };

    // Diccionario de nombres para estrategias activas
    static activeStrategyNames = {
        optimist: 'optimist',
        delusional: 'delusional',
        pessimist: 'pessimist', 
        aleatory: 'aleatory'
    };

    // función para escoger la estrategia del jugador activo
    async selectActiveStrategy() {
        while (true) {
            const answer = await askQuestion("Select one option among the following strategies for acting player:\n1) Optimist\n2) Delusional\n3) Pessimist\n4) Aleatory\n ", [1, 2, 3, 4]);
            
            if (answer !== null) {
                const strategies = [this.optimist, this.delusional, this.pessimist, this.aleatory];

                this.chosenStrategy = strategies[answer - 1];

                const strategyName = ActivePlayer.activeStrategyNames[this.chosenStrategy.name];
                console.log(`The selected strategy for the active player is: ${strategyName}.`);
                return;
            }
        }
    }

    // Método para seleccionar una estrategia de forma aleatoria
    selectRandomActiveStrategy() {
            const strategies = [this.optimist, this.delusional, this.pessimist, this.aleatory];
            const randomIndex = random(strategies.length);
            this.chosenStrategy = strategies[randomIndex];

            const strategyName = ActivePlayer.activeStrategyNames[this.chosenStrategy.name];
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
    };

    aggressive() {
        if (this.pool <= 15) {
            this.choice = 3;
        } else {
            this.choice = 4;
        }
    };

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

    // función para seleccionar la estrategia de un jugador no activo dado
    async selectNonActiveStrategy() {
        while (true) {
                let answer = await askQuestion(
                    `Select one option among the following strategies for ${this.name}:\n1) Conservative\n2) Aggressive\n3) Clever\n4) Random Choice\n`, [1, 2, 3, 4]);

                if (answer !== null) {
                    const strategies = [this.conservative, this.aggressive, this.clever, this.randomChoice];

                    // Arreglo para bindear el método al objeto. No sé por qué, pero he de hacerlo así.
                    const strategyIndex = answer - 1;
                    this.chosenStrategy = strategies[strategyIndex];

                    const strategyName = NonActivePlayer.nonActiveStrategyNames[this.chosenStrategy.name];
                    console.log(`The selected strategy for ${this.name} is: ${strategyName}.`);
                    return;
                }
        }
    }

    // Método para seleccionar una estrategia de forma aleatoria para un jugador no activo
    selectRandomNonActiveStrategy() {
            const strategies = [this.conservative, this.aggressive, this.clever, this.randomChoice];
            const randomIndex = random(strategies.length); // Usa la función random importada
            this.chosenStrategy = strategies[randomIndex];

            const strategyName = NonActivePlayer.nonActiveStrategyNames[this.chosenStrategy.name];
            console.log(`The randomly selected strategy for ${this.name} is: ${strategyName}.`);
    }

    // bucle para seleccionar la estrategia para cada jugador no activo
    static async selectStrategyAllNonActive() {
        for (const player of NonActivePlayer.nonActiveRegistry) {
            while (player.chosenStrategy === null) {
                await player.selectNonActiveStrategy();
            }
        }
    }
}

module.exports = {
    ActivePlayer,
    NonActivePlayer,
}