var _ = require("underscore");
var debug = require("debug");


class Rule {
  get players() {
    return this.game.players;
  }
  get name() {
    return "base";
  }
  static get logger() {
    if (! this._log) {
      this._log = debug("rule:" + this.name);
    }
    return this._log;
  }

  constructor(options={}) {
    _.extend(this, Backbone.Events);
    this.game = options.game;
    this.initialize(options);
    this.log = this.constructor.logger;
    this.options = options;
  }
  initialize() {}
  execute() {
    // OVERRIDE THIS, return a promise
  }
  destroy() {}
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
      if (_.isObject(options.player)) {
        this.log(options.player);
        container = this.players.findWhere(options.player).area;
      } else {
        container = this.players.findWhere({id: options.player}).area;
      }
    } else {
      container = this.game.center;
    }

    // get group
    var groupName = options.group || "default";
    var name = `${groupName}:${options.name}`;
    // var group = container.stacks.findWhere({name: groupName});
    // if (! group) {
    //   this.log(`creating group "${groupName}" in area`, container.attributes.name);
    //   group = container.stacks.add({name: groupName});
    // }

    // get stack
    var stack = container.stacks.findWhere({name: name});
    if (! stack) {
      this.log(`creating stack "${name}" in area`, container.attributes.name);
      stack = container.stacks.add({name: name});
    }
    return stack;
  }
  conditions(conditions) {
    // TODO: optimize
    if (conditions) {
      var funcs = {
        "stack-size-gte": function(options) {
          var stack = this.stack(options.stack);
          var value = options.value;
          this.log("comparing stack size", stack.cards.length, value);
          return stack.cards.length > value;
        }
      }
      let func = null;
      for (let cond of conditions) {
        func = funcs[cond.condition].bind(this);
        if (! func(cond)) {
          this.log("failed condition", cond.condition);
          return false;
        }
      }
    }
    this.log("condition succeeded");
    return true;
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
