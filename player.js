function PlayerObject(
	imageSrc,
	xStartPosition,
	yStartPosition,
	acceleration,
	aerodynamicCoeff
) {
	let sprite = new Asset(imageSrc, 0, 0, 1, 1);
	this.sprite = sprite;
	this.bullets = new Bullets();
	this.health = 3;
	this.xVel = 0;
	this.yVel = 0;
	this.xPos = xStartPosition;
	this.yPos = yStartPosition;
	this.size = 1;
	this.acceleration = acceleration;
	this.friction = aerodynamicCoeff;
	elementsOnCanvas.push(this);
	this.moveUp = function () {
		this.yVel -= this.acceleration;
	};

	this.moveDown = function () {
		this.yVel += this.acceleration;
	};

	this.moveRight = function () {
		this.xVel += this.acceleration;
	};

	this.moveLeft = function () {
		this.xVel -= this.acceleration;
	};

	this.fireBullet = function () {
		this.bullets.newBullet(
			darkBullet,
			this.xPos,
			this.yPos,
			(this.xVel)/2,
			-10+(this.yVel)/2,
			1
		);
	};

	this.updatePlayer = function () {
		this.xVel *= this.friction;
		this.yVel *= this.friction;
		if(this.xPos < 0 + this.sprite.width / 2 + 1){ //Keeps player in the width of the canvas
			this.xPos = 0 + this.sprite.width / 2 + 1;
		}else if(this.xPos > canvas.width - this.sprite.width / 2 - 1){
			this.xPos = canvas.width - this.sprite.width / 2 - 1
		}else{
			this.xPos += this.xVel;
		}
		if(this.yPos < canvas.height / 2 + this.sprite.height / 2 + 1){ //Keeps player in bottom half of screen
			this.yPos = canvas.height / 2 + this.sprite.height / 2 + 1;
		}else if(this.yPos > canvas.height - this.sprite.height / 2 - 1){
			this.yPos = canvas.height - this.sprite.height / 2 - 1
		}else{
			this.yPos += this.yVel;
		}
	};

	this.draw = function () {
		healthDisplay.innerText = this.health;
		this.bullets.drawAndUpdateBullets();
		this.sprite.drawClone(this.xPos, this.yPos, 1);
		if(this.health < 3){
			ctx.globalAlpha = 0.02;
			canvas.style.filter = "contrast(110%) saturate(70%)"
			if(this.health < 2){
				ctx.globalAlpha = 0.04;
				canvas.style.filter = "contrast(120%) blur(3px) saturate(70%)"
			}
			if(this.health < 1){
				canvas.style.filter = "contrast(130%) blur(20px) saturate(50%)"
			}

			ctx.fillStyle = "red";
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.globalAlpha = 1.0;


		}
	};
}
