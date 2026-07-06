let boxes = document.querySelectorAll(".box");//it contains all boxes
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg =  document.querySelector("#msg");

let turnO = true; //playerO
let count = 0; //to count for draw match
//all matches
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//function to reset game
const resetGame = () => {
    turnO = true;
    count = 0;
    winnerFound = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    
}

//to specify each boxes to reduce ambiguity
boxes.forEach((box) => {
    
    box.addEventListener("click", () => {
        console.log("Box was clicked!!");
        count++;
        console.log("Total count is: ",count);
        
        if(turnO){
            
            
            box.innerText = 'O';
            box.classList.add("class-O");
            box.classList.remove("class-X");
            turnO = false;
        }else{
            
            box.innerText = 'X';
            box.classList.add("class-X");
            box.classList.remove("class-O");
            turnO = true;
        }
        box.disabled = true;//so that each btn work only once
        console.log("Total count is: ",count);//

        //added this by myself
        checkPattern();
        // if(count >= 1 && count <= 9){

        // }else{
        //     DrawGame();
        // }
        
    })
});

//function to disable when get first win
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

//function to disable when get first win
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

//function to show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations!!, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

}

const DrawGame = () => {
    msg.innerText = `Game 'DRAW'`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

let winnerFound = false;

//function to check winning state
const checkPattern = () => {
    for( let pattern of winPatterns){
        //to print pattern array
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,
        //             boxes[pattern[1]].innerText,
        //             boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner ",pos1Val);
                winnerFound = true;
                showWinner(pos1Val);
                
            }
        }
    }
    if(count === 9 && !winnerFound){
        DrawGame();
    }
}

//new game button, reste button
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);