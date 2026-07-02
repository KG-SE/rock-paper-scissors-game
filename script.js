let user_score = 0;
let comp_score = 0;

let user_score_para = document.getElementById("user-score");
let comp_score_para = document.getElementById("comp-score");

let msg = document.getElementById("msg");

let reset_btn = document.getElementById("reset");
let start_btn = document.getElementById("start");
let close_btn = document.getElementById("close");

let start_game = false;

let choices = document.querySelectorAll(".choice");

let start = new Audio("./sounds/start.mp3");
let click = new Audio("./sounds/click.mp3");
let win = new Audio("./sounds/win.mp3");
let draw_sound = new Audio("./sounds/draw.mp3");
let lose = new Audio("./sounds/lose.mp3");
let reset_sound = new Audio("./sounds/resetgame.mp3");
let close_sound = new Audio("./sounds/close.mp3");

start_btn.addEventListener("click",()=>{
    start_game = true
    msg.innerText = "Game Started, Play Your Move"
    msg.style.backgroundColor = "aquamarine"
    msg.style.color = "black"
    start.play()
    play()
});

genCompChoice=()=>{
    
    const options = ["Paper","Rock","Scissors"]
    const random_index = Math.floor(Math.random() * 3)
    return options[random_index]
};

draw=()=>{
    msg.innerText = "Game Draw!🤝"
    msg.style.backgroundColor = "seagreen"
    draw_sound.play()
};

showWinner=(user_win,user_choice,comp_choice)=>{
    if (user_win){
        user_score ++
        user_score_para.innerText = user_score
        msg.innerText = `You Wins👍, ${user_choice} beats ${comp_choice}!`
        msg.style.backgroundColor = "green"
        win.play()
    }
    else{
        comp_score ++
        comp_score_para.innerText = comp_score
        msg.innerText = `You Lose👎, ${comp_choice} beats ${user_choice}!`
        msg.style.backgroundColor = "red"
        lose.play()
    }
};

gamePlay=(user_choice)=>{
    if (!start_game) return
    click.play()
    msg.innerText = "Computer is thinking...."
    msg.style.backgroundColor = "silver"
    setTimeout(()=>{
        const comp_choice = genCompChoice()
        if (user_choice === comp_choice){
            draw()
        }
        else{
            const winMap={
                Rock: "Scissors",
                Paper: "Rock",
                Scissors: "Paper"
            }
            const user_win = winMap[user_choice] === comp_choice
            showWinner(user_win,user_choice,comp_choice)
        }
    },1000)
};

play=()=>{
    if (start_game) 
    choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
    const user_choice = choice.getAttribute("id")
    
    gamePlay(user_choice)
    })
})
};

close_btn.addEventListener("click",()=>{
    if (!start_game) return
    start_game = false
    msg.innerText = "Game Closed, Click Start to Play!"
    msg.style.backgroundColor = "black"
    msg.style.color = "white"
    user_score = 0
    comp_score = 0
    user_score_para.innerText = "0"
    comp_score_para.innerText = "0"
    close_sound.play()
});

reset_btn.addEventListener("click",()=>{
    if (!start_game) return 
    user_score = 0
    comp_score = 0
    user_score_para.innerText = "0"
    comp_score_para.innerText = "0"
    msg.innerText = "Game Reset, Play Again!"
    msg.style.backgroundColor = "gray"
    reset_sound.play()
});

