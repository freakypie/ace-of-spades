var BaseGame = require("./base");

class MajkinGame extends BaseGame {
  initialize() {
    // start game ("game:start" signal is sent by base)

    // DEBUG: generate arbitrary cards

    // deal everyone a single card face up from central deck
    for (var player in players) {
      var drawn_card = this.central_deck().draw();
      this.player_creature(
        player,
        new Stack(
          {
            card_instances: [drawn_card],
            controller: player,
          }
        )
      );
    }

    // initialize enemy creature stack
    this.enemy_creature(new Stack());

    this.play();
  }

  play() {
    // cycle turn through each player
    for (var player in players) {
      //if monster deck is empty
      if (this.central_deck().size() <= 0) {
        this.central_deck().place_on_bottom(
          this.discard_pile().draw_all()
        );
      }

      // turn over top card from central deck (deck monster)
      this.enemy_creature().place_on_top(this.central_deck().draw());

      // if player level + player monster level >= deck monster level
      if(this.enemy_creature()[0].properties['lvl'] < this.player_creature(player)[0].properties['lvl'] + player.properties['lvl']) {
        // player gains a level
        player.properties['lvl'] ++;
      }

      // put enemy monster in discard pile
      this.central_deck().place_on_bottom(
        this.enemy_creature().draw_all()
      );

      if (player.properties['lvl'] >= 10){
        // end game
        return player;
      }
    }
  }

  central_deck() {
    if (!0 in this.stacks){
      //TODO: better initialization
      this.stacks[0] = new Stack(
        {
          name: "central_deck",
          card_instances: [],
          face_up: false,
          deck: true
        }
      );
    }
    return this.stacks[0];
  }

  // stack get/set methods (so that we don't screw up a key name)
  player_creature(player) {
    return this.stacks['player_creature'+player.id];
  }

  player_creature(player, stack) {
    return this.stacks['player_creature'+player.id] = stack;
  }

  enemy_creature() {
    return this.stacks['enemy_creature'];
  }

  enemy_creature(stack) {
    return this.stacks['enemy_creature'] = stack;
  }

  discard_pile() {
    return this.stacks['discard_pile'];
  }

  discard_pile(stack) {
    return this.stacks['discard_pile'] = stack;
  }

}

module.exports = MajkinGame;
