'use strict';

var photocamera = {
	width: 640,
	height: 480,
	photo: '',

	init: function(param){
		// this.width = param.width || this.width;
		// this.height = param.height || this.height;
	},

	// фотает и возвращает фото-данные
	takeAPhoto: function(param={}) {
		console.log("photocamera.takeAPhoto()");
		
		this.width = param.width || this.width;
		this.height = param.height || this.height;

		this.callback = param.callback;
		
		this.requestPhoto();
	},

	requestPhoto: function(){
		console.log('photocamera.requestPhoto(), '+this.width+'x'+this.height);

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
		console.log('photocamera.photoData('+typeof(data)+', '+data.length+')');
		this.photo = data;
	},

	photoSuccess: function(imageURI){
		console.log('photocamera.photoSuccess(), length: '+imageURI.length);
		var dataPrefix = ('browser'==device.platform) ? 'data:image/jpeg;base64,' : '';
		photocamera.photoData(dataPrefix + imageURI);
		photocamera.callback();
	},

	photoError: function(msg){
		console.log('photocamera.photoError()');
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
