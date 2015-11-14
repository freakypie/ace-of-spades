var bv = require("backbone_views");

var CardListItem = require("./card_list_item");


class HandView extends CardListItem {
  get tagName() {
    return "hand-element";
  }
  getCollection() {
    this.collection = game.player.get("hand");
  }
}

module.exports = HandView;
