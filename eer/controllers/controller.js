var Controller, exports, ref, ref1;

Controller = class Controller {

  constructor() {
  }

  // Get an array of array with concepts and roles and generates a JSON object.
  // {"concepts": [{"concept":"Person", "instance":"Maria", "timestamp":"n"}],
  // "roles":[{"role":"Surname", "from":"Maria", "to":"Clinton","timestamp":"n"}]}
  exportTermporalData(){
    data = eer.views.toolbar.get_view().get_datawidget().get_data();
    var array_roles = [];
    var array_concepts = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i].length == 3){
        var concept = '{"concept":"'+data[i][0]+'","instance":"'+data[i][1]+'","timestamp":'+data[i][2]+'}';
        array_concepts.push(concept);
      }
      else if (data[i].length == 4) {
        var role = '{"role":"'+data[i][0]+'","from":"'+data[i][1]+'","to":"'+data[i][2]+'","timestamp":'+data[i][3]+'}';
        array_roles.push(role);
      }
    }
    return '{"concepts":['+array_concepts+'],"roles":['+array_roles+']}';
  }
}

exports = exports != null ? exports : this;
exports.eer = (ref = exports.eer) != null ? ref : this;
exports.eer.controllers = (ref = exports.eer.controllers) != null ? ref : this;

exports.eer.controllers.Controller = Controller;
