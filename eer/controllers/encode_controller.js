var EncodeController, exports, ref, ref1;


EncodeController = class EncodeController {

  constructor() {
    this.connection = new ServerConnection();
  }

  getConnection() {
    return this.connection;
  }

  encodeERvtIntoTDLliteFPX() {
      return this.connection.request_encoding(exportTemporalJSON(),'tdllitefpx', function(data) {
        console.log(data);
        alert(data);
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

/*
function checkSatisfiability(){
  s = ServerConnection.intialise();
  return s.request_satisfiable(exportTemporalJSON(),'NuSMV', function(data) {
    console.log(data);
  });
}*/


exports = exports != null ? exports : this;
exports.eer = (ref = exports.eer) != null ? ref : this;
exports.eer.controllers = (ref = exports.eer.controllers) != null ? ref : this;

exports.eer.controllers.EncodeController = EncodeController;
