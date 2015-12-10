var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class ActivateActions extends Rule {
  execute() {
    for (let player of this.players.where(this.options.filters || {})) {
      this.log(`enabling action type ${this.options.name} for ${player.id}`);
      player.set({
        actions: player.get('actions').concat(this.options.actions)
      });
    }
  }
}

module.exports = ActivateActions;
