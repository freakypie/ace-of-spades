var BaseGame = require("./base");

class MajkinGame extends BaseGame {
  initialize() {
    // start game ("game:start" signal is sent by base)

    // DEBUG: generate arbitrary cards

    // DEBUG: Add players to the game arbitrarily
    self.players[0] = new Player(
      {
        id: 0
      }
    );

    // deal everyone a single card face up from central deck
    for (var player in players) {
      var drawn_card = self.central_deck().draw();
      self.player_creature(
        player,
        new Stack(
          {
            card_instances: [drawn_card],
            controller: player,
          }
        )
      );
    }

    self.play();
  }

  play() {
    // select a random player to start
    // cycle turn through each player
    for (var player in players) {
      //if monster deck is empty
      if (self.central_deck().size() <= 0) {
        self.central_deck().place_on_bottom(
            self.discard_pile().draw_all()
        );
      }

      // turn over top card from central deck (deck monster)
      var drawn_card = self.central_deck().draw();
      enemy_creature(
          new Stack(
              {
                card_instances: [drawn_card],
              }
          )
      );

      // if player level + player monster level >= deck monster level
      if(self.enemy_creature()[0].properties['lvl'] < self.player_creature(player)[0].properties['lvl'] + player.properties['lvl']) {
        // player gains a level
        player.properties['lvl'] ++;
      }
      self.central_deck().place_on_bottom(
          self.enemy_creature().draw_all()
      )

      if (player.properties['lvl'] >= 10){
        // end game
        return player;
      }
    }
  }

  central_deck() {
    if (!0 in self.stacks){
      //TODO: better initialization
      self.stacks[0] = new Stack(
          {
            name: "central_deck",
            card_instances: [],
            face_up: false,
          }
      );
    }
    return self.stacks[0];
  }

  // stack get/set methods (so that we don't screw up a key name)
  player_creature(player) {
    return self.stacks['player_creature'+player.id];
  }

  player_creature(player, stack) {
    return self.stacks['player_creature'+player.id] = stack;
  }

  enemy_creature() {
    return self.stacks['enemy_creature'];
  }

  enemy_creature(stack) {
    return self.stacks['enemy_creature'] = stack;
  }

  discard_pile() {
    return self.stacks['discard_pile'];
  }

  discard_pile(stack) {
    return self.stacks['discard_pile'] = stack;
  }

}

module.exports = MajkinGame;
