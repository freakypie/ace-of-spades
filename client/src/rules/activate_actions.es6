var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class ActivateActions extends Rule {
  get name() {
    return "activate-actions";
  }
  
  execute() {
    for (let player of this.players.where(this.options.filters || {})) {
      this.log(`enabling action type ${this.options.name} for ${player.id}`);
      player.set({
        actions: player.get('actions').concat(this.options.actions)
      });
    }
    this.log("actions enabled");
  }
}

module.exports = ActivateActions;
