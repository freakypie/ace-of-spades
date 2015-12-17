var Backbone = require("backbone");
var _ = require("underscore");
var store = require("store");
var log = require("debug")("base-game");

var Stack = require("../models/stack");
var Player = require("../models/player");
var Card = require("../models/card");
var Area = require("../models/area");


class BaseGame extends Backbone.Model {
  get defaults() {
    return {
      host: null,
      status: "pending",
      players: []
    };
  }

  constructor(app) {
    super();
    log("game is starting");
    this.app = app;
    this.socket = app.socket;
    var CardCollection = Backbone.Collection.extend({model: Card});
    this.center = new Area();
    this.players = Player.collection();
    this.cards = new CardCollection();

    // connection properties
    this.setupWebsocketEvents(this.socket);

    // TODO: download current collections
    // TODO: listen for connecting players
    // TODO: add the players to the players Collection
    // TODO: show the players on screen
    this.listenTo(this.players, "all", function(event, model) {
      // window.app.socket.send(event,
    });
    this.listenTo(this, "change:players", function(e) {
      // console.error("game players updated");
      // this.players.set(this.attributes.players);
      // this.setupPlayers();
    });

    // get or create the current player
    this.player = new Player({name: "you"});
    this.players.add(this.player);

    var cpu = new Player({id: 1, name: "cpu"});
    this.players.add(cpu);

    // TODO: detect if the game is on

    // connecting to server
    log("player is trying to connect");
    this.socket.emit("player", this.player.toJSON());
  }

  setupWebsocketEvents(socket) {
    var game = this;
    socket.on("player", function(data) {
      // console.log("player", data);
    });
    socket.on("game", function(data) {
      // console.log("game", data);
      game.set(data);
    });
    socket.on("game:event", function(data) {
      log("game:event", data);
      game.trigger(data.event, data);
    });
    socket.on("sync", function(data) {
      if (game.player.get("host")) {
        log("sync request", data);
        socket.emit("sync-response", {
          "cards": game.cards.toJSON(),
          "weapons": game.weapons.toJSON()
        });
      }
    });
    socket.on("sync-response", function(data) {
      log("sync response", data);
      if (! game.player.get("host")) {
        game.cards.set(data.cards);
        game.weapons.set(data.weapons);
      }
    });
  }

  setupPlayers() {
    // overide
  }

  /**
   * this is called when the host starts the game
   * This will lock the players array
   */
  start() {
    initialize();
    console.log(this.players.models);
    this.trigger(this, "game:started");
  }

  initialize() {
    // do game rules

  }
}

module.exports = BaseGame;
