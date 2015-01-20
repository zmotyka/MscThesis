(function ($, cs) {
    "use strict";

    var imageDataProvider = function (){
    	var self = this;
    	self.imageSeries = [];
		
		var provider = {
			getImage: getImage,
			getImageCount: getImageCount
		};

		return provider;

		function getImage(index){
			var deferred = $.Deferred();

			var requestedImage = self.imageSeries[index];

			console.log('Requested: ' + index);

			if (requestedImage){
				console.log('Requested image already loaded');

				deferred.resolve(requestedImage);
			} else {
				console.log('Loading image...');

				loadImages().then(function(data) {
					console.log('loadImages then');
					self.imageSeries = data;

					deferred.resolve(self.imageSeries[index]);
				});
			}

			return deferred;
		}

		function getImageCount() {
			return self.imageSeries.length;
		}

		function loadImages(){
			return $.ajax({
				url: '/data/images_old.json',
				cache: false,
				error: function (request, status, error) {
			        console.log('ajax error');
			        console.log(request);
			        console.log(status);
			        console.log(error);
			    }
			});
		}
    };

    var imageProvider = new imageDataProvider();

    function str2ab(str) {
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        var index = 0;
        for (var i=0, strLen=str.length; i<strLen; i+=2) {
            var lower = str.charCodeAt(i);
            var upper = str.charCodeAt(i+1);
            bufView[index] = lower + (upper <<8);
            index++;
        }
        return bufView;
    }


    function getBase64Image(img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    function getPixelDataForBase64(base64PixelData)
    {
        var pixelDataAsString = window.atob(base64PixelData);
        var pixelData = str2ab(pixelDataAsString);
        // console.log('base64 pixelData');
        // console.log(base64PixelData);
        // console.log(pixelData);
        // console.log('size: ' + sizeof(base64PixelData));

        console.log('pixelData');
        // console.log('size: ' + sizeof(pixelData));
        return pixelData;
    }

    function getExampleImage(imageId) {
        // var width = 256;
        // var height = 256;

        var width = 512;
        var height = 512;
        
        // ct image
		var image = {
            imageId: imageId,
            minPixelValue : 0,
            maxPixelValue : 4096,
            slope: 1.0,
            intercept : -1024,
            windowCenter : 40,
            windowWidth : 400,
            render: cornerstone.renderGrayscaleImage,
            getPixelData: {},
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: false,
            columnPixelSpacing: 0.67578,
            rowPixelSpacing: 0.67578,
            sizeInBytes: width * height * 2
        };

        // original 512x512
        // var image = {
        //     imageId: imageId,
        //     minPixelValue : 0,
        //     maxPixelValue : 4096,
        //     slope: 1.0,
        //     intercept : -1024,
        //     windowCenter : 40,
        //     windowWidth : 400,
        //     render: cornerstone.renderGrayscaleImage,
        //     getPixelData: {},
        //     rows: height,
        //     columns: width,
        //     height: height,
        //     width: width,
        //     color: false,
        //     columnPixelSpacing: 0.67578,
        //     rowPixelSpacing: 0.67578,
        //     sizeInBytes: width * height * 2
        // };

        // original 256x256
        // var image = {
        //     imageId: imageId,
        //     minPixelValue : 0,
        //     maxPixelValue : 257,
        //     slope: 1.0,
        //     intercept: 0,
        //     windowCenter : 127,
        //     windowWidth : 256,
        //     render: cornerstone.renderGrayscaleImage,
        //     getPixelData: {},
        //     rows: height,
        //     columns: width,
        //     height: height,
        //     width: width,
        //     color: false,
        //     columnPixelSpacing: .8984375,
        //     rowPixelSpacing: .8984375,
        //     sizeInBytes: width * height * 2
        // };

        // var image = {
        //     imageId: imageId,
        //     minPixelValue : 0,
        //     maxPixelValue : 512,
        //     slope: 1.0,
        //     intercept: 0,
        //     windowCenter : 256,
        //     windowWidth : 512,
        //     render: cornerstone.renderGrayscaleImage,
        //     getPixelData: {},//getPixelData,
        //     rows: height,
        //     columns: width,
        //     height: height,
        //     width: width,
        //     color: false,
        //     columnPixelSpacing: 0.9,
        //     rowPixelSpacing: 0.9,
        //     sizeInBytes: width * height * 2
        // };

        var deferred = $.Deferred();

        var requestedImageIndex = imageId.substr(imageId.lastIndexOf('/') + 1);
    	console.log(requestedImageIndex);
        imageProvider.getImage(requestedImageIndex)
        	.then(function (data) {
	        	console.log('getImage loaded data');
        		image.getPixelData = function (){
        			console.log('before getPixelDataForBase64');
                    var testImage = document.getElementById('test-image');
                    var base64 = getBase64Image(testImage);
                    return getPixelDataForBase64(base64);
    				// return getPixelDataForBase64(data);
        		};
        		console.log('image');
        		var currentlyDisplayingImage = +requestedImageIndex + 1;
        		console.log('showing: ' + currentlyDisplayingImage + '/' + imageProvider.getImageCount());

	        	deferred.resolve(image);
	        });

        return deferred;
    }

	cs.registerImageLoader('example', getExampleImage);
    // register our imageLoader plugin with cornerstone

}(jQuery, cornerstone));