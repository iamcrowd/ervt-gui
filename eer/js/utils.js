/**
Util functions to complement temporal erd palette
*/

function resizeElementFromLabel(elementView)
{
	var element=elementView.model;
	var original_width_entities = 80;

	var sizeChars=0;
	var markups=element.markup;
	
	for (i = 0; i < markups.length; ++i) {
		if(markups[i].tagName.toUpperCase()=='TEXT')
		{
			var selector=markups[i].selector;

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
