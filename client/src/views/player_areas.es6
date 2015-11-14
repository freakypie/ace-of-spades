var bv = require("backbone_views");
var _ = require("underscore");


class PlayerAreaItemView extends bv.ListView {

  get template() {
    return _.template(`
      <div>AREA: <%- player_id %></div>
      <div class="list decks">
      </div>
    `);
  }

  render(context) {
    if (! context) {
      context = {};
    }
    context.player = this.model.get("player");
    if (context.player) {
      context.player_id = context.player.id;
    } else {
      context.player_id = "central";
    }
    super.render(context);
    var player = this.model.get("player");
    if (player) {
      this.$el.attr("data-player", context.player_id);
    }

    // var numcards = Math.floor(Math.random() * 3) + 1;
    // var deck = this.$("deck-element").get(0);
    // for(var x=0; x<numcards; x++) {
    //   deck.add($("<card-element></card-element>").get(0));
    // }
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
