//image loader taken from stackoverflow
//https://stackoverflow.com/questions/3646036/preloading-images-with-javascript
function preloadImages(urls, allImagesLoadedCallback){
	var loadedCounter = 0;
	var toBeLoadedNumber = urls.length;
	urls.forEach(function(url){
		preloadImage(url, function(){
			loadedCounter++;
			console.log('Number of loaded images: ' + loadedCounter);
			if(loadedCounter == toBeLoadedNumber){
				allImagesLoadedCallback();
			}
		});
	});
	function preloadImage(url, anImageLoadedCallback){
		var img = new Image();
		img.onload = anImageLoadedCallback;
		img.src = url;
	}
}

// Let's call it:
preloadImages([
	'images/2k_stars.jpg',
	'images/alienShip.gif',
	'images/blueLaser.gif',
	'images/icon.png',
	'images/mainShip.png',
	'images/orangeShip.png',
	'images/redLaser.gif',

], function(){
	console.log('All images were loaded');
});