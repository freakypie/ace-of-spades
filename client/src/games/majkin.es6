var log = require("debug")("majkin");
var queue = require("queue");
var _ = require("underscore");

var BaseGame = require("./base");
var Card = require("../models/card");
var CardList = require("../models/card_list");


class MajkinGame extends BaseGame {
  start() {
    // generate arbitrary cards
    var cards = new Card.collection(require("json!../resources/cards.json"))
    var central_area = this.areas.add({name: "central_deck", default: true});

    cards.reset(cards.shuffle(), {slient: true});

    this.card_lists.add({
      area: central_area,
      name: "central_deck",
      cards: cards,
      face_up: false,
      deck: true
    });
    this.card_lists.add({
      area: central_area,
      name: "discard_pile",
      face_up: true,
      deck: true
    });

    // deal everyone a single card face up from central deck
    for (var player of this.players.models) {
      log(`dealing to player ${player.attributes.name}`);
      var drawn_card = this.central_deck().draw();
      var area = this.areas.findWhere({player_id: player.id});

      // TODO: create this when the player connects
      this.card_lists.add({
        area: area,
        name: "enemy_creature",
        controller_id: player.id,
        face_up: true,
        deck: false
      });
      var card_list = this.card_lists.add({
        area: area,
        name: "player_creature",
        controller: player,
        controller_id: player.id,
        face_up: true,
        deck: false
      });
      card_list.get("cards").add(drawn_card);
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
      console.log("turn ended");
      _.delay(() => {
        this.queueTurns(q, cb);
      }, 1000);
    });

    cb();
  }

  turn(player, cb) {
    var winner = null;
    // if monster deck is empty
    if (this.central_deck().size() <= 0) {
      log("fliping discard pile");
      this.central_deck().place_on_bottom(
        this.discard_pile().shuffle().draw_all()
      );
    }

    // turn over top card from central deck (deck monster)
    var enemy_card_list = this.enemy_creature(player);
    var enemy_creature = this.central_deck().draw();
    enemy_creature.set({faceup: false});
    enemy_card_list.place_on_top(enemy_creature);

    _.delay(() => {
      enemy_creature.set({faceup: true});

      // if player level + player monster level >= deck monster level
      var player_card_list = this.player_creature(player);
      if (player_card_list) {
        var player_creature = player_card_list.top();
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

        if (player.attributes.lvl >= 10){
          // end game
          winner = player;
        }
      } else {
        log("player is missing a monster", player.attributes.name);
      }
      _.delay(() => {
        // put enemy monster in discard pile
        this.discard_pile().place_on_bottom(
          enemy_card_list.draw_all()
        );
        cb(winner);
      }, 1000);
    }, 1000);
  }

  central_deck() {
    return this.card_lists.findWhere({name: "central_deck"});
  }

  discard_pile() {
    return this.card_lists.findWhere({name: "discard_pile"});
  }

  enemy_creature(player) {
    return this.card_lists.findWhere({
      name: "enemy_creature",
      controller_id: player.id
    });
  }

  player_creature(player) {
    return this.card_lists.findWhere({
      name: "player_creature",
      controller_id: player.id
    });
  }
}

module.exports = MajkinGame;
