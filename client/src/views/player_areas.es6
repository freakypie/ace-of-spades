var bv = require("backbone_views");
var _ = require("underscore");


class PlayerAreaItemView extends bv.DetailView {
  get template() {
    return _.template(`
      <div>AREA: <%- player.id %></div>
      <div>
        <deck-element></deck-element>
      </div>
    `);
  }

  render(context) {
    super.render(context);
    this.$el.attr("data-player", this.model.get("player").id);

    var numcards = Math.floor(Math.random() * 3) + 1;
    var deck = this.$("deck-element").get(0);
    for(var x=0; x<numcards; x++) {
      deck.add($("<card-element></card-element>").get(0));
    }
    return this;
  }
}


class PlayerAreaListView extends bv.ListView {
  get itemViewClass() {
    return PlayerAreaItemView;
  }

  initialize(options) {
    this.collection = game.areas;
    super.initialize(options);
  }
}


module.exports = PlayerAreaListView;
