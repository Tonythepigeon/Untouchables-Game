function Asset(imageSrc, xStartPosition, yStartPosition, xScale, yScale){
	let image = new Image();
	image.src = 'images/' + imageSrc;
	this.width = image.width * xScale;
	this.height = image.height * yScale;
	//start position
	this.xPos = xStartPosition - this.width / 2;
	this.yPos = yStartPosition - this.height / 2;
	image.onload = function() {
		console.log("image '" + image.src + "' loaded");
		ctx.drawImage(image, xStartPosition - this.width / 2, yStartPosition - this.height / 2);
	}
	this.image = image;

	this.draw = function(){
		ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
	}

	this.drawClone = function(xPos, yPos, size){
		ctx.drawImage(this.image, xPos, yPos, this.width*size, this.height*size);
	}
}
