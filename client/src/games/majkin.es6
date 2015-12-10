var log = require("debug")("majkin");
var queue = require("queue");
var _ = require("underscore");

var BaseGame = require("./base");
var Card = require("../models/card");

var PopulateStackRule = require("../rules/populate_stack");
var DealRule = require("../rules/deal");
var Rule = require("../rules/base");

Rule.register("create-stack", PopulateStackRule);
Rule.register("deal", DealRule);
Rule.register("signal", require("../rules/signal"));


class MajkinGame extends BaseGame {
  get rules() {
    return {
      'setup': [
        // create bad stuff deck, discard and event deck
        {'rule': 'create-stack',
         'area': 'main', 'group': 'badness', 'name': 'draw', 'source': 'badness'},
        {'rule': 'create-stack',
         'area': 'main', 'group': 'badness', 'name': 'discard'},
        {'rule': 'create-stack',
         'area': 'main', 'group': 'event', 'name': 'draw', 'source': 'event'},

        // create play area and hand for each player
        // deal 5 cards to each player
        {'rule': 'deal', num: 3, max: 3,
         "from": {area:"main", "group": "badness", name: "draw"},
         "to": {"group": "default", name: "hand"}},
        // TODO: DealRule(max=5)

        // pick random player to start
        // TODO: RandomStartRule

        // start round
        {'rule': 'signal', 'name': 'round'},
      ],
      'main:badness:draw empty': [
        // flip discard
        // shuffle discard
        // move discard to draw
      ],
      'round': [
        // draw an event card to the event discard pile
        // players draw to 5 max
        // TODO: DealRule(max=5)
      ],
      'turn': [
        // activate action: forfeit
        // after thirty seconds: forfeit
      ],
      'card': [
        // cancel turn timeout
        // place card on discard pile
        // activate action: challenge
      ],
      'forfeit': [
        // take event card
        // check winning conditions
        // advance next player
      ],
      'challenge': [
        // add vote
        // check challenge conditions
        // advance next player
      ]
    };
  }
  setup() {
    this.perform('setup');
  }
  perform(rules) {
    for (let rule of this.rules[rules]) {
      // TODO: set context data like game
      rule.game = this;
      Rule.load(rule).execute();
    }
  }
  start() {

  }
}

module.exports = MajkinGame;
