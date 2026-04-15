let user_score = 0;
let comp_score = 0;

let msg = document.querySelector("#msg");
let user_scorePara = document.querySelector("#user-score");
let comp_scorePara = document.querySelector("#comp-score");
let choices = document.querySelectorAll(".choice");
let resetBtn = document.querySelector("#reset");

// 🔊 Sound effects
let winSound = new Audio("./sounds/win.mp3");
let loseSound = new Audio("./sounds/lose.mp3");
let clickSound = new Audio("./sounds/click.mp3");
let drawSound = new Audio("./sounds/draw.mp3");
let resetGame = new Audio("./sounds/resetgame.mp3");

const genCompChoice = () => {
    const options = ["Rock", "Paper", "Scissors"];
    const random_index = Math.floor(Math.random() * 3);
    return options[random_index];
};

const drawGame = () => {
    msg.innerText = "Game was a Draw 🤝";
    msg.style.backgroundColor = "seagreen";
    drawSound.play()
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        user_score++;
        user_scorePara.innerText = user_score;
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        winSound.play()
    } else {
        comp_score++;
        comp_scorePara.innerText = comp_score;
        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
        loseSound.play()
    }
};

const playGame = (userChoice) => {
    clickSound.play();

    msg.innerText = "🤖 Computer is thinking...";
    msg.style.backgroundColor = "gray";

    setTimeout(() => {
        const compChoice = genCompChoice();

        if (userChoice === compChoice) {
            drawGame();
        } else {
            const winMap = {
                Rock: "Scissors",
                Paper: "Rock",
                Scissors: "Paper"
            };

            let userWin = winMap[userChoice] === compChoice;
            showWinner(userWin, userChoice, compChoice);
        }
    }, 1000); // 1 sec delay
};

// Click events
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// 🔄 Reset button
resetBtn.addEventListener("click", () => {
    user_score = 0;
    comp_score = 0;
    user_scorePara.innerText = 0;
    comp_scorePara.innerText = 0;
    msg.innerText = "Game Reset! Play Again 🎮";
    msg.style.backgroundColor = "gray";
    resetGame.play()
});