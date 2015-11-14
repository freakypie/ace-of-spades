var Backbone = require("backbone");


class Area extends Backbone.Model {
    get defaults() {
        return {
            player: null,
            cardlists: null
        }
    }
}

module.exports = Area;
