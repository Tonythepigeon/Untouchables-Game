var img = new Image();
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth - 20;
ctx.canvas.height = window.innerHeight - 20;
var x = 0, y = 0, speed = 25;

//Draw in assets
img.onload = function() {
    ctx.drawImage(img, 0, 0);
}
img.src = 'images/character.gif';
document.onkeydown = function(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (e.key) {
        case "ArrowLeft":
            x = x - speed;
            break;
        case "ArrowUp":
            y = y - speed;
            break;
        case "ArrowRight":
            x = x + speed;
            break;
        case "ArrowDown":
            y = y + speed;
            break;
    }
    if(x > canvas.width - img.width){
        x = canvas.width - img.width;
    }else if(x < 0){
        x = 0;
    }
    if(y > canvas.height - img.height){
        y = canvas.height - img.height;
    }else if(y < 0){
        y = 0;
    }
    ctx.drawImage(img, x, y);
}