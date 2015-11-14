var bv = require("backbone_views");


class CardItem extends bv.DetailView {
  get tagName() {
    return "card-element";
  }
  initialize(options) {
    this.parent = options.parent;
    super.initialize(options);
    this.listenTo(this.model, "change", function() {
      this.render();
    });
  }
  render() {
    this.el.faceup = this.model.attributes.faceup;
    this.el.front = this.model.attributes.front;
    this.el.name = this.model.attributes.name;
    this.el.base_level = this.model.attributes.lvl;
    this.el.description = this.model.attributes.flavor_text;
    return this;
  }
}

module.exports = CardItem;
