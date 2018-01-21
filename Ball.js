var launchBall = false;
var ballX = canonX;
var ballY = canvas.height-canonHeight+10;
var ballR = 30;
var ballTraject = [];


function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballR, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
	ctx.closePath();
	
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

	if(launchBall && ballY == canvas.height-canonHeight+10){
		ballTraject[0] = canonX;
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
}