var SatController, exports, ref, ref1;


SatController = class SatController {

  constructor(query) {
    this.connection = new ServerConnection();
    this.query = $("#insert_query_input").val();
  }

  getConnection() {
    return this.connection;
  }

  getQuery(){
    return this.query;
  }

  checkSatisfiability() {
      return this.connection.request_satisfiable(exportTemporalJSON(), this.query, 'NuSMV', function(data) {
        console.log(data);
        var str = data.split("/var/www/html/");
        var url =  "http://crowd.fi.uncoma.edu.ar/" + str[1];
        alert("Browse TBox folder at: "+url);
      })
  }

}

exports = exports != null ? exports : this;
exports.eer = (ref = exports.eer) != null ? ref : this;
exports.eer.controllers = (ref = exports.eer.controllers) != null ? ref : this;

exports.eer.controllers.SatController = SatController;
