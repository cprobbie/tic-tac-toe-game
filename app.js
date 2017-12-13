var grid0 = document.querySelector("#g0");
var grid1 = document.querySelector("#g1");
var grid2 = document.querySelector("#g2");
var grid3 = document.querySelector("#g3");
var grid4 = document.querySelector("#g4");
var grid5 = document.querySelector("#g5");
var grid6 = document.querySelector("#g6");
var grid7 = document.querySelector("#g7");
var grid8 = document.querySelector("#g8");
var message = document.querySelector(".message");
var restart = document.querySelector("button");
var p1Score = document.querySelector(".p1 span");
var p2Score = document.querySelector(".p2 span");


var p1ScoreCount = 0; 
var p2ScoreCount = 0;
var grids = [grid0, grid1, grid2, grid3, grid4, grid5, grid6, grid7, grid8];
var result = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
var turnCounter = 0;
var player = 1;
var hasWinner = false;

var swapPlayer = function () {
  if (turnCounter % 2 === 1) {
    turnCounter++;
    return player = 1;
  } else {
    turnCounter++;
    return player = 2;
  }   
}
var areEqual = function (a, b, c) {
  if (a === b && b === c) {
    return true;
  } else {
    return false;
  }
}

var determineWinner = function(result, symbol) {
  // // case1: same in a row; case2: same in a column; case3: same in diagnal
  if (areEqual(result[0], result[1], result[2]) || areEqual(result[3], result[4], result[5])
    || areEqual(result[6], result[7], result[8]) || areEqual(result[0], result[3], result[6])
    || areEqual(result[1], result[4], result[7]) || areEqual(result[2], result[5], result[8])
    || areEqual(result[0], result[4], result[8]) || areEqual(result[2], result[4], result[6])) {
    console.log(symbol + ' is the winner, this is the end of the game, thank you for playing.');
    message.textContent = 'Winner: ' + symbol + ' -------- This is the end of the game, thank you for playing.'
    return hasWinner = true;
   } else if (turnCounter === 9) {
    console.log('Game Draw! This is the end of the game, thank you for playing.');
    message.textContent = 'Game Draw, this is the end of the game, thank you for playing.'
   } else {
    console.log('no winner yet, continue play.');
    message.textContent = 'no winner yet, continue play.'
   }
  }
// to display the token on the corresponding blocks
var display = function (gridObj, playerNum) {
  if (playerNum === 1) {
    gridObj.classList.add("X");
    var symbol = 'X';
  } else {    
    gridObj.classList.add("O");
    var symbol = 'O';
  } 
    swapPlayer();
    logResults(gridObj, symbol);
}
//this function to log result in an array
 var logResults = function (gridObj, symbol){
  for (var i = 0; i < grids.length; i++) {
    if (grids[i] == gridObj) {
      result[i] = symbol;  
    }    
  } console.log(result);
    if (turnCounter > 4 && hasWinner === false) {
    determineWinner(result, symbol);
  }
    if (symbol === 'X' && hasWinner === true) {
      p1ScoreCount++;
      p1Score.textContent = p1ScoreCount;
    } else if (symbol === 'O' && hasWinner === true) {
      p2ScoreCount++;
      p2Score.textContent = p2ScoreCount;
    }
}
var clearAll = function(){
  for (var i = 0; i < grids.length; i++) {
    grids[i].classList.remove("X");
    grids[i].classList.remove("O");
    result = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    turnCounter = 0;
    player = 1;
    hasWinner = false;
    message.textContent = 'Welcome to the Game again. Enjoy!'
  }
}
///////////////////////
for (var i = 0; i < grids.length; i++) {
  grids[i].addEventListener('click', function(){
  if (!hasWinner && this.classList.length === 1) {display(this, player);}
 });
}
restart.addEventListener('click', clearAll);


