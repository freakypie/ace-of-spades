var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class DrawRule extends Rule {
  execute() {
    // from deck
    var here = this.stack(
      this.options.from.area, this.options.from.group, this.options.from.stack);
    // to deck
    var there = this.stack(
      this.options.to.area, this.options.to.group, this.options.to.stack);
    console.log(here, there);
    here.top().raise(100).move(there);
  }
}

module.exports = DrawRule;
