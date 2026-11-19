let player; let gameOver = false;
let bot;
let lines = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,5,9],
        [3,5,7],
        [1,4,7],
        [2,5,8],
        [3,6,9]
    ];

function start(choice) {
    player = choice;
    document.getElementById("choice").style.display = "none";
    document.getElementById("board").style.display = "grid";
    if(player === "X"){
        bot = "O";
    }
    else{
        bot = "X";
        botMove();
    }
}

function play(id)
{
    if(gameOver) return;
    let square = document.getElementById("b" + id);
    
    if(square.textContent !== ""){
        return;
    }

    square.textContent = player;
    square.className = player.toLowerCase();
    if (checkWin(player)) {
        showResult("win");
        return;
    }
    botMove();
    if(checkWin(bot)){
        showResult("lose");
        return;
    }
    if (getEmpty().length === 0) {
        showResult("tie");
        return;
    }
}


function getEmpty(){
    let empty = [];
    for(let i = 1; i <= 9;i++){
        let square = document.getElementById("b" + i);
        if(square.textContent === "")
        {
            empty.push(i);
        }
    }
    return empty;
}

function botMove(){
    let empty = getEmpty();
    if(empty.length === 0) return;
    let random = Math.floor(Math.random() * empty.length);
    let id = empty[random];
    let square = document.getElementById("b" + id);
    square.textContent = bot;
    square.className = bot.toLowerCase();
}

function checkWin(mark)
{
    for(let i=0;i< lines.length; i++){
        let p = lines[i][0];
        let q = lines[i][1];
        let r = lines[i][2];
        let sq1 = document.getElementById("b" + p);
        let sq2 = document.getElementById("b" + q);
        let sq3 = document.getElementById("b" + r);

        if(sq1.textContent === mark && sq2.textContent === mark && sq3.textContent === mark){
            return true;
        }
    }
    return false;
}

function showResult(which){
    document.getElementById("result").style.display = "flex";
    document.getElementById(which).style.display = "block";
    gameOver = true;
}

function Restart(){
    gameOver = false;
    document.getElementById("choice").style.display = "flex";
    document.getElementById("board").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("tie").style.display = "none";
    for(let i=1;i<=9;i++){
        let square = document.getElementById("b" + i);
        square.textContent = "";
        square.className = "";
    }
}