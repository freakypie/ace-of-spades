var _ = require("underscore");


class Rule {
  get players() {
    return this.game.players.models;
  }

  constructor(options={}) {
    this.game = options.game;
    this.initialize(options);
    this.options = options;
  }
  initialize() {}
  execute() {}
  createStack(name, options) {
    var stack = document.createElement("stack-element");
    stack.id = name;
    // TODO: set options
    return stack;
  }
  stack(options) {
    var container = null;
    if (! options.player) {
      container = document.querySelector("#temp-stacks");
    } else {
      container = document.querySelector("#player-areas");
      var playerArea = container.querySelector("#player-" + options.player);
      if (! playerArea) {
        playerArea = container.appendChild(document.createElement("div"));
        playerArea.id = "player-" + options.player;
      }
      container = playerArea;
    }
    var groupName = options.group || "default";
    var group = container.querySelector("#" + groupName);
    if (! group) {
      group = container.appendChild(document.createElement("div"));
      group.id = groupName;
    }
    // TODO: actually use area and group
    var stack = group.querySelector("#" + options.name);
    if (! stack) {

      // TODO: append to a game element
      stack = this.createStack(options.name);
      group.appendChild(stack);
    }
    return stack;
  }

  static get registry() {
    if (! this._registry) {
      this._registry = {};
    }
    return this._registry;
  }
  static register(name, rule) {
    this.registry[name] = rule;
  }
  static load(options) {
    return new (this.registry[options.rule])(options);
  }
}

module.exports = Rule;
