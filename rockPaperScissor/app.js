let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreboard_div = document.querySelector(".scoreboard");
const result_div1 = document.getElementById("1");
const result_div2 = document.getElementById("2");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");

function getComputerChoice(){
    const choices = ["r","p","s"];
    return choices[Math.floor(Math.random()*3)];
}

function convertToWord(letter){
    if(letter === "r") return "Rock";
    if(letter === "p") return "Paper";
    return "Scissors";
}
function wins(userChoice,ComputerChoice){
    userScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_div1.innerHTML = convertToWord(userChoice)+" VS "+convertToWord(ComputerChoice)
    result_div2.innerHTML =  "You win!";
    document.getElementById(userChoice).classList.add("green-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("green-glow"),400);
}
function loses(userChoice,ComputerChoice){
    compScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_div1.innerHTML = convertToWord(userChoice)+" VS "+convertToWord(ComputerChoice)
    result_div2.innerHTML =  "You lose!";
    document.getElementById(userChoice).classList.add("red-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("red-glow"),300);
}
function draw(userChoice,ComputerChoice){
    result_div1.innerHTML = convertToWord(userChoice)+" VS "+convertToWord(ComputerChoice)
    result_div2.innerHTML =  "It's a draw!";
    document.getElementById(userChoice).classList.add("grey-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("grey-glow"),300);
}


function game(userChoice) {
    const ComputerChoice = getComputerChoice();
    switch(userChoice+ComputerChoice){
        case "rs":
        case "pr":
        case "sp":
            wins(userChoice,ComputerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            loses(userChoice,ComputerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice,ComputerChoice);
                break;
    }
}

function main(){
    rock_div.addEventListener('click',()=> game("r"));

    paper_div.addEventListener('click',()=> game("p"));

    scissor_div.addEventListener('click',()=> game("s"));
}

main();
