'use strict';

var photocamera = {
	width: 0,
	height: 0,
	
	init: function(buttonParentId, photoParentId) {
		var self = this;

		$(buttonParentId).append(
			$("<button id='photo_button'><i  class='fa fa-camera-retro fa-4x'></i></button>")
		);

		//console.log($(photoParentId).width()+"x"+$(photoParentId).height());

		$(photoParentId).append(
			$("<img id='photo' src='img/pixel.png'>")
		);
		this.width = $(photoParentId).width();
		this.height = $(photoParentId).height();

		// зачем это?
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
		console.log('photocamera.requestAPhoto(), '+photo.width()+'x'+photo.height());
		photo.takeNew();
	},
	
	placeAPhoto: function(){
		console.log('photocamera.placeAPhoto()');

		var newSize = photo.fitTo(this.width, this.height);

		var photoOnPage = $('#photo');
			photoOnPage.width( newSize.width );
			photoOnPage.height( newSize.height );
			photoOnPage.attr('src', photo.data());
	},

	adjustSize: function(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		console.log('photocamera.adjustSize(), '+this.width+'x'+this.height);
	},

}

