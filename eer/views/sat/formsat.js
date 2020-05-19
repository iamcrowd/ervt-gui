  var FormSatView, exports, ref, ref1;

  exports = exports != null ? exports : this;

  exports.eer = (ref = exports.eer) != null ? ref : this;

  exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

  exports.eer.views.sat = (ref1 = exports.eer.views.sat) != null ? ref1 : this;

  // A view for inserting and editing queries.
  FormSatView = Backbone.View.extend({

    initialize: function() {
      this.render();
      return this.textarea = this.$el.find("#insert_form_sat");
    },
    render: function() {
      var template;
      template = _.template($("#template_formsat").html());
      return this.$el.html(template());
    },
    events: {
      'click button#check': 'sat',
    },
    sat: function(){
      console.log("LTL/LTLp: " + $("#operators").val());
      console.log("Time: " + $("#time").val());
      console.log("Memory: " + $("#memory").val());
      console.log("Solver: " + this.$el.find("select#solver").val());
    },
    show: function() {
      return $("#form_sat_widget").modal("show");
    },
    hide: function() {
      return $("#form_sat_widget").modal("hide");
    }
  });

exports.views.sat.FormSatView = FormSatView;
