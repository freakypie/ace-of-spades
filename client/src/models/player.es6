var Backbone = require("backbone");
var store = require("store");
var log = require("debug")("player");
var _ = require("underscore");

var CardList = require("./card_list");


class Player extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      lvl: 1,
      properties: {},
    };
  }

  initialize(options) {
    super.initialize(options);
    this.attributes.player_hand = new CardList();

    log("local", localStorage.player);
    log("store", store.get("player", {}));

    if (! this.attributes.id) {
      this.loadSession();
      if (! this.attributes.id) {
        this.set({id: Math.floor(Math.random() * 10000)});
        this.set({name: this.attributes.id});
        this.saveSession();
      }
    }

    // if the player is updated store locally
    this.listenTo(this, "change:name", function(e) {
      if (this.me) {
        log("saving player", e);
        this.saveSession();
      }
    });
  }

  get me() {
    return game.player.id == this.id;
  }

  loadSession() {
    this.set(store.get("player", {}));
  }
  saveSession() {
    store.set("player", this.toJSON());
  }
}

module.exports = Player;
