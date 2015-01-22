(function (zen, $, cornerstone) {
    "use strict";

    var imageDataContext = new zen.ImageDataContext(),
		imageCacheProvider = new zen.ImageCacheProvider(),
		imagePixelDataExtractor = new zen.ImagePixelDataExtractor(),
		imageManager = new zen.ImageManager(imageDataContext, imagePixelDataExtractor),
		cornerStoneImageFactory = new zen.CornerStoneImageFactory(imageManager),
		cornerStoneImageLoader = new zen.CornerStoneImageLoader(cornerStoneImageFactory, imageCacheProvider, imageManager);

	cornerStoneImageLoader.preloadAll().then(function (){
		console.log('cornerStoneImageLoader.preloadAll: ready');
	});

	cornerstone.registerImageLoader('base64', createImageLoader);

    function createImageLoader(imageId){
    	return cornerStoneImageLoader.create.call(cornerStoneImageLoader, imageId);
    }
})(window.zen = window.zen || {}, jQuery, cornerstone);