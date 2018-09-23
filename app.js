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
var restart = document.querySelector("#restart");
var p1Score = document.querySelector(".p1 span");
var p2Score = document.querySelector(".p2 span");
var p1Block = document.querySelector(".p1");
var p2Block = document.querySelector(".p2");
var p1Name = document.querySelector(".p1 h3");
var p2Name = document.querySelector(".p2 h3");
var char1 = document.querySelector("#char1")
var char2 = document.querySelector("#char2")
var char3 = document.querySelector("#char3")
var char4 = document.querySelector("#char4")
var char1Name = document.querySelector("#char1 span")
var char2Name = document.querySelector("#char2 span")
var char3Name = document.querySelector("#char3 span")
var char4Name = document.querySelector("#char4 span")
var overlay = document.querySelector("#overlay")
var playButton = document.querySelector(".title button");

// selecting charactors
char1.addEventListener('click', function(){
  document.querySelector(".p1 h3").textContent = char1Name.textContent ;
  document.querySelector('#player1Pic').src ="images/naruto1.png";
  document.querySelector('#p1_jutsu').src = roundCount % 2 === 0 ? "sounds/Kage_Bunshin.mp3" : "sounds/rasengen.mp3";
  document.querySelector('#kage_bunshin').play();

});
char2.addEventListener('click', function(){
  document.querySelector(".p1 h3").textContent = char2Name.textContent ;
  document.querySelector('#player1Pic').src ="images/sakura1.png";
  document.querySelector('#p1_jutsu').src = "sounds/Rokujuuyon_Shou.mp3";
  document.querySelector('#p1_jutsu').play();

});
char3.addEventListener('click', function(){
  document.querySelector(".p2 h3").textContent = char3Name.textContent ;
  document.querySelector('#player2Pic').src ="images/sasuke.png";
  document.querySelector('#p2_jutsu').src = "sounds/chidori.mp3"
  document.querySelector('#sharingan').play();
});
char4.addEventListener('click', function(){
  document.querySelector(".p2 h3").textContent = char4Name.textContent ;
  document.querySelector('#player2Pic').src ="images/Kakashi.png";
  document.querySelector('#p2_jutsu').src = "sounds/Sasuke_Jutsu.mp3";
  document.querySelector('#p2_jutsu').play();
});

//Game variables initialisation
var p1ScoreCount = 0; 
var p2ScoreCount = 0;
var roundCount = 1;
var grids = [grid0, grid1, grid2, grid3, grid4, grid5, grid6, grid7, grid8];
var result = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
var turnCounter = 0;
var playerName;
var hasWinner = false;
var timeOut;
//Randomise starting player
var player = Math.round(Math.random())+1;
if (player === 1) {
  p1Block.style.backgroundColor = "yellow";
} else {
  p2Block.style.backgroundColor = "yellow";  
}

// action functions
var playSound = function() {
  document.querySelector('#audio').play();
}

var playTheme = function () {
  document.querySelector('#theme').play();
}

var removeOverlay = function() {
  overlay.classList.add('slide');
}

var putOverlay = function() {
  overlay.classList.remove('slide');
}

var swapPlayer = function () {
  if (player === 1) {
    turnCounter++;
    player = 2;
    p2Block.style.backgroundColor = "yellow";
    p1Block.style.backgroundColor = "white";
    playerName = p2Name.textContent;

  } else {
    turnCounter++;
    player = 1;
    p1Block.style.backgroundColor = "yellow";
    p2Block.style.backgroundColor = "white"; 
    playerName = p1Name.textContent;  
  }
    message.textContent = playerName + '\' turn... counting down 3 seconds.'; 
    timeOut = setTimeout(timeoutWinner, 3000); 
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
    // console.log(symbol + ' is the winner, this is the end of the game, thank you for playing.');
    var winnerName;
    if (symbol === 'X') {
      winnerName = p1Name.textContent;
      hasWinner = true;
      clearTimeout(timeOut);
      document.querySelector("#player1Pic").classList.add("bounce");
      document.querySelector('#p1_jutsu').play();
      $('#resultModal').modal({backdrop: "static"});
    } else {
      winnerName = p2Name.textContent;
      hasWinner = true;
      clearTimeout(timeOut);
      document.querySelector("#player2Pic").classList.add("bounce");
      document.querySelector('#p2_jutsu').play();
      $('#resultModal').modal({ backdrop: "static" });
    }
    message.textContent = 'Round ' + roundCount + ' winner: ' + winnerName + '.';   

   } else if (turnCounter === 9) {
   // console.log('Round Draw! Good job for both sides.');
    document.querySelector("#draw_jutsu").play();
    message.textContent = 'Game Draw!'
    clearTimeout(timeOut);
    $('#resultModal').modal({ backdrop: "static" });
   // } else {
   //  console.log('no winner yet, continue play.');
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
    clearTimeout(timeOut);
    swapPlayer();
    logResults(gridObj, symbol);
}
//this function to log result in an array
var logResults = function (gridObj, symbol){
  for (var i = 0; i < grids.length; i++) {
    if (grids[i] == gridObj) {
      result[i] = symbol;  
    }    
  } 
  //console.log(result);
    if (hasWinner === false) {
    determineWinner(result, symbol);
  }
    if (symbol === 'X' && hasWinner === true) {
      p1ScoreCount++;
      p1Score.textContent = p1ScoreCount;
    } else if (symbol === 'O' && hasWinner === true) {
      p2ScoreCount++;
      p2Score.textContent = p2ScoreCount;
    } 
    return symbol
  }

var timeoutWinner = function () {
  var winnerName;
  if (player === 2) {
    winnerName = p1Name.textContent;   
    p1ScoreCount++;
    p1Score.textContent = p1ScoreCount;
    hasWinner = true;
    document.querySelector("#player1Pic").classList.add("bounce");
  } else {
    winnerName = p2Name.textContent;
    p2ScoreCount++;
    p2Score.textContent = p2ScoreCount;
    hasWinner = true;
    document.querySelector("#player2Pic").classList.add("bounce");
  }
    message.textContent = 'Time out... ' + 'Round ' + roundCount + ' winner: ' + winnerName;       
  }


var clearAll = function(){
  for (var i = 0; i < grids.length; i++) {
    grids[i].classList.remove("X");
    grids[i].classList.remove("O");
  }
    result = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    turnCounter = 0;
    hasWinner = false;
    roundCount++;
    document.querySelector("#player1Pic").classList.remove("bounce");
    document.querySelector("#player2Pic").classList.remove("bounce");
    message.textContent = 'Round: ' + roundCount + '...  Starting with ' + playerName
    // This is to change to background color for the players.
    if (player === 1) {
    p1Block.style.backgroundColor = "yellow";
    p2Block.style.backgroundColor = "white";

  } else {
    p2Block.style.backgroundColor = "yellow";
    p1Block.style.backgroundColor = "white";  
  }  
}
// Display token on the board
for (var i = 0; i < grids.length; i++) {
  grids[i].addEventListener('click', function(){
  if (!hasWinner && this.classList.length === 1) {display(this, player);}
 });
}

// Play sound 
for (var i = 0; i < grids.length; i++) {
  grids[i].addEventListener('click', playSound);
}

//Start a new round
restart.addEventListener('click', function(){
  if (turnCounter !== 0) {clearAll()}
});

//Start a new game
document.querySelector("#startNew").addEventListener('click', function(){
  if (turnCounter !== 0) {
  clearAll();
  clearTimeout(timeOut);
  p1ScoreCount = 0; 
  p2ScoreCount = 0;
  p1Score.textContent = p1ScoreCount;
  p2Score.textContent = p2ScoreCount;
  roundCount = 1;
  putOverlay();
  message.textContent = 'Round: ' + roundCount + '...  Starting with ' + playerName
}
});

// Play button.
playButton.addEventListener('click', removeOverlay);


