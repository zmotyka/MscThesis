(function(zen, $, cornerstone){
	zen.ImageCacheProvider = function() {
		this.imageObjects = {};
	};

	zen.ImageCacheProvider.prototype = (function(){
		return {
			add: add,
			get: get,
			clear: clear
		};

		function add(imageId, imageObject){
			console.log('ImageCacheProvider.add: ' + imageId);
			this.imageObjects[imageId] = imageObject;
		};

		function get(imageId){
			console.log('ImageCacheProvider.get: ' + imageId);
			return this.imageObjects[imageId];
		};

		function clear(){
			return this.imageObjects = {};
		};
	})();
})(window.zen = window.zen || {}, jQuery, cornerstone);
