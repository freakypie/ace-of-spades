var Backbone = require("backbone");
var _ = require("underscore");

var Rule = require("./base");
var Card = require("../models/card");


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
        el = new Card({id: card.name});

        // TODO: set card traits
        stack.cards.unshift(el);
      }
    }
    this.log(`${this.options.name} has ${stack.cards.length} cards`);
  }
}

module.exports = PopulateStackRule;
