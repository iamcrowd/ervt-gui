var ToolBarView, exports, ref, ref1;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : this;

exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

exports.eer.views.toolbar = (ref1 = exports.eer.views.toolbar) != null ? ref1 : this;

ToolBarView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.jsonwidget = new JSONWidgets();
    this.query = new Queries();
    this.data = new DataWidgets();
    this.clock = new ClockWidgets();
    this.output = new OutputWidgets();
  },

  render: function() {
    var template;
    template = _.template($("#template_toolbar").html(), {});
    return this.$el.html(template);
  },
  events: {
    'click a#export-json': 'export_json',
    'click a#insert-query': 'insert_query',
    'click a#insert-data': 'insert_data',
    'click a#tdllitefpx': 'tdllitefpx',
    'click a#sat': 'sat',
  },

  get_outputwidget: function(){
    return this.output;
  },
  get_clockwidget: function(){
    return this.clock;
  },
  export_json: function() {
    this.jsonwidget.show();
  },
  insert_query: function() {
    this.query.insertQuery();
  },
  insert_data: function() {
    this.data.show();
  },
  tdllitefpx: function() {
    controller = new EncodeController();
    controller.encodeERvtIntoTDLliteFPX();
  },
  sat: function() {
    sat = new SatController();
    sat.checkSatisfiability();
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
