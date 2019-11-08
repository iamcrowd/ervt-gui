/* DEFINICION DE GRAFOS Y PAPERS */

//graph para el diagrama er
var graph = new joint.dia.Graph();

//paper donde es dibujado el graph del diagrama er
var paper = new joint.dia.Paper({
	el: document.getElementById('paper'),
	width: $('#paper').width(),
	height: $('#paper').height(),
	model: graph,
	gridSize: 20,
	drawGrid: {
		name: 'doubleMesh',
		args: [
			{
				color: '#c4c4c4',
				thickness: 1
			},//configuracion de grid mas grande
			{
				color: '#c4c4c4',
				scaleFactor: 5,
				thickness: 5
			}//configuracion de grid mas chico
		]
	}
});

//graph para la paleta er
var stencilGraph = new joint.dia.Graph();

//paper donde es dibujado el graph de la paleta er
var stencilPaper = new joint.dia.Paper({
	el: document.getElementById('stencilPaper'),
	width: $('#stencilPaper').width(),
	height: $('#stencilPaper').height(),
	gridSize: 20,
	model: stencilGraph,
	interactive: false
});

/* DRAG AND DROP STENCIL TO PAPER */

stencilPaper.on('cell:pointerdown', function (cellView, e, x, y) {
	$('body').append('<div id="flyPaper"></div>');
	var flyGraph = new joint.dia.Graph,
	flyPaper = new joint.dia.Paper(
		{
			el: $('#flyPaper'),
			model: flyGraph,
			interactive: false,
		}
		),
	flyShape = cellView.model.clone(),
	pos = cellView.model.position(),
	offset =
	{
		x: flyShape.attributes.size.width / 2 * paper.scale().sx,
		y: flyShape.attributes.size.height / 2 * paper.scale().sy
	};
	flyPaper.scale(paper.scale().sx);
	flyShape.position(0, 0);
	flyGraph.addCell(flyShape);
	$("#flyPaper").offset(
	{
		left: e.pageX - offset.x,
		top: e.pageY - offset.y
	}
	);
	$('body').on('mousemove.fly', function (e)
	{
		$("#flyPaper").offset(
		{
			left: e.pageX - offset.x,
			top: e.pageY - offset.y
		}
		);
	}
	);
	$('body').on('mouseup.fly', function (e)
	{
		var x = e.pageX,
		y = e.pageY,
		target = paper.$el.offset();

		// Dropped over paper ?
		if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height())
		{
			var s = flyShape.clone();
			/*var p = paper.clientToLocalPoint({
			x: e.clientX,
			y: e.clientY
			});*/
			s.position(x - target.left - offset.x, y - target.top - offset.y);
			//s.position(p);
			graphMain.addCell(s);
		}
		$('body').off('mousemove.fly').off('mouseup.fly');
		flyShape.remove();
		$('#flyPaper').remove();
	}
	);
});