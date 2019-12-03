var OutputView, exports, ref, ref1;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : this;

exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

exports.eer.views.toolbar = (ref1 = exports.eer.views.toolbar) != null ? ref1 : this;

OutputView = Backbone.View.extend({
  initialize: function() {
    this.render();
    return this.hide();
  },
  render: function() {
    var template;
    template = _.template($("#template_output").html());
    return this.$el.html(template({}));
  },
  show: function(data) {
    $("#link").attr("href", data);
    return $("#output").modal("show");
  },
  hide: function() {
    return $("#output").modal("hide");
  }
});

exports.views.toolbar.OutputView = OutputView;
