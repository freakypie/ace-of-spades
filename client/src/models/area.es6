var Backbone = require("backbone");
var Stack = require("./stack");


class Area extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      default: false,
      player: null,
      stacks: new Stack.collection()
    }
  }
}

module.exports = Area;
