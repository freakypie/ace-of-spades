var Backbone = require("backbone");
var _ = require("underscore");
var store = require("store");
var log = require("debug")("base-game");

var CardList = require("../models/card_list");
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
    var PlayerCollection = Backbone.Collection.extend({model: Player});
    var CardListCollection = Backbone.Collection.extend({model: CardList});
    var CardCollection = Backbone.Collection.extend({model: Card});
    var AreaCollection = Backbone.Collection.extend({model: Area});
    this.players = new PlayerCollection();
    this.areas = new AreaCollection();
    this.card_lists = new CardListCollection();
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
      log("game players updated");
      this.players.reset(this.attributes.players);
      this.setupPlayers();
    });

    // get or create the current player
    this.player = new Player();

    // TODO: detect if the game is on

    // connecting to server
    log("player is trying to connect");
    this.socket.emit("player", this.player.toJSON());
  }

  setupWebsocketEvents(socket) {
    var game = this;
    socket.on("player", function(data) {
      console.log("player", data);
    });
    socket.on("game", function(data) {
      console.log("game", data);
      game.set(data);
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
    this.trigger(this, "game:started");
  }

  initialize() {
    // do game rules

  }
}

module.exports = BaseGame;
