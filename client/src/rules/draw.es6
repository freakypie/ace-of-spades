var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class DrawRule extends Rule {
  get name() {
    return "draw";
  }

  execute() {
    // from deck
    var here = this.stack(this.options.from);

    // to deck
    var there = this.stack(this.options.to);

    this.log(`drawing one card from ${this.options.from.name} to ${this.options.to.name}`);
    there.cards.shift(here.cards.unshift());
  }
}

module.exports = DrawRule;
