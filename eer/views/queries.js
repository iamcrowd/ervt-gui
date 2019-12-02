
var Queries, exports, ref;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : {};

exports.eer.views = (ref = exports.eer.views) != null ? ref : {};

  // @namespace views

  // Central GUI *do-it-all* class...

Queries = class Queries {
  constructor() {
    this.querywidget = new eer.views.QueriesWidgets();
  }

  insertQuery(){
    this.querywidget.show();
  }

  getQuery() {
    return this.querywidget.get_query();
  }

};

exports.eer.views.Queries = Queries;
