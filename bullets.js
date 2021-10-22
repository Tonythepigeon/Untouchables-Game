var detector = false;
function Bullets(){
	let bullets = [];
	this.bullets = bullets;
	//create bullet
	this.newBullet = function(bulletObject, xPos, yPos, xDir, yDir){
		//clone bullet object
		let b = bulletObject;
		let bullet = new Bullet(b.sprite, b.type, b.speed, b.damage, b.size, b.sound, b.sound.volume);
		//give it properties
		bullet.initBullet(xPos, yPos, xDir, yDir);
		//add it to the array
		this.bullets.push(bullet);
	}
	this.drawAndUpdateBullets = function(){
		let deadBullets = bullets;
		for(let i = bullets.length - 1; i >= 0; i--){
			this.bullets[i].draw();
			this.bullets[i].moveForward(1);
			detectCollision(this.bullets[i]);
			if(detector){
				detector = false;
				deadBullets = deadBullets.splice(i - (bullets.length - deadBullets.length), 1);
			}else if(this.bullets[i].yPos > canvas.height || this.bullets[i].yPos < 0){
				deadBullets = deadBullets.splice(i - (bullets.length - deadBullets.length), 1);
			}
		}
	}
}
function Bullet(bulletSprite, bulletType, bulletSpeed, bulletDamage, bulletSize, bulletSound, bulletVolume) {
	this.sound = new Audio(bulletSound.src);
	this.sound.volume = bulletVolume;
	this.sprite = bulletSprite;
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
		this.sound.play();
		this.xPos = xPos;
		this.yPos = yPos;
		this.xDir = xDir;
		this.yDir = yDir;
	}
}

function detectCollision(bullet){
    elementsOnCanvas.forEach(function(element) {
		if(bullet.xPos <=  element.xPos + element.sprite.image.width * element.size / 2 && bullet.xPos >= element.xPos - element.sprite.image.width * element.size / 2
			&& bullet.yPos >=  element.yPos - element.sprite.image.height * element.size / 2 && bullet.yPos <= element.yPos + element.sprite.image.height * element.size / 2){
			if(bullet.yDir < 0 && element.sprite.name != "mainShip.png"){ //You hit them
				score += 100;
				element.health -= 1;
				detector = true;
				return;
			}else if(bullet.yDir > 0 && element.sprite.name == "mainShip.png"){ //You got hit
				player.health--;
				detector = true;
				return;
			}
		}
	});
}
