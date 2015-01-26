(function(zen, $, cornerstone){
    "use strict";
	
	zen.CornerStoneInitialiser = function() {
		var imageDataContext = new zen.ImageDataContext(),
			imageCacheProvider = new zen.ImageCacheProvider(),
			imagePixelDataExtractor = new zen.ImagePixelDataExtractor(),
			imageManager = new zen.ImageManager(imageDataContext, imagePixelDataExtractor),
			cornerStoneImageFactory = new zen.CornerStoneImageFactory(imageManager);

		this.cornerStoneImageLoader = new zen.CornerStoneImageLoader(cornerStoneImageFactory, imageCacheProvider, imageManager);
	};

	zen.CornerStoneInitialiser.prototype = (function (){
		return {
			initialise: initialise
		};

		function initialise(){
			var that = this;
			return that.cornerStoneImageLoader.preloadAll()
				.then(function (data){
					console.log('cornerStoneImageLoader.preloadAll: ready');
					cornerstone.registerImageLoader(that.cornerStoneImageLoader.getName(), createImageLoader);

					return data;
				});

			function createImageLoader(imageId){
		    	return that.cornerStoneImageLoader.create.call(that.cornerStoneImageLoader, imageId);
		    }
		};
	})();
})(window.zen = window.zen || {}, jQuery, cornerstone);