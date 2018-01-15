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
var secToStart;
var min = 0;
var sec = 5;
var score = 0;
var scoreFinal = [];
var highestScores = [];
var targetAlex = new Image();
targetAlex.src = '393415.jpeg';
var targetEmily = new Image();
targetEmily.src = '18309559.png';
var malus = new Image();
malus.src = 'malus.jpeg';
var malusX;
var malusY;
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

	if(score >= 6000){
		ballR = 25;
	}
	else if(score >= 5000){
		ballR = 15;
	}
	else if(score >= 4000){
		ballR = 10;
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
	
	if(launchBall && ballY > 0){
		if(score >= 6000){
			ballY -= 15;
		}
		else if(score >= 5000){
			ballY -= 19;
		}
		else if(score >= 4000){
			ballY -= 30;
		}
		else if(score >= 3500){
			ballY -= 24;
		}
		else if(score >= 3000){
			ballY -= 19;
		}
		else if(score >= 2000){
			ballY -= 15;
		}
		else if(score >= 1000){
			ballY -= 12;
		}
		ballY -= 10;
		ballX = ballTraject[0];
	}
	else{
		launchBall = false;
		ballY = canvas.height-canonHeight+10;
		ballX = canonX;

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
	else if(malusX < ballX+ballR && malusX+60 > ballX-ballR && malusY+60 > ballY+ballR){
		if(score >= 4000){
			sec -= 10
		}
		else{
			sec -= 5;
		}
		explosionX[0] = malusX;
		explosionY[0] = malusY;
		explosionTime = true;
		
		if(explosionTime && malusX == explosionX && malusY == explosionY){
			setTimeout(() => {
				explosionTime = false;
			}, 1000);
		}
		malusX = Math.floor(Math.random()*451);
		malusY = Math.floor(Math.random()* 201);
		
		ballX = canonX;
		ballY = canvas.height-canonHeight+10;
		launchBall = false;
		drawMalus();
	}
}

function drawCountDown(){
	ctx.font = '16px Arial';
	ctx.fillStyle = '#FFF';
	if(sec<10){
		ctx.fillText('Time left : ' + min + ':0' + sec, 380, 20);
	}
	else{
	ctx.fillText('Time left: ' + min + ':' + sec, 420, 20);
	}
}

function drawScore(){
	ctx.font = '16px Arial';
	ctx.fillStyle = '#FFF';
	ctx.fillText('Score: ' + score, 40, 20);
}

function timer(){
	setInterval(function(){
		sec--;

		if(sec <= 0){
			scoreFinal.push(score);
			alert('Final score: ' + score + '\nYou are a looser. Try again?');
			addHighestScore();
			malusX = undefined;
			malusY = undefined;
			ballX = canonX;
			ballY = canvas.height-canonHeight+10;
			sec = 5;
			score = 0;
			ballR = 30;
			targetX = Math.floor(Math.random()*451);
			targetY = Math.floor(Math.random()* 201);
		}

	}, 1000);
}

function timerToStart(){
	secToStart = 5;
	setInterval(function(){
		startingScreen.style.display = 'none';
		secToStart--;
		if(secToStart >= 3){
			ctx.font = 'bold 20px Arial';
			ctx.fillStyle = '#cc0000';
			ctx.textAlign = "center";
			ctx.fillText('READY?', canvas.width/2, 200);
		}
		else if(secToStart == 1){
			ctx.clearRect(0,0, canvas.width, canvas.height);
			ctx.font = 'bold 20px Arial';
			ctx.fillStyle = '#cc0000';
			ctx.textAlign = "center";
			ctx.fillText('GO', canvas.width/2, 200);
		}
		else if(secToStart == 0){
			timer();
			draw();
		}
	}, 1000);
}




// Dom

var startGame = document.createElement('BUTTON');
startGame.className = 'start_game_button';
startGame.appendChild(document.createTextNode('Start'));
startGame.addEventListener('click', timerToStart);

var gameRules = document.createElement('DIV');
gameRules.className = 'game_rules';
gameRules.innerHTML = 'Use the mouse to move the canon <br/>Use the space bar to shoot.';

var startingScreen = document.createElement('DIV');
startingScreen.className = 'starting_screen';
startingScreen.appendChild(gameRules);
startingScreen.appendChild(startGame);
document.body.appendChild(startingScreen);


var scoreTable = document.createElement('DIV');
scoreTable.className = 'score_table';
document.body.insertAdjacentElement('afterbegin', scoreTable);

var titleScoreHigh = document.createElement('H3');
titleScoreHigh.appendChild(document.createTextNode('Highest scores:'));
scoreTable.appendChild(titleScoreHigh);

var highestScoreList = document.createElement('UL');
scoreTable.appendChild(highestScoreList);


function addHighestScore(){

	highestScores = scoreFinal.sort(function(a, b){return b-a});

	while(highestScoreList.firstChild){
		highestScoreList.removeChild(highestScoreList.firstChild);
	}

	highestScores.forEach(function(scoreSorted){
		var highestScoreListElement = document.createElement('LI');
		highestScoreListElement.appendChild(document.createTextNode(scoreSorted));
		highestScoreList.appendChild(highestScoreListElement);
	})

}

