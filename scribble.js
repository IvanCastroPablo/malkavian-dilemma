// Scribble file. Testing will be done with jest. Coming soon.

/* 

TODO:

Web implementation.
Testing,
Reorganise some functions in iterator.js into functions.js for clarity sake. IDK

Hacer que haya más de un save file folder. :)



SOBRE CÓMO CREAR MÉTODOS COMPLEJOS Y REALISTAS:

Para hacer que las instancias puedan obtener información las unas de las otras y
así crear métodos que actúen en condición del estado ajeno y no solamente del propio
es necesario saber qué instancias existen. Pero esto no es siempre posible:

Si bien es cierto que prey y active player existen en cualquier circunstancia, el resto
de jugadores pueden o no existir, y adicionalmente dentro de prank activePlayer no sabe
contra quién está comparando sus valores.

Para solventar este problema hay que, al comienzo de prank, hay que instanciar a NonActivePlayer
con un objeto (llamado por ejemplo "opponent") y eliminarlo del registry,
y que copie los valores del NonActivePlayer en cuestión.

"Durante la ejecución de prank activePlayer solamente compara valores contra opponent. Una vez se ha
resuelto el flujo comparativo pero antes de la eliminación de personajes, todos los valores de opponent
se devuelven al NonActive player de turno, y se borra la instancia opponent.

Quizá todo esto no sea necesario dada la siguiente línea existente en prank:

const otherPlayer = NonActivePlayer.nonActiveRegistry[index];

Es posible que solamente necesite escribir métodos como los siguientes:

if (otherPlayer.pool == X && otherPlayer.name "crossplayer")

Para el problema de la existencia o inexistencia de instancias por parte de los métodos
es tan sencillo como hacer condicionales al estido de:

if (crossplayer && crossplayer.pool == X && opponent.name == "crossplayer").



*/
/*
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
*/