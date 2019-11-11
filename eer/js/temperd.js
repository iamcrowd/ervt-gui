var actualElement = null

function setAsTemporal(event) {
	actualElement.model.attributes.temporality = 'Temporal';
	console.log(actualElement.model);
}

function setAsSnapshot(event) {
	actualElement.model.attributes.temporality = 'Snapshot';
	console.log(actualElement.model);
}

function setAsNonTemporal(event) {
	actualElement.model.attributes.temporality = '';
	console.log(actualElement.model);
}
