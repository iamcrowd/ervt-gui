var ExportJSONView, exports, ref, ref1;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : this;

exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

exports.eer.views.json = (ref1 = exports.eer.views.json) != null ? ref1 : this;

ExportJSONView = Backbone.View.extend({
  initialize: function() {
    this.jsonstr = "";
    return this.render();
  },
  render: function() {
    var template;
    template = _.template($("#template_exportjson").html());
    return this.$el.html(template({
      jsonstr: this.jsonstr
    }));
  },
  events: {
    "click button#exportjson_copybtn": "copy_jsonstr",
    "click button#exportjson_refreshbtn": "refresh"
  },
  copy_jsonstr: function() {
    $("#exportjson_input").select();
    return document.execCommand("Copy");
  },
  refresh: function() {
    this.set_jsonstr(exportTemporalJSON());
  },
  set_jsonstr: function(jsonstr) {
    this.jsonstr = jsonstr;
    return $("#exportjson_input").val(this.jsonstr);
  },
  show: function() {
    return $("#exportjson_widget").modal("show");
  }
});

exports.views.json.ExportJSONView = ExportJSONView;
