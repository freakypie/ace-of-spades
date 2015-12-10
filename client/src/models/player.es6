var Backbone = require("backbone");
var bv = require("backbone_views");
var store = require("store");
var log = require("debug")("player");
var _ = require("underscore");

var Stack = require("./stack");
var Area = require("./area");


class Player extends bv.BaseModel {
  get defaults() {
    return {
      name: "unnamed",
      lvl: 1,
      host: false,
      properties: {},
    };
  }

  initialize(options) {
    super.initialize(options);

    // TODO: sync all player collections to the game area list
    this.area = new Area();

    // TODO: use a flag and only do this if it is the player (not a cpu)
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
    this.listenTo(this, "change:host", function() {
      console.log("user changed", this.attributes.host);
    });
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
