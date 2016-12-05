'use strict';

var page = {
	width: 0,
	height: 0,
	
	init: function(buttonParentId, photoParentId) {
		var self = this;

		$(buttonParentId).append(
			$("<button id='photo_button'><i  class='fa fa-camera-retro fa-4x'></i></button>")
		);

		$(photoParentId).append(
			$("<img id='photo' src='img/pixel.png'>")
		);

		this.adjustSize();
		photo.adjustSize();

		$('#photo_button').on('click', function(){
			self.requestAPhoto();
		});
		
		$(window).on('resize', function(){
			//console.log('window.resize');
			self.adjustSize();
			photo.adjustSize();
		});
	},


	requestAPhoto: function(){
		console.log('page.requestAPhoto(), '+photo.width()+'x'+photo.height());
		photo.takeNew();
	},
	
	placeAPhoto: function(){
		console.log('page.placeAPhoto()');

		var newSize = photo.fitTo(512, 512);

		var photoOnPage = $('#photo');
			photoOnPage.width( newSize.width );
			photoOnPage.height( newSize.height );
			photoOnPage.attr('src', photo.data());
	},

	adjustSize: function(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		//console.log('page.adjustSize(), '+this.width+'x'+this.height);
	},

}