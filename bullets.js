function Bullets(){
	let bullets = [];
	//create bullet
	this.newBullet = function(bulletObject, xPos, yPos, xDir, yDir){
		//clone bullet object
		b = bulletObject;
		let bullet = new Bullet(b.sprite, b.type, b.speed, b.damage, b.size);
		//give it properties
		bullet.initBullet(xPos, yPos, xDir, yDir);
		//add it to the array
		bullets.push(bullet);
		fireTimer++;
	}
	this.drawAndUpdateBullets = function(){
		console.log(bullets.length);
		for(let i = 0; i < bullets.length; i++){
			bullets[i].draw();
			bullets[i].moveForward(1);
			console.log(bullets[i].xpos);
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
		console.log(this.xPos +" aaaa " + this.yPos)
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