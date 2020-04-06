  var FormView, exports, ref, ref1;

  exports = exports != null ? exports : this;

  exports.eer = (ref = exports.eer) != null ? ref : this;

  exports.eer.views = (ref = exports.eer.views) != null ? ref : this;

  exports.eer.views.randomTKB = (ref1 = exports.eer.views.randomTKB) != null ? ref1 : this;

  // A view for inserting and editing queries.
  FormView = Backbone.View.extend({

    initialize: function() {
      this.render();
      return this.textarea = this.$el.find("#insert_form_random");
    },
    render: function() {
      var template;
      template = _.template($("#template_form").html());
      return this.$el.html(template());
    },
    events: {
      'click button#send': 'send_parameters',
    },
    send_parameters: function(){
      console.log("CI: " + $("#ci").val());
      console.log("N: " + $("#n").val());
      console.log("L: " + $("#l").val());
      console.log("Q: " + $("#q").val());
      console.log("Pt: " + $("#pt").val());
      console.log("Rr: " + $("#pr").val());
      console.log("Solver: " + $("#solver").val("option:selected"));
    },
    show: function() {
      return $("#form_widget").modal("show");
    },
    hide: function() {
      return $("#form_widget").modal("hide");
    }
  });

exports.views.randomTKB.FormView = FormView;
