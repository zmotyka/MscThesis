(function(zen, $){
	zen.ImageDataContext = function (){
    };

    zen.ImageDataContext.prototype = (function(){
		return {
			loadAll: loadAll
		};

		function loadAll(dicomSrc){
			console.log('ImageDataContext.loadAll');
			return $.ajax({
				url: dicomSrc,
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
	