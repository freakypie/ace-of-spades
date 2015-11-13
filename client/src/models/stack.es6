var Backbone = require("backbone");


export default class Stack extends Backbone.Model {
  get defaults() {
    return {
      name: "unnamed",
      controller: null,
      face_up: true,
      cards: [],
      properties: {}
    }
  }
}

// model.attributes.properties
// model.get("whatever")

// set property
// model.set({face_up: false}) // sends "change", "change:face_up", signals
