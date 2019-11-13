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
                		entity = '{"name":"'+name+'","id":'+numID+', "timestamp": "temporal", "position":{"x":'+xpos+',"y":'+ypos+'}}';
								} else if (element.attributes.temporality == 'S') {
											entity = '{"name":"'+name+'","id":'+numID+', "timestamp": "snapshot", "position":{"x":'+xpos+',"y":'+ypos+'}}';
								} else {
											entity = '{"name":"'+name+'","id":'+numID+', "timestamp": "", "position":{"x":'+xpos+',"y":'+ypos+'}}';
								}
                entities.push(entity);
                break;

								case "erd.CustomNormal":
										var normalAttr = '';
										var datatype = element.attr('customAttr/type');
										var name = element.attr('textName/text');
										name = name.replace('\n',"\\n");

										if (element.attributes.temporality == 'T'){
		                		normalAttr = '{"name":"'+name+'","type":"normal","datatype":'+datatype+',"id":'+numID+', "timestamp": "temporal", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else if (element.attributes.temporality == 'S') {
													normalAttr = '{"name":"'+name+'","type":"normal","datatype":'+datatype+',"id":'+numID+', "timestamp": "snapshot", "position":{"x":'+xpos+',"y":'+ypos+'}}';
										} else {
													normalAttr = '{"name":"'+name+'","type":"normal","datatype":'+datatype+',"id":'+numID+', "timestamp": "", "position":{"x":'+xpos+',"y":'+ypos+'}}';
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
										var isa_e = '';
								    isa_e = '{"id":'+numID+', "position":{"x":'+xpos+',"y":'+ypos+'}}';

								    isa.push(isa_e);
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
	elements = getTemporalElements()[0];
}

function getAttributes(){
	elements = getTemporalElements()[1];
}

function getRelationships(){
	elements = getTemporalElements()[2];
}

function getIsa(){
	elements = getTemporalElements()[3];
}

/*
Get JSON Objects for each ERvt link
*/
function getTemporalLinks() {
		var links = [];

		var links_a = graphMain.getLinks();

    for (var i = 0; i < links_a.length; i++) {
			  var numID = link_e.cid;
        var link_e = links_a[i];
        var cid_origin = getLinkById(link_e.attributes.source);
				var cid_target = getLinkById(link_e.attributes.target);

				var origin = getElementByCid(cid_origin);
				var target = getElementByCid(cid_target);

				

		}

	return links;
}

/*
Export JSON object including a Temporal ER
*/
function exportJSON() {
    var allElement = getAllElement();
    var entities = allElement[0];
    var attributes = allElement[1];
    var links = allElement[2];
    var elements = graphMain.getElements();
    var links = graphMain.getLinks();
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var cardinality = "";
        var labels = link.attributes.labels;
        if (labels != null) {
            cardinality = labels[0].attrs.text.text;
        }

        var element1 = graphMain.getCell(link.source().id);
        var element1id = element1.cid.match(/\d+/g)[0];
        var numElement1id = new Number(element1id);
        var element2 = graphMain.getCell(link.target().id);
        var element2id = element2.cid.match(/\d+/g)[0];
        var numElement2id = new Number(element2id);
		var isTotal = link.attr('customAttr/total');
		var direction = (link.attr('customAttr/direction') == true);
		var isInh = (link.attr('customAttr/inheritance') == true);
        connectors.push('{"total": '+isTotal+',"element1": '+numElement1id+',"element2": '+numElement2id+',"cardinality2": "'+cardinality+'","name": "","inheritance": '+isInh+',"cardinality1": "","direction": '+direction+'}');
    }
    var json = '{"entities": ['+entities+'],"attributes":['+attributes+'],"links":['+links+']}';
	 console.log(json);
}
