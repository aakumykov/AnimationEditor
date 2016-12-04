"use strict";

function dumpEvent(ev){
	console.log('---------------- event dump start ---------------');
	for (var key in ev) {
		var value = ev[key];
		var type = typeof(value);
		if ('number'==type || 'string'==type || 'boolean'==type) {
			console.log(key+": "+value+' ('+type+')');
		}
	}
	console.log('---------------- event dump finish ---------------');
}

function dumpPosition(ev, comment){
	var el = $(ev.target);
	console.log( 'element, css: '+el.css('left')+', '+el.css('top') );
	console.log( 'element, jOffset: '+el.offset().left+', '+el.offset().top );
	console.log( 'pointer, offset: '+ev.offsetX+', '+ev.offsetY );
	console.log( 'pointer, client: '+ev.clientX+', '+ev.clientY );
}

function dumpObject(obj){
	console.log('---------------- object dump start ---------------');
	for (var key in obj) {
		var value = obj[key];
		var type = typeof(value);
		if ('number'==type || 'string'==type || 'boolean'==type) {
			console.log(key+": "+value+' ('+type+')');
		} else if ('object'==type) {
			console.log(key+": [object]");
		} else {
			console.log(key+": UNKNOWN");
		}
	}
	console.log('---------------- object dump finish ---------------');
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
