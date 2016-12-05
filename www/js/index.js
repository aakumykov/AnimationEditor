"use strict";

$(document).ready(function(){
    console.log('document ready');

    editor.init(document.body, 
        toolbar, 
        workspace, 
        statusbar
    );

    page.init('#toolbar', '#editor');
});
