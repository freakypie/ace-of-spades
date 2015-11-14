var log = require("debug")("majkin");
var queue = require("queue");
var _ = require("underscore");

var BaseGame = require("./base");
var Card = require("../models/card");
var Stack = require("../models/stack");


class MajkinGame extends BaseGame {
  start() {
    // generate arbitrary cards
    //TODO: better initialization
    var cards = new Card.collection(require("json!../resources/cards.json"))

    this.stacks.add(
      {
        name: "central_deck",
        cards: cards.models,
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
    for (var player of this.players.models) {
      log(`dealing to player ${player.attributes.name}`);
      var drawn_card = this.central_deck().draw();

      this.stacks.add(
        {
          name: "player_creature"+player.id,
          controller: player,
          controller_id: player.id,
          cards: [drawn_card],
          face_up: true,
          deck: false
        }
      );
    }

    this.play();
  }

  play() {
    var q = queue({concurrency: 1});
    q.push(this.queueTurns.bind(this, q));
    q.start();
  }

  queueTurns(q, cb) {
    this.players.models.forEach((player) => {
      q.push((cb) => {
        this.turn(player, (winner) => {
          if (winner) {
            console.log("WE HAVE A WINNER!", winner);
            for(var x=0; x<q.length; x++) {
              q.pop();
            }
          }
          cb();
        });
      });
    });

    q.push((cb) => {
      console.log("turn ended, you need to add code to reset it");
      _.delay(() => {
        this.queueTurns(q, cb);
      }, 1000);
    });

    cb();
  }

  turn(player, cb) {
    log("taking turn", player.id)
    var winner = null;
    // if monster deck is empty
    if (this.central_deck().size() <= 0) {
      this.central_deck().place_on_bottom(
        this.discard_pile().draw_all()
      );
    }

    // turn over top card from central deck (deck monster)
    this.enemy_creature().place_on_top(this.central_deck().draw());

    // if player level + player monster level >= deck monster level
    var enemy_stack = this.enemy_creature();
    var enemy_creature = enemy_stack.top();
    var player_stack = this.player_creature(player);
    if (player_stack) {
      var player_creature = player_stack.top();
      var player_level = player_creature.attributes.lvl +
        player.attributes.lvl;
      var enemy_level = enemy_creature.attributes.lvl;
      if (enemy_level <= player_level) {
        // player gains a level
        player.attributes.lvl++;
        // trigger change
        player.set({lvl: player.attributes.lvl});
        log("player was victorious!", player.id, player.attributes.lvl);
      } else {
        log("player was defeated", player_level, enemy_level);
      }

      // put enemy monster in discard pile
      this.central_deck().place_on_bottom(
        this.enemy_creature().draw_all()
      );

      if (player.attributes.lvl >= 10){
        // end game
        winner = player;
      }
    } else {
      log("player is missing a monster", player.attributes.name);
    }
    cb(winner);
  }

  central_deck() {
    return this.stacks.findWhere({name: "central_deck"});
  }

  discard_pile() {
    return this.stacks.at(1);
  }

  //discard_pile(stack) {
  //  return this.stacks['discard_pile'] = stack;
  //}

  enemy_creature() {
    return this.stacks.findWhere({name: "enemy_creature"});
  }

  //enemy_creature(stack) {
  //  return this.stacks['enemy_creature'] = stack;
  //}

  // stack get/set methods (so that we don't screw up a key name)
  player_creature(player) {
    return this.stacks.findWhere({controller_id: player.id});
  }

  //player_creature(player, stack) {
  //  return this.stacks['player_creature'+player.id] = stack;
  //}

}

module.exports = MajkinGame;
