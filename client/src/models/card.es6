var Backbone = require("backbone");


export default class Card extends Backbone.Model {
    get defaults() {
        return {
            // loaded from json/server
            name: "",
            lvl: 0,
            flavor_text: "",

            //edited by game
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
