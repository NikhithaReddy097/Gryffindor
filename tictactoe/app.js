let originalBoard;
const huPlayer = "O";
const aiPlayer = "X";
const winCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

const cells = document.querySelectorAll(".cell");
startGame();

function startGame(){
    document.querySelector(".endgame").style.display="none";
    originalBoard =  Array.from(Array(9).keys());
    for(let i=0;i<cells.length;i++){
        cells[i].innerHTML='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false);
    }

}

function turnClick(square){
    if(typeof originalBoard[square.target.id] == 'number'){
        turn(square.target.id,huPlayer);
        let gameWon = checkWin(originalBoard,huPlayer);
        if(gameWon) gameOver(gameWon)
        else if(!checkTie()) turn(bestSpot(), aiPlayer);
    }
}

function turn(id, player){
    originalBoard[id] = player;
    document.getElementById(id).innerHTML = player;
    let gameWon = checkWin(originalBoard,player);
    if(gameWon) gameOver(gameWon)
}

function checkWin(board,player){
    //Know about this REDUCE
    let plays = board.reduce((a,e,i)=>
    (e === player) ? a.concat(i):a,[]);

    let gameWon = null;
    for(let [index,win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem) >-1)){
            gameWon = {index: index,player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer?"green":"red";
    }
    for (let i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',turnClick,false);
    }
    declareWinner(gameWon.player == huPlayer?"You win!":"You lose!");
}

function bestSpot(){
    return minimax(originalBoard,aiPlayer).index;
}

function emptyScores(){
    return originalBoard.filter(s=> typeof s=='number');
}

function checkTie(){
    if(emptyScores().length == 0) {
        for(let i=0;i<cells.length;i++){
            cells[i].style.backgroundColor = "blue";
            cells[i].removeEventListener('click',turnClick,false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerHTML = who;
}

function minimax(newBoard,player){
    var availSpots = emptyScores(newBoard);

    if(checkWin(newBoard,player)){
        return{score:-10};
    }
    else if(checkWin(newBoard,aiPlayer)){
        return {score:20};
    }
    else if(availSpots.length==0){
        return {score:0};
    }

    var moves = [];
    for(let i=0;i<availSpots.length;i++){
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if(player == aiPlayer){
            var result = minimax(newBoard,huPlayer);
            move.score = result.score;
        }
        else{
            var result = minimax(newBoard,aiPlayer);
            move.score = result.score;
        }
        newBoard[availSpots[i]] =  move.index;
        moves.push(move);
    }
    var bestMove;
    if(player === aiPlayer){
        var bestScore = -10000;
        for(let i=0;i<moves.length;i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else{
        var bestScore = 10000;
        for(let i=0;i<moves.length;i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}