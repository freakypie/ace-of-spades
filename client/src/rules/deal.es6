var Backbone = require("backbone");
var _ = require("underscore");
var queue = require("queue");

var Rule = require("./base");


class DealRule extends Rule {
  get name() {
    return "deal";
  }

  execute() {
    // TODO: implement max restriction
    // from deck
    var source = this.stack(this.options.from);
    var dest = null;
    var rule = this;

    rule.log("dealing from", rule.options.from);
    _.range(rule.options.num).forEach(function(x) {
      rule.players.forEach(function(player) {
        rule.log(`dealing to player ${player.attributes.name} in `, rule.options.to);
        rule.options.to.player = player.id;
        dest = rule.stack(rule.options.to);
        var card = source.cards.shift();
        dest.cards.unshift(card);
      });
    });
  }
}

module.exports = DealRule;
