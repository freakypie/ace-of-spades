var _ = require("underscore");
var debug = require("debug");


class Rule {
  get players() {
    return this.game.players;
  }
  get name() {
    return "base";
  }

  constructor(options={}) {
    this.game = options.game;
    this.initialize(options);
    this.log = debug("rule:" + this.name);
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
    // get area
    var container = null;
    if (options.player) {
      container = this.players.findWhere({id: options.player}).area;
    } else {
      container = this.game.center;
    }

    // TODO: get group
    // var groupName = options.group || "default";
    // var group = container.stacks.findWhere({name: groupName});
    // if (! group) {
    //   this.log(`creating group "${groupName}" in area`, container.attributes.name);
    //   group = container.stacks.add({name: groupName});
    // }

    // get stack
    var stack = container.stacks.findWhere({name: options.name});
    if (! stack) {
      this.log(`creating stack "${options.name}" in area`, container.attributes.name);
      stack = container.stacks.add({name: options.name});
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
