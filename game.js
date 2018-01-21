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
	
	var rqAF = requestAnimationFrame(draw);
	
	if(sec <= 0){
		cancelAnimationFrame(rqAF);
		clearInterval(gameTimer);
		sec = undefined;
		ctx.clearRect(0,0, canvas.width, canvas.height);
		scoreFinal.push(score);
		canvas.style.display = 'none';
		restartingScreen.style.display = 'inline';
		printFinalScore.innerHTML = 'You scored: ' + score;
	}
		
	
}

function collisionDetection(){
	if(targetX < ballX+ballR && targetX+60 > ballX-ballR && targetY+60 > ballY+ballR){
		setTimeout(function(){
			targetX = Math.floor(Math.random()*(canvas.width-49));
			targetY = Math.floor(Math.random()* 201);
			if(score >= 2000){
				malusX = Math.floor(Math.random()*(canvas.width-49));
				malusY = Math.floor(Math.random()* 201);
			}
			
			while(targetX > explosionX[0] && targetX < explosionX[0]+60 || targetX+60 > explosionX[0] && targetX+60 < explosionX[0]+60){
				targetX = Math.floor(Math.random()*(canvas.width-49));
				targetY = Math.floor(Math.random()* 201);
			}
			drawTarget();
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

		targetX = Math.floor(Math.random()*(canvas.width-49));
		targetY = Math.floor(Math.random()* 201);
		
		while(targetX > explosionX[0] && targetX < explosionX[0]+100 || targetY > explosionY[0]+100 && targetY < explosionY[0]){
			targetX = Math.floor(Math.random()*(canvas.width-49));
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
		malusX = Math.floor(Math.random()*(canvas.width-49));
		malusY = Math.floor(Math.random()* 201);
		
		ballX = canonX;
		ballY = canvas.height-canonHeight+10;
		launchBall = false;
		drawMalus();
	}
}

var canvas = document.getElementById('myCanvas');var ctx = canvas.getContext('2d');var secToStart;var min = 0;var sec = 5;var score = 0;var scoreFinal = [];var highestScores = [];var rqAF;