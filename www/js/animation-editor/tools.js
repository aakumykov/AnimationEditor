"use strict";

var selectToolSpec = {
	type: 'modifier',
	context: 'element',
	title: 'Выбор элемента',
	class: 'fa fa-mouse-pointer',
	mousedown: function(){
		console.log('selectTool.mousedown()');
		//console.log( SVG.select('.element').first().pointsArray() );
		console.log( SVG.select('.element').first().hexArray() );
	}
};

var moveTool = {
	type: 'modifier',
	context: 'element',
	title: 'Перемещение элемента',
	class: 'fa fa-arrows',
	mousedown: function() {
		console.log('moveTool.mousedown()');

		var element = digest.element();
		var event = digest.event();
		
		if (!element.data('ui-draggable')) {
			element.draggable();
			element.trigger(event);
		}

	},
	mouseup: function(param){
		console.log('moveTool.mouseup()');

		var element = digest.element();
		var event = digest.event();
		
		if (element.data('ui-draggable')) {
			element.draggable('destroy');
		}
	}
};

var lockTool = {
	type: 'modifier',
	context: 'element',
	title: 'Блокировка элемента',
	class: 'fa fa-lock',
	mousedown: function(param){
		toolbar.setDefaultTool();
	}
};

var rectTool = {
	type: 'creator',
	context: 'workspace',
	title: 'Прямоугольник',
	class: 'fa fa-stop',
	mouseup: function(){
		//console.log('rectTool.mouseup()');

		var rect = element.rect(digest.geometry());
		
		// console.log(rect);
		// console.log(digest.geometry());

		workspace.addElement(rect);
	}
};

var circleTool = {
	type: 'creator',
	context: 'workspace',
	title: 'Круг',
	class: 'fa fa-circle-o',
	mouseup: function(){
		//console.log('circleTool.mouseup()');
		
		var circle = element.circle(digest.geometry());

		workspace.addElement(circle);
	}
};

var polylineTool = {
	title: 'Произвольная линия',
	type: 'creator',
	context: 'workspace',
	class: 'fa fa-pencil',
	mouseup: function(){
		//console.log('polylineTool.mouseup()');
		
		var polyline = element.polyline(digest.geometry(), digest.mousePath());

		workspace.addElement(polyline);
	}
};

var layerUp = {
	type: 'modifier',
	context: 'element',
	title: 'Переместить вверх',
	class: 'fa fa-level-up',
	mousedown: function(param){
		param.element.style.zIndex+=1;
	}
};

var layerDown = {
	type: 'modifier',
	context: 'element',
	title: 'Переместить вниз',
	class: 'fa fa-level-down',
	mousedown: function(param){
		param.element.style.zIndex-=1;
	}
};

var resizeTool = {
	type: 'modifier',
	context: 'element',
	title: 'Изменение размера',
	class: 'fa fa-expand',
	click: function(param) {
		var element = $(param.element);
		var event = param.event;
		var classString = element.attr('class');

		console.log('resizeTool.click('+element.attr('id')+')');
		
		if (!element.data('ui-resizable')) {
			element.resizable();
			element.trigger(event);
		}

	},
	// mouseup: function(param){
	// 	var element = $(param.element);
	// 	var event = param.event;
		
	// 	console.log('resizeTool.mouseup('+element.attr('id')+')');

	// 	if (element.data('ui-resizable')) {
	// 		element.resizable('destroy');
	// 	}
	// }
};

var removeTool = {
	title: 'Удалить',
	type: 'modifier',
	context: 'element',
	class: 'fa fa-times',
	mousedown: function(){
		console.log('removeTool.mousedown()');
		digest.element().instance.remove();
	}
}

var hexTool = {
	title: '16-ричный код',
	type: 'creator',
	context: 'workspace',
	class: 'fa fa-code',
	mousedown: function(){
		console.log('hexTool.mousedown()');
		
		var self = this;

		var elements_array = $('.element');
		var cmd_array = [];
		
		elements_array.each(function(i,element){
			var virtElement = element.instance;
			cmd_array.push( virtElement.hexArray() );
		});

		console.log('cmd_array:');
		for (var k in cmd_array){
			console.log(cmd_array[k]);
		}
	},
}


// сборка в коллекцию
var toolSpecs = {
	select: selectToolSpec,
	move: moveTool,
	rect: rectTool,
	circle: circleTool,
	polyline: polylineTool,
	layerUp: layerUp,
	layerDown: layerDown,
	lock: lockTool,
	resize: resizeTool,
	remove: removeTool,
	hex: hexTool,
};
