var Backbone = require("backbone");
var _ = require("underscore");
var queue = require("queue");

var Rule = require("./base");


class DealRule extends Rule {
  get name() {
    return "deal";
  }

  execute() {
    var q = queue({concurrency: 1})

    // TODO: implement max restriction
    // from deck
    var source = this.stack(this.options.from);
    var dest = null;
    this.log("dealing from", this.options.from);
    _.range(this.options.num).forEach(function(x) {
      this.players.forEach(function(player) {
        q.push(function(x, done) {
          this.log(`dealing to player ${player.attributes.name} in `, this.options.to);
          this.options.to.player = player.id;
          dest = this.stack(this.options.to);
          source.top().move(dest);
          setTimeout(done, 100);
        }.bind(this, x));
      }.bind(this));
    }.bind(this));
    q.start();
  }
}

module.exports = DealRule;
