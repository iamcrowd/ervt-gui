var QueriesWidgets, WidgetMgr, exports, ref;

exports = exports != null ? exports : this;

exports.eer = (ref = exports.eer) != null ? ref : {};

exports.eer.views = (ref = exports.eer.views) != null ? ref : {};

// @namespace gui
WidgetMgr = class WidgetMgr {
  constructor() {}
};

// @namespace eer.views

// Common widgets
QueriesWidgets = class QueriesWidgets extends WidgetMgr {
  constructor() {
    super();
    // Details page elements
    this.queryinsert = new views.queries.QueryInsertView(
      {el: $("#query_place")});
  }


  // @param str {string} Query data.
  set_insert_query(str) {
    return this.queryinsert.set_query(str);
  }

  show() {
    return this.queryinsert.show();
  }

};

exports.eer.views.WidgetMgr = WidgetMgr;

exports.eer.views.QueriesWidgets = QueriesWidgets;
