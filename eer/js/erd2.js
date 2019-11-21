//graph para el diagrama er
var graphMain = new joint.dia.Graph();
//paper para manejar el graph diagrama er
var paper = new joint.dia.Paper({
		el: document.getElementById('paper'),
		width: $('#paper').width(),
		height: $('#paper').height(),
		model: graphMain,
		gridSize: 10,
		defaultLink: function () {
			return createLink();
		},
		connectionStrategy: function (end) {
			// removing `magnet: 'tool'` from the end object
			return {
				id: end.id
			};
		},
		validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
			// previene conexiones invalidas
			if (cellViewS == null || cellViewT == null || cellViewS.model.attributes.type === 'standard.Link' || cellViewT.model.attributes.type === 'standard.Link') {
				return false;
			}
			return canConnect(cellViewS.model, cellViewT.model);
		},
	});

function getSpecificType(elementModel) {
	var type = elementModel.attributes.type;
	var resultType;
	if (type === 'erd.Entity' || type === 'erd.CustomEntity') {
		resultType = 'Entity';
    } else if (type === 'erd.WeakEntity') {
        resultType = 'WeakEntity';
	} else if (type === 'erd.CustomRelationship') {
		resultType = 'Relationship';
    } else if (type === 'erd.IdentifyingRelationship') {
        resultType = 'WeakRelationship';
	} else if (type === 'erd.Normal' || type === 'erd.CustomNormal') {
		resultType = 'Attribute';
	} else if (type === 'erd.Key' || type === 'erd.CustomKeyAttr') {
        resultType = 'KeyAttribute';
	} else if (type === 'erd.Multivalued') {
        resultType = 'MultivaluedAttribute';
    } else if (type === 'erd.WeakKey') {
        resultType = 'WeakKeyAttribute';
    } else if (type === 'erd.Derived') {
        resultType = 'DerivedAttribute';
    } else if (type === 'erd.Inheritance') {
		resultType = 'Inheritance';
	} else {
		resultType = 'Error';
	}
	return resultType;
}

function getType(elementModel) {
	var type = elementModel.attributes.type;
	var resultType;
	if (type === 'erd.Entity' || type === 'erd.CustomEntity' || type === 'erd.WeakEntity') {
		resultType = 'Entity';
	} else if (type === 'erd.CustomRelationship' || type === 'erd.IdentifyingRelationship') {
		resultType = 'Relationship';
	} else if (type === 'erd.CustomNormal' || type === 'erd.Normal' || type === 'erd.Key' || type === 'erd.CustomKeyAttr' || type === 'erd.Multivalued' || type === 'erd.Derived' || type === 'erd.WeakKey') {
		resultType = 'Attribute';
	} else if (type === 'erd.Inheritance') {
		resultType = 'Inheritance';
	} else {
		resultType = 'Error';
	}
	return resultType;
}

function canConnect(cellViewS, cellViewT) {
	var canConnect = true;
	if (cellViewS != null && cellViewT != null) {
		var sourceType = getType(cellViewS);
		var targetType = getType(cellViewT);
		var specificSourceType = getSpecificType(cellViewS);
		var specificTargetType = getSpecificType(cellViewT);

		if (cellViewS === cellViewT) {
			canConnect = false;
		} else if (sourceType === 'Entity') {
			if (targetType === 'Entity') {
				canConnect = false;
			} else if (specificSourceType === 'Entity' && specificTargetType === 'WeakKeyAttribute') {
				canConnect = false;
			} else if (specificSourceType === 'WeakEntity' && specificTargetType === 'KeyAttribute') {
				canConnect = false;
			}
		} else if (sourceType === 'Relationship') {
			if (targetType === 'Relationship' || targetType === 'Inheritance') {
				canConnect = false;
			} else if (specificSourceType === 'Relationship' && specificTargetType === 'WeakKeyAttribute') {
				canConnect = false;
			} else if (specificSourceType === 'WeakRelationship' && specificTargetType === 'KeyAttribute') {
				canConnect = false;
			}
		} else if (sourceType === 'Attribute') {
			if (targetType === 'Inheritance') {
				canConnect = false;
			} else if (targetType === 'Attribute' && (specificSourceType !== specificTargetType || specificSourceType === 'MultivaluedAttribute')){
				canConnect = false;
			} else if (specificSourceType === 'KeyAttribute' && (specificTargetType === 'WeakEntity' || specificTargetType === 'WeakRelationship')) {
				canConnect = false;
			} else if (specificSourceType === 'WeakKeyAttribute' && (specificTargetType === 'Entity' || specificTargetType === 'Relationship')) {
				canConnect = false;
			}
		} else if (sourceType === 'Inheritance') {
			if (targetType === 'Relationship' || targetType === 'Attribute' || targetType === 'Inheritance') {
				canConnect = false;
			}
		}
	} else {
		canConnect = false;
	}

if(specificSourceType=='Entity' && specificTargetType=='Entity'){
	canConnect = true;
}
	return canConnect;
}

function getElementLinks(element) {
	return graphMain.getConnectedLinks(element);
}

function getAllElement() {
	//retorna todos los elementos en un arreglo con la forma [entidades,relaciones,atributos,herencias,conectores]
	var entities = [];
    var relationships = [];
    var attributes = [];
    var inheritances = [];
    var connectors = [];
    var elements = graphMain.getElements();

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var type = getSpecificType(element);
        var name = element.attr('text/text');
				name = name.replace('\n',"\\n");
        var cid = element.cid;
        var id = cid.match(/\d+/g)[0];
        var numID = new Number(id);
				var dataType = element.attr('customAttr/type');

        switch (type) {
            case "Entity":
                var entity = '{"name":"'+name+'","id":'+numID+',"weak":false}';
                entities.push(entity);
                break;
            case "WeakEntity":
                var entity = '{"name":"'+name+'","id":'+numID+',"weak":true}';
                entities.push(entity);
                break;
            case "Relationship":
                var relationship = '{"name":"'+name+'","id":'+numID+',"weak":false}';
                relationships.push(relationship);
                break;
            case "WeakRelationship":
                var relationship = '{"name":"'+name+'","id":'+numID+',"weak":true}';
                relationships.push(relationship);
                break;
            case "Attribute":
                var attribute = '{"weakKey": false,"dataType": "'+dataType+'","multivalued": false,"name":"'+ name+'","id": '+numID+',"derived": false,"key": false,"multivaluedValue": ""}';
                attributes.push(attribute);
                break;
            case "KeyAttribute":
                var attribute = '{"weakKey": false,"dataType":"'+dataType+'","multivalued": false,"name":"'+ name+'","id": '+numID+',"derived": false,"key": true,"multivaluedValue": ""}';
                attributes.push(attribute);
                break;
            case "MultivaluedAttribute":
                var attribute = '{"weakKey": false,"dataType": "'+dataType+'","multivalued": true,"name": "'+name+'","id": '+numID+',"derived": false,"key": false,"multivaluedValue": "value"}';
                attributes.push(attribute);
                break;
            case "WeakKeyAttribute":
                var attribute = '{"weakKey": true,"dataType": "'+dataType+'","multivalued": false,"name": "'+name+'","id": '+numID+',"derived": false,"key": false,"multivaluedValue": ""}';
                attributes.push(attribute);
                break;
            case "DerivedAttribute":
                var attribute = '{"weakKey": false,"dataType": "'+dataType+'","multivalued": false,"name": "'+name+'","id": '+numID+',"derived": true,"key": false,"multivaluedValue": ""}';
                attributes.push(attribute);
                break;
            case "Inheritance":
                var inheritance = '{"id":'+numID+',"type":'+dataType+'}';
                inheritances.push(inheritance);
                break;
        }
    }
	return [entities,relationships,attributes,inheritances,connectors];
}

//graph para la paleta er
var paletteGraph = new joint.dia.Graph();
//graph para manejar la paleta
var palette = new joint.dia.Paper({
		el: document.getElementById('palette'),
		width: $('#palette').width(),
		height: $('#palette').height(),
		model: paletteGraph,
		interactive: false,
		//gridSize: 100,
		/*drawGrid:
	{
		name: 'mesh',
		args: [
	{
		color: 'white',
		thickness: 1
		}
		]
		}*/
	});

// var paperSmall = new joint.dia.Paper({
//         el: document.getElementById('minimap'),
//         model: graphMain,
//         width: $('#minimap').width(),
//         height: $('#minimap').height(),
//         gridSize: 1,
//         interactive: false
//     });
// paperSmall.scale(0.25);

//para el drag and drop de la paleta
palette.on('cell:pointerdown', function (cellView, e, x, y) {
	$('body').append('<div id="flyPaper"></div>');
	var flyGraph = new joint.dia.Graph,
	flyPaper = new joint.dia.Paper({
			el: $('#flyPaper'),
			model: flyGraph,
			interactive: false,
		}),
	flyShape = cellView.model.clone(),
	pos = cellView.model.position(),
	offset = {
		x: flyShape.attributes.size.width / 2 * paper.scale().sx,
		y: flyShape.attributes.size.height / 2 * paper.scale().sy
	};
	flyPaper.scale(paper.scale().sx);
	flyShape.position(0, 0);
	flyGraph.addCell(flyShape);
	$("#flyPaper").offset({
		left: (e.pageX - offset.x),
		top: (e.pageY - offset.y)
	});
	$('body').on('mousemove.fly', function (e) {
		$("#flyPaper").offset({
			left: (e.pageX - offset.x),
			top: (e.pageY - offset.y)
		});
	});
	$('body').on('mouseup.fly', function (e) {
		var x = e.pageX,
		y = e.pageY,
		target = paper.$el.offset();
		origin = palette.$el.offset();

		// Dropped over paper and not over origin
		if ((x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) &&
			!(x > origin.left && x < origin.left + palette.$el.width() && y > origin.top && y < origin.top + palette.$el.height())) {
			var s = flyShape.clone();
			var p = paper.clientToLocalPoint(e.clientX, e.clientY);
			/*var localRect1 = paper.clientToLocalRect(target.left,target.top,target.width,target.height);
			s.position(((x - target.left - offset.x)+localRect1.center().x), ((y - target.top - offset.y)+localRect1.center().y));*/
			s.position(p.x - (s.attributes.size.width / 2), p.y - (s.attributes.size.height / 2));
			graphMain.addCell(s);
		}
		$('body').off('mousemove.fly').off('mouseup.fly');
		flyShape.remove();
		$('#flyPaper').remove();
	});
});

//para mover la paleta
var dragStartPositionPalette;

palette.on('blank:pointerdown', function (event, x, y) {
	if (!fixedPalette) {
		dragStartPositionPalette = {
			x: x,
			y: y
		};

		$('body').on('mousemove.fly', function (event) {
			if (dragStartPositionPalette != null) {
				$("#palette").offset({
					left: event.pageX - dragStartPositionPalette.x, //$("#palette").width() / 2,
					top: event.pageY - dragStartPositionPalette.y //$("#palette").height() / 2
				});
			}
		});

		$('body').on('mouseup.fly', function (e) {
			dragStartPositionPalette = null;
			$('body').off('mousemove.fly').off('mouseup.fly');
		});
	}
});

// herramientas para la paleta
var fixedPalette = true;
var opacityPalette = false;
var extendedPalette = false;
var horizontalPalette = false;

var paletteTools = $('<div id="paletteTools" class="toolbar-palette">');
paletteTools.append('<div id="paletteFixButton" class="tools tools-palette-fix" onclick="paletteFix()"><a class="tooltips" href="#"><i class="material-icons">lock</i><span>Unlock palette translate</span></a></div>');
paletteTools.append('<div id="paletteResetButton" class="tools tools-palette-reset" onclick="paletteReset()"><a class="tooltips" href="#"><i class="material-icons">picture_in_picture_alt</i><span>Reset default position</span></a></div>');
paletteTools.append('<div id="paletteOpacityButton" class="tools tools-palette-opacity" onclick="paletteOpacity()"><a class="tooltips" href="#"><i class="material-icons">visibility</i><span>Change palette opacity</span></a></div>');
paletteTools.append('<div id="paletteExtendButton" class="tools tools-palette-extend" onclick="paletteExtend()"><a class="tooltips" href="#"><i class="material-icons">add_circle</i><span>Extend palette elements</span></a></div>');
//paletteTools.append('<div id="paletteRotateButton" class="tools tools-palette-rotate" onclick="paletteRotate()"><i class="material-icons">rotate_90_degrees_ccw</i></div>');
paletteTools.css('display', 'none');

$('#palette').append(paletteTools);

$("#palette").mouseover(function () {
	paletteTools.css('display', 'block');
});

$("#palette").mouseleave(function () {
	paletteTools.css('display', 'none');
});

function paletteFix() {
	fixedPalette = !fixedPalette;
	if (fixedPalette) {
		document.getElementById("paletteFixButton").innerHTML = '<a class="tooltips" href="#"><i class="material-icons">lock</i><span>Unlock palette translate</span></a>';
	} else {
		document.getElementById("paletteFixButton").innerHTML = '<a class="tooltips" href="#"><i class="material-icons">lock</i><span>Lock palette translate</span></a>';
	}
}

function paletteReset() {
	var lastOpacity = document.getElementById("palette").style.opacity;
	var lastHeight = document.getElementById("palette").style.height;
	var lastWidth = document.getElementById("palette").style.width;
	document.getElementById("palette").style = null;
	document.getElementById("palette").style.opacity = lastOpacity;
	document.getElementById("palette").style.height = lastHeight;
	document.getElementById("palette").style.width = lastWidth;
}

function paletteOpacity() {
	opacityPalette = !opacityPalette;
	if (opacityPalette) {
		document.getElementById("paletteOpacityButton").innerHTML = '<a class="tooltips" href="#"><i class="material-icons">visibility_off</i><span>Change palette opacity</span></a>';
		document.getElementById("palette").style.opacity = ".7";
	} else {
		document.getElementById("paletteOpacityButton").innerHTML = '<a class="tooltips" href="#"><i class="material-icons">visibility</i><span>Change palette opacity</span></a>';
		document.getElementById("palette").style.opacity = "1";
	}
}

var paletteElements = paletteElements();
var paletteElementsReduced = paletteElementsReduced();
var actualElements = paletteElementsReduced;

sortPalette(false, 5, paletteElements);

paletteGraph.addCells(actualElements);

function paletteExtend() {
	extendedPalette = !extendedPalette;
	if (extendedPalette) {
		document.getElementById("paletteExtendButton").innerHTML = '<a class="tooltips" href="#"><i class="material-icons">remove_circle</i><span>Reduce palette elements</span></a>';
		actualElements = paletteElements;
		if (horizontalPalette) {
			document.getElementById("palette").style.height = "201px";
		} else {
			document.getElementById("palette").style.width = "201px";
		}
	} else {
		document.getElementById("paletteExtendButton").innerHTML = '<a class="tooltips" href="#"><i class="material-icons">add_circle</i><span>Extend palette elements</span></a>';
		actualElements = paletteElementsReduced;
		if (horizontalPalette) {
			document.getElementById("palette").style.height = "101px";
		} else {
			document.getElementById("palette").style.width = "101px";
		}
	}
	paletteGraph.clear();
	paletteGraph.addCells(actualElements);
}

function paletteRotate() {
	horizontalPalette = !horizontalPalette;
	sortPalette(horizontalPalette, 5, paletteElements);
	sortPalette(horizontalPalette, 5, paletteElementsReduced);
	paletteGraph.clear();
	paletteGraph.addCells(actualElements);
	/*if (horizontalPalette) {
	document.getElementById("palette").className = "palette-horizontal";
	} else {
	document.getElementById("palette").className = "palette-vertical";
	}
	document.getElementById("palette").style = null;
	document.getElementById("paletteTools").style = null;*/
	var actualWidth = document.getElementById("palette").style.width;
	var actualHeight = document.getElementById("palette").style.height;
	document.getElementById("palette").style.width = actualHeight;
	document.getElementById("palette").style.height = actualWidth;
}

/*para herramientas de edicion de elemento*/
/*paper.on('element:delete', function (elementView, evt) {
// Stop any further actions with the element view e.g. dragging
evt.stopPropagation();
if (confirm('Are you sure you want to delete this element?')) {
elementView.model.remove();
}
});*/

var actualElement = null;
var actualRenameElement = null;

var tools = $('<div class="toolbar">');
tools.append('<div id="elementDeleteButton" class="tools tools-delete" onclick="elementDelete()"><a class="tooltips" href="#"><i class="material-icons">delete_forever</i><span>Remove the element</span></a></div>');

tools.append('<div id="elTempButton" class="tools tools-entity-temp" onclick="setAsTemporal(event)"><a class="tooltips" href="#"><i class="material-icons">date_range</i><span>Set as Temporal</span></a></div>');
tools.append('<div id="elSnapButton" class="tools tools-entity-snap" onclick="setAsSnapshot(event)"><a class="tooltips" href="#"><i class="material-icons">photo_camera</i><span>Set as Snapshot</span></a></div>');
tools.append('<div id="elDefButton" class="tools tools-entity-def" onclick="setAsNonTemporal(event)"><a class="tooltips" href="#"><i class="material-icons">settings_backup_restore</i><span>Set as Non Temporal</span></a></div>');

tools.append('<div id="selectSuperEntity" class="tools tools-select-super-entity" onclick="selectSuperEntity(event)"><a class="tooltips" href="#"><i class="material-icons">expand_less</i><span>Define super entity</span></a></div>');
tools.append('<div id="elementNameText" class="tools tools-rename"><textarea id="elementRenameInput" cols="5" rows="2"></textarea></div>');
tools.append('<div id="elementAttrType" class="tools tools-attr-type"><a class="tooltips" href="#"><i class="material-icons" onclick="displayAttrType()">title</i><span>Change datatype of attribute</span></a><select id="selectAttrType" size="3"><option value="Varchar">String</option><option value="Integer">Integer</option><option value="Boolean">Boolean</option></select></div>');
tools.append('<div id="isaType" class="tools tools-isa-type"><a class="tooltips" href="#"><i class="material-icons" onclick="displayIsaType()">title</i><span>Set disjoint inheritance</span></a><select id="selectIsaType" size="3"><option value="1">Exclusive</option><option value="2">Overlapping</option><option value="3">Union</option><option value="4">None</option></select></div>');
tools.css({
	display: 'none'
});

$('#paper').append(tools);

disableTool('#elementLinkButton');
disableTool('#elementDuplicateButton');

function disableTool(tool) {
	$(tool).css({
		'background': '#787575',
		'pointer-events': 'none',
	});
}

paper.on('element:pointerclick', function (cellView, evt) {
	actualElement = cellView;
	showElementTools(cellView.model);
	hideRenameText();
});

paper.on('element:pointerdblclick', function (cellView, evt) {
	if (getType(cellView.model) != 'Inheritance') {
		$('#elementNameText').css({
			display: 'block'
		});
		$('#elementRenameInput').val(cellView.model.attr('textName/text'));
		$('#elementRenameInput').focus();
		actualRenameElement = cellView;
	}
});

$('textarea').on('keydown', function (e) {
	if (e.which == 13 && !e.shiftKey) {
		hideRenameText();
		hideElementTools();
	}
});

$('body').on('keydown', function (e) {
	if (e.which == 27) {
		actualRenameElement = null;
		hideRenameText();
	}
});

$('body').on('keydown', function (e) {
	if (e.key === "Delete") {
		if (actualElement != null) {
			elementDelete();
		}
	}
});

paper.on('element:pointermove', function (cellView, evt) {
	hideElementTools();
});

$('#paper').on('mousewheel DOMMouseScroll', function (evt) {
	hideElementTools();
});

$('#elementNameText').focusout(function () {
	hideElementTools();
});

function showElementTools(figure) {
	var pos = paper.localToClientPoint(figure.attributes.position);
	//var screenPos = paper.localToClientPoint(pos);

	tools.width(figure.attributes.size.width * paper.scale().sx + $('.tools').width() * 2);
	tools.height(figure.attributes.size.height * paper.scale().sy + $('.tools').height() * 2);
	tools.attr('elementid', figure.id);
	tools.css({
		top: pos.y - $('.tools').height(),
		left: pos.x - $('.tools').width(),
		display: 'block'
	});

	var displayAttrType = (getType(actualElement.model) == 'Attribute') ? 'block' : 'none';
	//oculta la opcion de cambiar el tipo del atributo si no es un atributo
	$('#elementAttrType').css({
		display: displayAttrType
	});
	//oculta el select de tipo del atributo
	$('#selectAttrType').css({
		display: 'none'
	});
	$('#selectIsaType').css({
		display: 'none'
	});
	var displayAddAttr = (getType(actualElement.model) == 'Entity' || getType(actualElement.model) == 'Relationship') ? 'block' : 'none';
	//oculta/muestra la opcion de agregar un atributo
	$('#elementAddAttr').css({
		display: displayAddAttr
	});
	var displaySelectSuperEntity = (getType(actualElement.model) == 'Inheritance') ? 'block' : 'none';
	//oculta/muestra la opcion de seleccionar super entity
	$('#selectSuperEntity').css({
		display: displaySelectSuperEntity
	});
	$('#isaType').css({
		display: displaySelectSuperEntity
	});
}

function hideElementTools() {
	tools.css('display', 'none');
	actualElement = null;
	hideRenameText();
}

function hideRenameText() {
	$('#elementNameText').css({
		display: 'none'
	});
	if (actualRenameElement != null) {
		changeName(actualRenameElement, $('#elementRenameInput').val());
		resizeElementFromLabel(actualRenameElement);
	}
	$('#elementRenameInput').val("");
}

function elementDelete() {
	var cell = graphMain.getCell(tools.attr('elementid'));
	cell.remove();
	//actualElement.remove();
	hideElementTools();
}

function elementLink(event) {
	var newLink = createLink();
	newLink.source({
		id: actualElement.model.id
	});
	newLink.prop('target', {
		x: event.clientX,
		y: event.clientY
	});

	hideElementTools();
}

function elementDuplicate() {
	hideElementTools();
}

function displayAttrType() {
	$('#selectAttrType').css({
		display: 'block'
	});
	//selecciona por defecto el tipo de dato que ya es el atributo
	$('#selectAttrType').val(actualElement.model.attr('customAttr/type'));
}

$('#selectAttrType').click(function () {
	actualElement.model.attr('customAttr/type',$(this).val());
	hideElementTools();
})

function displayIsaType() {
	$('#selectIsaType').css({
		display: 'block'
	});
	//selecciona por defecto el tipo de dato que ya es el atributo
	$('#selectIsaType').val(actualElement.model.attr('customAttr/type'));
}

$('#selectIsaType').click(function () {
	actualElement.model.attr('customAttr/type',$(this).val());
	if ($(this).val()==1){
		actualElement.model.attr('text/text','d');
	}else if ($(this).val()==2){
		actualElement.model.attr('text/text','o');
	}else if ($(this).val()==3){
		actualElement.model.attr('text/text','U');
	}else if ($(this).val()==4){
		actualElement.model.attr('text/text','');
	}
	hideElementTools();
})

function changeName(elementView, value) {
	if (value.length > 0) {
		elementView.model.attr('textName/text', value);
	}
}

function addAttr(e){
	var entity = actualElement;
	hideElementTools();
	$('body').append('<div id="flyPaper"></div>');
	var flyGraph = new joint.dia.Graph,
	flyAttr = new joint.dia.Paper({
			el: $('#flyPaper'),
			model: flyGraph,
			interactive: false,
		});
	//crear atributo
	var flyShape = paletteCreateAttr();
	pos = entity.model.position();
	offset = {
		x: flyShape.attributes.size.width / 2 * paper.scale().sx,
		y: flyShape.attributes.size.height / 2 * paper.scale().sy
	};
	flyAttr.scale(paper.scale().sx);
	flyShape.position(0, 0);
	flyGraph.addCell(flyShape);
	$("#flyPaper").offset({
		left: (e.pageX - offset.x),
		top: (e.pageY - offset.y)
	});
	$('body').on('mousemove.fly', function (e) {
		$("#flyPaper").offset({
			left: (e.pageX - offset.x),
			top: (e.pageY - offset.y)
		});
	});
	$('body').on('mouseup.fly', function (e) {
		var x = e.pageX,
		y = e.pageY,
		target = paper.$el.offset();
		origin = palette.$el.offset();

		// Dropped over paper and not over origin
		if ((x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) &&
			!(x > origin.left && x < origin.left + palette.$el.width() && y > origin.top && y < origin.top + palette.$el.height())) {
			var s = flyShape.clone();
			var p = paper.clientToLocalPoint(e.clientX, e.clientY);
			/*var localRect1 = paper.clientToLocalRect(target.left,target.top,target.width,target.height);
			s.position(((x - target.left - offset.x)+localRect1.center().x), ((y - target.top - offset.y)+localRect1.center().y));*/
			s.position(p.x - (s.attributes.size.width / 2), p.y - (s.attributes.size.height / 2));
			graphMain.addCell(s);
			//crear link
			var link = createLink();
			//conectar link a attr y actualElement
			connectLink(link, entity.model, s);
		}
		$('body').off('mousemove.fly').off('mouseup.fly');
		flyShape.remove();
		$('#flyPaper').remove();
	});
}

var ISASelected = null;

function selectSuperEntity(event) {
	ISASelected = actualElement.model;
	var links = getElementLinks(ISASelected);
	for (var i = 0; i < links.length; i++) {
		var elm = (links[i].source().id != ISASelected.id ? graphMain.getCell(links[i].source().id) : graphMain.getCell(links[i].target().id));
		if (getType(elm) == 'Entity') {
			markElement(elm,'entity');
		}
	}
}

paper.on('cell:pointerdown blank:pointerdown', function (elementView, evt) {
	var linkToSuperEntity = null;
	if (ISASelected != null) {
		var links = getElementLinks(ISASelected);
		//saca la marca a las entidades y verifica que se seleccionó alguna de ellas
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			var elm = (link.source().id != ISASelected.id ? graphMain.getCell(link.source().id) : graphMain.getCell(link.target().id));
			if (getType(elm) == 'Entity') {
				unmarkElement(elm);
				if (elementView.model != null && elm.id == elementView.model.id) {
					linkToSuperEntity = link;
				}
			}
		}
		if (ISASelected.attr('text/text')=='U'){
		//si es union
		//vuelve a recorrer los link para marcar direction los links
		if (linkToSuperEntity != null) {
			for (var i = 0; i < links.length; i++) {
				var link = links[i];
				if (link == linkToSuperEntity) {
					setDirection(link,true);
					setInheritance(link,true);
				} else {
					setDirection(link,false);
					setInheritance(link,false);
				}
			}
		}
		}else{
			//si es herencia
			if (linkToSuperEntity != null) {
			for (var i = 0; i < links.length; i++) {
				var link = links[i];
				setDirection(link,false);
				if (link == linkToSuperEntity) {
					setInheritance(link,true);
				} else {
					setInheritance(link,false);
				}
			}
		}
		}
		ISASelected = null;
		hideElementTools();
	}
});

function setDirection(link,value) {
	var marker = getType(graphMain.getCell(link.source().id)) == 'Entity' ? 'sourceMarker' : 'targetMarker';
	link.attr('customAttr/direction',value);
	if (value) {
		link.attr('line/'+marker+'/d','M 10 -5 0 0 10 5 z');
	} else {
		link.attr('line/'+marker+'/d','');
	}
}

function setInheritance(link,value) {
	var marker = getType(graphMain.getCell(link.source().id)) == 'Entity' ? 'sourceMarker' : 'targetMarker';
	link.attr('customAttr/inheritance',value);
	if (value) {
		link.attr('line/'+marker+'/d','M 10 -5 0 0 10 5 z');
	} else {
		link.attr('line/'+marker+'/d','');
	}
}

//cambia la herencia de normal a disjoint y viceversa.
function changeIsaType(){
	if (actualElement.model.attr('customAttr/type')==0){
		actualElement.model.attr('customAttr/type',1);
	}else{
		actualElement.model.attr('customAttr/type',0);
	}
	hideElementTools();
}


//link tool para agregar boton de total en link
joint.linkTools.TotalButton = joint.linkTools.Button.extend({
    name: 'total-button',
    options: {
        focusOpacity: 0.5,
        distance: 60,
        action: function(evt) {
            switchTotal(this);
            //alert('View id: ' + this.id + '\n' + 'Model id: ' + this.model.id);
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

//link tool para agregar boton de cardinalidad en link
joint.linkTools.CardinalityButton = joint.linkTools.Button.extend({
    name: 'cardinality-button',
    options: {
        focusOpacity: 0.5,
        distance: 40,
        action: function(evt) {
            switchCardinality(this, evt);
            //alert('View id: ' + this.id + '\n' + 'Model id: ' + this.model.id);
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
                'd': 'M 0 -7 -1 -5 M 0 -7 0 -2 M -5 0 5 0 M -2 6 -2 2 M -3 2 3 5 M 2 5 2 1',
                'stroke': 'black',
                'stroke-width': 2,
                'pointer-events': 'none',
            }
        }]
    }
});

function switchTotal(link) {
	link.model.attr('customAttr/total',!link.model.attr('customAttr/total'));
	(link.model.attr('customAttr/total')) ? link.model.attr('line/strokeWidth',5) : link.model.attr('line/strokeWidth',2);
}

function switchCardinality(linkView, evt) {
	var labels = linkView.model.attributes.labels;
	if (labels.length > 0) {
		if (labels[0].attrs.text.text == '1') {
			linkView.model.label(0, {
				attrs: {
					text: {
						text: 'N'
					}
				}
			});
		} else {
			linkView.model.label(0, {
				attrs: {
					text: {
						text: '1'
					}
				}
			});
		}
	}
}

//crea un conector
var createLink = function () {
	//para agregar controles en conectores
	var totalButton = new joint.linkTools.TotalButton();
	var cardinalityButton = new joint.linkTools.CardinalityButton();
	var verticesTool = new joint.linkTools.Vertices();
	var segmentsTool = new joint.linkTools.Segments();
	//var sourceArrowheadTool = new joint.linkTools.SourceArrowhead();
	//var targetArrowheadTool = new joint.linkTools.TargetArrowhead();
	var sourceAnchorTool = new joint.linkTools.SourceAnchor();
	var targetAnchorTool = new joint.linkTools.TargetAnchor();
	var boundaryTool = new joint.linkTools.Boundary();
	var removeButton = new joint.linkTools.Remove({
			distance: 20
		});

	var toolsView = new joint.dia.ToolsView({
			tools: [
				verticesTool, segmentsTool,
				//sourceArrowheadTool, targetArrowheadTool,
				sourceAnchorTool, targetAnchorTool,
				boundaryTool, removeButton,
				totalButton, cardinalityButton
			]
		});

	var myLink = new joint.shapes.standard.Link();

	myLink.attr({
		line: {
			stroke: 'black',
			strokeWidth: 2,
			sourceMarker: {},
			targetMarker: {
				'd': ''
			}
		},
		customAttr: {
			total: false,
			direction: false,
			inheritance: false
		}
	});

	myLink.connector('jumpover', {
		size: 10
	});

	var link = myLink.addTo(graphMain);
	var linkView = myLink.findView(paper);
	linkView.addTools(toolsView);

	return link;
};

paper.on('link:mouseenter', function (actualLinkView) {
	if (ISASelected == null) {
		//para que no molesten las opciones de la flecha cuando se selecciona superEntity
		actualLinkView.showTools();
	}
});

paper.on('blank:mouseover', function (actualLinkView) {
	paper.hideTools();
});

var connectLink = function (myLink, elm1, elm2) {
	myLink.source({
		id: elm1.id
	});
	myLink.target({
		id: elm2.id
	});
};

//devuelve los labels para agregar a un conector
var createLabel = function (txt) {
	var label = {
		attrs: {
			text: {
				text: txt,
				fill: 'black',
				fontSize: 14
			},
			rect: {
				fill: 'white'
			}
		},
		position: {
			distance: 0.5,
			offset: -15
		}
	}
	return label;
};


// para crear links arrastrando una elemento sobre otro
var dataElement;
paper.on({
	'element:pointerdown': function (elementView, evt) {
		evt.data = elementView.model.position();
		dataElement = evt;
	},

	'element:pointerup': function (elementView, evt, x, y) {
		var coordinates = new g.Point(x, y);
		var elementAbove = elementView.model;
		var elementBelow = this.model.findModelsFromPoint(coordinates).find(function (el) {
				return (el.id !== elementAbove.id);
			});

		// If the two elements are connected already, don't
		// connect them again (this is application-specific though).
		if (elementBelow && graphMain.getNeighbors(elementBelow).indexOf(elementAbove) === -1 && canConnect(elementBelow, elementAbove)) {

			// Move the element to the position before dragging.
			elementAbove.position(dataElement.data.x, dataElement.data.y);

			// Create a connection between elements.
			// var link = new joint.shapes.standard.Link();
			// link.source(elementAbove);
			// link.target(elementBelow);
			// link.addTo(graphMain);
			var newLink;
			if (getSpecificType(elementBelow) == 'Entity' && getType(elementAbove) == 'Entity') {
				newLink = temporalLink.clone();
				connectLink(newLink, elementBelow, elementAbove);
				newLink.addTo(graphMain);
				addTemporalTools(newLink);
				newLink.appendLabel(createLabel('setConstraint'));
			}else{
				newLink = createLink();
				connectLink(newLink, elementBelow, elementAbove);
				if (getType(elementBelow) != 'Attribute' && getType(elementAbove) != 'Attribute' &&
					getType(elementBelow) != 'Inheritance' && getType(elementAbove) != 'Inheritance') {
					newLink.appendLabel(createLabel('1'));
				}
			}


			// Add remove button to the link.
			// var tools = new joint.dsia.ToolsView({
			//     tools: [new joint.linkTools.Remove()]
			// });
			// link.findView(this).addTools(tools);
		}
	}
});

//para dragear la pagina

var dragStartPositionMain;

paper.on('blank:pointerdown', function (event, x, y) {
	hideElementTools();
	//dragStartPositionMain = { x: x, y: y};
	var scale = paper.scale();
	dragStartPositionMain = {
		x: x * scale.sx,
		y: y * scale.sy
	};
});

$("#paper").mousemove(function (event) {
	if (dragStartPositionMain != null) {
		paper.translate(
			event.offsetX - dragStartPositionMain.x,
			event.offsetY - dragStartPositionMain.y);
	}
});

paper.on('cell:pointerup blank:pointerup', function (cellView, x, y) {
	dragStartPositionMain = null;
});

$('#paper').on('mousewheel DOMMouseScroll', function (evt) {

	evt.preventDefault();
	var p = paper.clientToLocalPoint({
			x: evt.clientX,
			y: evt.clientY
		});
	var delta = Math.max(-1, Math.min(1, (evt.originalEvent.wheelDelta || -evt.originalEvent.detail)));
	var currentScale = V(paper.viewport).scale().sx;
	var newScale = currentScale + delta / 50;
	if (newScale > 0.4 && newScale < 2) {
		//paper.translate(0, 0);
		paper.scale(newScale, newScale); //, p.x, p.y);
	}
});

/*para que los div se acomoden al tamaño de la ventana*/
$(window).resize(function () {
	//$("#palette").width($(window).width()*0.25);
	//$("#palette").height($(window).height());
	$("#paper").width($(window).width());
	$("#paper").height($(window).height());
});


var errorList = [];

function checkSintaxis() {
	var elements = graphMain.getCells();
	for (var i = 0; i < elements.length; i++) {
		element = elements[i];
		var links = getElementLinks(element);
		if (links.length < 1) {
			//el elemento no tiene ningún link
			errorList.push('El ')
			markElement(element,'sintactico');
		}
		if (getType(element) == 'Attribute') {
			//solo puede estar conectado a 1 entidad o relacion
			checkAttribute(element, links, element, [element.id]);
		} else if (getType(element) == 'Relationship') {
			//debe tener por lo menos 2 entidades conectadas
			checkRelationship(element, links);
		} else if (getType(element) == 'Inheritance') {
			//debe tener por lo menos 2 entidades conectadas
			//y una superclase
			checkInheritance(element, links);
		}
		if (getSpecificType(element) == 'Entity') {
			//la entidad tiene que tener al menos un atributo clave
			checkNormalEntity(element, links);
		} else if (getSpecificType(element) == 'WeakEntity') {
			//verifica que tenga una clave debil y una relacion debil conectada a traves
			//de un link total con la cardinalidad N
			checkWeakEntity(element, links);
		} else if (getSpecificType(element) == 'WeakRelationship') {
			//debe tener una y solo una entidad debil y por lo menos 1 entidad normal
			checkWeakRelationship(element, links);
		// } else if (getSpecificType(element) == 'KeyAttribute') {
			// //no puede estar conectado a entidad debil o relacion debil
			// checkKeyAttribute(element, links);
		// } else if (getSpecificType(element) == 'WeakKeyAttribute') {
			// //no puede estar conectado a entidad normal o relacion normal
			// checkWeakKeyAttribute(element, links);
		}
	}
}

function checkNormalEntity(element, links) {
	//verifica que entre los links haya un atributo clave
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		var elm = (link.source().id != element.id ? graphMain.getCell(link.source().id) : graphMain.getCell(link.target().id));
		if (getSpecificType(elm) == 'KeyAttribute') {
			return;
		}
	}
	markElement(element,'sintactico');
}

function checkWeakEntity(element, links) {
	//verifica que tenga una clave debil y una relacion debil conectada a traves
	//de un link total con la cardinalidad N
	var weakKeyAttribute = false;
	var weakRelationship = 0;
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		var elm = (link.source().id != element.id ? graphMain.getCell(link.source().id) : graphMain.getCell(link.target().id));
		if (getSpecificType(elm) == 'WeakKeyAttribute') {
			weakKeyAttribute = true;
		} else if (getSpecificType(elm) == 'KeyAttribute') {
			markElement(element,'sintactico');
			return;
		} else if (getSpecificType(elm) == 'WeakRelationship') {
			weakRelationship++;
			if (!link.attr('customAttr').total || link.attributes.labels[0].attrs.text.text != 'N') {
				//no se conecta a la relacion a traves de un link total con N
				markElement(element,'sintactico');
				return;
			}
		}
	}
	if (!weakKeyAttribute || weakRelationship != 1) {
		markElement(element,'sintactico');
	}
}

function checkAttribute(element, links, currentElement, attributeArray) {
	//verifica que solo haya 1 entidad o relacion
	var cant = 0;
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		var elm = (link.source().id != currentElement.id ? graphMain.getCell(link.source().id) : graphMain.getCell(link.target().id));
		if (getType(elm) == 'Entity' || getType(elm) == 'Relationship') {
			cant++;
		} else if (getType(elm) == 'Attribute') {
			//el atributo esta conectado a otro atributo
				//el atributo tiene que ser el mismo tipo especifico que el otro atributo
				if (!attributeArray.includes(elm.id)) {
					attributeArray.push(elm.id);
					cant += checkAttribute(element, getElementLinks(elm), elm, attributeArray);
					attributeArray.pop(elm.id);
				} else if (attributeArray.length > 1 && attributeArray[attributeArray.length-2] != elm.id) {
					//si esta en el array pero no es el ultimo, entonces existe un ciclo
					markElement(element,'sintactico');
				}
		}
	}
	if (cant != 1 && element.id == currentElement.id) {
		markElement(element,'sintactico');
	}
	return cant;
}

function checkRelationship(element, links) {
	//verifica que haya al menos 2 entidades
	var cant = 0;
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		var elm = (link.source().id != element.id ? graphMain.getCell(link.source().id) : graphMain.getCell(link.target().id));
		if (getType(elm) == 'Entity') {
			cant++;
		}
	}
	if (cant < 2) {
		markElement(element,'sintactico');
	}
}

function checkWeakRelationship(element, links) {
	//debe tener una y solo una entidad debil y al menos 1 entidad normal
	var cantEntity = 0;
	var cantWeakEntity = 0;
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		var elm = (link.source().id != element.id ? graphMain.getCell(link.source().id) : graphMain.getCell(link.target().id));
		if (getSpecificType(elm) == 'Entity') {
			if (link.attributes.labels[0].attrs.text.text != 'N') {
				cantEntity++;
			} else {
				markElement(element,'sintactico');
			}
		} else if (getSpecificType(elm) == 'WeakEntity') {
			if (link.attr('customAttr').total && link.attributes.labels[0].attrs.text.text == 'N') {
				cantWeakEntity++;
			} else {
				markElement(element,'sintactico');
			}
		}
	}
	if (cantWeakEntity != 1 || cantEntity < 1) {
		markElement(element,'sintactico');
	}
}

function checkInheritance(element, links) {
	//debe tener por lo menos 2 entidades conectadas
	//y una superclase
	var cant = 0;
	var notExistSuper = true;
	for (var i = 0; i < links.length; i++) {
		link = links[i];
		var elm = (link.source().id != element.id ? graphMain.getCell(link.source().id) : graphMain.getCell(link.target().id));
		if (getType(elm) == 'Entity') {
			cant++;
		}
		if (element.attr('text/text')=='U'){
				if (link.attr('customAttr/direction')==true && link.attr('customAttr/inheritance')==true) {
					if (notExistSuper) {
						notExistSuper = false;
					} else {
						//ya existe otra entidad como super
						markElement(element,'sintactico');
						//return;
					}
				}
			}else{
				if (link.attr('customAttr/inheritance') == false) {
					if (notExistSuper) {
						notExistSuper = false;
					} else {
						//ya existe otra entidad como super
						markElement(element,'sintactico');
						//return;
					}
				}
		}
	}
	if (cant < 2 || notExistSuper) {
		markElement(element,'sintactico');
	}
}

function check() {
	cleanInference();
	checkSintaxis();
	var req = checkSemantica();
	var rr;
	// Gestor del evento que indica el final de la petición (la respuesta se ha recibido)
	req.addEventListener("load", function() {
	// La petición ha tenido éxito
	if (req.status >= 200 && req.status < 400) {
	    rr = req.responseText.toString();
		if (rr.length == 4){
			alert('Modelo consistente');
		} else {
			//quitar corchetes
			var classes = JSON.parse(rr);
			var i;
			for (i = 0; i<classes.length;i++){
				var elem = graphMain.getCells();
				var j;
				for (j = 0; j<elem.length;j++){
				if (getType(elem[j])!='Error'){
					if (elem[j].attr('text/text').toUpperCase() == classes[i].toUpperCase()){
						markElement(elem[j],'semantico');
					}
				}
				}
			}
		}
	} else {
	  	// Se muestran informaciones sobre el problema ocasionado durante el tratamiento de la petición
	    console.error(req.status + " " + req.statusText);
	  	}
	});
}

//para consultar a omelet
function checkSemantica() {
	// Creación de la petición HTTP
	var req = new XMLHttpRequest();
	// Petición HTTP POST asíncrona si el tercer parámetro es "true" o no se especifica
	req.open("POST", "http://localhost:3000/", true);
	// Envío de la petición
	var q = exportJSON();
	var query = '{"type": "check","data": '+q+'}';
	req.send(query);
	// Gestor del evento que indica que la petición no ha podido llegar al servidor
	req.addEventListener("error", function(){
	  console.error("Error de red"); // Error de conexión
	});
	return req;
}

function generateDB() {
	// Creación de la petición HTTP
	var req = new XMLHttpRequest();
	// Petición HTTP GET asíncrona si el tercer parámetro es "true" o no se especifica
	req.open("POST", "http://localhost:3000/", true);
	// Envío de la petición
	var q = exportJSON();
	var query = '{"type": "db","data": '+q+'}';
	//var query = '{"type": "db","data": '+q+'}';
	//query = JSON.parse(query);
	req.send(query);
	// Gestor del evento que indica que la petición no ha podido llegar al servidor
	req.addEventListener("error", function(){
	  console.error("Error de red"); // Error de conexión
	});

	req.addEventListener("load", function() {
	// La petición ha tenido éxito
	if (req.status >= 200 && req.status < 400) {
	    alert(req.responseText);
	}
	});
	//return req;
}

//exportar json para omelet
function exportJSON() {
    var allElement = getAllElement();
    var entities = allElement[0];
    var relationships = allElement[1];
    var attributes = allElement[2];
    var inheritances = allElement[3];
    var connectors = allElement[4];
    var elements = graphMain.getElements();
    var links = graphMain.getLinks();
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var cardinality = "";
        var labels = link.attributes.labels;
        if (labels != null) {
            cardinality = labels[0].attrs.text.text;
        }
        //var cid = link.cid;
        //var id = cid.match(/\d+/g)[0];
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
    var json = '{"entities": ['+entities+'],"relationships":['+relationships+'],"attributes":['+attributes+'],"inheritances":['+inheritances+'],"connectors":['+connectors+']}';

}

function cleanInference() {
  var elements = graphMain.getCells();
	for (var i = 0; i < elements.length; i++) {
		unmarkElement(elements[i]);
	}
}


function markElement(element,tipo) {
	var color;
	switch(tipo) {
    case 'semantico':
        color = 'red';
        break;
    case 'sintactico':
        color = 'yellow';
        break;
    case 'entity':
        color = 'blue';
		break;
	}
	element.attr('.outer/stroke',color);
}

function unmarkElement(element) {
	var defaultStroke;
	for (var i = 0; i < paletteElements.length; i++) {
		if (paletteElements[i].attributes.type.includes(element.attributes.type)) {
			//obtiene el stroke por defecto del elemento. Se basa en el valor que tiene en la paleta
			defaultStroke = paletteElements[i].attr('.outer/stroke');
		}
	}
	element.attr('.outer/stroke',defaultStroke);
}

//ejemplo para testear
/*var ent1 = paletteElements[0].clone();
var ent2 = paletteElements[0].clone();
var ent3 = paletteElements[0].clone();
var ent4 = paletteElements[0].clone();
var attk1 = paletteElements[3].clone();
var attk2 = paletteElements[3].clone();
var attk3 = paletteElements[3].clone();
var attk4 = paletteElements[3].clone();
graphMain.addCells([ent1,ent2,ent3,ent4,attk1,attk2,attk3,attk4]);
var link1 = createLink();
var link2 = createLink();
var link3 = createLink();
var link4 = createLink();
connectLink(link3, ent1,attk3);
connectLink(link4, ent2,attk4);
connectLink(link1, ent3,attk1);
connectLink(link2, ent4,attk2);
*/

// Menu for editing properties of each ER primitive

$('body').append('<div id="menues"><div id=encabezadoMenu></div><div id=menuOpciones></div></div>');

$('#menues').focusin(function(){
    hideElementTools();
});

/*
$('#encabezadoMenu').append('<h4>Opciones</h4><input id="btnMinimizeMenues" name="minimizeMenues" onclick=minimizeMenues() type="button" value="-">');
function minimizeMenues(){
    if ($('#btnMinimizeMenues').val() == '-'){
        $('#menuOpciones').css({
            display: 'none'
        });
        $('#menues').css({
            height: 35
        });
        $('#btnMinimizeMenues').val('+');
    }else{
        $('#menuOpciones').css({
            display: 'block'
        });
        $('#menues').css({
            height: 500
        });
        $('#btnMinimizeMenues').val('-');
    }
}
*/

//para evitar que el puntero quede focuseando en un input cuando se selecciona un elemento del grafo.
$('#paper').mouseup(function(evt){
    if (evt.target.tagName=='tspan'){
        $(document.activeElement).blur();
    }
});

//menu con opciones de clases
$('#menuOpciones').append('<div id="menuClass"></div>');
$('#menuClass').append('<div id="changeNameClass"><input id="classRenameInput" type="text"></div>');
$("#menuClass").append('<div id="listAttributes"></div>');
$('#menuClass').append('<input id="btnAddAttributeClass" name="addAttribute" onclick=addAttribute() type="button" value="add attr">');
$("#menuClass").append('<div id="listMethods"></div>');
$('#menuClass').append('<input id="btnAddMethodClass" name="addMethod" onclick=addMethod() type="button" value="add method">');
$('#menuClass').append('<input id="btnConfirmMenuClass" name="done" onclick=confirmMenuClass() type="button" value="done"><input id="btnCancelMenuClass" name="done" onclick=cancelMenuClass() type="button" value="cancel">');
$('#menuClass').css({
    display: 'none'
});
