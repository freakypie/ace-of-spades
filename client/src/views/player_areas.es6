var bv = require("backbone_views");
var _ = require("underscore");
var log = require("debug")("majkin");
var CardListItem = require("./card_list_item");


class PlayerAreaItemView extends bv.ListView {
  get itemViewClass() {
    return CardListItem;
  }
  get listSelector() {
    return "decks";
  }
  get template() {
    return _.template(`
      <div class="decks">
      </div>
    `);
  }

  initialize(options) {
    this.collection = options.model.get("card_lists");
    super.initialize(options);
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
