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

  checkSatisfiability() {
      eer.views.toolbar.get_view().get_clockwidget().show();

      return this.connection.request_satisfiable(this.tbox, this.data, this.query, 'NuSMV', function(data) {
        eer.views.toolbar.get_view().get_clockwidget().hide();
        var str = data.split("/var/www/html/");
        var url =  str[1];
        eer.views.toolbar.get_view().get_outputwidget().show(url);
      })
  }

}

exports = exports != null ? exports : this;
exports.eer = (ref = exports.eer) != null ? ref : this;
exports.eer.controllers = (ref = exports.eer.controllers) != null ? ref : this;

exports.eer.controllers.SatController = SatController;
