var _ = require("underscore");


class Rule {
  get players() {
    return this.game.players;
  }

  initialize(options={}) {
    _.extend(this, options);
  }
  execute() {

  }
  stack(area, group, name) {

  }
  playerStack(player, group, name) {

  }
}

module.exports = Rule;
