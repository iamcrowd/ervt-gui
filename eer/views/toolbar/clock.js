var ClockView, exports, ref, ref1;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : this;

exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

exports.eer.views.toolbar = (ref1 = exports.eer.views.toolbar) != null ? ref1 : this;

ClockView = Backbone.View.extend({
  initialize: function() {
    this.render();
    return this.hide();
  },
  render: function() {
    var template;
    template = _.template($("#template_clock").html());
    return this.$el.html(template({}));
  },
  show: function() {
    return $("#clock").modal("show");
  },
  hide: function() {
    return $("#clock").modal("hide");
  },
  focus: function() {
    return $("#clock").focus();
  }
});

exports.views.toolbar.ClockView = ClockView;
