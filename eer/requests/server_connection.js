var ServerConnection, exports;


ServerConnection = class ServerConnection {
  // @param error_callback {function} which error callback function to use.
  constructor(error_callback) {
    this.error_callback = error_callback;
    this.urlprefix = "http://crowd.fi.uncoma.edu.ar/";
  }

  set_urlprefix(str) {
    return this.urlprefix = str;
  }

  // Send to the server a "is satisfiable" request

  // @param [String] json String with the JSON data.
  // @param [function] callback_function a function to execute when the POST is done.
  request_satisfiable(json, reasoner, callback_function) {
    var postdata, url;
    postdata = "json=" + json;
    url = this.urlprefix + "t-crowd/api/satisfiable.php";
    return $.ajax({
      type: "POST",
      url: url,
      data: {
        "reasoner": reasoner,
        "json": json,
      },
      success: callback_function,
      error: this.error_callback
    });
  }

  request_encoding(json, formal, callback_function) {
    var postdata, url;
    postdata = "json=" + json;
    url = this.urlprefix + "t-crowd/api/encoding.php";
    return $.ajax({
      type: "POST",
      url: url,
      data: {
        "formal": formal,
        "json": json,
      },
      success: callback_function,
      error: this.error_callback
    });
  }
}


function checkSatisfiability(){
  return ServerConnection.request_satisfiable(exportTemporalJSON(),'NuSMV', function(data) {
    console.log(data);
  });
}

function encodeERvt(){
  return ServerConnection.request_encoding(exportTemporalJSON(),'tdllitefpx', function(data) {
    console.log(data);
    alert("http://crowd.fi.uncoma.edu.ar/t-crowd/api/tdl2TDLLiteFPX_tbox/");
  });
}

exports = exports != null ? exports : this;
exports.ServerConnection = new ServerConnection;
