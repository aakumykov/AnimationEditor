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

		element.on('mousedown', function(ev){
			//console.log('element.mousedown()');
			workspace.mousedown(ev);
		});
		
		element.on('mouseup', function(ev){
			//console.log('element.mouseup()');
			workspace.mouseup(ev);
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

			rect.pointsArray = function(){
				console.log('rect.coords()');
				var x = this.x();
				var y = this.y();
				var w = this.width();
				var h = this.height();
				return [
					{x: (x) ,y: (y)},
					{x: (x+w) ,y: (y)},
					{x: (x+w) ,y: (y+h)},
					{x: (x) ,y: (y+h)},
				]
			}

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
			
			circle.pointsArray = function(step=30){
				console.log('circle('+left+','+top+','+radius+')');
				var points = [];
				for (var i=0; i<360; i+=step) {
					var x = left + radius*Math.cos(i*Math.PI/180);
					var y = top + radius*Math.sin(i*Math.PI/180);
					points.push({x:x, y:y});
				}
				return points;
			}

		return this.addElementMethods(circle);
	},

	polyline: function(geometry, points){
		//console.log('element.polyline()');

		var polyline = SVG(document.createElement('DIV')).polyline(points).
				fill('none').
				stroke({width:2,color:'LimeGreen'}).
				move(geometry);

				polyline.type = function() { return 'polyline'; }
				
				polyline.pointsArray = function(){
					console.log('polyline.pointsArray()');
					var svgPoints = polyline.attr('points').split(' ');
					var points = [];
					for (var i=0; i<svgPoints.length; i++) {
						var coord = svgPoints[i].split(',');
						points.push({x:coord[0], y:coord[1]});
					}
					return points;
				}

		return this.addElementMethods(polyline);
	},
}
