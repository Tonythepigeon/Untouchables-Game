function EnemyObject(imageSrc, xStartPosition, yStartPosition) {
  let enemySprite = new Asset(imageSrc, 0, 0, 1, 1);
  this.sprite = enemySprite;
  this.bullets = new Bullets();
  this.randomShoot = int(random(100, 150));
  this.health = 2;
  this.xVel = 0;
  this.yVel = 5;
  this.xPos = xStartPosition;
  this.yPos = yStartPosition;

  this.fireBullet = function () {
    this.bullets.newBullet(
      darkBullet,
      this.xPos - 3 + this.sprite.width / 2,
      this.yPos,
      0,
      10,
      1
    );
  };


  this.updateEnemy = function () {
    this.yPos += this.yVel;
  };


  this.draw = function () {
    this.bullets.drawAndUpdateBullets();
    this.sprite.drawClone(this.xPos, this.yPos, 1);
  };
}
