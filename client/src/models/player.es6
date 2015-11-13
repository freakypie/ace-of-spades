var Backbone = require("backbone");
var store = require("store");
var log = require("debug")("player");


class Player extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed"
    }
  }

  initialize(options) {
    super.initialize(options);
    this.load();
    if (! this.attributes.id) {
      this.set({id: Math.floor(Math.random() * 10000)});
      this.set({name: this.attributes.id});
      this.save();
    }

    // if the player is updated store locally
    this.listenTo(this, "change", function(e) {
      log("saving player", e);
      this.save();
    });
  }

  get me() {
    return window.app.game.player.cid == this.cid;
  }

  load() {
    this.set(store.get("player", {}));
  }

  sync(method, model, options) {
    log("sync was called", method, model, options);
    if (method === "update") {
      store.set("player", model.toJSON());
    }
  }
}

module.exports = Player;
