(function(zen, $, cornerstone){
	zen.CornerStoneImageFactory = function(imageManager) {
		this.imageManager = imageManager;
		this.canvas = document.createElement('canvas');
	};

	zen.CornerStoneImageFactory.prototype = (function(){
		return {
			create: create
		}; 

		function create(imageId, extractedImageData){
			var that = this;
			console.log('CornerStoneImageFactory.create called');
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

	        return imageObject;

	        function getCanvas(){

	    		var image = extractedImageData.image;
	            that.canvas.height = extractedImageData.image.naturalHeight;
	            that.canvas.width = extractedImageData.image.naturalWidth;
	            var context = that.canvas.getContext('2d');
	            context.drawImage(extractedImageData.image, 0, 0);
	            // lastImageIdDrawn = imageId;
	            return that.canvas;
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
    	};

    	function getImageIndex(imageId){
			return imageId.substr(imageId.lastIndexOf('/') + 1);
    	};
	})();
})(window.zen = window.zen || {}, jQuery, cornerstone);
