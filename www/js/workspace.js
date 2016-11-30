'use strict';

var workspace = {
	name: 'workspace',
	width: '90%',
	height: 280,
	left: 90,
	top: 10,

	init: function(){
		// console.log('workspace.init()');
		// console.log('this.name='+this.name);

		this.svg = SVG('editor');
		this.drawCanvas = this.svg.rect(this.width, this.height).
			id(this.name).
			move(this.left, this.top).
			stroke({color:'#D6D6D6',width:1}).
			fill({color:'#EBEBEB'});

		this.drawCanvas.on('touchstart', this.touchstart);
		this.drawCanvas.on('touchend',   this.touchend);
		this.drawCanvas.on('touchmove', this.touchmove);
		this.drawCanvas.on('mouseout',  this.mouseout);
	},

	touchstart: function(ev) {
		var target = ev.target;
		var context = ('workspace'==target.id) ? 'workspace' : 'element';

		statusbar.setStatus('context', context);
		//console.log('workspace.touchstart(), id: '+target.id);

		if ('element'==context) workspace.setActiveElement(target);
		if ('workspace'==context) workspace.blurActiveElement();

		digest.setContext(context);
		digest.setEvent(ev);
		mouse.startRecord();
		workspace.setMouseActive();

		//console.log('touch, '+workspace.isMouseActive());

		workspace.applyTool();
	},
	touchend: function(ev){
		var context = ('workspace'==ev.target.id) ? 'workspace' : 'element';
		
		statusbar.setStatus('context', context);
		//console.log('workspace.touchend(), id: '+ev.target.id);

		digest.setContext(context);
		digest.setEvent(ev);
		mouse.finishRecord();
		workspace.setMouseInactive();
		
		workspace.applyTool();
	},
	touchmove: function(ev){
		ev.preventDefault();

		if (workspace.isMouseActive()){
			mouse.addPoint(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
		}

		statusbar.setStatus(
			'other', 
			'Курсор: page: function('+ev.changedTouches[0].pageX+', '+ev.changedTouches[0].pageY+'), client: function('+ev.changedTouches[0].clientX+', '+ev.changedTouches[0].clientY+'),'
		);
		
		if (workspace.isMouseActive()) {
			statusbar.setStatus('mouse', 'активна, движется');
		}
	},
	mouseout: function(ev){
		statusbar.setStatus('other', '');
	},


	addElement: function(element){
		//console.log('workspace.addElement()');

		var elementType = element.type();
		var num = document.getElementsByTagName(elementType).length;
		var id = elementType + num;
		element.id(id);
		
		this.svg.put(element);
	},

	setActiveElement: function(element){
		//console.log('workspace.setActiveElement('+element.id()+')');

		var context = 'element';

		this.blurActiveElement();

		element.instance.setView('active');
		
		this.activeElement = element;
		
		digest.setElement(element);
		digest.setContext(context);
		
		statusbar.setStatus('element', element.id );
		statusbar.setStatus('context', context );
	},
	blurActiveElement: function(){
		//console.log('workspace.blurActiveElement()');
		
		var context = 'workspace';

		if (this.hasActiveElement()) this.getActiveElement().instance.setView('normal');
		
		this.activeElement = null;
		
		digest.setElement(null);
		digest.setContext(context);
		
		statusbar.setStatus('element', '-' );
		statusbar.setStatus('context', context );
	},
	hasActiveElement: function(){
		return Boolean(this.activeElement);
	},
	getActiveElement: function(){
		//console.log('workspace.getActiveElement()');
		if (this.activeElement) {
			return this.activeElement;
		} else {
			return false;
		}
	},


	setMouseActive: function(){
		//console.log('workspace.setMouseActive()');
		this.mouseActive = true;
		statusbar.setStatus('mouse','активна');
	},
	setMouseInactive: function(){
		//console.log('workspace.setMouseInactive()');
		this.mouseActive = false;
		statusbar.setStatus('mouse','неактивна');
	},
	isMouseActive: function(){
		return this.mouseActive;
	},

	applyTool: function(){
		//console.log('workspace.applyTool()');
		
		var eventContext = digest.context();
		//console.log(': '+);

		var eventType = digest.eventType();
		//console.log(': '+);
		
		var tool = toolbar.getActiveTool();
		//console.log(': '+);
		
		var toolContext = tool.data('context');
		//console.log(': '+);

		if (toolContext == eventContext) {
			//console.log('workspace.applyTool(): контекст ('+eventContext+') подходит для "'+tool.data('name')+'" ('+toolContext+')');

			var toolCallback = tool.data('getCallback')(eventType);

			if (toolCallback) {
				toolCallback();
			} else {
				//console.log('Инструмент "'+tool.data('name')+'" не обрабатывает "'+digest.eventType()+'"');
			}
		}
		else 
		{
			//console.log('workspace.applyTool(): неподходящий контекст ('+eventContext+') для "'+tool.data('name')+'" ('+toolContext+')');
			return false
		}
	},
}

