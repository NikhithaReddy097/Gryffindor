var blockSize = 25;
var rows = 20;
var cols = 20;
var board,context;

var snakex = blockSize*10;
var snakey = blockSize*5;

var velx = 0,vely = 0;

var body = [];

var foodx, foody;

var gameover = false;

let score = 0;
window.onload = function(){
    board = document.getElementById("board");
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keyup",changedirection);
    // update();
    setInterval(update,100);
}

function update(){
    // if(gameover){
    //     return;
    // }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(foodx,foody,blockSize,blockSize);

    if(snakex == foodx && snakey == foody){
        score+=1;
        document.getElementById("score").innerHTML = "Score : "+score;
        body.push([foodx,foody]);
        placefood();
    }

    for(let i=body.length-1; i>0; i--){
        body[i] = body[i-1];
    }
    if(body.length){
        body[0] = [snakex,snakey];
    }


    context.fillStyle = "lime";
    snakex += velx * blockSize;
    snakey += vely * blockSize;
    context.fillRect(snakex,snakey,blockSize,blockSize);
    for(let i=0;i<body.length;i++){
        context.fillRect(body[i][0],body[i][1],blockSize,blockSize);
    }

    if(snakex<0 || snakex>cols*blockSize || snakey<0 || snakey>rows*blockSize){
        gameover = true;
        declare();
        return;
    }

    for(let i=0;i<body.length;i++){
        if(snakex == body[i][0] && snakey == body[i][1]){
            gameover = true;
            declare();
            return;
        }
    }
}

function declare(){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerHTML = "Game Over!\n Score : "+score;
}

function changedirection(e){
    if(e.code == "ArrowUp" && vely != 1){
        velx = 0;
        vely = -1;
    }
    else if(e.code == "ArrowDown" && vely != -1){
        velx = 0;
        vely = 1;
    }
    else if(e.code == "ArrowLeft" && velx != 1){
        velx = -1;
        vely = 0;
    }
    if(e.code == "ArrowRight" && velx != -1){
        velx = 1;
        vely = 0;
    }
}

function placefood(){
    foodx = Math.floor(Math.random() * cols) * blockSize;
    foody = Math.floor(Math.random() * rows) * blockSize;
}