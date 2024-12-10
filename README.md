```markdown
# A Malkavian Dilemma

---

*__Malkavian Prank__*

*Master.*

*All other Methuselahs hold between 1 and 4 blood in their hands.*
*You guess how much is in each Methuselah's hand individually.*
*For each one you guess correctly, you gain that much pool from his or her blood pool.*
*If you guess incorrectly, he or she gains that much pool from the blood bank.*


## Contextos y objetivos...

Este proyecto está inspirado en el trabajo de Robert Axelrod y su análisis del dilema iterado del prisionero, expuesto en su libro *The Evolution of Cooperation*. La idea central es modelar las decisiones estratégicas en torno a la carta *Malkavian Prank*, una mecánica del juego *Vampire: The Eternal Struggle* que implica acertar cuántos contadores tiene cada oponente en su mano. Dependiendo del resultado, el jugador puede ganar o perder recursos (*pool*).  

El objetivo principal de este programa es simular múltiples iteraciones de este juego para optimizar las decisiones del jugador, creando diferentes estrategias tanto para el jugador como para los oponentes. A través de este enfoque, se busca explorar las dinámicas óptimas de decisión dentro de un entorno competitivo.

---

## Algunos tecnicismos

### 1. **Estructura del Proyecto**  
El proyecto está desarrollado enteramente en **Node.js**, dividido en varios archivos JavaScript que encapsulan diferentes aspectos de la lógica:

- **`main.js`**: Punto de entrada que inicializa el flujo del programa, maneja los estados globales y orquesta las interacciones entre los componentes.
- **`functions.js`** y **`utils.js`**: Conjuntos de funciones utilitarias para operaciones repetitivas o especializadas, como validaciones, procesamiento de datos y manejo de estructuras de datos.
- **`classes.js`**: Define las clases necesarias para modelar los jugadores (*Methuselahs*), sus comportamientos y los elementos del juego.
- **`iterator.js`**: Implementa iteradores personalizados que permiten manejar grandes volúmenes de datos o simular turnos de manera eficiente y controlada.
- **`utils.js`**: Archivo auxiliar para la entrada de usuario y generación de números aleatorios.

### 2. **Lógica del Juego**  
El programa crea cuatro objetos que representan a los rivales (*Methuselahs*) y uno para el jugador principal. Las reglas de la carta se implementan mediante simulaciones iterativas que:
- Definen diferentes estrategias de decisión para cada jugador.
- Calculan las ganancias o pérdidas de *pool* en función de las decisiones tomadas.
- Ajustan los comportamientos de los rivales según el historial de interacciones, simulando un entorno dinámico y competitivo.

### 3. **Uso de Tecnologías Node.js**  
- **Módulos de Node.js**: Se emplea el sistema de módulos para dividir el código en partes manejables y reutilizables.
- **Eventos**: La asincronía se maneja mediante eventos y callbacks, garantizando que las simulaciones fluyan de manera ordenada.
- **Streams e Iteradores**: Para manejar múltiples simulaciones de forma eficiente y sin saturar la memoria.
- **File System (`fs`)**: Algunas partes del programa permiten guardar estados o configuraciones de la simulación en archivos locales. q
- **Path**: Fundamental para el guardado y gestión de los archivos de salvado.

---

## Próximos Pasos

### **Retos Superados:**
- Modelar reglas abstractas de juego y convertirlas en código funcional.
- Gestionar el flujo asincrónico de múltiples simulaciones de manera eficiente.
- Crear un sistema flexible que permita implementar nuevas estrategias fácilmente.
- Conseguir guardar un estado de la ejecución para su uso posterior.

### **Próximos Pasos:**
- **Implementación Web:** Migrar el proyecto a una interfaz gráfica en formato web. Para ello, se planea utilizar tecnologías como **Express.js** para el backend y un framework como **React.js** para la interfaz de usuario.
- **Ampliación de Modalidades de Juego:** Añadir más estrategias para los jugadores y otros modos de simulación, permitiendo estudiar variaciones más complejas y realistas, así como permitir al usuario acceder a descripciones e información de forma dinámica.

---

## Conclusión

Este proyecto ha sido un desafío significativo, requiriendo un entendimiento profundo de la lógica asincrónica, la programación orientada a objetos y la manipulación de estructuras complejas. Aunque aún es una versión preliminar, representa una base sólida para explorar las exigencias de la programación con javascript.
