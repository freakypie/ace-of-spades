var Backbone = require("backbone");


export default class Player extends Backbone.Model {
    get defaults() {
        return {
            id: null,
            name: null,
            properties: {}
        }
    }
}