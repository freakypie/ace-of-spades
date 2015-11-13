var $ = require("jquery");
window.jQuery = $;
window.$ = $;

var _ = require("underscore");

var BaseView = require("./views/base");


class Main extends Backbone.View {
  get el() {
    return "body";
  }
}

window.Main = Main;
