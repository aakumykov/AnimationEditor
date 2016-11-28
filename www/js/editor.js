'use strict';

var editor = $("<div id='editor' name='editor' title='редактор'></div>");

editor.init = function(anchor, toolbar, workspace, statusbar){
	//console.log('editor.init()');
	
	$(anchor).append(this); //строка должна быть до инициализации инструментов, так они цепляются к editor

	this.toolbar = toolbar;
	toolbar.init();

	this.statusbar = statusbar;
	statusbar.init();

	this.workspace = workspace;
	workspace.init();
}

editor.on('touchend', function(ev){
	if ( workspace.isMouseActive() ) workspace.setMouseInactive();
});
