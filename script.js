const boxes =document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initalise the game

function initGame(){
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];

    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box,index)=>{
        box.innerText ="";
        boxes[index].style.pointerEvents ="all";
        //remove green color by initalizing cdd property again
        box.classList =`box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer ="O";
    }
    else{
        currentPlayer="X";
    }
    //UI Update
    gameInfo.innerText =`Current Player -${currentPlayer}`;
}
function checkGameOver(){
    let answer ="";

    winningPosition.forEach((position)=>
    {//all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") 
        && (gameGrid[position[0]]===gameGrid[position[1]])
        &&(gameGrid[position[1]]===gameGrid[position[2]]))
{
    if(gameGrid[position[0]]==="X")
    answer="X";
    else
        answer ="O";

        //disable pointer events
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })
        
//win is class in css to change the color to green
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
}
    });

    //we have winner if
    if(answer!=""){
        gameInfo.innerText=`Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;       
    }
    //check if it was a tie match
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
        fillCount++;
    });

    //boad is Filled ,game is TIE
    if(fillCount ===9){
        gameInfo.innerText ="game Tie!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText =currentPlayer;
        gameGrid[index]=currentPlayer;
        //swap the turn
        swapTurn();
        //check if any one won or not
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
