var Backbone = require("backbone");


class Card extends Backbone.Model {
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

module.exports = Card
