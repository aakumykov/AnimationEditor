"use strict";

$(document).ready(function(){
    console.log('document ready');

    editor.init({
    	width: 500,
    	height: 500,
    	parentElement: document.body, 
        toolbar: toolbar, 
        workspace: workspace, 
        statusbar: statusbar,
    });

    photocamera.init(
	    // {
	    // 	width: 640,
	    // 	height: 480,
	    // }
    );
});
