let userScore = 0;
let compScore = 0;
let msg = document.querySelector("#msg");
let userScorePara = document.querySelector("#user-score");
let compScorePara = document.querySelector("#comp-score");

let winSound = document.querySelector("#winGame");
let loseSound = document.querySelector("#loseGame");
let drawSound = document.querySelector("#drawGame");

const computerImg = document.querySelector("#computer-img");

// to acess all the choices
const choices = document.querySelectorAll(".choice");

const genCompChoice = () => {
    //choice for rock, paper ,scissor
    let options = ["rock", "paper", "scissors"];
    //for random choice by index
    const randidx = Math.floor(Math.random() * 3);
    return options[randidx];
}

const drawGame = () => {
    console.log("Game was DRAW");
    drawSound.play();
    msg.innerText = "Game DRAW. Play again";
    msg.style.backgroundColor = "red";
}


const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        // console.log("You win!");
        winSound.play();
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win!! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "blue";
    }else{
        // console.log("You lose!!");
        loseSound.play();
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose!! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "orange";
    }
    

}

//user choice function
const playGame = (userChoice) => {
    console.log("user choice = ",userChoice);
    //now generating comp choice
    const compChoice = genCompChoice();
    console.log("computer choice = ",compChoice);
    if(compChoice === "rock"){
        computerImg.src = "./images/rock.png";
    }
    if(compChoice === "paper"){
        computerImg.src = "./images/paper.png";
    }
    if(compChoice === "scissors"){
        computerImg.src = "./images/scissors.png";
    }

    if(userChoice === compChoice){
        //draw game
        drawGame();
        
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            userWin = compChoice === "scissors" ? false : true;
        }
        else{
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
};

const showAllChoices = () => {
    choices.forEach((choice) => {
        choice.style.display = "block";
    });
};



//for each 3 choices add eventlistener
choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        choices.forEach((item) => {
            if(item !== choice){
                item.style.display = "none";
            }
        })
        // console.log("button clicked ",userChoice);
        playGame(userChoice);
        setTimeout(() => {
            showAllChoices();
        }, 2000);

    })
});