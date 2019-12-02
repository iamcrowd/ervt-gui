var ToolBarView, exports, ref, ref1;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : this;

exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

exports.eer.views.toolbar = (ref1 = exports.eer.views.toolbar) != null ? ref1 : this;

ToolBarView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var template;
    template = _.template($("#template_toolbar").html(), {});
    return this.$el.html(template);
  },
  events: {
    'click a#export-json': 'export_json',
    'click a#insert-query': 'insert_query',
    'click a#tdllitefpx': 'tdllitefpx',
    'click a#sat': 'sat',
  },
  export_json: function() {
    console.log("EXPORT JSON");
  },
  insert_query: function() {
    console.log("Insert QUERY");
  },
  tdllitefpx: function() {
    console.log("TDLliteFPX");
  },
  sat: function() {
    console.log("SAT");
  },
  // Show and enable the widget.
  enable: function() {
    return this.$el.show();
  },
  // Hide and disable the widget.
  disable: function() {
    return this.$el.hide();
  }
});

exports.views.toolbar.ToolBarView = ToolBarView;
