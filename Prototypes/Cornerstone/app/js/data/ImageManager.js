(function(zen, $){
	zen.ImageManager = function(imageDataContext, imagePixelDataExtractor){
		this.imageDataContext = imageDataContext;
		this.imagePixelDataExtractor = imagePixelDataExtractor;
    	// this.images = [];
	};

	zen.ImageManager.prototype = (function (){
		return {
			// getImage: getImage,
			loadAllImageData: loadAllImageData
		};

		// function getImage(index){
		// 	var dfd = $.Deferred();
		// 	var result = this.images[index];
		// 	if (result){
		// 		dfd.resolve(result);
		// 	} else {
		// 		loadImageData.call(this, index).then(function (data){
		// 			dfd.resolve(data)
		// 		});
		// 	}
		// 	return dfd;
		// }
		
		// function loadImageData(index){
  //   		var that = this;
		// 	console.log('loadImageData: ' + index);
		// 	return that.imageDataContext.load(index)
		// 		.then(function (base64Data){
		// 			console.log('loadImageData loaded');
		// 			return extractData.call(that, index, base64Data);
		// 		})
		// 		.then(function(extractedData){
		// 			return extractedData.image;
		// 		});
		// };

		function loadAllImageData(){
    		var that = this;
			console.log('ImageManager.loadAllImageData');
			
			return that.imageDataContext.loadAll()
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
					// that.images[index] = extractedData;
					return {
						index: index,
						image: extractedData
					};
				});
		};
	})();
})(window.zen = window.zen || {}, jQuery);
