var BaseGame = require("./base");

class MajkinGame {
  initialize() {
    // start game ("game:start" signal is sent by base)

    // DEBUG: Add players to the game arbitrarily
    // DEBUG: generate arbitrary cards

    // deal cards to a central deck

    // deal everyone a single card face up from central deck
    // select a random player to start
    // cycle turn through each player
    // turn:
      // turn over top card from central deck (deck monster)
      // if player level + player monster level >= deck monster level
        // player gains a level
    // endturn:
      // if player level >= 10
        // end game
  }
}

module.exports = MajkinGame;
