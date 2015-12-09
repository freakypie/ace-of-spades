var Backbone = require("backbone");
var _ = require("underscore");
var queue = require("queue");

var Rule = require("./base");


class DealRule extends Rule {
  execute() {
    var q = queue({concurrency: 1})

    // from deck
    console.warn("dealing");
    var source = this.stack(this.options.from);
    var dest = null;
    for (let x=0; x<this.options.num; x++) {
      this.players.forEach(function(player) {
        q.push(function(x, done) {
          console.info("dealing to player", player.id, "card", x);
          this.options.to.player = player.id;
          dest = this.stack(this.options.to);
          source.top().move(dest);
          setTimeout(done, 100);
        }.bind(this, x));
      }.bind(this));
    }
    q.start();
  }
}

module.exports = DealRule;
