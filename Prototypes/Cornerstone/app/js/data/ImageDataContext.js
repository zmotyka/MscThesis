(function(zen, $){
	zen.ImageDataContext = function (){
    	// this.imageSeries = [];
    };

    zen.ImageDataContext.prototype = (function(){
		return {
			// load: load,
			loadAll: loadAll
		};

		// function load(index){
		// 	var that = this;
	 //    	var dfd = $.Deferred();
		// 	var requestedImage = that.imageSeries[index];
		// 	console.log('Requested: ' + index);
		// 	if (requestedImage){
		// 		console.log('Requested image already loaded');
		// 		dfd.resolve(requestedImage);
		// 	} else {
		// 		console.log('Loading image...');
		// 		loadAll.call(that).then(function(data) {
		// 			console.log('ImageDataContext.loadAll then');
		// 			dfd.resolve(data[index]);
		// 		});
		// 	}
		// 	return dfd;
		// };

		function loadAll(){
			console.log('ImageDataContext.loadAll');
			var that = this;
			return loadImages.call(that)
				.then(function(data) {
					// that.imageSeries = data;
					// return that.imageSeries;
					return data;
				});
		};

    	function loadImages(){
			return $.ajax({
				url: '/data/images_png_140.json',
				// url: '/data/images_jpg.json',
				// cache: false,
				error: function (request, status, error) {
			        console.log('ajax error');
			        console.log(request);
			        console.log(status);
			        console.log(error);
			    }
			});
		};
    })();	
})(window.zen = window.zen || {}, jQuery);
	