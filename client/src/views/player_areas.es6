var bv = require("backbone_views");
var _ = require("underscore");


class PlayerAreaItemView extends bv.DetailView {
  get template() {
    return _.template("AREA: <%- player.id %>");
  }

  render(context) {
    super.render(context);
    this.$el.attr("data-player", this.model.get("player").id);
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
