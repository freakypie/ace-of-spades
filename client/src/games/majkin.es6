var BaseGame = require("./base");

var Stack = require("../models/stack");

class MajkinGame extends BaseGame {
  start() {
    // generate arbitrary cards
    //TODO: better initialization
    this.stacks.add(
      {
        name: "central_deck",
        cards: [],
        face_up: false,
        deck: true
      }
    );
    this.stacks.add(
      {
        name: "discard_pile",
        cards: [],
        face_up: true,
        deck: true
      }
    );
    this.stacks.add(
      {
        name: "enemy_creature",
        cards: [],
        face_up: true,
        deck: false
      }
    );

    // deal everyone a single card face up from central deck
    for (var player in players) {
      var drawn_card = this.central_deck().draw();

      this.stacks.add(
        {
          name: "player_creature"+player.id,
          controller: player,
          cards: [drawn_card],
          face_up: true,
          deck: false
        }
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
    return this.stacks[0];
  }

  discard_pile() {
    return this.stacks[1];
  }

  //discard_pile(stack) {
  //  return this.stacks['discard_pile'] = stack;
  //}

  enemy_creature() {
    return this.stacks[2];
  }

  //enemy_creature(stack) {
  //  return this.stacks['enemy_creature'] = stack;
  //}

  // stack get/set methods (so that we don't screw up a key name)
  player_creature(player) {
    return this.stacks[3+player.id];
  }

  //player_creature(player, stack) {
  //  return this.stacks['player_creature'+player.id] = stack;
  //}

}

module.exports = MajkinGame;
