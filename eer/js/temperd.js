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
}

function hideTemporality(){
	actualElement.model.attr('tempRect/display','none');
	actualElement.model.attr('textTemp/display','none');
	actualElement.model.attr('textTemp/text', '');
	actualElement.model.attr('textName/refX2', 0);
}

function resizeElementFromLabel(elementView)
{
	var element=elementView.model;
	var original_width_entities = 80;
	//alert(element.attr('label/text'));
	var sizeChars=0;
	var markups=element.markup;
	for (i = 0; i < markups.length; ++i) {
		if(markups[i].tagName.toUpperCase()=='TEXT')
		{
			var selector=markups[i].selector;
			//alert(element.attr(selector+'/text'));
			$('#string_span').text(element.attr(selector+'/text'));
			if($('#string_span').width()>sizeChars)
				sizeChars=$('#string_span').width();
		}

	}
	if(sizeChars>original_width_entities)
	{
		element.prop('size/width', sizeChars+8);
		}
	else
	{
		element.prop('size/width', original_width_entities);
	}
}
