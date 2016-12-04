"use strict";

var tool_status = $("<div class='status_part'>Инструмент: <span id='status_tool'></span></div>");
var context_status = $("<div class='status_part'>Контекст: <span id='status_context'></span></div>");
var element_status = $("<div class='status_part'>Активный элемент: <span id='status_element'>отсуствует</span></div>");
var mouse_status = $("<div class='status_part'>Мышь: <span id='status_mouse'>неактивна</span></div>");
var other_status = $("<div class='status_part'><span id='status_other'></span></div>");

var statusbar = $("<div id='statusbar'></div>");
	statusbar.name = 'строка состояния';

statusbar.init = function(){
	//console.log('statusbar.init()');

	statusbar.append(tool_status);
	statusbar.append(context_status);
	statusbar.append(element_status);
	statusbar.append(mouse_status);
	statusbar.append(other_status);

	editor.append(this);
}

statusbar.setStatus = function(mode, msg){
	switch (mode) {
		case 'tool':
			$('#status_tool').text(msg);
			break;
		case 'element':
			$('#status_element').text(msg);
			break;
		case 'mouse':
			$('#status_mouse').text(msg);
			break;
		case 'context':
			//console.log('statusbar.setStatus('+mode+','+msg+')');
			$('#status_context').text(msg);
			break;
		case 'other':
			$('#status_other').text(msg);
			break;
		default:
			console.error("statusbar.setStatus(): неизвестный режимъ '"+mode+"'");
			break;
	}
}
