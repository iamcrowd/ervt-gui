var ServerConnection, exports;


ServerConnection = class ServerConnection {
  // @param error_callback {function} which error callback function to use.
  constructor(error_callback) {
    this.error_callback = error_callback;
    this.urlprefix = "http://localhost/";
  }

  set_urlprefix(str) {
    return this.urlprefix = str;
  }

  // Send to the server a "is satisfiable" request

  // @param [String] json String with the JSON data.
  // @param [function] callback_function a function to execute when the POST is done.
  request_satisfiable(json, callback_function) {
    var postdata, url;
    postdata = "json=" + json;
    url = this.urlprefix + "t-crowd/api/satisfiable.php";
    return $.ajax({
      type: "POST",
      url: url,
      data: postdata,
      success: callback_function,
      error: this.error_callback
    });
  }

  // Send model to server request for full reasoning

  // @param [String] json String with the JSON data.
  // @param [String] strategy encoding strategy for translating models.
  // @param [String] reasoner reasoning system.
  // @param [function] callback_function a function to execute when the POST is done.
  request_full_reasoning(json, strategy, reasoner, callback_function) {
    var postdata, url;
    postdata = "json=" + json;
    url = this.urlprefix + "t-crowd/api/full.php";
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
}


function checkSatisfiability(){
  return ServerConnection.request_satisfiable(exportTemporalJSON(),function(data) {
    console.log(data);
  });
}

exports = exports != null ? exports : this;
exports.ServerConnection = new ServerConnection;
