var canvas;
var context;
var gravity = 5;
var obsSpeed = 3;
var i = 0;
var butterflySprite;
var player = {posX: 40, posY: 40, disWidth: 55, disHeight: 57};
var upOb1 = {posX: 600, posY: 0, disWidth: 20, disHeight: 140};
var downOb1 = {posX: 600, posY: 400, disWidth: 20, disHeight: -140};
var upOb2 = {posX: 800, posY: 0, disWidth: 20, disHeight: 250};
var downOb2 = {posX: 800, posY: 400, disWidth: 20, disHeight: -30};
var upOb3 = {posX: 1000, posY: 0, disWidth: 20, disHeight: 30};
var downOb3 = {posX: 1000, posY: 400, disWidth: 20, disHeight: -250};
var keyPressed = [];
var dead = false;
var score = 0;
var highScore = localStorage.getItem('highscore') || 0;
var music;
var crash;

function init(){
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	var x = canvas.width / 2;
	context.font = "22px Verdana";
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('Hold the up arrow to fly!',x,100);
    context.fillText('Let go to descend.',x,125);
    context.fillText('Avoid the obstacles...',x,150);
    context.fillText('Click anywhere to start.',x,290);
    canvas.addEventListener('mousedown', draw, false);
    butterflySprite = document.getElementById('butterfly');
    music = document.getElementById('music');
    music.loop = true;
    music.autoplay = true;
    crash = document.getElementById('crash');
	window.onkeydown = keydown;
    window.onkeyup = keyup;
}

function draw(){
	canvas.removeEventListener('mousedown', draw, false);
	if(!dead){
		score++;
		context.fillStyle = "#33d6ff";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.font = "17px Verdana";
	    context.fillStyle = 'red';
	    context.fillText('Score: ' + score, 70, 20);
		context.drawImage(butterflySprite, i*55,0, player.disWidth, player.disHeight, player.posX, player.posY, player.disWidth, player.disHeight);
		drawRect(upOb1.posX, upOb1.posY, upOb1.disWidth, upOb1.disHeight, "green", 1, "black");
		drawRect(downOb1.posX, downOb1.posY, downOb1.disWidth, downOb1.disHeight, "green", 1, "black");
		drawRect(upOb2.posX, upOb2.posY, upOb2.disWidth, upOb2.disHeight, "green", 1, "black");
		drawRect(downOb2.posX, downOb2.posY, downOb2.disWidth, downOb2.disHeight, "green", 1, "black");
		drawRect(upOb3.posX, upOb3.posY, upOb3.disWidth, upOb3.disHeight, "green", 1, "black");
		drawRect(downOb3.posX, downOb3.posY, downOb3.disWidth, downOb3.disHeight, "green", 1, "black");
		player.posY += gravity;
		upOb1.posX -= obsSpeed;
		downOb1.posX -= obsSpeed;
		upOb2.posX -= obsSpeed;
		downOb2.posX -= obsSpeed;
		upOb3.posX -= obsSpeed;
		downOb3.posX -= obsSpeed;
		if(keyPressed[38]) {
			i = (i+1)%4;
			gravity = -4;
		}
		else{
			gravity = 4;
		}
		checkCollision();
		requestAnimationFrame(draw);
	}
}

function checkCollision(){
	if((player.posY+25) >= canvas.height || player.posY <= 0){
		dead = true;
		crash.play();
		gameOver();
	}
	else if(player.posY < upOb1.posY+upOb1.disHeight 
		&& upOb1.posX < player.posX+player.disWidth 
		&& player.posX+player.disWidth < upOb1.posX+upOb1.disWidth+30){
			dead = true;
			crash.play();
			gameOver();
	}
	else if(player.posY+player.disHeight > downOb1.posY+downOb1.disHeight 
		&& downOb1.posX < player.posX+player.disWidth 
		&& player.posX+player.disWidth < downOb1.posX+downOb1.disWidth+30){
			dead = true;
			crash.play();
			gameOver();
	}
	else if(player.posY < upOb2.posY+upOb2.disHeight 
		&& upOb2.posX < player.posX+player.disWidth 
		&& player.posX+player.disWidth < upOb2.posX+upOb2.disWidth+30){
			dead = true;
			crash.play();
			gameOver();
	}
	else if(player.posY+player.disHeight > downOb2.posY+downOb2.disHeight 
		&& downOb2.posX < player.posX+player.disWidth 
		&& player.posX+player.disWidth < downOb2.posX+downOb2.disWidth+30){
			dead = true;
			crash.play();
			gameOver();
	}
	else if(player.posY < upOb3.posY+upOb3.disHeight 
		&& upOb3.posX < player.posX+player.disWidth 
		&& player.posX+player.disWidth < upOb3.posX+upOb3.disWidth+30){
			dead = true;
			crash.play();
			gameOver();
	}
	else if(player.posY+player.disHeight > downOb3.posY+downOb3.disHeight 
		&& downOb3.posX < player.posX+player.disWidth 
		&& player.posX+player.disWidth < downOb3.posX+downOb3.disWidth+30){
			dead = true;
			crash.play();
			gameOver();
	}
	if(upOb1.posX+upOb1.disWidth <= 0){
		var minHeight = 20;
		var maxHeight = 320;
		var upNewHeight = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		var minGap = 120;
		var maxGap = 150;
		var upNewGap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		upOb1.disHeight = upNewHeight;
		downOb1.disHeight = -(400 - upNewHeight - upNewGap);
		upOb1.posX = 600;
		downOb1.posX = 600;
	}
	if(upOb2.posX+upOb2.disWidth <= 0){
		var minHeight = 20;
		var maxHeight = 320;
		var upNewHeight = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		var minGap = 120;
		var maxGap = 150;
		var upNewGap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		upOb2.disHeight = upNewHeight;
		downOb2.disHeight = -(400 - upNewHeight - upNewGap);
		upOb2.posX = 600;
		downOb2.posX = 600;
	}
	if(upOb3.posX+upOb3.disWidth <= 0){
		var minHeight = 20;
		var maxHeight = 320;
		var upNewHeight = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		var minGap = 120;
		var maxGap = 150;
		var upNewGap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		upOb3.disHeight = upNewHeight;
		downOb3.disHeight = -(400 - upNewHeight - upNewGap);
		upOb3.posX = 600;
		downOb3.posX = 600;
	}
}

function fly(speed){
	gravity = speed;

}

function gameOver(){
	var x = canvas.width / 2;
	var y = canvas.height / 2;
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.font = "40px Verdana";
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText('GAME OVER!', x,150);
    context.font = "30px Verdana";
    context.fillText('Final Score: ' + score, x,200);
    if(score > highScore){
    	highScore = score;
    	localStorage.setItem('highscore', highScore);
    	context.fillText('High Score: ' + highScore, x,232);
    	alert("New High Score!");
    }
    else{
    	context.fillText('High Score: ' + highScore, x,232);
    }
    context.textAlign = 'center';
    context.font = "20px Verdana";
    context.fillText('Click anywhere to replay', x,280);
    canvas.addEventListener('click', replay, false);
}

function replay(){
	location.reload()
}

function drawRect(x,y,width,height,color,lw,strokecolor){
      context.beginPath();
      context.rect(x, y, width, height);
      context.fillStyle = color;
      context.fill();
      context.lineWidth = lw;
      context.strokeStyle =  strokecolor;
      context.stroke();
}

function keydown(e) {
    keyPressed[e.keyCode] = true;
}

function keyup(e) {
    keyPressed[e.keyCode] = false;
}

window.onload = init;