'use strict';

var photocamera2 = {
	width: 640,
	height: 480,
	photo: '',

	init: function(param){
		// this.width = param.width || this.width;
		// this.height = param.height || this.height;

		this.placeButton(param.buttonParent);
		this.placeImage(param.photoParent);
	},

	takeAPhoto: function(param={}) {
		console.log("photocamera2.takeAPhoto()");
		
		this.width = param.width || this.width;
		this.height = param.height || this.height;

		this.placePhoto();
	},


	placeButton: function(parentElement){
		console.log("photocamera2.placeButton()");
		console.log(parentElement);
		var button = $("<button id='photo_button'><i  class='fa fa-camera-retro fa-4x'></i></button>");
		$(parentElement).append(button);
	},

	placeImage: function(parentElement) {
		console.log("photocamera2.placeImage()");
		console.log(parentElement);
		var image = $("<img id='photo' src='img/pixel.png'>");
		$(parentElement).append(image);
	},

	placePhoto: function(){
		console.log("photocamera2.placeAPhoto()");
		var size = this.fitTo
	},



	requestPhoto: function(){
		console.log('photocamera2.requestPhoto(), '+this.width+'x'+this.height);

		var self = this;

		navigator.camera.getPicture(
			self.photoSuccess, 
			self.onFail, 
			{ 
				quality: 50,
				encodingType: Camera.EncodingType.JPEG,
				//sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				sourceType: Camera.PictureSourceType.CAMERA,
				destinationType: Camera.DestinationType.FILE_URI,
                targetWidth: this.width,
				targetHeight: this.height,
				saveToPhotoAlbum: true,
				// cameraDirection: Camera.Direction.BACK,
				// cameraDirection: Camera.Direction.FRONT,
			}
		);
	},

	photoSuccess: function(imageURI){
		console.log('photocamera2.photoSuccess()');
		var dataPrefix = ('browser'==device.platform) ? 'data:image/jpeg;base64,' : '';
		this.photo = dataPrefix + imageURI;
	},

	photoError: function(msg){
		console.log('photocamera2.photoError()');
		console.error(msg);
	},


	fitTo: function(frameWidth, frameHeight){
		console.log('photo.fitTo('+frameWidth+','+frameHeight+')');

		var newPhotoWidth = frameWidth;
		var k = newPhotoWidth / this.width;
		var newPhotoHeight = k*this.height;
			
			// console.log('НОВОЕ фото: '+newPhotoWidth+'x'+newPhotoHeight);
			// console.log('k: '+k);
		
		if (newPhotoHeight >= frameHeight) {
			newPhotoHeight = frameHeight;
			k = newPhotoHeight / this.height;
			newPhotoWidth = k*this.width;
			// console.log('высота фото > высоты окна: '+newPhotoWidth+'x'+newPhotoHeight);
		} else {
			// console.log('высота фото < высоты окна: '+newPhotoWidth+'x'+newPhotoHeight);
		}

		return {
			width: newPhotoWidth,
			height: newPhotoHeight,
		}
	},

	
}
