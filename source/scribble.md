# Scribble File

**Note**: Testing will be done with Jest. Coming soon.

---

## TODO:

- Web implementation.
- Testing.
- Reorganize some functions in `iterator.js` into `functions.js` for clarity.
- Add support for multiple save file folders. :)

---

## On Creating Complex and Realistic Methods:

SOBRE CÓMO CREAR MÉTODOS COMPLEJOS Y REALISTAS:

Para hacer que las instancias puedan obtener información las unas de las otras y
así crear métodos que actúen en condición del estado ajeno y no solamente del propio
es necesario saber qué instancias existen. Pero esto no es siempre posible:

Si bien es cierto que prey y active player existen en cualquier circunstancia, el resto
de jugadores pueden o no existir, y adicionalmente dentro de prank activePlayer no sabe
contra quién está comparando sus valores.

Para solventar este problema hay que, al comienzo de prank (o mucho mejor, justo al comienzo de la ejecución del programa) hay que instanciar a NonActivePlayer
con un objeto (llamado por ejemplo "opponent") y eliminarlo del registry,
y que copie los valores del NonActivePlayer en cuestión cuando llegue a prank.

"Durante la ejecución de prank activePlayer solamente compara valores contra opponent. Una vez se ha resuelto el flujo comparativo pero antes de la eliminación de personajes, todos los valores de opponent se devuelven al NonActive player de turno, y se borra la instancia opponent (no es necesario borrar opponent, la instancia es un copia & pega constante así que los valores que conserve entre ejecuciones de prank es absolutamente indiferente).

Quizá todo esto no sea necesario dada la siguiente línea existente en prank:

```javascript
const opponent = NonActivePlayer.nonActiveRegistry[index];
```
**RESUMEN: SI ES SUFICIENTE**

Vas a tener que refactorizar la lógica de prank y hacer lo que has comentado arriba porque los métodos **no pueden ver el estado de una instancia ajena a su clase a menos que exista previamente**.


Es posible que solamente necesite escribir métodos como los siguientes:

```javascript
if (opponent.pool == X && opponent.name === "crossplayer")
```

Para el problema de la existencia o inexistencia de instancias por parte de los métodos
es tan sencillo como hacer condicionales al estido de:

```javascript
if (crossplayer && crossplayer.pool == X && opponent.name === "crossplayer") {
    // logic here
}
```


---

## Strategy Descriptions

### Active Player Strategies

**Optimist:**  
This strategy involves guessing a value between 3 and 4 inclusively. It assumes a positive and balanced outcome.

**Delusional:**  
Always guesses the fixed value 4. This strategy is overconfident and disregards variability.

**Pessimist:**  
Guesses a value between 1 and 2 inclusively. It reflects a cautious and risk-averse approach.

**Aleatory:**  
Generates a completely random guess between 1 and 4 inclusively. This strategy relies entirely on chance.

### Non-Active Player Strategies

**Conservative:**  
Chooses option 1 if the player’s pool is less than or equal to 15; otherwise, it chooses option 2. This strategy focuses on preserving resources.

**Aggressive:**  
Chooses option 3 if the player’s pool is less than or equal to 15; otherwise, it chooses option 4. It favors taking bold actions.

**Clever:**  
Adapts the choice based on the current pool size:

- If the pool is 1, it chooses between 3 and 4.
- If the pool is between 2 and 4, it chooses between 1 and 3.
- Otherwise, it chooses between 1 and 4 randomly.

This strategy uses logical decisions influenced by the player's resources.

**Random Choice:**  
Makes a completely random choice between options 1 and 4. This strategy is entirely unpredictable.

