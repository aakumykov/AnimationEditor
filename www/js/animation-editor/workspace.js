'use strict';

var workspace = {
	name: 'workspace',
	width: '100%',
	height: '100%',
	left: 0,
	top: 0,

	init: function(arg){
		// console.log('workspace.init()');
		// console.log('this.name='+this.name);

		this.svg = SVG('editor');
		this.drawCanvas = this.svg.rect(this.width, this.height).
			id(this.name).
			move(this.left, this.top).
			stroke({color:'#D6D6D6',width:1}).
			fill({color:'#EBEBEB'}).
			opacity(0.5);

		this.drawCanvas.on('mousedown', this.mousedown);
		this.drawCanvas.on('mouseup',   this.mouseup);
		this.drawCanvas.on('mousemove', this.mousemove);
		this.drawCanvas.on('mouseout',  this.mouseout);
	},

	mousedown: function(ev) {
		var target = ev.target;
		var context = ('workspace'==target.id) ? 'workspace' : 'element';

		statusbar.setStatus('context', context);
		//console.log('workspace.mousedown(), id: '+target.id);

		if ('element'==context) workspace.setActiveElement(target);
		if ('workspace'==context) workspace.blurActiveElement();

		digest.setContext(context);
		digest.setEvent(ev);
		mouse.startRecord();
		workspace.setMouseActive();

		workspace.applyTool();
	},
	mouseup: function(ev){
		var context = ('workspace'==ev.target.id) ? 'workspace' : 'element';
		
		statusbar.setStatus('context', context);
		//console.log('workspace.mouseup(), id: '+ev.target.id);

		digest.setContext(context);
		digest.setEvent(ev);
		mouse.finishRecord();
		workspace.setMouseInactive();
		
		workspace.applyTool();
	},
	mousemove: function(ev){
		var pageX = ev.pageX;
		var pageY = ev.pageY;
		var clientX = ev.clientX;
		var clientY = ev.clientY;

		if (workspace.isMouseActive()){
			mouse.addPoint(pageX, pageY);
		}

		statusbar.setStatus(
			'other', 
			'Курсор: page: function('+pageX+', '+pageY+'), client: function('+clientX+', '+clientY+'),'
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

