var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


class TimeoutRule extends Rule {
  execute() {
    this.log(`timeout ${this.options.name || "default"}`);
    this.__timeout = null;
    return new Promise(function(resolve, reject) {
      var __timeout = setTimeout(() => {
        this.log("timeout finished");
        resolve();
      }, this.options.time);
      this.game.listenToOnce(this, "timeout:cancel", function() {
        clearTimeout(__timeout);
        this.log("timeout canceled");
        resolve();
      });
    }.bind(this));
  }
}

module.exports = TimeoutRule;
