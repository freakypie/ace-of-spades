var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class MessageRule extends Rule {
  execute() {
    this.log(this.options.message);
  }
}

module.exports = MessageRule;
