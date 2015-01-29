(function(zen, $){
	zen.ImageManager = function(imageDataContext, imagePixelDataExtractor){
		this.imageDataContext = imageDataContext;
		this.imagePixelDataExtractor = imagePixelDataExtractor;
	};

	zen.ImageManager.prototype = (function (){
		return {
			loadAllImageData: loadAllImageData
		};

		function loadAllImageData(dicomSrc){
    		var that = this;
			console.log('ImageManager.loadAllImageData');
			
			return that.imageDataContext.loadAll(dicomSrc)
				.then(function (base64DataList){
					var deferreds = base64DataList.map(function (base64Data, i){
						return extractData.call(that, i, base64Data);
					});
					return deferreds;
				});
		};		

		function extractData(index, base64Data){
			return this.imagePixelDataExtractor.extractData(base64Data)
				.then(function (extractedData){
					console.log('extractData: data extracted');
					return {
						index: index,
						image: extractedData
					};
				});
		};
	})();
})(window.zen = window.zen || {}, jQuery);
