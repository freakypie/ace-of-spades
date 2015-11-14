var bv = require("backbone_views");

var CardListItem = require("./card_list_item");
var CardItem = require("./card_item");


class HandView extends bv.ListView {
  get tagName() {
    return "hand-element";
  }
  get itemViewClass() {
    return CardItem;
  }
  getListElement() {
    return this.$el;
  }
  initialize(options) {
    this.collection = game.player.get("player_hand").get("cards");
    console.log(this.collection);
    super.initialize(options);
  }
}

module.exports = HandView;
