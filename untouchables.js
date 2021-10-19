const STARTING_ACCELERATION = 1;
const STARTING_FRICTION = 0.9;
const STARTING_FIRE_RATE = 10; //how many frames until you can fire another bullet
let fireTimer = 0;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let keyMap = new Object();

ctx.canvas.width  = window.innerWidth - 20;
ctx.canvas.height = window.innerHeight - 20;

let player = new PlayerObject(
    'mainShip.png',
    canvas.width / 2,
    canvas.height - 80,
    STARTING_ACCELERATION,
    STARTING_FRICTION
);
let darkBulletSprite = new Asset('redLasor.gif', 0, 0, .1, .1);
let darkBullet = new Bullet(darkBulletSprite,10,1,10,1)
//let player = new Asset('mainShip.png', canvas.width / 2,canvas.height - 80,);
//Draw in assets

document.onkeydown = function(e) {
    keyMap[e.key] = true;
}
document.onkeyup = function(e) {
    keyMap[e.key] = false;
}

window.requestAnimationFrame(drawGame);

function handleKeyboardInput() {
    if(keyMap["ArrowDown"])
        player.moveDown();
    if(keyMap["ArrowUp"])
        player.moveUp();
    if(keyMap["ArrowLeft"])
        player.moveLeft();
    if(keyMap["ArrowRight"])
        player.moveRight();
    if(keyMap[" "]){
        if(fireTimer == 0) {
            console.log("ee");
            player.fireBullet();
        }
    }
}

function drawGame(){
    handleKeyboardInput();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.updatePlayer();
    player.draw();
    if(fireTimer != 0){
        fireTimer++;
    }
    if(fireTimer > STARTING_FIRE_RATE){
        fireTimer = 0;
    }
    //requests next frame (don't call anything after)
    window.requestAnimationFrame(drawGame);
}



//OLD MOVE OBJECT CODE

function moveObject(object, direction, distance, func){
    if(func == "Stick on Screen"){
        if(object.xPos > canvas.width - object.width){
            object.xPos = canvas.width - object.width;
        }else if(object.xPos < 0){
            object.xPos = 0;
        }
        if(object.yPos > canvas.height - object.height){
            object.yPos = canvas.height - object.height;
        }else if(object.yPos < 0){
            object.yPos = 0;
        }
    }
    ctx.drawImage(object.image, object.xPos, object.yPos, object.width, object.height);
}


function detectCollision(){
    elementsOnCanvas.forEach(function(element) {
        elementsOnCanvas.forEach(function(movingObject) {
            if(movingObject != element && movingObject.xPos - movingObject.width / 2 <=  element.xPos + element.width / 2 && movingObject.xPos + movingObject.width / 2 >= element.xPos - element.width / 2
                && movingObject.yPos + movingObject.height / 2 >=  element.yPos - element.height / 2 && movingObject.yPos - movingObject.height / 2 <= element.yPos + element.height / 2){
                console.log("Colision detected between: " + movingObject.name + " and " + element.name);
            }
        });
    });
}
