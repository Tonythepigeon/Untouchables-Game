function Bullets(){
	let bullets = [];
	this.bullets = bullets;
	//create bullet
	this.newBullet = function(bulletObject, xPos, yPos, xDir, yDir){
		//clone bullet object
		b = bulletObject;
		let bullet = new Bullet(b.sprite, b.type, b.speed, b.damage, b.size);
		//give it properties
		bullet.initBullet(xPos, yPos, xDir, yDir);
		//add it to the array
		this.bullets.push(bullet);
		fireTimer++;
	}
	this.drawAndUpdateBullets = function(){
		for(let i = 0; i < bullets.length; i++){
			this.bullets[i].draw();
			this.bullets[i].moveForward(1);
		}
	}
}
function Bullet(bulletSprite, bulletType, bulletSpeed, bulletDamage, bulletSize) {
	this.sprite = bulletSprite
	this.type = bulletType;
	this.speed = bulletSpeed;
	this.damage = bulletDamage;
	this.size = bulletSize;
	this.xPos = 0;
	this.yPos = 0;
	this.xDir = 0;
	this.yDir = 1;
	this.draw = function () {
		bulletSprite.drawClone(this.xPos, this.yPos, this.size)
	}

	this.moveForward = function (speedMultiplier) {
		this.xPos += this.xDir*this.speed*speedMultiplier;
		this.yPos += this.yDir*this.speed*speedMultiplier;
	}

	this.initBullet = function (xPos, yPos, xDir, yDir){
		this.xPos = xPos;
		this.yPos = yPos;
		this.xDir = xDir;
		this.yDir = yDir;
	}
}

