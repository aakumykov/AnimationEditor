'use strict';

var editor = $("<div id='editor' name='editor' title='редактор'></div>");

editor.init = function(param){
	//console.log('editor.init()');
	
	// editor
	this.width(param.width);
	this.height(param.height);
	this.on('mouseup', function(ev){
		if ( workspace.isMouseActive() ) workspace.setMouseInactive();
	});
	$(param.parentElement).append(this); //строка должна быть до инициализации инструментов, так они цепляются к editor

	// toolbar
	this.toolbar = param.toolbar;
	this.toolbar.init();

	// statusbar
	this.statusbar = param.statusbar;
	this.statusbar.init();

	// workspace
	this.workspace = param.workspace;
	this.workspace.init();
}

// editor.on('mouseup', function(ev){
// 	if ( workspace.isMouseActive() ) workspace.setMouseInactive();
// });
