'use strict';

var mouse = {
	name: 'Путь Мыши',
	path: [],

	startRecord: function(){
		//console.log('mouse.startRecord()');
		this.clear();
	},

	finishRecord: function(){
		//console.log('mouse.finishRecord()');
		digest.setMousePath( this.getPath() );
		digest.setGeometry( this.getGeometry() );
		
		// console.log('mouse path');
		// console.log(this.getPath());
		
		// console.log('geometry');
		// console.log(this.getGeometry());
	},

	clear: function(){
		//console.log('mouse.clear()');
		this.path = [];
	},
	addPoint: function(x,y){
		//console.log('mouse.addPoint('+x+','+y+')');
		this.path[this.path.length] = [x,y];
	},

	getPath: function(interval=5){
		// console.log('Исходный путь мыши: ('+this.path.length+')');
		// console.log(this.path);
		// console.log('interval='+interval);

		var path = this.path;

		if (0==path.length) {
			//console.log('Путь Мыши слишком короткий.');
			return false;
		}

		if (interval > path.length) {
			//console.log('Интервал больше длины пути.');
			var sparePath = [ path[0], path[path.length-1] ];
		}
		else {
			var sparePath = [];

			sparePath.push(path[0]);

			for (var j=(interval); j < path.length; j+=interval) {
				//console.log( 'j='+j );
				sparePath.push( path[j-1] );
			}
			if ( (j-interval) <= path.length ) {
				sparePath.push( path[path.length-1] );
			}	
		}
		
		//console.log('Обработанный путь мыши:');
		//console.log(sparePath);
		
		return sparePath;
	},
	getGeometry: function(){
		//console.log('mouse.getGeometry()');
		
		var path = this.getPath();
		if (!path) return false;

		var start = path[0];
		var finish = path[path.length-1];

		var x1 = start[0];
		var x2 = finish[0];
		
		var y1 = start[1];
		var y2 = finish[1];

		if (x1 > x2) {
			x1 = x1 + x2;
			x2 = x1 - x2;
			x1 = x1 - x2;
		}

		if (y1 > y2) {
			y1 = y1 + y2;
			y2 = y1 - y2;
			y1 = y1 - y2;
		}

		var region = {
			left: x1,
			top: y1,
			width: (x2-x1),
			height: (y2-y1),
		}

		var cx1 = x1 - workspace.left;
		var cx2 = x2 - workspace.left;
		var cy1 = y1 - workspace.top;
		var cy2 = y2 - workspace.top;
		var cregion = {
			left: cx1,
			top: cy1,
			width: (cx2-cx1),
			height: (cy2-cy1),
		}

		// console.log(region);
		// console.log(cregion);

		return region;
	},
}