var Backbone = require("backbone");
var Stack = require("../models/stack");


export default class BaseGame {

  constructor() {
    this.players = new Backbone.Collection();
    this.stacks = new Backbone.Collection({model: Stack});

    this.listenTo(this.players, "all", function(event, model) {
      // window.app.socket.send(event,
    });

    initialize();
    this.trigger(this, "game:started");
  }

  initialize() {
    // do game rules

  }
}
