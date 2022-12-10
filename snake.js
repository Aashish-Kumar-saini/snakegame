//board
var blocksize = 25;
var rows = 18;
var cols = 18;
var board;
var context;

//Snake Head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

//snake food
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//gameover
var gameover = false;
//sounds
const gameOverSound = new Audio("gameover.wav");
const foodsound = new Audio('eating.wav');
const moveSound = new Audio("movement.wav");
const musicSound = new Audio("bgsound.mp3");
let score =0;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows*blocksize;
    board.width = cols*blocksize;
    context = board.getContext("2d");   //used to draw on the board
    
    placeFood();

    document.addEventListener("keyup",changeDirection);

    //update();
    setInterval(update, 1000/5); //100 miliseconds
}
function update(){
    if (gameover){
        return;
    }

    context.fillStyle = "purple";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blocksize,blocksize);
    musicSound.play();
    if (snakeX == foodX && snakeY == foodY){
        foodsound.play();
        score += 1;
        scoreBox.innerHTML = "Score :"+ score;
        snakeBody.push([foodX,foodY])
        placeFood();
    }

    for (let i=snakeBody.length-1 ; i>0 ; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for(let i=0 ; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
    }

    //gameover condition
    if(snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize){
        gameOverSound.play();
        musicSound.pause();
        console.log(score);
        score=0;
        gameover = true;
        alert('Game Over ');
    }

    for (let i = 0 ; i < snakeBody.length ; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameover = true;
            gameOverSound.play();
            musicSound.pause();
            console.log(score);
            score=0;
            alert('Game Over');
        }
    }
    
}

function changeDirection(e){
    moveSound.play();
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood(){
    
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * cols) * blocksize;
}