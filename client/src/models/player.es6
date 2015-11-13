var Backbone = require("backbone");


class Player extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed"
    }
  }
}

module.exports = Player;
