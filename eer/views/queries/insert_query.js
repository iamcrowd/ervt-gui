  var QueryInsertView, exports, ref, ref1;

  exports = exports != null ? exports : this;

  exports.eer = (ref = exports.eer) != null ? ref : this;

  exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

  exports.eer.views.queries = (ref1 = exports.eer.views.queries) != null ? ref1 : this;

  // A view for inserting and editing queries.
  QueryInsertView = Backbone.View.extend({

    initialize: function() {
      this.render();
      return this.textarea = this.$el.find("#insert_query_input");
    },
    render: function() {
      var template;
      template = _.template($("#template_insertquery").html());
      return this.$el.html(template());
    },
    events: {
    },
    get_query: function() {
      return $("#insert_query_input").val();
    },
    append_query: function(str) {
      return this.textarea[0].value = this.textarea[0].value + str;
    },
    show: function() {
      return $("#insertquery_widget").modal("show");
    },
    hide: function() {
      return $("#insertquery_widget").modal("hide");
    }
  });

exports.views.queries.QueryInsertView = QueryInsertView;
