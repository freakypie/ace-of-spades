var Backbone = require("backbone");
var _ = require("underscore");


class TemplateView extends Backbone.View {
  getContext(context) {
    return context;
  }
  render(context) {
    if (! context) {
      context = {};
    }
    context = this.getContext(context);
    this.$el.html(this.template(context));
    return this;
  }
}

module.exports = TemplateView;
