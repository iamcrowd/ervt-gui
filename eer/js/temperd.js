var actualElement = null

function setAsTemporal(event) {
	actualElement.model.attributes.temporality = 'T';
	showTemporality();
}

function setAsSnapshot(event) {
	actualElement.model.attributes.temporality = 'S';
	showTemporality();
}

function setAsNonTemporal(event) {
	actualElement.model.attributes.temporality = '';
	hideTemporality();
}

function showTemporality(){
	actualElement.model.attr('tempRect/display','block');
	actualElement.model.attr('textTemp/display','block');
	actualElement.model.attr('textTemp/text', actualElement.model.attributes.temporality);
	actualElement.model.attr('textName/refX2', -10);
	hideElementTools();
}

function hideTemporality(){
	actualElement.model.attr('tempRect/display','none');
	actualElement.model.attr('textTemp/display','none');
	actualElement.model.attr('textTemp/text', '');
	actualElement.model.attr('textName/refX2', 0);
	hideElementTools();
}

paper.on('element:contextmenu', function(element) {
	if (getSpecificType(element.model)== 'Entity'){
		var newLink = temporalLink.clone();
		newLink.router('manhattan', {
		    excludeEnds: ['source'],
		    excludeTypes: ['myNamespace.MyCommentElement'],
		    startDirections: ['top'],
		    endDirections: ['right']
		});
		connectLink(newLink, element.model, element.model);
		newLink.addTo(graphMain);
		addTemporalTools(newLink);
		newLink.appendLabel(createLabel('PEX'));
		newLink.attr('customAttr/constraintType', 'PEX');
	}
});

function addTemporalTools(link) {
	var linkView = link.findView(paper);

	var constraintButton = new joint.linkTools.ConstraintButton();
	var removeButton = new joint.linkTools.Remove({
			distance: 20
		});

	var toolsView = new joint.dia.ToolsView({
			tools: [
				removeButton, constraintButton
			]
		});
		linkView.addTools(toolsView);

}


//link tool para agregar boton de total en link
joint.linkTools.ConstraintButton = joint.linkTools.Button.extend({
    name: 'constraint-button',
    options: {
        focusOpacity: 0.5,
        distance: 60,
        action: function(evt) {
            switchConstraint(this.model);
        },
        markup: [{
            tagName: 'circle',
            selector: 'button',
            attributes: {
                'r': 9,
                'fill': 'white',
                'cursor': 'pointer'
            }
        },{
            tagName: 'path',
            selector: 'icon',
            attributes: {
                'd': 'M 0 4 0 -4 M -4 -4 4 -4',
                'stroke': 'black',
                'stroke-width': 2,
                'pointer-events': 'none',
            }
        }]
    }
});

function switchConstraint(link) {
	var label_txt =  link.attr('customAttr/constraintType');
	if (label_txt ===''){
		link.attr('customAttr/constraintType', 'TEX');
		link.label(0, {
				attrs: {
						text: {
								text: 'TEX'
						}
				}
		});
	} else if (label_txt === 'TEX') {
			link.attr('customAttr/constraintType', 'DEV');
			link.label(0, {
				attrs: {
						text: {
								text: 'DEV'
						}
				}
		});
	} else if (label_txt === 'DEV') {
			link.attr('customAttr/constraintType', 'DEX-');
			link.label(0, {
				attrs: {
						text: {
							text: 'DEX-'
						}
					}
				});
		} else if (label_txt === 'DEX-') {
			link.attr('customAttr/constraintType', 'TEX');
			link.label(0, {
				attrs: {
						text: {
							text: 'TEX'
						}
					}
				});
		}
}

/*
Get JSON Objects for each ERvt primitive
*/
function getTemporalElements() {
		var entities = [];
    var relationships = [];
    var attributes = [];
    var isa = [];

    var elements = graphMain.getElements();
		var links = graphMain.getLinks();

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var type = element.attributes.type;

        var numID = element.cid;

				var xpos = element.attributes.position.x;
				var ypos = element.attributes.position.y;

        switch (type) {
            case "erd.CustomEntity":
								var entity = '';
								var name = element.attr('textName/text');
								name = name.replace('\n',"\\n");

								if (element.attributes.temporality == 'T'){
                		entity = '{"name":"'+name+'","id":"'+numID+'", "timestamp": "temporal", "position":{"x":'+xpos+',"y":'+ypos+'}}';
								} else if (element.attributes.temporality == 'S') {
											entity = '{"name":"'+name+'","id":"'+numID+'", "timestamp": "snapshot", "position":{"x":'+xpos+',"y":'+ypos+'}}';
								} else {
											entity = '{"name":"'+name+'","id":"'+numID+'", "timestamp": "", "position":{"x":'+xpos+',"y":'+ypos+'}}';
								}
                entities.push(entity);
                break;

								case "erd.CustomNormal":
										var normalAttr = '';
										var datatype = element.attr('customAttr/type');
										var name = element.attr('textName/text');
										name = name.replace('\n',"\\n");

										if (element.attributes.temporality == 'T'){
		                		normalAttr = '{"name":"'+name+'","type":"normal","datatype":"'+datatype+'","id":"'+numID+'", "timestamp": "temporal", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else if (element.attributes.temporality == 'S') {
													normalAttr = '{"name":"'+name+'","type":"normal","datatype":"'+datatype+'","id":"'+numID+'", "timestamp": "snapshot", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else {
													normalAttr = '{"name":"'+name+'","type":"normal","datatype":"'+datatype+'","id":"'+numID+'", "timestamp": "", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										}
		                attributes.push(normalAttr);
		                break;

								case "erd.CustomKeyAttr":
										var keyAttr = '';
										var datatype = element.attr('customAttr/type');
										var name = element.attr('textName/text');
										name = name.replace('\n',"\\n");

										if (element.attributes.temporality == 'T'){
				               		keyAttr = '{"name":"'+name+'","type":"key","datatype":'+datatype+',"id":'+numID+', "timestamp": "temporal", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else if (element.attributes.temporality == 'S') {
													keyAttr = '{"name":"'+name+'","type":"key","datatype":'+datatype+',"id":'+numID+', "timestamp": "snapshot", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else {
													keyAttr = '{"name":"'+name+'","type":"key","datatype":'+datatype+',"id":'+numID+', "timestamp": "", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										}
				            attributes.push(keyAttr);
				            break;

								case "erd.CustomRelationship":
										var rel = '';
										var name = element.attr('textName/text');
										name = name.replace('\n',"\\n");

										if (element.attributes.temporality == 'T'){
						           		rel = '{"name":"'+name+'","id":'+numID+', "timestamp": "temporal", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else if (element.attributes.temporality == 'S') {
													rel = '{"name":"'+name+'","id":'+numID+', "timestamp": "snapshot", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else {
													rel = '{"name":"'+name+'",id":'+numID+', "timestamp": "", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										}
						        relationships.push(rel);
						        break;

								case "erd.Inheritance":
								    isa.push(element);
								    break;
        }
  }
	return [entities,attributes,relationships,isa];
}

/*
Return a link short id given a long identifier
*/
function getLinkById(longId){
	return graphMain.getCell(longId).cid;
}

/*
Return an element given a cid
*/
function getElementByCid(cid){
	return graphMain.getCell(cid);
}

function getEntities(){
	return getTemporalElements()[0];
}

function getAttributes(){
	return getTemporalElements()[1];
}

function getRelationships(){
	return getTemporalElements()[2];
}

function getIsa(){
	return getTemporalElements()[3];
}


function evo_constraintsLookup(link_e, origin, target){
	var link_obj = '';
	var name_o = origin.attr('textName/text');
	name_o = name_o.replace('\n',"\\n");
	var name_d = target.attr('textName/text');
	name_d = name_d.replace('\n',"\\n");
	var numID = link_e.cid;

	if (link_e.attr('customAttr/constraintType') != ''){
		label_l = link_e.attr('customAttr/constraintType');
		link_obj = '{"name":"'+numID+'","entities": ["'+name_o+'","'+name_d+'"], "type":"'+label_l+'"}';
	}
	return link_obj;
}

function attrLookup(link_e, entity, attr){
	var link_obj = '';
	var name_o = entity.attr('textName/text');
	name_o = name_o.replace('\n',"\\n");
	var name_d = attr.attr('textName/text');
	name_d = name_d.replace('\n',"\\n");
	var numID = link_e.cid;
	var datatype = attr.attr('customAttr/type');

	link_obj = '{"name":"'+numID+'","entity": "'+name_o+'", "attribute": "'+name_d+'","type":"attribute"}';

	return link_obj;
}

/*
Get JSON Objects for each ERvt isa
Circle in the middle representing ISA is always the target of links
*/
function getTemporalIsa() {
		var isa_links = [];
		var label_l = '';
		var is_disjoint = false;
		var is_union = false;
		var is_total = false;
		var is_overlap = false;
		var constraint = [];

		var isa_objs = getIsa();

    for (var i = 0; i < isa_objs.length; i++) {
        var isa_elem = isa_objs[i];
				var links_connected = getElementLinks(isa_elem);
				var numID = isa_elem.cid;
				var children = [];

				if (isa_elem.attr('text/text') == 'd'){
					is_disjoint = true;
					constraint.push('"exclusive"');
				}else if (isa_elem.attr('text/text') == 'U') {
					is_union = true;
					constraint.push('"union"');
				}else if (isa_elem.attr('text/text') == 'o') {
					is_overlap = true;
					constraint.push('"overlapping"');
				}

				for (var j = 0; j < links_connected.length; j++) {
		        var alink = links_connected[j];
		        var cid_origin = getLinkById(alink.attributes.source);
						var cid_target = getLinkById(alink.attributes.target);
						var origin = getElementByCid(cid_origin);
						var target = getElementByCid(cid_target);

						if (getType(origin) == "Inheritance" &&
								getType(target) == "Entity"){
									var temp = origin;
									origin = target;
									target = temp;
								}

						var name_o = origin.attr('textName/text');
						name_o = name_o.replace('\n',"\\n");

						if (alink.attr('customAttr/inheritance') == true){
							var is_parent = origin.attr('textName/text');

							if (alink.attr('customAttr/total') == true){
								is_total = true;
								constraint.push('"total"');
							}
						}else if (alink.attr('customAttr/inheritance') == false){
							var name_ch = '';
							name_ch = origin.attr('textName/text');
							name_ch = name_ch.replace('\n',"\\n");
							children.push('"'+name_ch+'"');
						}
				}

				anIsaLink = '{"name":"'+numID+'","parent":"'+is_parent+'", "entities":['+children+'], "type":"isa", "constraint":['+constraint+']}';
				isa_links.push(anIsaLink);
		}
		return isa_links;
}

/*
Get JSON Objects for each ERvt link
*/
function getTemporalLinks() {
		var links = [];
		var label_l = '';

		var links_a = graphMain.getLinks();

    for (var i = 0; i < links_a.length; i++) {
        var link_e = links_a[i];
        var cid_origin = getLinkById(link_e.attributes.source);
				var cid_target = getLinkById(link_e.attributes.target);

				var origin = getElementByCid(cid_origin);
				var target = getElementByCid(cid_target);


				if (getType(origin) == "Entity" &&
						getType(target) == "Entity"){
							var evo = evo_constraintsLookup(link_e, origin, target);
							if (evo.length != 0){
								links.push(evo);
							}
				} else if (getType(origin) == "Entity" &&
									getType(target) == "Attribute"){
									var attr = attrLookup(link_e, origin, target);
									links.push(attr);
				}else if (getType(origin) == "Attribute" &&
 									getType(target) == "Entity") {
									var attr = attrLookup(link_e, target, origin);
									links.push(attr);
				}
		}
		return links;
}

/*
Export JSON object including a Temporal ER
*/
function exportJSON() {
    var allElement = getTemporalElements();
    var entities = allElement[0];
    var attributes = allElement[1];
		var links = getTemporalLinks();
		links.push(getTemporalIsa());

    var json = '{"entities": ['+entities+'],"attributes":['+attributes+'],"links":['+links+']}';
	 	console.log(json);
}
