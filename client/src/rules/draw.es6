var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class DrawRule extends Rule {
  execute() {
    // from deck
    var here = this.stack(this.options.from);

    // to deck
    var there = this.stack(this.options.to);

    if (here.cards.length > 0) {
      this.log(`${this.options.from.name} has ${here.cards.length} cards`);
      this.log(`${this.options.to.name} has ${there.cards.length} cards`);
      this.log(`drawing one card from ${this.options.from.name} to ${this.options.to.name}`);
      there.cards.unshift(here.cards.shift());
      this.log(`${this.options.from.name} has ${here.cards.length} cards`);
      this.log(`${this.options.to.name} has ${there.cards.length} cards`);
    } else {
      this.log(`${this.options.from.name} has no more cards to draw from`);
    }
  }
}

module.exports = DrawRule;
