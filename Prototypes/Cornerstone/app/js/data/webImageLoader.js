(function ($, cornerstone) {
    "use strict";

    var canvas = document.createElement('canvas');
    var lastImageIdDrawn = "";

    var ImageDataContext = function (){
    	var self = this;
    	self.imageSeries = [];
		
		var context = {
			load: load
		};

		return context;

		function load(index){
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

    var ImagePixelDataExtractor = function (base64Data){
    	var self = this;
    	self.base64Data = base64Data;
    	self.imageObject = null;

    	var extractor = {
    		extractData: extractData
   //  		getImageObject: getImageObject,
   //  		getImageData: getImageData,
			// extractPixelData: extractPixelData
    	};
    	return extractor;

    	function extractData(base64Data){
    		var dfd = $.Deferred();
    		getImageObject()
    			.then(function (image){
    				var imageData = getImageData(image),
    					pixelData = extractPixelData(image, imageData),
    					extractedData = {
	    					image: image,
	    					imageData: imageData,
	    					pixelData: pixelData
	    				};
    				dfd.resolve(extractedData);
    			});
    		return dfd;
    	}

    	function extractPixelData(image, imageData) {
        	console.log('extractPixelData');

            var imageDataData = imageData.data;
            var numPixels = image.naturalHeight * image.naturalWidth;
            var storedPixelData = new Uint8Array(numPixels * 4);
            var imageDataIndex = 0;
            var storedPixelDataIndex = 0;
            for(var i = 0; i < numPixels; i++) {
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = 255; // alpha
                imageDataIndex++;
            }

            return storedPixelData;
        }

        function getImageData(image) {
        	console.log('getImageData');
            var context;
            // if(lastImageIdDrawn !== imageId) {
                canvas.height = image.naturalHeight;
                canvas.width = image.naturalWidth;
                context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                console.log('getImageData: canvas drawImage done');
            // }
            // else {
            //     context = canvas.getContext('2d');
            // }
            var imageData = context.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
            console.log('getImageData: imageData');
            return imageData;
        }

        function getImageObject(){
        	console.log('getImageObject');
        	var deferred = $.Deferred();

        	if (self.imageObject == null){
				var image = new Image();
    			image.src = "data:image/png;base64," + self.base64Data;
        		self.imageObject = image;
        		self.imageObject.onload = function (){
					deferred.resolve(self.imageObject);
				};
        	} else {
        		deferred.resolve(self.imageObject);
        	}
        	return deferred;
        }
    	return extractor;
    }

    var ImageManager = function(imageDataContext){
    	var self = this;
    	self.images = [];

		var manager = {
			getImage: getImage,
		};
		return manager;

		function getImage(index){
			var deferred = $.Deferred();
			var result = self.images[index];
			if (result){
				deferred.resolve(result);
			} else {
				loadImageData(index)
					.then(function (data){
						deferred.resolve(data)
					});
			}
			return deferred;
		};

		function loadImageData(index){
			console.log('loadImageData: ' + index);
			var deferred = $.Deferred();
			imageDataContext.load(index)
				.then(function (base64Data){
					console.log('loadImageData loaded');
					var imagePixelDataExtractor = new ImagePixelDataExtractor(base64Data);
					imagePixelDataExtractor.extractData()
						.then(function (extractedData){
							console.log('extractData: data extracted');
					
							self.images[index] = extractedData;
							deferred.resolve(self.images[index]);
							console.log('self.images resolved');
						});
					
					});
			return deferred;
		}
    };

    var CornerStoneImageFactory = function(imageManager) {
    	var factory = {
    		create: create
    	};
    	return factory;

    	function create(imageId){
    		var deferred = $.Deferred();
	    	var imageIndex = getImageIndex(imageId);

	    	imageManager.getImage(imageIndex)
	    		.then(function (extractedImageData){
	        		// extract the attributes we need
					var rows = extractedImageData.image.naturalHeight;
	        		var columns = extractedImageData.image.naturalWidth;

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

			        deferred.resolve(imageObject);

			        function getCanvas(){
			            // if(lastImageIdDrawn === imageId) {
			            //     return canvas;
			            // }
			        	// var canvas = document.createElement("canvas");
			    		var image = extractedImageData.image;
			            canvas.height = extractedImageData.image.naturalHeight;
			            canvas.width = extractedImageData.image.naturalWidth;
			            var context = canvas.getContext('2d');
			            context.drawImage(extractedImageData.image, 0, 0);
			            // lastImageIdDrawn = imageId;
			            return canvas;
			        };

			        function getImageData(){
		            	return extractedImageData.imageData;
			        };
					function getPixelData(){
		            	return extractedImageData.pixelData;
		            };
			        function getImage(){
		            	return extractedImageData.image;
		            };
	    		});

	        return deferred;
    	};

    	function getImageIndex(imageId){
			return imageId.substr(imageId.lastIndexOf('/') + 1);
    	};
    };

    var imageDataContext = new ImageDataContext();
    var imagePixelDataExtractor = new ImagePixelDataExtractor();
    var imageManager = new ImageManager(imageDataContext, imagePixelDataExtractor);
    var cornerStoneImageFactory = new CornerStoneImageFactory(imageManager);
    cornerstone.registerImageLoader('base64', cornerStoneImageFactory.create);

    return cornerstone;
}($, cornerstone));