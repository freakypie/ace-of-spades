var $ = require("jquery");
window.jQuery = $;
window.$ = $;

var _ = require("underscore");
var log = require("debug")("main");

var bv = require("backbone_views");
var MajkinGame = require("./games/majkin");


class Main extends bv.MixinView {
  get mixins() {
    return [bv.Composite];
  }

  get el() {
    return "#game";
  }

  get views() {
    return {
      "#players": require("./views/players"),
      "#player-areas": require("./views/player_areas"),
      "#hand": require("./views/hand"),
    };
  }

  initialize(options) {
    super.initialize(options);
    log("starting main application");
    this.setupWebsockets();
    this.game = new MajkinGame(this);
    window.game = this.game;
    this.renderViews();

    _.delay(() => {
      this.game.start();
    }, 1000);
  }

  setupWebsockets() {
    var socket = io.connect({transports: ['websocket']});
    this.socket = socket;
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
}

window.Main = Main;
