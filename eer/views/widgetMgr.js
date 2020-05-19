var QueriesWidgets, DataWidgets, WidgetMgr, JSONWidgets, ClockWidgets, OutputWidgets,
FormWidgets, FormSatWidgets, ToolBarWidget, exports, ref;

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
// Common widgets
FormWidgets = class FormWidgets extends WidgetMgr {
  constructor() {
    super();
    // Details page elements
    this.random = new views.randomTKB.FormView(
      {el: $("#form_random")});
  }

  show() {
    return this.random.show();
  }
};

FormSatWidgets = class FormSatWidgets extends WidgetMgr {
  constructor() {
    super();
    // Details page elements
    this.sat = new views.sat.FormSatView(
      {el: $("#form_sat")});
  }

  show() {
    return this.sat.show();
  }
};

DataWidgets = class DataWidgets extends WidgetMgr {
  constructor() {
    super();
    // Details page elements
    this.datainsert = new views.data.DataInsertView(
      {el: $("#data_place")});
  }
  // @param str {string} Query data.
  set_insert_data(str) {
    return this.datainsert.set_data(str);
  }

  get_data(){
    return this.datainsert.get_data();
  }

  show() {
    return this.datainsert.show();
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

// @namespace eer.views
ClockWidgets = class ClockWidgets extends WidgetMgr {
  constructor() {
    super();
    // Details page elements
    this.clock = new views.toolbar.ClockView(
      {el: $("#clock_place")});
  }

  show() {
    return this.clock.show();
  }

  hide() {
    return this.clock.hide();
  }

  focus() {
    return this.clock.focus();
  }
};

// @namespace eer.views
OutputWidgets = class OutputWidgets extends WidgetMgr {
  constructor() {
    super();
    // Details page elements
    this.outputView = new views.toolbar.OutputView(
      {el: $("#output_place")});
  }

  show(data) {
    return this.outputView.show(data);
  }

  hide() {
    return this.outputView.hide();
  }
};

ToolBarWidget = class ToolBarWidget extends WidgetMgr {
  constructor(){
    super();
    this.toolbar = new views.toolbar.ToolBarView({
      el: $("#navbar_placeholder")
    });
  }

  get_view() {
    return this.toolbar;
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
exports.eer.views.DataWidgets = DataWidgets;
exports.eer.views.JSONWidgets = JSONWidgets;
exports.eer.views.ClockWidgets = ClockWidgets;
exports.eer.views.OutputWidgets = OutputWidgets;
exports.eer.views.ToolBarWidget = ToolBarWidget;
exports.eer.views.FormWidget = FormWidgets;
exports.eer.views.FormSatWidget = FormSatWidgets;

exports.eer.views.ToolBarWidget.addToolBar = function() {
  return exports.eer.views.ToolBarWidget.addToolBar();
};
