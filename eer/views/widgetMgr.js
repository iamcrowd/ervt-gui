var QueriesWidgets, WidgetMgr, JSONWidgets, exports, ref;

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

  get_query(){
    return this.queryinsert.get_query();
  }

  show() {
    return this.queryinsert.show();
  }

};

// @namespace eer.views
JSONWidgets = class JSONWidgets extends WidgetMgr {
  constructor() {
    super();
    // Details page elements
    this.json = new views.json.ExportJSONView(
      {el: $("#json_place")});
  }

  exportjson() {
    this.json.refresh();
  }

  show() {
    return this.json.show();
  }
};

ToolBarWidget = class ToolBarWidget extends WidgetMgr {
  constructor(){
    super();
    this.toolbar = new views.toolbar.ToolBarView({
      el: $("#navbar_placeholder")
    });
  }

  show() {
    return this.toolbar.enable();
  }
}

function addToolBar(){
  toolbar = new ToolBarWidget();
  toolbar.show();
}

exports.eer.views.WidgetMgr = WidgetMgr;
exports.eer.views.QueriesWidgets = QueriesWidgets;
exports.eer.views.JSONWidgets = JSONWidgets;
exports.eer.views.ToolBarWidget = ToolBarWidget;

exports.eer.views.ToolBarWidget.addToolBar = function() {
  return exports.eer.views.ToolBarWidget.addToolBar();
};
