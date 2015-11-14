var Backbone = require("backbone");
var CardList = require("./card_list");


class Area extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      default: false,
      player: null,
      card_lists: new CardList.collection()
    }
  }
}

module.exports = Area;
