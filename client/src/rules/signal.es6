var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class SignalRule extends Rule {
  execute() {
    this.log(`signaling ${this.options.name}`);
    if (this.conditions(this.options.conditions)) {
      this.game.perform(this.options.name);
    }
  }
}

module.exports = SignalRule;
