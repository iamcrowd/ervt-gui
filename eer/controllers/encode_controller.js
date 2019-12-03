var EncodeController, exports, ref, ref1;


EncodeController = class EncodeController {

  constructor() {
    this.connection = new ServerConnection();
  }

  getConnection() {
    return this.connection;
  }

  encodeERvtIntoTDLliteFPX() {
      eer.views.toolbar.get_view().get_clockwidget().show();
      
      return this.connection.request_encoding(exportTemporalJSON(),'tdllitefpx', function(data) {
        eer.views.toolbar.get_view().get_clockwidget().hide();
        eer.views.toolbar.get_view().get_outputwidget().show(data);
      })
  }

  encodeERvtIntoQTLZ() {
      return this.connection.request_encoding(exportTemporalJSON(),'qtlz', function(data) {
        console.log(data);
        alert(data);
      })
  }

  encodeERvtIntoQTLN() {
      return this.connection.request_encoding(exportTemporalJSON(),'qtln', function(data) {
        console.log(data);
        alert(data);
      })
  }

  encodeERvtIntoLTL() {
      return this.connection.request_encoding(exportTemporalJSON(),'ltl', function(data) {
        console.log(data);
        alert(data);
      })
  }

}


exports = exports != null ? exports : this;
exports.eer = (ref = exports.eer) != null ? ref : this;
exports.eer.controllers = (ref = exports.eer.controllers) != null ? ref : this;

exports.eer.controllers.EncodeController = EncodeController;
