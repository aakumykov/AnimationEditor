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

    photocamera2.init({
    	width: 640,
    	height: 480,
    	buttonParent: $('#toolbar'),
    	photoParent: $('#editor'),
    });
});
