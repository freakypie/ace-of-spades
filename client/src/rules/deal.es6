var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class DealRule extends Rule {
  execute() {
    // from deck
    var source = this.stack(this.options.from);
    var dest = null;
    for (let x=0; x<this.options.num; x++) {
      for (let player of this.players) {
        this.options.to.player = player.id;
        dest = this.stack(this.options.to);
        source.top().raise(100).move(dest);
      }
    }
  }
}

module.exports = DealRule;
