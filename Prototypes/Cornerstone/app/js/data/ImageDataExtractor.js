(function(zen, $){
    zen.ImagePixelDataExtractor = function (){ 
        this.canvas = document.createElement('canvas');
    };

    zen.ImagePixelDataExtractor.prototype = (function(){
        return {
            extractData: extractData
        };

        function extractData(base64Data){
            var that = this;
            var dfd = $.Deferred();
            getImageObject.call(that, base64Data)
                .then(function (image){
                    var imageData = getImageData.call(that, image),
                        pixelData = extractPixelData.call(that, image, imageData),
                        extractedData = {
                            image: image,
                            imageData: imageData,
                            pixelData: pixelData
                        };
                    dfd.resolve(extractedData);
                });
            return dfd;
        };

        function extractPixelData(image, imageData) {
            console.log('extractPixelData');

            var imageDataData = imageData.data;
            var numPixels = image.naturalHeight * image.naturalWidth;
            var storedPixelData = new Uint8Array(numPixels * 4);
            var imageDataIndex = 0;
            var storedPixelDataIndex = 0;
            for(var i = 0; i < numPixels; i++) {
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = imageDataData[imageDataIndex++];
                storedPixelData[storedPixelDataIndex++] = 255; // alpha
                imageDataIndex++;
            }

            return storedPixelData;
        };

        function getImageData(image) {
            console.log('getImageData');
            var context;
            // if(lastImageIdDrawn !== imageId) {
                this.canvas.height = image.naturalHeight;
                this.canvas.width = image.naturalWidth;
                context = this.canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                console.log('getImageData: canvas drawImage done');
            // }
            // else {
            //     context = canvas.getContext('2d');
            // }
            var imageData = context.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
            console.log('getImageData: imageData');
            return imageData;
        };

        function getImageObject(base64Data){
            console.log('getImageObject');
            var dfd = $.Deferred();

            var image = new Image();
            image.src = "data:image/png;base64," + base64Data;
            image.onload = function (){
                dfd.resolve(image);
            };

            return dfd;
        };

        
    })();
})(window.zen = window.zen || {}, jQuery);
