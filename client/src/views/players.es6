var bv = require("backbone_views");
var _ = require("underscore")

class PlayerItemView extends bv.DetailView {
  get tagName() {
    return "player-element";
  }

  get events() {
    return {
      "click *": function(e) {
        // TODO: when randall implements this
        // this.el.selected = true;
        var player = this.model;
        console.log("player", player);
        var area = $(`#player-areas [data-player=${player.id}]`)
        console.log("scroll", area.position().left)
        $("#player-areas .list").css({
          left: `-${area.position().left}px`
        });
      }
    };
  }

  render() {
    this.el.name = this.model.attributes.name;
    var cat_id = this.model.attributes.id % 10;
    this.el.avatar = `http://lorempixel.com/100/100/cats/${cat_id}/`;
    this.el.host = this.model.attributes.host
    this.el.connected = "connected";

    return this;
  }
}


class PlayerListView extends bv.ListView {
  get template() {
	return _.template(`
  	<div class="list"></div>
  	<h2>Players</h2>
	`)
  }
  get itemViewClass() {
    return PlayerItemView;
  }

  initialize(options) {
    this.collection = game.players;
    super.initialize(options);
  }
}


module.exports = PlayerListView
