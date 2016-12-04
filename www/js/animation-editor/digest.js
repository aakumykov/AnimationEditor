'use strict';

var digest = {
	// -------- свойства -------- 
	// (сгруппированы по методам, работающим с ними)
	theContext: null,

	theElement: null,
	
	theEvent: null,
	theEventType: null,
	theX: null,
	theY: null,
	theElement: null,
	
	theMousePath: null,

	theGeometry: {
		left: null,
		top: null,
		width: null,
		height: null,
	},


	// -------- методы --------
	// контекст
	context: function(){
		return this.theContext;
	},
	setContext: function(cntx){
		//console.log('digest.setContext('+cntx+')');
		this.theContext = cntx;
	},

	// активный элемент
	element: function(){
		return this.theElement;
	},
	setElement: function(element){
		this.theElement = element;
	},

	// событие
	event: function(){
		return this.theEvent;
	},
	setEvent: function(ev){
		//console.log('digest.setEvent('+ev.type+')');
		this.theEvent = ev;
		this.theEventType = ev.type;
		this.theX = ev.clientX;
		this.theY = ev.clientY;
	},

	// тип события
	eventType: function(){
		return this.theEventType;
	},

	// геометрия
	geometry: function(){
		return this.theGeometry;
	},
	setGeometry: function(arg){
		//console.log('digest.setGeometry()');
		this.theGeometry.left = arg.left;
		this.theGeometry.top = arg.top;
		this.theGeometry.width = arg.width;
		this.theGeometry.height = arg.height;
	},

	// мышиный путь
	mousePath: function(){
		return this.theMousePath;
	},
	setMousePath: function(path){
		////console.log('digest.setMousePath()');
		this.theMousePath = path;
	},

}