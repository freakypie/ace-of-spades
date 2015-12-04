var bv = require("backbone_views");
var CardItem = require("./card_item");


class CardListItem extends bv.ListView {
  get tagName() {
    return "stack-element";
  }
  getListElement() {
    return this.$el;
  }
  get itemViewClass() {
    return CardItem;
  }
  initialize(options) {
    // this.listenTo(this.model, "change", function() {
    //   this.render()
    // });
    this.getCollection();
    super.initialize(options);
  }
  getCollection() {
    this.collection = this.model.get("cards");
  }
}

module.exports = CardListItem;
