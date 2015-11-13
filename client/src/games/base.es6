var Backbone = require("backbone");
var store = require("store");
var log = require("debug")("base-game");

var Stack = require("../models/stack");
var Player = require("../models/player");


export default class BaseGame {

  constructor(app) {
    this.app = app;
    this.socket = app.socket;
    this.players = new Backbone.Collection();
    this.stacks = new Backbone.Collection({model: Stack});

    // connection properties
    this.host = null;
    this.setupWebsocketEvents(this.socket);

    // TODO: download current collections
    // TODO: listen for connecting players
    // TODO: add the players to the players Collection
    // TODO: show the players on screen
    this.listenTo(this.players, "all", function(event, model) {
      // window.app.socket.send(event,
    });

    // get or create the current player
    this.player = new Player(store.get("player", {}));

    // TODO: detect if the game is on

    // connecting to server
    log("player is trying to connect");
    this.socket.emit("player", this.player.toJSON());
  }

  setupWebsocketEvents(socket) {
    socket.on("player", function(data) {
      console.log("player");
    });
  }

  /**
   * this is called when the host starts the game
   * This will lock the players array
   */
  start() {
    initialize();
    this.trigger(this, "game:started");
  }

  initialize() {
    // do game rules

  }
}
