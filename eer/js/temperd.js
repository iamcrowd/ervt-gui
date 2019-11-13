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
    var connectors = [];
    var elements = graphMain.getElements();

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var type = element.attributes.type;
        var name = element.attr('textName/text');
				name = name.replace('\n',"\\n");
        var cid = element.cid;
        var id = cid.match(/\d+/g)[0];
        var numID = new Number(id);
				var dataType = element.attr('customAttr/type');

        switch (type) {
            case "erd.CustomEntity":
								var entity = '';
								if (element.attributes.temporality == 'T'){
                		entity = '{"name":"'+name+'","id":'+numID+', "timestamp": "temporal", "position":{x}}';
								} else if (element.attributes.temporality == 'S') {
											entity = '{"name":"'+name+'","id":'+numID+', "timestamp": "snapshot", "position":{x}}';
								} else {
											entity = '{"name":"'+name+'","id":'+numID+', "timestamp": "", "position":{x}}';
								}
                entities.push(entity);
                break;

        }
  }
	return [entities];
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
