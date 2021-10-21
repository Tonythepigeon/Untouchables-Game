const STARTING_ACCELERATION = 1;
const STARTING_FRICTION = 0.9;
const STARTING_FIRE_RATE = 20; //how many frames until you can fire another bullet
let fireTimer = 0;
let frame = 0;
var canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let keyMap = new Object();
var elementsOnCanvas = new Array();

var isGameOver;
var score = 0;
var scoreDisplay = document.getElementById('score');

//keyboard listeners
document.onkeydown = function (e) {
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
//init global variables
let player = new PlayerObject(
    'mainShip.png',
    canvas.width / 2,
    canvas.height - 100,
    STARTING_ACCELERATION,
    STARTING_FRICTION
);
let darkBulletSprite = new Asset(
    'redLasor.gif',
    0,
    0,
    .1,
    .1
);
let darkBullet = new Bullet(darkBulletSprite,
    10,
    1,
    10,
    1
);
let enemyContainer = new EnemyContainer(["alienShip.gif", "mainShip.png"], 100, 100);

window.requestAnimationFrame(drawGame);


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
    if (frame % (200) == 0)
        enemyContainer.newEnemy(0, darkBullet, .5, 3);
}

function drawGame() {
    frame++;
    handleKeyboardInput();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    scoreDisplay.innerHTML = score;

    enemyContainer.draw();
    if (player.health > 0) {
        player.updatePlayer();
        player.draw();
        enemyContainer.update();
    } else {
        gameOver();
    }
    if (fireTimer != 0) {
        fireTimer++;
    }
    if (fireTimer > STARTING_FIRE_RATE) {
        fireTimer = 0;
    }
    //requests next frame (don't call anything after)
    window.requestAnimationFrame(drawGame);
}



//OLD MOVE OBJECT CODE

function moveObject(object, direction, distance, func) {
    if (func == "Stick on Screen") {
        if (object.xPos > canvas.width - object.width) {
            object.xPos = canvas.width - object.width;
        } else if (object.xPos < 0) {
            object.xPos = 0;
        }
        if (object.yPos > canvas.height - object.height) {
            object.yPos = canvas.height - object.height;
        } else if (object.yPos < 0) {
            object.yPos = 0;
        }
    }
    ctx.drawImage(object.image, object.xPos, object.yPos, object.width, object.height);
}


function gameOver() {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("game-over-overlay").style.display = "block";

}

// Reset game to original state
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    player.health = 3;
    score = 0;
    enemies = [];
    bullets = [];
};