var Backbone = require("backbone");


export default class Stack extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      controller: null,
      card_instances: [],
      properties: {},
      face_up: true,
      deck: false,
    }
  }

  draw() {
    return self.card_instances.shift(); //pop from top
  }

  draw_all() {
    var card_instances = self.card_instances;
    self.card_instances = [];
    return card_instances;
  }

  top() {
    this.card_instances[0];
  }

  bottom() {
    this.card_instances[this.size()-1];
  }

  place_on_top(card_instances) {
    if(card_instances instanceof Array){
      for(var card_instance in card_instances) {
        self.card_instances.unshift(card_instance);
      }
    } else {
      self.card_instances.unshift(card_instances);
    }
  }

  place_on_bottom(card_instances) {
    if(card_instances instanceof Array){
      for(var card_instance in card_instances) {
        self.card_instances.push(card_instance);
      }
    } else {
      self.card_instances.push(card_instances);
    }
  }

  shuffle(){

  }

  size() {
    return self.card_instances.length;
  }
}

// model.attributes.properties
// model.get("whatever")

// set property
// model.set({face_up: false}) // sends "change", "change:face_up", signals
