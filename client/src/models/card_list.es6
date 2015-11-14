var Backbone = require("backbone");
var Card = require("./card");


class CardList extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      controller: null,
      cards: new Card.collection(),
      properties: {},
      area: null,
      face_up: true,
      deck: false,
      hand: false,
    }
  }

  initialize(options) {
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

  draw() {
    if (this.attributes.cards.length === 0) {
      throw new Error("Can't draw from an empty deck");
    }
    return this.attributes.cards.shift(); // pop from top
  }

  draw_all() {
    var cards = this.attributes.cards.models;
    this.attributes.cards.reset([]);
    return cards;
  }

  top () {
    return this.attributes.cards.at(0);
  }

  bottom() {
    return this.attributes.cards.at(this.size() - 1);
  }

  place_on_top(cards) {
    if(cards instanceof Array){
      for(var card in cards) {
        this.attributes.cards.unshift(card);
      }
    } else {
      this.attributes.cards.unshift(cards);
    }
  }

  place_on_bottom(cards) {
    if (cards instanceof Array){
      for(var card of cards) {
        this.attributes.cards.add(card);
      }
    } else {
      this.attributes.cards.add(cards);
    }
  }

  shuffle() {

  }

  size() {
    return this.attributes.cards.length;
  }
}

CardList.collection = Backbone.Collection.extend({model: CardList});

module.exports = CardList;
