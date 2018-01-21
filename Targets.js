var targetX = Math.floor(Math.random()*451);
var targetY = Math.floor(Math.random()* 201);
var randomNumber = Math.floor(Math.random()*2);
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