'use strict';

var photocamera2 = {
	width: 640,
	height: 480,
	photo: '',

	init: function(param){
		// this.width = param.width || this.width;
		// this.height = param.height || this.height;
		var self = this;

		var button = $("<button id='photo_button'><i  class='fa fa-camera-retro fa-4x'></i></button>");
		button.click(function(){
			self.takeAPhoto();
		});
		param.buttonParent.append(button)
		
		var image = $("<img id='photo' src='img/pixel.png'>");
		param.photoParent.append(image);
	},

	// фотает и возвращает фото-данные
	takeAPhoto: function(param={}) {
		console.log("photocamera2.takeAPhoto()");
		
		this.width = param.width || this.width;
		this.height = param.height || this.height;

		var res = this.requestPhoto();
		console.log("photocamera2.takeAPhoto(), res:");
		console.log(res);
	},

	// фотает и помещает фото в указанный элемент
	placeAPhoto: function(parentElement){
		console.log("photocamera2.placeAPhoto()");
		var photo = this.takeAPhoto();
		$(parentElement)
	},

	// возвращает <img> с фотографией (не реализовано)
	takeImage: function(attributes){

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


	photoData: function(data) {
		this.photo = data;
	},

	photoSuccess: function(imageURI){
		console.log('photocamera2.photoSuccess(), length: '+imageURI.length);
		var dataPrefix = ('browser'==device.platform) ? 'data:image/jpeg;base64,' : '';
		photocamera2.photoData(dataPrefix + imageURI);
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
