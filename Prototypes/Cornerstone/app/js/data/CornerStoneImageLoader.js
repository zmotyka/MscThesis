(function(zen, $, cornerstone){
	zen.CornerStoneImageLoader = function(cornerStoneImageFactory, imageCacheProvider, imageManager) {
		this.cornerStoneImageFactory = cornerStoneImageFactory;
		this.imageCacheProvider = imageCacheProvider;
		this.imageManager = imageManager;
	};

	zen.CornerStoneImageLoader.prototype = (function(){
		return {
			getName: getName,
			create: create,
			preloadAll: preloadAll
		};
		
		function getName(){
			return 'base64';
		};

		function create(imageId){
			console.log('CornerStoneImageLoader.create called! Requested: ' + imageId);
			// var that = this;
			var dfd = $.Deferred();

			var image = this.imageCacheProvider.get(imageId);
			// if (!image){
			// 	that.imageManager.getImage(imageIndex)
			// 		.then(function (extractedImageData){
			// 			return that.cornerStoneImageFactory.create(extractedImageData);
			// 		})
			// 		.then(function(loadedImage){
			// 			that.imageCacheProvider.add(imageId, loadedImage);
			// 			dfd.resolve(loadedImage);
			// 		});
			// } else {
			// 	console.log('CornerStoneImageLoader: already exists');
				dfd.resolve(image);
			// }
	        return dfd;
    	};

    	function preloadAll(){
    		var that = this;
    		return that.imageManager.loadAllImageData()
    			.then(function(imageDeferreds){
	    			var all = imageDeferreds.map(function (imageDeferred, i) {
	    				return imageDeferred
	    					.then(function(extractedImageData){
			    				var imageId = getImageId.call(that, extractedImageData.index);
			    				console.log('CornerStoneImageLoader preloading: ' + imageId);
			    				var imageObject = that.cornerStoneImageFactory.create(imageId, extractedImageData.image);
								that.imageCacheProvider.add(imageId, imageObject);

								return imageObject;
							});
	    				});

		    		return $.when.apply($, all);
	    		});
    	};

    	function getImageId(index){
    		return this.getName() + '://' + index;
    	};
	})();
})(window.zen = window.zen || {}, jQuery, cornerstone);
