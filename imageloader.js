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
		img.src = url;
		img.onload = anImageLoadedCallback;
	}
}
