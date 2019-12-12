var DataInsertView, exports, ref, ref1;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : this;

exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

exports.eer.views.data = (ref1 = exports.eer.views.data) != null ? ref1 : this;

// A view for inserting and editing data.
DataInsertView = Backbone.View.extend({

  initialize: function() {
    this.render();
    return this.textarea = this.$el.find("#insert_data_input");
  },
  render: function() {
    var template;
    template = _.template($("#template_insertdata").html());
    return this.$el.html(template());
  },
  events: {
    'click button#abox': 'get_data',
  },
  get_data: function() {
    console.log($("#insert_data_input").val());
    return $("#insert_data_input").val();
  },
  append_data: function(str) {
    return this.textarea[0].value = this.textarea[0].value + str;
  },
  show: function() {
    return $("#insertdata_widget").modal("show");
  },
  hide: function() {
    console.log(this.get_data());
    return $("#insertdata_widget").modal("hide");
  }
});

exports.views.data.DataInsertView = DataInsertView;
