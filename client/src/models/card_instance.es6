var Backbone = require("backbone");


export default class Card extends Backbone.Model {
    get defaults() {
        return {
            id: null,
            name: null,
            properties: {}
        }
    }
}