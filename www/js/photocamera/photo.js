'use strict';

var photo = {

	metadata: {
		width: 0,
		height: 0,
		data: null,
	},

	adjustSize: function(){
		this.width(640);
		this.height(480);
		// this.width( Math.round(page.width/2) );
		// this.height( Math.round(page.height/2) );
		// console.log('photo.adjustSize(), '+this.width()+'x'+this.height());
	},

	takeNew: function(){
		console.log('photo.takeNew(), '+this.width()+'x'+this.height());

		var self = this;

		navigator.camera.getPicture(
			self.onSuccess, 
			self.onFail, 
			{ 
				quality: 50,
				encodingType: Camera.EncodingType.JPEG,
				//sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				sourceType: Camera.PictureSourceType.CAMERA,
				destinationType: Camera.DestinationType.FILE_URI,
                targetWidth: photo.width(),
				targetHeight: photo.height(),
				saveToPhotoAlbum: true,
				// cameraDirection: Camera.Direction.BACK,
				// cameraDirection: Camera.Direction.FRONT,
			}
		);
	},

	onSuccess: function(imageURI){
		console.log('photo.onSuccess()');
		//console.log(imageURI.length);
		photo.data(imageURI);
		page.placeAPhoto();
	},

	onError: function(msg){
		console.log('photo.onError()');
		console.error(msg);
	},


	width: function(arg){
		if (undefined==arg) {
			return this.metadata.width;
		} else {
			this.metadata.width = arg;
		}
	},
	
	height: function(arg){
		if (undefined==arg) {
			return this.metadata.height;
		} else {
			this.metadata.height = arg;
		}
	},
	
	data: function(arg){
		console.log('photo.data()');

		if (undefined==arg) {
			//console.log(' получаю, '+this.metadata.data.length);
			return this.metadata.data;
		} else {
			var dataPrefix = ('browser'==device.platform) ? 'data:image/jpeg;base64,' : '';
			var imgData = dataPrefix + arg;
			//console.log(' устанавливаю, '+imgData.length);
			this.metadata.data = imgData;
		}
	},

	fitTo: function(frameWidth, frameHeight){
		console.log('photo.fitTo('+frameWidth+','+frameHeight+')');

		var newPhotoWidth = frameWidth;
		var k = newPhotoWidth / this.width();
		var newPhotoHeight = k*this.height();
			
			// console.log('НОВОЕ фото: '+newPhotoWidth+'x'+newPhotoHeight);
			// console.log('k: '+k);
		
		if (newPhotoHeight >= frameHeight) {
			newPhotoHeight = frameHeight;
			k = newPhotoHeight / this.height();
			newPhotoWidth = k*this.width();
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