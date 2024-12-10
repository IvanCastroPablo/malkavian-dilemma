# A Malkavian Dilemma

---

<p align="center">
  <img src="https://vdb.im/images/cards/set/jyhad/malkavianprank.jpg?v=2024-11-26" alt="Malkavian Prank Card" style="max-width:100%; height:auto;">
</p>

<p align="center">
<em><strong>Malkavian Prank</strong></em>
</p>
<p align="center">
<em>Master.</em>
</p>
<p align="center">
All other Methuselahs hold between 1 and 4 blood in their hands.<br>
You guess how much is in each Methuselah's hand individually.<br>
For each one you guess correctly, you gain that much pool from his or her blood pool.<br>
If you guess incorrectly, he or she gains that much pool from the blood bank.
</p>

---
## Contexts and Goals...

<p align="justify">
This project is inspired by the work of Robert Axelrod and his analysis of the iterated prisoner's dilemma, as presented in his book <em>The Evolution of Cooperation</em>. The central idea is to model strategic decisions around the card <em>Malkavian Prank</em>, a mechanic from the game <em>Vampire: The Eternal Struggle</em> that involves guessing how many counters each opponent has in their hand. Depending on the outcome, the player can gain or lose resources (<em>pool</em>).  
</p>

<p align="justify">
The main target of this program is to simulate multiple iterations of this mechanic to optimize the player’s decisions, creating different strategies for both the acting player and the opponents. Through this approach, the goal is to explore optimal decision-making dynamics within a game theory mindset.
</p>

<p align="justify"> What drives me about this project is the complexity of game theory itself—a discipline that merges strategy, psychology, and mathematics to analise how individuals and groups make decisions in real life scenarios. Like in Axelrod's experiments, where strategies like "tit-for-tat" emerged as unexpectedly robust, I wanted to create a space to see how similar principles would play out in this gaming context. There’s something captivating about watching cooperation and competition interact, and this program is my attempt to bring that to life. </p> 

<p align="justify">
It is worth highlighting, in these times, the minimal intervention of artificial intelligence, used mainly for documentation. I must have written at least 95% of this code myself!
</p>

---

## Technical Details

### 1. **Project Structure**  

<p align="justify">
The project is entirely developed in <strong>Node.js</strong>, divided into several JavaScript files that encapsulate different aspects of the logic:
</p>

- **`main.js`**: Entry point that initializes the program flow, manages global states, and orchestrates interactions between components.
- **`functions.js`** and **`utils.js`**: Sets of utility functions for repetitive or specialized operations, such as validations, data processing, and handling data structures.
- **`classes.js`**: Defines the necessary classes to model the players (*Methuselahs*), their behaviors, and the game elements.
- **`iterator.js`**: Implements custom iterators to handle data volumes and simulate turns efficiently and in a controlled manner.

### 2. **Game Logic**  
<p align="justify">
The program creates four objects representing the opponents (*Methuselahs*) and one for the main player. The card's rules are implemented through iterative simulations that:
</p>
<ul>
<li>Define different decision strategies for each player.</li>
<li>Calculate <em>pool</em> gains or losses based on the decisions made.</li>
<li>Adjust the opponents' behaviors according to the interaction history, simulating a dynamic and competitive environment.</li>
</ul>

### 3. **Node.js Technologies Usage**  
<p align="justify">
- <strong>Node.js Modules</strong>: The module system is used to divide the code into manageable and reusable parts.<br>
- <strong>Events</strong>: Asynchrony is handled through events and callbacks, ensuring that simulations flow in an orderly manner.<br>
- <strong>Streams and Iterators</strong>: To handle multiple simulations efficiently without overloading memory.<br>
- <strong>File System (`fs`) and Path</strong>: Essential for saving and managing saved files.<br>

</p>

---

## Achievements and Next Steps

### **Overcomed Challenges:**
- Modeling abstract game rules and converting them into functional code.
- Managing asynchronous flow of multiple simulations efficiently.
- Creating a flexible system that allows new strategies to be implemented easily.
- Successfully saving a simulation state for later use.

### **Next Steps:**
<p align="justify">
- <strong>Web Implementation:</strong> Migrating the project to a graphical web interface. Technologies like <strong>Express.js</strong> for the backend and a framework like <strong>React.js</strong> for the user interface are planned.<br>
- <strong>Expanding Game Modes:</strong> Adding more strategies for players and other simulation modes, allowing the study of more complex and realistic variations, as well as enabling users to access descriptions and information dynamically.
</p>

---

## Conclusion

<p align="justify">
This project has been a significant challenge, requiring a deep understanding of asynchronous logic, object-oriented programming, and the manipulation of complex structures. Although it is still a preliminary version, it represents a solid foundation for exploring the demands of programming with JavaScript.
</p>

## Usage

<p align="justify">
To run the project, simply open a terminal and navigate to the directory where the `main.js` file is located. Then, execute the following command:
</p>

```bash
node main.js
