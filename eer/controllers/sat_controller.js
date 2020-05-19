var SatController, exports, ref, ref1;


SatController = class SatController extends Controller {

  constructor() {
    super();
    this.connection = new ServerConnection();
    this.query = eer.views.toolbar.get_view().get_querywidget().getQuery();
    this.tbox = exportTemporalJSON();
    this.data = this.exportTermporalData();
  }

  getConnection() {
    return this.connection;
  }

  getQuery(){
    return this.query;
  }

  checkSatisfiability(time, memory, solver) {
      eer.views.toolbar.get_view().get_clockwidget().show();

      switch (solver) {
        case "nusmv-bdd":
          return this.connection.request_satisfiable_nusmv(this.tbox, this.data, 'BDD', "LTL", time, memory, function(data) {
            eer.views.toolbar.get_view().get_clockwidget().hide();
            var str = data.split("/var/www/html/");
            var url =  str[1];
            eer.views.toolbar.get_view().get_outputwidget().show(url);
          })
          break;
        case "nusmv-bddp":
            return this.connection.request_satisfiable_nusmv(this.tbox, this.data, 'BDD', "LTLp", time, memory, function(data) {
              eer.views.toolbar.get_view().get_clockwidget().hide();
              var str = data.split("/var/www/html/");
              var url =  str[1];
              eer.views.toolbar.get_view().get_outputwidget().show(url);
            })
          break;
        case "nusmv-bmc":
          return this.connection.request_satisfiable_nusmv(this.tbox, this.data, 'BMC', "LTL", time, memory, function(data) {
            eer.views.toolbar.get_view().get_clockwidget().hide();
            var str = data.split("/var/www/html/");
            var url =  str[1];
            eer.views.toolbar.get_view().get_outputwidget().show(url);
          })
          break;
        case "nusmv-bmcp":
            return this.connection.request_satisfiable_nusmv(this.tbox, this.data, 'BMC', "LTLp", time, memory, function(data) {
              eer.views.toolbar.get_view().get_clockwidget().hide();
              var str = data.split("/var/www/html/");
              var url =  str[1];
              eer.views.toolbar.get_view().get_outputwidget().show(url);
            })
          break;

        case "nuxmv-bdd":
            return this.connection.request_satisfiable_nuxmv(this.tbox, this.data, 'BDD', "LTL", time, memory, function(data) {
              eer.views.toolbar.get_view().get_clockwidget().hide();
              var str = data.split("/var/www/html/");
              var url =  str[1];
              eer.views.toolbar.get_view().get_outputwidget().show(url);
            })
            break;
        case "nuxmv-bddp":
              return this.connection.request_satisfiable_nuxmv(this.tbox, this.data, 'BDD', "LTLp", time, memory, function(data) {
                eer.views.toolbar.get_view().get_clockwidget().hide();
                var str = data.split("/var/www/html/");
                var url =  str[1];
                eer.views.toolbar.get_view().get_outputwidget().show(url);
              })
          break;
        case "nuxmv-bmc":
            return this.connection.request_satisfiable_nuxmv(this.tbox, this.data, 'BMC', "LTL", time, memory, function(data) {
              eer.views.toolbar.get_view().get_clockwidget().hide();
              var str = data.split("/var/www/html/");
              var url =  str[1];
              eer.views.toolbar.get_view().get_outputwidget().show(url);
            })
          break;
        case "nuxmv-bmcp":
              return this.connection.request_satisfiable_nuxmv(this.tbox, this.data, 'BMC', "LTLp", time, memory, function(data) {
                eer.views.toolbar.get_view().get_clockwidget().hide();
                var str = data.split("/var/www/html/");
                var url =  str[1];
                eer.views.toolbar.get_view().get_outputwidget().show(url);
              })
          break;

        case "aalta":
          return this.connection.request_satisfiable_aalta(this.tbox, this.data, time, memory, function(data) {
            eer.views.toolbar.get_view().get_clockwidget().hide();
            var str = data.split("/var/www/html/");
            var url =  str[1];
            eer.views.toolbar.get_view().get_outputwidget().show(url);
          })
          break;
        default:

      }


  }

}

exports = exports != null ? exports : this;
exports.eer = (ref = exports.eer) != null ? ref : this;
exports.eer.controllers = (ref = exports.eer.controllers) != null ? ref : this;

exports.eer.controllers.SatController = SatController;
