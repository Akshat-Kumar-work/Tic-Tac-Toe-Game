const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGame = document.querySelector(".btn");

let currentPlayer ;
let gameGrid;//game grid cells 

const winningPosition = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

 //function to initialize or start the game
 function initGame (){
    //starting player is x
    currentPlayer = "X";
    //game grid all values are empty at starting 
    gameGrid = ["","","","","","","","",""];
    //ui m bhi sare box ki  values empty krdo
    boxes.forEach((box,index) => {
        box.innerText=" ";
        //aur box p click karne par event add hojae usko bhi add krdo
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    //also remove the new game btn when game is started 
    newGame.classList.remove("active");

    //gameinfo tab k andar current player ki value daldo
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
 }

 //calling the initGame to start the game
 initGame();

 //to change turn of x and 0 
 function swapTurn(){
    //agar currentplayer ki value x hai toh current player ki value 0 krdo
    if(currentPlayer === "X"){
        currentPlayer="O";
    }
    //agar current player ki value 0 hai toh x krdo
    else{
        currentPlayer= "X";
    }
    //uppar jo game ki info vala tab hai usko bhi update krdo
    gameinfo.innerText= `Current Player - ${currentPlayer}`;
 }

//function to check who won and when to game over
function checkGameOver (){
//hum store krngy jeeta kon
let answer = "";

//iterate over winning position to check , kya winnings positons par same value hai agr hai toh winner voi hai
    winningPosition.forEach((position) => { //winning position k har ek element par jakar dkho kya same element hai ya nai
    
    //gamegrid k andar sare boxes non empty hone chaie aur equal hone chaie
    if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
 && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {

     

        //check karo agar winner x hai
        if(gameGrid[position[0]] === "X"){
            answer= "X";
        }
        //agar x nahi toh winner 0 hoga
        else{
            answer = "O";
        }

            //disable pointer events for each boxes
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
        
        //ab hume pta hai winner kon hai toh green mark krdo unn winning position par
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

        }
        
    });

    //agar answer non empty hai toh new game vale btn ko show krdo aur game info m winner dikha do
    if(answer !== ""){
        gameinfo.innerText = `Player ${answer} Won`;
        newGame.classList.add("active");
        console.log("chlra hai")
        return;
    }

    //hume pta hai koi winner nahi mila check karo kya game grid puri trh fill hai 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //agar game grid puri trh fill hai toh game tie ho gya hai
    if(fillCount === 9) {
        gameinfo.innerText = "Game Tied !";
        newGame.classList.add("active");
        
    }


    
}

function handleClick(index){
    //agar gamegrid vala box empty hai toh 
    if(gameGrid[index] === ""){
        //user interface m change dikhado value daal kar
        boxes[index].innerText = currentPlayer;
        //jo humne grid bna rkha hai value store krane k lie usne andar currentplayer daldo jo ya toh x hoga ya o
        gameGrid[index]=currentPlayer;
        //ek bar value dalne k baad koi change nai ho paye eslie events ko none kar rhe hai
        boxes[index].style.pointerEvents = "none";
        //swap krdo player ki turn ko
        swapTurn();
        //check karo koi player jeeta toh nahi
        checkGameOver();
        
    }
}


//for each loop is used to execute the code for each and every element 
 boxes.forEach((box,index)=>{
    //event listener add kara hai , kisi bhi box par click karne par handleClick vala function call krdo har ek box k lie
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
 })

 newGame.addEventListener("click",initGame);