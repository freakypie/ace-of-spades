var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");


/**
 * keys for this rule:
 * - area
 * - group [default]
 * - stack
 * - source
 */
class PopulateStackRule extends Rule {

  execute() {
    // TODO: get target stack
    var stack = this.stack(this.options);
    if (this.options.source) {
      // TODO: fetch cards from a datasource

      var cards = require("json!../resources/cards.json");
      // cards.reset(cards.shuffle(), {slient: true});

      var el;
      for (let card of cards) {
        el = document.createElement("card-element");

        // TODO: set card traits
        stack.top(el);
      }
    }
  }
}

module.exports = PopulateStackRule;
