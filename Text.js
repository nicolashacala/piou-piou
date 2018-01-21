var gameTimer;
var timerBeforeStart;

function drawCountDown(){
	ctx.font = '16px Arial';
	ctx.fillStyle = '#FFF';
	if(sec<10){
		ctx.fillText('Time left : ' + min + ':0' + sec, 880, 20);
	}
	else{
	ctx.fillText('Time left: ' + min + ':' + sec, 920, 20);
	}
}

function drawScore(){
	ctx.font = '16px Arial';
	ctx.fillStyle = '#FFF';
	ctx.fillText('Score: ' + score, 60, 20);
}

function timer(){
	gameTimer = setInterval(function(){
		sec--;
	}, 1000);
}

function resetGame(){
	restartingScreen.style.display = "none";
	canvas.style.display = "block";
	malusX = undefined;
	malusY = undefined;
	ballX = canonX;
	ballY = canvas.height-canonHeight+10;
	sec = 5;
	score = 0;
	ballR = 30;
	targetX = Math.floor(Math.random()*(canvas.width-49));
	targetY = Math.floor(Math.random()* 201);
	timerToStart();
}

function timerToStart(){
	secToStart = 5;
	timerBeforeStart = setInterval(function(){
		startingScreen.style.display = 'none';
		canvas.style.display = 'block';
		secToStart--;
		if(secToStart >= 3){
			ctx.clearRect(0,0, canvas.width, canvas.height);
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
			clearInterval(timerBeforeStart);
			secToStart = undefined;
			timer();
			draw();
		}
	}, 1000);
}