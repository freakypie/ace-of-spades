var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class ClearQueueRule extends Rule {
  execute() {
    this.log("should clear queue now");
    this.game.ruleQueue.clear();
  }
}

module.exports = ClearQueueRule;
