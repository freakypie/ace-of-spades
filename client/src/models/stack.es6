var Backbone = require("backbone");
var bv = require("backbone_views");

var Card = require("./card");


class Stack extends bv.BaseModel {
  get defaults() {
    return {
      name: "unnamed",
      controller: null,
      properties: {},
      area: null,
      face_up: true,
      deck: false,
      hand: false,
    };
  }

  initialize(options) {
    super.initialize(options);

    this.cards = Card.collection();

    // TODO: add to the area they belong to
    this.listenTo(this, "change:area", function() {
      if (this.attributes.area) {
        this.attributes.area.get("card_lists").add(this);
      }
    });

    if (this.attributes.area) {
      this.attributes.area.get("card_lists").add(this);
    }
  }

  draw_all() {
    var cards = this.attributes.cards.models;
    this.attributes.cards.reset([]);
    return cards;
  }

  shuffle() {
    this.collection.reset(this.collection.shuffle(), {silent:true});
    return this;
  }
}

Stack.collection = Backbone.Collection.extend({model: Stack});

module.exports = Stack;
