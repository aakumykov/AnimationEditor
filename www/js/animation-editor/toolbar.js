"use strict";

var toolbar = $('<div></div>');
	toolbar.name = 'Панель инструментов';
	toolbar.attr('id', 'toolbar');
	toolbar.data('currentTool',null);

toolbar.init = function(){
	//console.log('toolbar.init()');

	for (var name in toolSpecs) {
		var spec = toolSpecs[name];
			spec.name = name;
		this.appendTool(spec);
	}

	this.setDefaultTool();

	editor.append(this);
}

toolbar.setDefaultTool = function(){
	//console.log('toolbar.setDefaultTool()');
	toolbar.setActiveTool( $(this).find('.tool').first() );
}

toolbar.setActiveTool = function(tool){
	var tool = $(tool);
	//console.log('toolbar.setActiveTool(), tool: '+tool.attr('title')+', type: '+tool.data('type') );

	var oldTool = this.getActiveTool();
		$(oldTool).removeClass('activeTool');
	
	var newTool = tool;
		newTool.addClass('activeTool');
	
	$(this).data('currentTool', newTool);

	statusbar.setStatus('tool', newTool.data('name') );
}

toolbar.getActiveTool = function(){
	var currentTool = toolbar.data('currentTool');

	if (currentTool) {
		return currentTool;
	} else {
		//console.info('toolbar.getActiveTool(): CURRENT TOOL IS NULL');
		return false;
	}
}

toolbar.buildTool = function(toolSpec){
	//console.log(toolSpec);

	var tool = $("<div></div>");
		
		tool.on('mousedown', function(ev){
			toolbar.setActiveTool(this);
		});

		tool.attr('id',toolSpec.name+'Tool');
		tool.attr('title',toolSpec.title);		
		tool.addClass('tool');
		tool.addClass(toolSpec.class);
		
		tool.data('name',toolSpec.name);
		tool.data('type',toolSpec.type);
		tool.data('context',toolSpec.context);
		tool.data('mousedown',toolSpec.mousedown);
		tool.data('mouseup',toolSpec.mouseup);
		tool.data('click',toolSpec.click);

		tool.data('getCallback', function(callbackType){
			//console.log('tool.getCallback('+callbackType+')');
			var callback = tool.data(callbackType);
			if (callback) return callback;
			else return false;
		});
		
		return tool;
}

toolbar.appendTool = function(toolSpec){
	var tool = this.buildTool(toolSpec);
	this.append(tool);
}
