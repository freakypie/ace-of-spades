var bv = require("backbone_views");
var _ = require("underscore");


class CardListItem extends bv.DetailView {
  get tagName() {
    return "deck-element";
  }
  initialize() {
    this.listenTo(this.model, "change", function() {
      this.render()
    });
    this.listenTo(this.model.get("cards"), "reset", function() {
      this.render()
    });
    this.listenTo(this.model.get("cards"), "update", function() {
      this.render()
    });
  }
  render() {
    var deck = this.el;
    var card = null;

    deck.clear();
    for(var x=0; x<this.model.get("cards").length; x++) {
      var card = this.model.get("cards").at(x).toJSON();
      deck.add(card);
    }
    return this;
  }
}


class PlayerAreaItemView extends bv.ListView {

  get itemViewClass() {
    return CardListItem;
  }

  get listSelector() {
    return "decks";
  }

  get template() {
    return _.template(`
      <div>AREA: <%- player_id %></div>
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
