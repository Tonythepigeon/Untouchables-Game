fps = 70; //slightly more than 60 so the game runs super smooth on 60hz screens
fpsInterval = 1000 / fps;
//fps code stolen from https://codepen.io/doener48/pen/vYXRLzJ?editors=1010
then = Date.now();
const STARTING_ACCELERATION = 1;
const STARTING_FRICTION = 0.9;
const STARTING_FIRE_RATE = 19; //how many frames until you can fire another bullet
let fireTimer = 0;
let frame = 0;
var canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let keyMap = new Object();
let elementsOnCanvas = new Array();
let score = 0;
let scoreDisplay = document.getElementById('score');
let healthDisplay = document.getElementById('health');
let musicLoaded = false;
//keyboard listeners
document.onkeydown = function (e) {
    if(musicLoaded){
        loopMusic();
    }
    keyMap[e.key] = true;
}
document.onkeyup = function (e) {
    keyMap[e.key] = false;
}
document.getElementById("play-again").addEventListener("click", function () {
  reset();
});

ctx.canvas.width = window.innerWidth - 20;
ctx.canvas.height = window.innerHeight - 20;
//load images and start game

//init global variables
let background = new Asset(
    '2k_stars.jpg',
    0,
    0,
    1,
    1
);
let player = new PlayerObject(
    'mainShip.png',
    canvas.width / 2,
    canvas.height - 100,
    STARTING_ACCELERATION,
    STARTING_FRICTION
);
let darkBulletSprite = new Asset(
    'redLaser.gif',
    0,
    0,
    .1,
    .1
);
let darkBullet = new Bullet(darkBulletSprite,
    10,
    1,
    10,
    1,
     new Audio('sounds/tinywarble.wav'),
    0.2
);
let lightBulletSprite = new Asset(
    'blueLaser.gif',
    0,
    0,
    .1,
    .1
);
let lightBullet = new Bullet(lightBulletSprite,
    10,
    1,
    10,
    1,
    new Audio('sounds/laser2.wav'),
    0.1
);
let enemyContainer = new EnemyContainer(["alienShip.gif", "mainShip.png"], 100, 100, new Audio('sounds/bwah.wav'));
window.onload = function() {
    sessionStorage.clear()
}
//load audio

document.getElementById('backgroundMusic').addEventListener('canplaythrough', loopMusic, false);
function loopMusic() {
    musicLoaded = true;
    document.getElementById('backgroundMusic').volume = .1;
    document.getElementById('backgroundMusic').play().then(r => loopMusic());
}

//load images and start game
preloadImages([
    'images/alienShip.gif',
    'images/blueLaser.gif',
    'images/icon.png',
    'images/mainShip.png',
    'images/orangeShip.png',
    'images/redLaser.gif',
    'images/2k_stars.jpg'
], function(){
    console.log('All images were loaded');
    let firstTime = sessionStorage.getItem("first_time");
    if(!firstTime) {
        // first time loaded!
        sessionStorage.setItem("first_time","1");
        location.reload();
    }
    drawGame();
});

function handleKeyboardInput() {
    if (keyMap["ArrowDown"] || keyMap['s'] || keyMap['S'])
        player.moveDown();
    if (keyMap["ArrowUp"] || keyMap['w'] || keyMap['W'])
        player.moveUp();
    if (keyMap["ArrowLeft"] || keyMap['a'] || keyMap['A'])
        player.moveLeft();
    if (keyMap["ArrowRight"] || keyMap['d'] || keyMap['D'])
        player.moveRight();
    if (keyMap[" "]) {
        if (fireTimer == 0) {
            player.fireBullet();
            fireTimer++;
        }
    }
    console.log()
    if (frame % (200-Math.min(~~(frame/100),150)) == 0){
        console.log(200-Math.min(~~(frame/100),150));
        enemyContainer.newEnemy(0, darkBullet, .5, 3);
    }
}

function drawGame() {
    animationId = window.requestAnimationFrame(drawGame);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        drawAndUpdate();
    }
}

function drawAndUpdate(){
    frame++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    scoreDisplay.innerHTML = score;
    enemyContainer.draw();
    if (player.health > 0) {
        handleKeyboardInput();
        player.updatePlayer();
        player.draw();
        enemyContainer.update();
    } else {
        player.draw();
        gameOver();
    }
    if (fireTimer != 0) {
        fireTimer++;
    }
    if (fireTimer > STARTING_FIRE_RATE) {
        fireTimer = 0;
    }
}
function drawBackground(){
    ctx.save();
    ctx.translate(canvas.width,0);
    ctx.rotate(90*Math.PI/180);
    background.drawRaw(frame%canvas.height,0,canvas.height,canvas.width);
    background.drawRaw(frame%canvas.height-canvas.height,0,canvas.height,canvas.width);
    ctx.restore();
}

function gameOver() {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("game-over-overlay").style.display = "block";
}

// Reset game to original state
function reset() {
    canvas.style.filter = ""
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    player.health = 3;
    player.xVel = 0;
    player.yVel = 0;
    player.xPos = canvas.width / 2;
    player.yPos = canvas.height - 100;
    score = 0;
    enemyContainer.enemies = [];
    elementsOnCanvas = [];
    elementsOnCanvas.push(player);
    Bullets.bullets = [];
    frame = 0;
    drawGame();
};