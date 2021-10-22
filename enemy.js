//stores enemies
//imageSrcs: Array of string file names
//image
function EnemyContainer(imageSrcs, xStartPosition, yStartPosition, sound) {
	this.sound = sound;
	this.sound.volume = 0.1;
	this.xPos = xStartPosition
	this.yPos = yStartPosition
	this.wobble = new SinContainer(10, 10, .1, .12);
	this.enemySprites = []
	for (let i = 0; i < imageSrcs.length; i++) {
		let sprite = new Asset(imageSrcs[i], 0, 0, 1, 1);
		this.enemySprites.push(sprite)
	}

	this.enemies = new Array();
	this.newEnemy = function (enemyTypeIndex, bulletObject, size, speed) {
		let enemy = new Enemy(
			this.enemySprites[enemyTypeIndex],
			bulletObject,
			this.xPos,
			this.yPos,
			size,
			speed,
			this.wobble,
			75
		);
		this.enemies.push(enemy);
	}
	this.update = function () {
		let deadEnemies = this.enemies;
		for (let i = this.enemies.length - 1; i >= 0; i--) {
			this.enemies[i].update();
			if (this.enemies[i].health <= 0) {
				this.sound.play();
				this.enemies[i].kill();
				deadEnemies = deadEnemies.splice(i - (this.enemies.length - deadEnemies.length), 1);
			}
		}
	}
	this.draw = function () {
		for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].draw();
		}
	}

}

function Enemy(enemySprite, bulletObject, xStartPosition, yStartPosition, size, speed, xySin, bulletFreq) {
	this.t = 0;
	this.sprite = enemySprite;
	this.health = 3;
	this.speed = speed;
	this.sinObj = xySin;
	this.size = size;
	this.xPos = xStartPosition;
	this.yPos = yStartPosition;
	this.bulletFreq = bulletFreq;
	this.bulletObject = bulletObject;
	this.bullets = new Bullets();
	elementsOnCanvas.push(this);
	this.kill = function () {
		elementsOnCanvas.splice(elementsOnCanvas.indexOf(this), 1);

	}
	this.getX = function () {
		return this.xPos + this.sinObj.getSinX(this.t);
	}
	this.getXDelta = function () {
		return this.speed + this.sinObj.getSinXDelta(this.t);
	}
	this.getYDelta = function () {
		return this.sinObj.getSinYDelta(this.t);
	}
	this.getY = function () {
		return this.yPos + this.sinObj.getSinY(this.t);
	}
	this.draw = function () {
		this.sprite.drawClone(this.getX(), this.getY(), this.size);
		this.bullets.drawAndUpdateBullets();
	}

	this.update = function (speedMultiplier) {
		this.t++;
		this.xPos += this.speed;
		//bounce off walls
		if (this.xPos > ctx.canvas.width || this.xPos < 0) {
			this.speed *= -1;
			this.xPos += this.speed * 2;
			this.yPos += Math.abs(this.speed) * 3; //TODO maybe replace with y speed or some kind of difficulty variable?
		}

		if (this.t % this.bulletFreq == 0) {
			this.bullets.newBullet(
				this.bulletObject,
				this.getX(),
				this.getY(),
				this.getXDelta(),
				7 + this.getYDelta(),
				1
			);
		}
	}
}

function SinContainer(xAmp, yAmp, xFreq, yFreq) {
	this.getSinX = function (time) {
		return Math.sin(time * xFreq) * xAmp;
	}
	this.getSinXDelta = function (time) {
		return Math.cos(time * xFreq) * xAmp * xFreq;
	}
	this.getSinY = function (time) {
		return Math.sin(time * yFreq) * yAmp;
	}
	this.getSinYDelta = function (time) {
		return Math.cos(time * yFreq) * yAmp * yFreq;
	}
}


