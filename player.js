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
	this.acceleration = acceleration;
	this.friction = aerodynamicCoeff;
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
			0,
			-10,
			1
		);
	};

	this.updatePlayer = function () {
		this.xVel *= this.friction;
		this.yVel *= this.friction;
		this.xPos += this.xVel;
		this.yPos += this.yVel;
	};

	this.draw = function () {
		this.bullets.drawAndUpdateBullets();
		this.sprite.drawClone(this.xPos, this.yPos, 1);
	};
}
