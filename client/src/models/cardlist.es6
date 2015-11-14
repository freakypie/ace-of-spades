var Backbone = require("backbone");


class CardList extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      controller: null,
      cards: [],
      properties: {},
      face_up: true,
      deck: false,
      hand: false,
    }
  }

  draw() {
    if (this.attributes.cards.length === 0) {
      throw new Error("Can't draw from an empty deck");
    }
    return this.attributes.cards.shift(); // pop from top
  }

  draw_all() {
    var cards = this.attributes.cards;
    this.attributes.cards = [];
    return cards;
  }

  top () {
    return this.attributes.cards[0];
  }

  bottom() {
    return this.attributes.cards[this.size()-1];
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
        this.attributes.cards.push(card);
      }
    } else {
      this.attributes.cards.push(cards);
    }
  }

  shuffle(){

  }

  size() {
    return this.attributes.cards.length;
  }
}

CardList.collection = Backbone.Collection.extend({model: CardList});

module.exports = CardList;
