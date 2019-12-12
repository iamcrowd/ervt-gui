var ServerConnection, exports, ref, ref1;


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
  request_satisfiable(json, data, query, reasoner, callback_function) {
    var postdata, url;
    postdata = "json=" + json;
    url = this.urlprefix + "t-crowd/api/satisfiable.php";
    return $.ajax({
      type: "POST",
      url: url,
      data: {
        "reasoner": reasoner,
        "json": json,
        "query" : query,
        "data": data,
      },
      success: callback_function,
      error: this.error_callback
    });
  }

  request_encoding(json, data, formal, callback_function) {
    var postdata, url;
    postdata = "json=" + json;
    url = this.urlprefix + "t-crowd/api/encoding.php";
    return $.ajax({
      type: "POST",
      url: url,
      data: {
        "formal": formal,
        "json": json,
        "data": data,
      },
      success: callback_function,
      error: this.error_callback
    });
  }
}

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : this;

exports.eer.requests = (ref1 = exports.eer.requests) != null ? ref1 : this;

exports.eer.requests.ServerConnection = ServerConnection;

exports.eer.requests.ServerConnection.intialise = function() {
  return exports.eer.requests.ServerConnection = new ServerConnection();
};

exports.eer.requests.ServerConnection.get_urlprefix = function() {
  return exports.eer.requests.ServerConnection.urlprefix = "http://localhost/";
};
