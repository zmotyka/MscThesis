(function(zen, $, cornerstone){
	zen.ImageCacheProvider = function() {
		this.imageObjects = [];
	};

	zen.ImageCacheProvider.prototype = (function(){
		return {
			add: add,
			get: get
		};

		function add(imageId, imageObject){
			this.imageObjects[imageId] = imageObject;
		};

		function get(imageId){
			return this.imageObjects[imageId];
		};
	})();
})(window.zen = window.zen || {}, jQuery, cornerstone);
