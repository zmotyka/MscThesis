//
// This is a cornerstone image loader for web images such as PNG and JPEG
//

(function ($, cornerstone) {

    "use strict";

    var canvas = document.createElement('canvas');
    var lastImageIdDrawn = "";

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
				url: '/data/images_png_full.json',
				// url: '/data/images_jpg.json',
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

    function createImageObject(image, imageId)
    {
        // extract the attributes we need
        var rows = image.naturalHeight;
        var columns = image.naturalWidth;

        function getPixelData()
        {
        	console.log('getpixeldata');
            var imageData = getImageData();
            var imageDataData = imageData.data;
            var numPixels = image.naturalHeight * image.naturalWidth;
            var storedPixelData = new Uint8Array(numPixels * 4);
            var imageDataIndex = 0;
            var storedPixelDataIndex = 0;
            for(var i=0; i < numPixels; i++) {
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = 255; // alpha
                imageDataIndex++;
            }
            return storedPixelData;
        }

        function getImageData()
        {
            var context;
            if(lastImageIdDrawn !== imageId) {
                canvas.height = image.naturalHeight;
                canvas.width = image.naturalWidth;
                context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
            }
            else {
                context = canvas.getContext('2d');
            }
            var imageData = context.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
            return imageData;
        }

        function getCanvas()
        {
            if(lastImageIdDrawn === imageId) {
                return canvas;
            }

            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            lastImageIdDrawn = imageId;
            return canvas;
        }

        function getImage()
        {
            return image;
        }

        // Extract the various attributes we need
        var imageObject = {
            imageId : imageId,
            minPixelValue : 0, // calculated below
            maxPixelValue : 255, // calculated below
            slope: 1.0,
            intercept: 0,
            windowCenter : 127,
            windowWidth : 256,
            render: cornerstone.renderColorImage,
            getPixelData: getPixelData,
            getImageData: getImageData,
            getCanvas: getCanvas,
            getImage: getImage,
            //storedPixelData: extractStoredPixels(image),
            rows: rows,
            columns: columns,
            height: rows,
            width: columns,
            color: false,
            columnPixelSpacing: 1.0,
            rowPixelSpacing: 1.0,
            invert: false,
            sizeInBytes : rows * columns * 4 // we don't know for sure so we over estimate to be safe
        };

        return imageObject;
    }

    // Loads an image given a url to an image
    function loadImage(imageId) {
        // create a deferred object
        var deferred = $.Deferred();

        var requestedImageIndex = imageId.substr(imageId.lastIndexOf('/') + 1);
        imageProvider.getImage(requestedImageIndex)
        	.then(function (data) {
	        	console.log('getImage loaded data');
        		var image = new Image();
        		image.src = "data:image/png;base64," + data;
            	var imageObject = createImageObject(image, imageId);
        
        		console.log('image');
        		var currentlyDisplayingImage = +requestedImageIndex + 1;
        		console.log('showing: ' + currentlyDisplayingImage + '/' + imageProvider.getImageCount());

	        	deferred.resolve(imageObject);
	        });

        return deferred;
    }

    cornerstone.registerImageLoader('base64', loadImage);

    return cornerstone;
}($, cornerstone));