const { handleMenuSelection } = require("./source/menuselection.js");

async function modeOfGame() {
    console.log(`
          ╔══════════════════════════════════════════════════════════╗
          ║         Pray thee: enter the Malkavian Dilemma,          ║
          ║   where thy wits shall be seared and thy brains cooked.  ║
          ╚══════════════════════════════════════════════════════════╝
        `);

    let continueGame = true;
    while (continueGame) {
        continueGame = await handleMenuSelection();
    }
}

modeOfGame();

