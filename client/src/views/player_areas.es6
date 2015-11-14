var bv = require("backbone_views");
var _ = require("underscore");
var log = require("debug")("majkin");


class CardItem extends bv.DetailView {
  get tagName() {
    return "card-element";
  }
  initialize(options) {
    this.parent = options.parent;
    super.initialize(options);
    this.listenTo(this.model, "change", function() {
      this.render();
    });
  }
  render() {
    this.el.faceup = this.model.attributes.faceup;
    this.el.front = this.model.attributes.front;
    this.el.name = this.model.attributes.name;
    this.el.base_level = this.model.attributes.lvl;
    this.el.description = this.model.attributes.flavor_text;
    return this;
  }
}


class CardListItem extends bv.ListView {
  get tagName() {
    return "deck-element";
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

class HandListView extends CardListItem {
  get tagName() {
    return "hand-element";
  }
  getCollection() {
    this.collection = game.player.get("hand");
  }
}


class PlayerAreaItemView extends bv.ListView {
  get mixins() {
    return [bv.Composite];
  }
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
      <div class="hand">
      </div>
    `);
  }
  get views() {
    return {
      ".hand": HandListView
    }
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
