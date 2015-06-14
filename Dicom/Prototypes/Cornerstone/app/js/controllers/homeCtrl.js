// app.controller('homeCtrl', ['cornerstone', function(cornerstone) {
// 	var self = this;
// 	self.currentImageIndex = 0;
// 	self.updateImage = updateImage;

// 	function updateImage(imageIndex) {
// 		if (currentImageIndex === imageIndex) {
// 			console.log('updateTheImage not needed');
// 			return;
// 		}

// 		console.log('updateTheImage: ' + imageIndex);
// 		self.currentImageIndex = imageIndex;
// 		cornerstone.loadImage('base64://' + ł)
// 			.then(function(image) {
// 				console.log('before displayImage');
// 				cornerstone.displayImage(element, image);
// 			});
// 	};
// }]);