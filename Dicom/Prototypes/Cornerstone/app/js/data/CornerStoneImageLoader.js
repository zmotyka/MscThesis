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

			var dfd = $.Deferred();
			var image = this.imageCacheProvider.get(imageId);
			dfd.resolve(image);
	        return dfd;
    	};

    	function preloadAll(dicomSrc){
    		var that = this;
    		that.imageCacheProvider.clear();
    		return that.imageManager.loadAllImageData(dicomSrc)
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
