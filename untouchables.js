//var img = new Image();
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth - 20;
ctx.canvas.height = window.innerHeight - 20;
var img = new Image();
var img = new newAsset(img, 'mainShip.png', canvas.width / 2, canvas.height - 80, 120, 120);
function newAsset(name, imageSrc, xPosition, yPosition, inWidth, inHeight){
    name.src = 'images/' + imageSrc;
    this.width = inWidth; 
    this.height = inHeight;
    this.xPos = xPosition - this.width / 2; 
    this.yPos = yPosition - this.height / 2;
    name.onload = function() {
        console.log("a");
        ctx.drawImage(name, xPosition - this.width / 2, yPosition - this.height / 2);
    }
    this.image = name;

}
//Draw in assets

document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowLeft":
            moveObject(img, "LEFT", 15, "Stick on Screen");
            break;
        case "ArrowUp":
            moveObject(img, "UP", 15, "Stick on Screen");
            break;
        case "ArrowRight":
            moveObject(img, "RIGHT", 15, "Stick on Screen");
            break;
        case "ArrowDown":
            moveObject(img, "DOWN", 15, "Stick on Screen");
            break;
    }
    
    //ctx.drawImage(img, img., img.y);
}
function moveObject(object, direction, distance, func){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    direction = direction.toUpperCase();
    switch(direction){
        case "UP" || "U":
            object.yPos -= distance;
            break;
        case "DOWN" || "D":
            object.yPos += distance;
            break;
        case "RIGHT" || "R":
            object.xPos += distance;
            break;
        case "LEFT" || "L":
            object.xPos -= distance;
            break;
    }
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