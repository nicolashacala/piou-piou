var canonHeight = 40;
var canonWidth = 40;
var canonX = (canvas.width-canonWidth)/2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        canonX = relativeX - canonWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 32) {
    	launchBall = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


function drawCanon(){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.arc(canonX,500,40,3.15,2*Math.PI);
	ctx.closePath();
	ctx.stroke();

	ctx.fillStyle = 'black';
	ctx.fill();

	if(rightPressed && canonX < canvas.width-canonWidth) {
	    canonX += 10;
	}
	else if(leftPressed && canonX > canonWidth) {
	    canonX -= 10;
	}
}