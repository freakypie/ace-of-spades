var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class ModifyPlayerRule extends Rule {
  execute() {
    var player = this.players.findWhere(this.options.filters);
    if (this.options.which == "random") {
      this.log(`choosing random player`);
      player = this.players.sample();
    }
    else if (this.options.which == "next") {
      var index = (this.players.indexOf(player) + 1) % this.players.length;
      player = this.players.at(index);
    }

    if (player) {
      player.set(this.options.data);
      this.log(`player ${player.id} marked`, this.options.data);
      this.log('player stats', player.attributes);
    } else {
      this.log(`player not found to mod`, this.options.data);
    }
  }
}

module.exports = ModifyPlayerRule;
