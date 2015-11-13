var bv = require("backbone_views");

class PlayerItemView extends bv.DetailView {
  get tagName() {
    return "player-element";
  }

  render() {
    this.el.name = this.model.attributes.name;
    var cat_id = this.model.attributes.id % 10;
    this.el.avatar = `http://lorempixel.com/100/100/cats/${cat_id}/`;
    this.el.connected = "connected";

    return this;
  }
}


class PlayerListView extends bv.ListView {
  get itemViewClass() {
    return PlayerItemView;
  }

  initialize(options) {
    this.collection = game.players;
    super.initialize(options);
  }
}


module.exports = PlayerListView
