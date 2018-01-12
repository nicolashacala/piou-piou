var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var canonHeight = 40;
var canonWidth = 40;
var canonX = (canvas.width-canonWidth)/2;
var rightPressed = false;
var leftPressed = false;
var launchBall = false;
var ballX = canonX;
var ballY = canvas.height-canonHeight+10;
var ballR = 30;
var ballTraject = [];
var targetX = Math.floor(Math.random()*451);
var targetY = Math.floor(Math.random()* 201);
var randomNumber = Math.floor(Math.random()*2);
var min = 0;
var sec = 4;
var score = 0;
var targetAlex = new Image();
targetAlex.src = '393415.jpeg';
var targetEmily = new Image();
targetEmily.src = '18309559.png';
var malus = new Image();
malus.src = 'malus.jpeg';
var malusX = Math.floor(Math.random()*451);
var malusY = Math.floor(Math.random()* 201);
var explosion = new Image();
var explosionX = [];
var explosionY = [];
var explosionTime;
explosion.src = 'explosion.png';
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
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballR, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawTarget(){
	if(randomNumber == 0){
		ctx.drawImage(targetAlex, targetX, targetY);
	}
	else{
		ctx.drawImage(targetEmily, targetX, targetY);
	}
}

function drawMalus(){
	ctx.drawImage(malus, malusX, malusY);
}

function drawExplosion(){
	if(explosionTime){
		ctx.drawImage(explosion, explosionX, explosionY);
	}
}

function draw(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBall();
	drawCanon();
	drawExplosion();
	collisionDetection();
	drawTarget();
	drawCountDown();
	drawScore();
	if(score >= 2000){
		drawMalus();
	}
	
	if(rightPressed && canonX < canvas.width-canonWidth) {
	    canonX += 10;
	    ballX += 10;
	}
	else if(leftPressed && canonX > canonWidth) {
	    canonX -= 10;
	    ballX -= 10;
	}

	if(launchBall && ballY == canvas.height-canonHeight+10){
		ballTraject[0] = canonX;
	}
	
	
	if(launchBall && ballY > 0 && score >= 4000){
		ballY -= 35;
	}
	else if(launchBall && ballY > 0 && score >= 3500){
		ballY -= 30;
	}
	else if(launchBall && ballY > 0 && score >= 3000){
		ballY -= 25;
	}
	else if(launchBall && ballY > 0 && score >= 2000){
		ballY -= 20;
	}
	else if(launchBall && ballY > 0 && score >= 1000){
		ballY -= 15;
	}
	else if(launchBall && ballY > 0){
		ballY -= 10;
		ballX = ballTraject[0];
	}
	else{
		launchBall = false;
		ballY = canvas.height-canonHeight+10;
		ballX = canonX;

	}

	
	if(score >= 4000){
		ballR = 2;
	}
	else if(score >= 3500){
		ballR = 5;
	}
	else if(score >= 3000){
		ballR = 10;
	}
	else if(score >= 2000){
		ballR = 15;
	}
	else if(score >= 1000){
		ballR = 20;
	}

	requestAnimationFrame(draw);
}

function collisionDetection(){
	if(targetX < ballX+ballR && targetX+60 > ballX-ballR && targetY+60 > ballY+ballR){
		setTimeout(function(){
			targetX = Math.floor(Math.random()*451);
			targetY = Math.floor(Math.random()* 201);
			if(score >= 2000){
				malusX = Math.floor(Math.random()*451);
				malusY = Math.floor(Math.random()* 201);
			}
			
			while(targetX > explosionX[0] && targetX < explosionX[0]+100 || targetY > explosionY[0]+100 && targetY < explosionY[0]){
				targetX = Math.floor(Math.random()*451);
				targetY = Math.floor(Math.random()* 201);
			}
			drawTarget();
			if(score >= 2000){
				drawMalus();
			}
		}, 5000)

		if(score == 2000){
			sec += 1;
		}
		else{
			sec += 2;
		}

		score += 100;
		explosionX[0] = targetX;
		explosionY[0] = targetY;
		explosionTime = true;

		if(explosionTime && targetX == explosionX && targetY == explosionY){
			setTimeout(() => {
				explosionTime = false;
			}, 1000);
		}

		targetX = Math.floor(Math.random()*451);
		targetY = Math.floor(Math.random()* 201);
		
		while(targetX > explosionX[0] && targetX < explosionX[0]+100 || targetY > explosionY[0]+100 && targetY < explosionY[0]){
			targetX = Math.floor(Math.random()*451);
			targetY = Math.floor(Math.random()* 201);
		}

		randomNumber = Math.floor(Math.random()*2);
		ballX = canonX;
		ballY = canvas.height-canonHeight+10;
		launchBall = false;
		drawTarget();
	}
}

function drawCountDown(){
	ctx.font = '16px Arial';
	ctx.fillStyle = '#0095DD';
	if(sec<10){
		ctx.fillText('Time left : ' + min + ':0' + sec, 380, 20);
	}
	else{
	ctx.fillText('Time left: ' + min + ':' + sec, 380, 20);
	}
}

function drawScore(){
	ctx.font = '16px Arial';
	ctx.fillStyle = '#0095DD';
	ctx.fillText('Score: ' + score, 10, 20);
}

window.onload = function(){
	setInterval(function(){
		sec--;

		if(sec == 0){
			alert('You are a looser. Try again?');
			document.location.reload();
		}

	}, 1000);
}
draw();