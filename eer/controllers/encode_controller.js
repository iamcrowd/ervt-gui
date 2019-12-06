var EncodeController, exports, ref, ref1;

EncodeController = class EncodeController {

  constructor() {
    this.connection = new ServerConnection();
    this.tbox = exportTemporalJSON();
    this.data = eer.views.toolbar.get_view().get_datawidget().get_data();
  }

  getConnection() {
    return this.connection;
  }

  encodeERvtIntoTDLliteFPX() {
      eer.views.toolbar.get_view().get_clockwidget().show();
      return this.connection.request_encoding(this.tbox, this.data, 'tdllitefpx', function(data) {
        eer.views.toolbar.get_view().get_clockwidget().hide();
        var str = data.split("/var/www/html/");
        var url =  str[1];
        eer.views.toolbar.get_view().get_outputwidget().show(url);
      })
  }

  encodeERvtIntoQTLZ() {
      return this.connection.request_encoding(this.tbox,'qtlz', function(data) {
        console.log(data);
        alert(data);
      })
  }

  encodeERvtIntoQTLN() {
      return this.connection.request_encoding(this.tbox,'qtln', function(data) {
        console.log(data);
        alert(data);
      })
  }

  encodeERvtIntoLTL() {
      return this.connection.request_encoding(this.tbox,'ltl', function(data) {
        console.log(data);
        alert(data);
      })
  }

}


exports = exports != null ? exports : this;
exports.eer = (ref = exports.eer) != null ? ref : this;
exports.eer.controllers = (ref = exports.eer.controllers) != null ? ref : this;

exports.eer.controllers.EncodeController = EncodeController;
