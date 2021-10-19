const STARTING_ACCELERATION = 1;
const STARTING_FRICTION = 0.9;
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let keyMap = new Object();
keyMap["ArrowDown"] = false;
ctx.canvas.width  = window.innerWidth - 20;
ctx.canvas.height = window.innerHeight - 20;
var elementsOnCanvas = new Array;
function Asset(imageSrc, xStartPosition, yStartPosition, xScale, yScale){
    let image = new Image();
    image.src = 'images/' + imageSrc;
    this.name = imageSrc;
    this.width = image.width * xScale;
    this.height = image.height * yScale;
    //start position
    this.xPos = xStartPosition - this.width / 2;
    this.yPos = yStartPosition - this.height / 2;
    image.onload = function() {
        console.log("image '" + image.src + "' loaded");
        ctx.drawImage(image, xStartPosition - this.width / 2, yStartPosition - this.height / 2);
    }
    this.image = image;

    this.draw = function(){
        ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
    }
    elementsOnCanvas.push(this);
}

function PlayerObject(imageSrc, xStartPosition, yStartPosition, acceleration, aerodynamicCoeff){
    let sprite = new Asset(imageSrc, xStartPosition, yStartPosition, 1, 1);
    this.sprite = sprite;
    this.xVel = 0;
    this.yVel = 0;
    this.acceleration = acceleration
    this.friction = aerodynamicCoeff;

    this.moveUp = function(){
        this.yVel -= acceleration;
    }
    this.moveDown = function(){
        this.yVel += acceleration;
    }
    this.moveRight = function(){
        this.xVel += acceleration;
    }
    this.moveLeft = function(){
        this.xVel -= acceleration;
    }
    this.generateBulle = function(){
        generateBullet("redLasor.gif", this.sprite.xPos, this.sprite.yPos, 2, 2);
    }
    this.updatePlayer = function(){
        this.xVel *= this.friction;
        this.yVel *= this.friction;
        this.sprite.xPos += this.xVel;
        this.sprite.yPos += this.yVel;
        
    }
    this.draw = function(){
        sprite.draw();
    }

}

let player = new PlayerObject(
    'mainShip.png',
    canvas.width / 2,
    canvas.height - 80,
    STARTING_ACCELERATION,
    STARTING_FRICTION
);
var Asset = new PlayerObject("orangeShip.png", 200, 200, 1, 1, false);

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
        //let a = new generateBullet("redLasor.gif", player.sprite.xPos, player.sprite.yPos, 2, 2);
    }
}

function drawGame(){
    handleKeyboardInput();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.updatePlayer();
    detectColision();
    elementsOnCanvas.forEach(function(element) {
        element.draw();
    });
    window.requestAnimationFrame(drawGame);
}


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

function detectColision(){
    elementsOnCanvas.forEach(function(element) {
        elementsOnCanvas.forEach(function(movingObject) {
            if(movingObject != element && movingObject.xPos - movingObject.width / 2 <=  element.xPos + element.width / 2 && movingObject.xPos + movingObject.width / 2 >= element.xPos - element.width / 2 
                && movingObject.yPos + movingObject.height / 2 >=  element.yPos - element.height / 2 && movingObject.yPos - movingObject.height / 2 <= element.yPos + element.height / 2){
                    console.log("Colision detected between: " + movingObject.name + " and " + element.name);
            }
        });
    });
}

function generateBullet(imageSrc, xStartPosition, yStartPosition, xVelocity, yVelocity){
    let sprite = new Asset(imageSrc, xStartPosition, yStartPosition, 1, 1);
    //this.sprite = sprite;
    this.xVel = xVelocity;
    this.yVel = yVelocity;
    //elementsOnCanvas.push(this);

    this.draw = function(){
        this.sprite.xPos += this.xVel;
        this.sprite.yPos += this.yVel;
        sprite.draw();
    }

}