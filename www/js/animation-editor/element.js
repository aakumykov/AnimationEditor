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
	
		// возвращает массив hex-команд для arduino LaserShow
		element.hexArray = function(){
			//console.log(this.type()+', element.hexArray()');
			
			// превращает десятичную координату в hex-команду с опциональным включением указателя (лазера)
			function dec2hex(n, laserOn=false) {
				var modifier = (laserOn) ? 32768 : 0;
				return  "0x" + (Math.round(n) + modifier).toString(16);
			}
			
			var points = this.points();
			
				//console.log(points);
			
			// установка указателя в начальную точку без включения
			var hex_array = [ dec2hex(points[0]), dec2hex(points[1]) ];
			
			// обход остальных точек с включением
			for (var i=2; i<points.length; i+=2) {
				hex_array.push( dec2hex(points[i],true) );
				hex_array.push( dec2hex(points[i+1]) );
			}

			// возврат в первую точку с включением
			hex_array.push( dec2hex(points[0],true) );
			hex_array.push( dec2hex(points[1]) );
			
			return hex_array;
		}

		return element;
	},

	rect: function(geometry){
		//console.log('element.rect()');

		var rect = SVG(document.createElement('DIV')).rect(geometry.width,geometry.height).
			fill({color:'transparent'}).
			stroke({width:2,color:'blue'}).
			move(geometry.left, geometry.top);

			rect.type = function() { return 'rect'; }

			rect.points = function(){
				//console.log('rect.points()');
				var x = this.x();
				var y = this.y();
				var w = this.width();
				var h = this.height();
				return [
					x	 , y,
					(x+w), y,
					(x+w), (y+h),
					(x)  , y,
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
			
			circle.points = function(step=30){
				//console.log('circle.points()');
				var points = [];
				for (var i=0; i<360; i+=step) {
					var x = left + radius*Math.cos(i*Math.PI/180);
					var y = top + radius*Math.sin(i*Math.PI/180);
					points.push(x);
					points.push(y);
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
				
				polyline.points = function(){
					//console.log('polyline.points()');
					var svgPoints = polyline.attr('points').split(' ');
					var points = [];
					for (var i=0; i<svgPoints.length; i++) {
						var coord = svgPoints[i].split(',');
						points.push(coord[0]);
						points.push(coord[1]);
					}
					return points;
				}

		return this.addElementMethods(polyline);
	},
}
