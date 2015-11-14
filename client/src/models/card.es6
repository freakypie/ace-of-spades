var Backbone = require("backbone");


class Card extends Backbone.Model {
    get defaults() {
        return {
            // loaded from json/server
            name: "",
            lvl: Math.floor(Math.random() * 10),
            flavor_text: "",

            // edited by game
            area: null,
            owner: null,
            controller: null,
            faceup: true,
        }
    }
}

Card.collection = Backbone.Collection.extend({model: Card});

module.exports = Card
