var BaseGame = require("./base");

var Card = require("../models/card");
var CardList = require("../models/cardlist");

class MajkinGame extends BaseGame {
  start() {
    // generate arbitrary cards
    //TODO: better initialization
    var cards_json = require("json!../resources/cards.json");

    var cards = []

    for(var index in cards_json) {
      cards.push(
        new Card(
          cards_json[index]
        )
      )
    }

    this.cardlists.add(
      {
        name: "central_deck",
        cards: [],
        face_up: false,
        deck: true
      }
    );
    this.cardlists.add(
      {
        name: "discard_pile",
        cards: [],
        face_up: true,
        deck: true
      }
    );
    this.cardlists.add(
      {
        name: "enemy_creature",
        cards: [],
        face_up: true,
        deck: false
      }
    );

    // deal everyone a single card face up from central deck
    for (var player in this.players) {
      var drawn_card = this.central_deck().draw();

      this.cardlists.add(
        {
          name: "player_creature"+player.id,
          controller: player,
          cards: [drawn_card],
          face_up: true,
          deck: false
        }
      );
    }

    this.play();
  }

  play() {
    // cycle turn through each player
    for (var player in this.players) {
      //if monster deck is empty
      if (this.central_deck().size() <= 0) {
        this.central_deck().place_on_bottom(
          this.discard_pile().draw_all()
        );
      }

      // turn over top card from central deck (deck monster)
      this.enemy_creature().place_on_top(this.central_deck().draw());

      // if player level + player monster level >= deck monster level
      var enemy_creature = this.enemy_creature().top();

      var player_creature = this.player_creature(player).top();

      if(enemy_creature.attributes.properties['lvl'] < player_creature.attributes.properties['lvl'] + player.attributes.properties['lvl']) {
        // player gains a level
        player.attributes.properties['lvl'] ++;
      }

      // put enemy monster in discard pile
      this.central_deck().place_on_bottom(
        this.enemy_creature().draw_all()
      );

      if (player.attributes.properties['lvl'] >= 10){
        // end game
        return player;
      }
    }
  }

  central_deck() {
    return this.cardlists.at(0);
  }

  discard_pile() {
    return this.cardlists.at(1);
  }

  //discard_pile(cardlist) {
  //  return this.cardlists['discard_pile'] = cardlist;
  //}

  enemy_creature() {
    return this.cardlists.at(2);
  }

  //enemy_creature(cardlist) {
  //  return this.cardlists['enemy_creature'] = cardlist;
  //}

  // cardlist get/set methods (so that we don't screw up a key name)
  player_creature(player) {
    return this.cardlists.at(3+player.id);
  }

  //player_creature(player, cardlist) {
  //  return this.cardlists['player_creature'+player.id] = cardlist;
  //}

}

module.exports = MajkinGame;
