var Backbone = require("backbone");


class Stack extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      controller: null,
      cards: [],
      properties: {},
      face_up: true,
      deck: false,
    }
  }

  draw() {
    return self.cards.shift(); //pop from top
  }

  draw_all() {
    var cards = self.cards;
    self.cards = [];
    return cards;
  }

  top() {
    this.cards[0];
  }

  bottom() {
    this.cards[this.size()-1];
  }

  place_on_top(cards) {
    if(cards instanceof Array){
      for(var card_instance in cards) {
        self.cards.unshift(card_instance);
      }
    } else {
      self.cards.unshift(cards);
    }
  }

  place_on_bottom(cards) {
    if(cards instanceof Array){
      for(var card_instance in cards) {
        self.cards.push(card_instance);
      }
    } else {
      self.cards.push(cards);
    }
  }

  shuffle(){

  }

  size() {
    return self.cards.length;
  }
}

module.exports = Stack

// model.attributes.properties
// model.get("whatever")

// set property
// model.set({face_up: false}) // sends "change", "change:face_up", signals
