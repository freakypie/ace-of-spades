var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class SignalRule extends Rule {
  execute() {
    this.log(`signaling ${this.options.name}`);
    this.game.perform(this.options.name);
  }
}

module.exports = SignalRule;
