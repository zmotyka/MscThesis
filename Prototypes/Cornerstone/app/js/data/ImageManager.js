(function(zen, $){
	zen.ImageManager = function(imageDataContext, imagePixelDataExtractor){
		this.imageDataContext = imageDataContext;
		this.imagePixelDataExtractor = imagePixelDataExtractor;
    	this.images = [];
	};

	zen.ImageManager.prototype = (function (){
		return {
			getImage: getImage,
			loadAllImageData: loadAllImageData
		};

		function getImage(index){
			var dfd = $.Deferred();
			var result = this.images[index];
			if (result){
				dfd.resolve(result);
			} else {
				loadImageData.call(this, index).then(function (data){
					dfd.resolve(data)
				});
			}
			return dfd;
		}
		
		function loadImageData(index){
    		var that = this;
			console.log('loadImageData: ' + index);
			var dfd = $.Deferred();
			that.imageDataContext.load(index).then(function (base64Data){
				console.log('loadImageData loaded');
				extractData.call(that, index, base64Data).then(function(extractedData){
					dfd.resolve(extractedData);
				});
			});
			return dfd;
		};

		function loadAllImageData(){
    		var that = this;
			console.log('ImageManager.loadAllImageData');
			var deferred = $.Deferred();
			that.imageDataContext.loadAll().then(function (base64DataList){
				var extractDataList = [];
				var length = base64DataList.length;

				for (var i = 0; i < length; i++) {
					var extractedDataPromise = extractData.call(that, i, base64DataList[i]);
					extractDataList.push(extractedDataPromise);
				}

				$.when.apply($, extractDataList).done(function(data){
					console.log('loadAllImageData done');
					deferred.resolve(data);
				})
			});
			return deferred;
		};		

		function extractData(index, base64Data){
			var dfd = $.Deferred();
			var that = this;
			that.imagePixelDataExtractor.extractData(base64Data).then(function (extractedData){
				console.log('extractData: data extracted');
				that.images[index] = extractedData;
				dfd.resolve(that.images[index]);
				console.log('self.images resolved');
			});
			return dfd;
		};
	})();
})(window.zen = window.zen || {}, jQuery);
