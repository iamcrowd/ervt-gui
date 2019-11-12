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
	console.log(actualElement);
}

function hideTemporality(){
	actualElement.model.attr('tempRect/display','none');
	actualElement.model.attr('textTemp/display','none');
	actualElement.model.attr('textTemp/text', '');
	actualElement.model.attr('textName/refX2', 0);
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
