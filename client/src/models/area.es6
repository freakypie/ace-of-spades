var Backbone = require("backbone");
var bv = require("backbone_views");

var Stack = require("./stack");


class Area extends bv.BaseModel {
  get defaults() {
    return {
      name: "unnamed",
      default: false,
      player: null,
    }
  }
  initialize(options) {
    super.initialize(options);
    this.stacks = new Stack.collection();
  }
}

module.exports = Area;
