'use strict';

var element = {
	addElementMethods: function(element){
		//console.log('element.addElementMethods()');
		
		element.setView = function(mode){
			//console.log('element.setView('+mode+')');
			switch (mode) {
				case 'active':
					this.style({'stroke-width':4});
					break;
				case 'normal':
					this.style({'stroke-width':2});
					break;
				default:
					console.error("Неизвестный режим '"+mode+"'");
					break;
			}
		}

		element.on('touchstart', function(ev){
			//console.log('element.touchstart()');
			workspace.touchstart(ev);
		});
		
		element.on('touchend', function(ev){
			//console.log('element.touchend()');
			workspace.touchend(ev);
		});

		return element;
	},

	rect: function(geometry){
		//console.log('element.rect()');

		var rect = SVG(document.createElement('DIV')).rect(geometry.width,geometry.height).
			fill({color:'transparent'}).
			stroke({width:2,color:'blue'}).
			move(geometry.left, geometry.top);

			rect.type = function() { return 'rect'; }

		return this.addElementMethods(rect);
	},

	circle: function(geometry){
		//console.log('element.circle()');

		var radius = (geometry.width > geometry.height) ? geometry.width : geometry.height;
		var left = geometry.left+geometry.width/2;
		var top = geometry.top+geometry.height/2;

		var circle = SVG(document.createElement('DIV')).circle(radius).
			fill({color:'transparent'}).
			stroke({color:'crimson',width:2}).
			move(left, top);

			circle.type = function() { return 'circle'; }

		return this.addElementMethods(circle);
	},

	polyline: function(geometry, points){
		//console.log('element.polyline()');

		var polyline = SVG(document.createElement('DIV')).polyline(points).
				fill('none').
				stroke({width:2,color:'LimeGreen'}).
				move(geometry);

				polyline.type = function() { return 'polyline'; }

		return this.addElementMethods(polyline);
	},
}