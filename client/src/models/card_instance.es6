var Backbone = require("backbone");


export default class CardInstance extends Backbone.Model {
    get defaults() {
        return {
            card: null,
            owner: null,
            controller: null,
            face_up: true,
            properties: {}
        }
    }
}

// model.attributes.properties
// model.get("whatever")

// set property
// model.set({face_up: false}) // sends "change", "change:face_up", signals
