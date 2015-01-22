(function(zen, $, cornerstone){
	zen.CornerStoneImageLoader = function(cornerStoneImageFactory, imageCacheProvider, imageManager) {
		this.cornerStoneImageFactory = cornerStoneImageFactory;
		this.imageCacheProvider = imageCacheProvider;
		this.imageManager = imageManager;
	};

	zen.CornerStoneImageLoader.prototype = (function(){
		return {
			create: create,
			preloadAll: preloadAll
		};

		function create(imageId){
			var that = this;
			var dfd = $.Deferred();
			var image = that.imageCacheProvider.get(imageId);
			if (!image){
				that.cornerStoneImageFactory.create(imageId).then(function(loadedImage){
					that.imageCacheProvider.add(imageId, loadedImage);
					dfd.resolve(loadedImage);
				});
			} else {
				dfd.resolve(image);
			}
	        return dfd;
    	};

    	function preloadAll(){
    		var that = this;
    		return that.imageManager.loadAllImageData().then(function(images){
    			console.log(images);
    		});
    	};
	})();
})(window.zen = window.zen || {}, jQuery, cornerstone);
