var Backbone = require("backbone");
var bv = require("backbone_views");


class Card extends bv.BaseModel {
    get defaults() {
        return {
            // loaded from json/server
            name: "",
            lvl: Math.floor(Math.random() % 9) + 1,
            flavor_text: "",

            // edited by game
            area: null,
            owner: null,
            controller: null,
            faceup: true,
        }
    }
}

module.exports = Card
