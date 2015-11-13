var Backbone = require("backbone");


class Area extends Backbone.Model {
    get defaults() {
        return {
            player: null,
            stacks: null
        }
    }
}

module.exports = Area;
