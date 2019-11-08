// Create shapes

function paletteElements() {
	return [entity, rel, attr, attrKey, inheritance, weakEntity, weakRel, attrMult, attrWeakKey, attrDer];
}

function paletteElementsReduced() {
	return [entity, rel, attr, attrKey, inheritance];
}

function paletteCreateAttr() {
	return attr.clone();
}

var gridSize = 100;

function sortPalette(horizontal, size, elements) {
	var col = 0;
	var row = 0;
	//var elements = paletteElements();
	elements.forEach(function (element) {
		element.attributes.position.x = gridSize * col + gridSize / 2 - element.attributes.size.width / 2;
		element.attributes.position.y = gridSize * row + gridSize / 2 - element.attributes.size.height / 2;
		if (horizontal) {
			if (col < size - 1) {
				col++
			} else {
				col = 0;
				row++;
			}
		} else {
			if (row < size - 1) {
				row++
			} else {
				row = 0;
				col++;
			}
		}
	});
}

var erd = joint.shapes.erd;

erd.Entity.define('erd.CustomEntity', {
	position: {
		x: gridSize * 0 + gridSize / 2 - 40,
		y: gridSize * 0 + gridSize / 2 - 20
	},
	attrs: {
		text: {
			fill: '#ffffff',
			text: 'Entity',
			'letter-spacing': 0,
			style: {
				'text-shadow': '1px 0 1px #333333'
			}
		},
		'.outer': {
			fill: '#083c5d',
			stroke: 'none',
			filter: {
				name: 'dropShadow',
				args: {
					dx: 0.5,
					dy: 2,
					blur: 2,
					color: '#333333'
				}
			}
		},
		'.inner': {
		}
	},
	size: {
		width: 80,
		height: 40
	}
});

var entity = new erd.CustomEntity();

//entity.position(gridSize * 0 + gridSize / 2 - 40, gridSize * 0 + gridSize / 2 - 20);
//entity.resize(80, 40);
/*entity.attr({
label: {
text: 'Entity'
}
});*/

/*var entity = new erd.Entity({
position: {
x: gridSize * 0 + gridSize / 2 - 40,
y: gridSize * 0 + gridSize / 2 - 20
},
attrs: {
text: {
fill: '#ffffff',
text: 'Entity',
'letter-spacing': 0,
style: {
'text-shadow': '1px 0 1px #333333'
}
},
'.outer, .inner': {
fill: '#083c5d',
stroke: 'none',
filter: {
name: 'dropShadow',
args: {
dx: 0.5,
dy: 2,
blur: 2,
color: '#333333'
}
}
},
},
size: {
width: 80,
height: 40
},
});*/

var rel = new erd.Relationship({
		position: {
			x: gridSize * 1 + gridSize / 2 - 30,
			y: gridSize * 0 + gridSize / 2 - 30
		},
		attrs: {
			text: {
				fill: '#ffffff',
				text: 'Relationship',
				'letter-spacing': 0,
				style: {
					'font-size': '10px',
					'text-shadow': '1px 0 1px #333333'
				}
			},
			'.outer': {
				fill: '#648040',
				stroke: 'none',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0,
						dy: 2,
						blur: 1,
						color: '#333333'
					}
				}
			}
		},
		size: {
			width: 60,
			height: 60
		},
	});

var attr = new erd.Normal({
		position: {
			x: gridSize * 2 + gridSize / 2 - 30,
			y: gridSize * 0 + gridSize / 2 - 20
		},
		attrs: {
			text: {
				fill: '#ffffff',
				text: 'Attribute',
				'letter-spacing': 0,
				style: {
					'font-size': '12px',
					'text-shadow': '1px 0 1px #333333'
				}
			},
			'.outer': {
				fill: '#c4b484',
				stroke: '#c4b484',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0,
						dy: 2,
						blur: 2,
						color: '#222138'
					}
				}
			},
			customAttr: {
				type: 'varchar'
			}
		},
		size: {
			width: 60,
			height: 40
		},
	});

var attrKey = new erd.Key({
		position: {
			x: gridSize * 3 + gridSize / 2 - 30,
			y: gridSize * 0 + gridSize / 2 - 20
		},
		attrs: {
			text: {
				fill: '#ffffff',
				text: 'Key Attr.',
				'letter-spacing': 0,
				style: {
					'font-size': '10px',
					'text-shadow': '1px 0 1px #333333'
				}
			},
			'.outer': {
				fill: '#e7b51d',
				stroke: 'none',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0,
						dy: 2,
						blur: 2,
						color: '#222138'
					}
				}
			},
			customAttr: {
				type: 'varchar'
			}
		},
		size: {
			width: 60,
			height: 40
		},
	});

var isa = new erd.ISA({
		position: {
			x: gridSize * 4 + gridSize / 2 - 30,
			y: gridSize * 0 + gridSize / 2 - 20
		},
		attrs: {
			text: {
				text: 'ISA',
				fill: '#ffffff',
				'letter-spacing': 0,
				style: {
					'text-shadow': '1px 0 1px #333333'
				}
			},
			polygon: {
				fill: '#51c0ca',
				stroke: 'none',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0,
						dy: 2,
						blur: 1,
						color: '#333333'
					}
				}
			},
			customAttr: {
				type: 0
			}
		},
		size: {
			width: 60,
			height: 40
		},
	});

erd.Attribute.define('erd.Inheritance', {
	position: {
			x: gridSize * 4 + gridSize / 2 - 30,
			y: gridSize * 0 + gridSize / 2 - 20
	},
	attrs: {
		text: {
			fill: '#ffffff',
			text: 'o',
			fontWeight: 'bold',
			'letter-spacing': 0,
			style: {
					'text-shadow': '1px 0 1px #333333'
				}
		},
		'.outer': {
			fill: '#51c0ca',
			stroke: 'none',
			filter: {
				name: 'dropShadow',
				args: {
					dx: 0,
					dy: 2,
					blur: 1,
					color: '#333333'
				}
			}
		},
		'.inner': {
		},
		customAttr: {
			type: 0
		}
	},
	size: {
		width: 40,
		height: 40
	},
});

var inheritance = new erd.Inheritance();

var weakEntity = new erd.WeakEntity({
		position: {
			x: gridSize * 0 + gridSize / 2 - 40,
			y: gridSize * 1 + gridSize / 2 - 20
		},
		attrs: {
			text: {
				fill: '#ffffff',
				text: 'Weak\nEntity',
				'letter-spacing': 0,
				style: {
					'text-shadow': '1px 0 1px #333333'
				}
			},
			'.inner': {
				fill: '#0d5c8e',
				stroke: 'none',
				points: '155,5 155,55 5,55 5,5'
			},
			'.outer': {
				fill: 'none',
				stroke: '#0d5c8e',
				points: '160,0 160,60 0,60 0,0',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0.5,
						dy: 2,
						blur: 2,
						color: '#333333'
					}
				}
			}
		},
		size: {
			width: 80,
			height: 40
		},
	});

var weakRel = new erd.IdentifyingRelationship({
		position: {
			x: gridSize * 1 + gridSize / 2 - 30,
			y: gridSize * 1 + gridSize / 2 - 30
		},
		attrs: {
			text: {
				fill: '#ffffff',
				text: 'Weak\nRelationship',
				'letter-spacing': 0,
				style: {
					'font-size': '10px',
					'text-shadow': '1px 0 1px #333333'
				}
			},
			'.inner': {
				fill: '#8cb359',
				stroke: 'none'
			},
			'.outer': {
				fill: 'none',
				stroke: '#8cb359',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0,
						dy: 2,
						blur: 1,
						color: '#333333'
					}
				}
			}
		},
		size: {
			width: 60,
			height: 60
		},
	});

var attrMult = new erd.Multivalued({
		position: {
			x: gridSize * 2 + gridSize / 2 - 30,
			y: gridSize * 1 + gridSize / 2 - 20
		},
		attrs: {
			text: {
				fill: '#ffffff',
				text: ' Multival.\nAttr.',
				'letter-spacing': 0,
				style: {
					'text-shadow': '1px 0px 1px #333333'
				}
			},
			'.inner': {
				fill: '#8f8462',
				stroke: 'none',
				rx: 43,
				ry: 21

			},
			'.outer': {
				fill: 'none',
				stroke: '#8f8462',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0,
						dy: 2,
						blur: 2,
						color: '#222138'
					}
				}
			},
			customAttr: {
				type: 'varchar'
			}
		},
		size: {
			width: 60,
			height: 40
		},
	});

erd.Attribute.define('erd.WeakKey', {
	position: {
		x: gridSize * 4 + gridSize / 2 - 30,
		y: gridSize * 1 + gridSize / 2 - 20
	},
	attrs: {
		text: {
			fill: '#ffffff',
			text: 'Weak Key\nAttr.',
			fontWeight: 'bold',
			'letter-spacing': 0,
			'text-decoration': 'underline',
			style: {
				'font-size': '12px',
				//'text-decoration-style': 'dotted',
				'text-shadow': '1px 0 1px #333333',
				'border-bottom': '1px dashed #999',
			}
		},
		'.outer': {
			fill: '#e0bd50',
			stroke: 'none',
			filter: {
				name: 'dropShadow',
				args: {
					dx: 0.5,
					dy: 2,
					blur: 2,
					color: '#333333'
				}
			}
		},
		'.inner': {
		},
		customAttr: {
			type: 'varchar'
		}
	},
	size: {
		width: 60,
		height: 40
	},
});

var attrWeakKey = new erd.WeakKey();

var attrDer = new erd.Derived({
		position: {
			x: gridSize * 3 + gridSize / 2 - 30,
			y: gridSize * 1 + gridSize / 2 - 20
		},
		attrs: {
			text: {
				fill: '#ffffff',
				text: 'Derived\nAttr.',
				'letter-spacing': 0,
				style: {
					'text-shadow': '1px 0 1px #333333'
				}
			},
			'.inner': {
				fill: '#ead8a0',
				stroke: 'none',
				'display': 'block'
			},
			'.outer': {
				fill: 'none',
				stroke: '#ead8a0',
				'stroke-dasharray': '3,1',
				filter: {
					name: 'dropShadow',
					args: {
						dx: 0,
						dy: 2,
						blur: 2,
						color: '#222138'
					}
				}
			},
			customAttr: {
				type: 'varchar'
			}
		},
		size: {
			width: 60,
			height: 40
		},
	});
