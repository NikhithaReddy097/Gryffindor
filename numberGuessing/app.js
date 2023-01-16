const start = document.querySelector('#start');
const end = document.querySelector('#end');
const key = document.querySelector('#key');
let msg = document.querySelector('h4');

let a=0,b=0,ans=0;

key.addEventListener('click',function(e){
    a = parseInt(start.value);
    b = parseInt(end.value);
    if(b<a){
        alert("ENTER A VALID RANGE!");
        reset();
    }
    ans = Math.floor(Math.random()*(b-a))+a;
}
)

let cnt = 1;

function reset(){
    start.value = null;
    end.value = null;
    key.value = null;
    cnt = 1;
    msg.innerText = "ALL THE BEST!!"

}
function rest(){
    start.value = null;
    end.value = null;
    cnt = 1;
}
start.onmouseenter = reset;


key.addEventListener('keypress',function(e){

    if(e.key === 'Enter'){
    let c = key.value;
    if(!a||!b){
        alert("ENTER A PROPER RANGE!");
    }
    else{
    if(!c){
        alert("ENTER YOUR GUESS!");
    }
    else{
        if(c == ans){
            document.getElementById("key").classList.add("green-glow");
            msg.innerText = "YAYYYYY!! YOU GOT IT"+"\n"+"You took "+cnt+" chances!";
            setTimeout(()=> key.classList.remove("green-glow"),300);
            rest();
        }
        else{
            if(c > ans){
                if(c-ans<=2){
                    msg.innerText = "A little high!"+"\n"+"Almost there!";
                }
                else{
                    msg.innerText = "TOO HIGH!!";
                }
            }
            if(ans>c){
                if(ans-c<=2){
                    msg.innerText = "A little low!"+"\n"+"Almost there!"
                }
                else{
                    msg.innerText = "TOO LOW!!";
                }
            }
            cnt+=1;
        }
    }
}
}
})