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
Rule.register("modify-player", require("../rules/modify_player"));
Rule.register("activate-actions", require("../rules/activate_actions"));


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
        {'rule': 'modify-player', 'which': 'random', 'data': {'active': true}},

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
        {'rule': 'signal', 'name': 'turn', 'message': 'starting round'},

        // restart round...
        // {'rule': 'signal', 'name': 'round'},
      ],
      'turn': [
        // activate action: forfeit
        {'rule': 'activate-actions', 'actions': ['forfeit', 'play-card'],
          filters: {active: true}},

        // TODO: after thirty seconds: forfeit
      ],
      'card': [
        // TODO: cancel turn timeout
        // TODO: place card on discard pile
        // TODO: activate action: challenge
      ],
      'forfeit': [
        // TODO: take event card
        // TODO: check winning conditions
        // TODO: advance next player
      ],
      'challenge': [
        // TODO: add vote
        // TODO: check challenge conditions
        // TODO: advance next player
      ],
      'next-turn': [
        // finish player turn
        {'rule': 'modify-player', 'filters': {active: true}, 'data': {'finished': true}},
        // set next player
        {'rule': 'modify-player', 'filters': {active: true}, 'which': 'next', 'data': {'active': true}},
        // end player turn
        {'rule': 'modify-player', 'filters': {finished: true}, 'data': {'finished': false, 'active': false}},

        // next turn... will cause infinite loop
        // {'rule': 'signal', 'name': 'turn'},
      ]
    };
  }
  setup() {
    this.perform('setup');
  }
  perform(rules) {
    for (let rule of this.rules[rules]) {
      // TODO: set context data like game
      // TODO: run each one at a time indepenedent of the for loop
      // this will enable us to do timed events
      // and optionally skip to other events without finishing the rest of the set
      rule.game = this;
      Rule.load(rule).execute();
    }
  }
  start() {

  }
}

module.exports = MajkinGame;
