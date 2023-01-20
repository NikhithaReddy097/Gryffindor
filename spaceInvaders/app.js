let tilesize = 32;
let rows = 16, cols = 16;

let board;
let boardWidth = tilesize*cols;
let boardHeight = tilesize*rows;
let context;
let shipwidth = tilesize*2;
let shipheight = tilesize;

let shipx = tilesize*cols/2 - tilesize;
let shipy = tilesize*rows - tilesize*2;


let alienarray = [];
let alienwidth = tilesize*2;
let alienheight = tilesize;
let alienx = tilesize,alieny = tilesize;
let alienimg;

let alienrows = 2,aliencols = 3;
let aliencount = 0;
let alienvelx = 1;
let ship = {
    x:shipx,
    y:shipy,
    width : shipwidth,
    height : shipheight,
}
let shipimage;
let shipvelx = tilesize;

let score = 0;
let gameOver = false;


let bulletarray = []
let bulletvely = -10;

window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    shipimage = new Image();
    shipimage.src="./ship.png";
    shipimage.onload = function(){
        context.drawImage(shipimage,ship.x,ship.y,ship.width,ship.height);
    }

    alienimg = new Image();
    alienimg.src = "./alien.png";
    createaliens();
    requestAnimationFrame(update);
    document.addEventListener("keydown",moveship);
    document.addEventListener("keyup",shoot);

}

function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0,0,board.width,board.height)
    context.drawImage(shipimage,ship.x,ship.y,ship.width,ship.height);

    for(let i=0;i<alienarray.length;i++){
        let alien = alienarray[i];
        if(alien.alive){
            alien.x += alienvelx;
            if(alien.x+alien.width>=board.width || alien.x<=0){
                alienvelx *= -1;
                alien.x += alienvelx*2;
                for(let j=0;j<alienarray.length;j++){
                    alienarray[j].y += alienheight;
                }
            }
            context.drawImage(alienimg,alien.x,alien.y,alien.width,alien.height);
            if (alien.y >= ship.y) {
                gameOver = true;
                declare();
                return;
            }
        }

    }

    for(let i=0; i<bulletarray.length; i++){
        let bullet = bulletarray[i];
        bullet.y += bulletvely;
        context.fillStyle= "white";
        context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);

        for(let j=0;j<alienarray.length;j++){
            let alien  = alienarray[j];
            if(!bullet.used && alien.alive && detectcollision(bullet,alien)){
                bullet.used = true;
                alien.alive = false;
                aliencount--;
                score += 100;
            }
        }
    }
    while(bulletarray.length>0 && (bulletarray[0].used || bulletarray[0].y < 0)){
        bulletarray.shift();      
    }

    if(aliencount === 0){
        score += aliencols * alienrows * 100;
        aliencols = Math.min(aliencols+1,cols/2-2);
        alienrows = Math.min(alienrows+1,rows-4);
        if (alienvelx > 0) 
            alienvelx += 0.2; 
        else 
            alienvelx -= 0.2; 
        alienarray = [];
        bulletarray = [];
        createaliens();
    }

    context.fillStyle="white";
    context.font="16px courier";
    context.fillText(score, 5, 20);
}

function moveship(e){
    if (gameOver) {
        return;
    }
    if(e.code=="ArrowLeft" && ship.x-shipvelx>=0){
        ship.x -= shipvelx;
    }
    else if(e.code=="ArrowRight" && ship.x+shipvelx+ship.width <= board.width){
        ship.x += shipvelx;
    }

}

function createaliens(){
    for(let c=0; c<aliencols; c++){
        for(let r=0; r<alienrows; r++){
            let alien = {
                img:alienimg,
                x:alienx + c*alienwidth,
                y:alieny+r*alienheight,
                width:alienwidth,
                height:alienheight,
                alive:true
            }
            alienarray.push(alien);
        }
    }
    aliencount = alienarray.length;
}

function shoot(e){
    if (gameOver) {
        return;
    }
    if(e.code=="Space"){
        let bullet = {
            x : ship.x+shipwidth*15/32,
            y : ship.y,
            width : tilesize/8,
            height : tilesize/2,
            used : false
        }
        bulletarray.push(bullet);
    }
}

function detectcollision(a,b){
    return a.x < b.x + b.width &&   //a top-left doesn't reach b's top-right
           a.x + a.width > b.x &&   //a top-right doesn't reach b's top-left
           a.y < b.y + b.height &&  //a top-left doesn't reach b's bottom-left
           a.y + a.height > b.y     //a bottom-left doesn't reach b's top-left
}
function declare(){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerHTML = "Game Over!\n Score : "+score;
}