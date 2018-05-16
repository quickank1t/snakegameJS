
const snakeSize=20,screenSize=600,screenWidth=600,screenHeight=600;
var $imgDraw, $blink=true,$gameOver=false;

var $gameMatrix , $food=[], $autopilot;

var $playerHeadx,$playerHeady,$playerDirection, $playerSnake=[];

var $computerSnake=[],$computerDirection;
function initGame(){
  var row=[];
  for(var i=0;i<30;i++){
    row[i] = new Array(30);
  }
  return row;
}

function dummy(){
  $gameMatrix[29][8]= 3;//food
  $food.push([29,8]);

  $gameMatrix[1][1]= 1;
  $playerHeadx = 1;
  $playerHeady = 3;

  $playerSnake.unshift([29,1,'down']);
  $playerSnake.unshift([29,2,'down']);
  $playerSnake.unshift([29,3,'down']);


  $computerSnake.push([4,3,'down']);
  $computerSnake.push([4,2,'down']);
  $computerSnake.push([4,1,'down']);

  $gameMatrix[1][2]= 1;
  $gameMatrix[1][3]= 1;
  $playerDirection = 'Down';
  $computerDirection='Down';
  $speed=500;
}

function main(){
  var canvas = document.getElementById("game-screen");
  $imgDraw = canvas.getContext("2d");
  $gameMatrix = initGame();
  document.addEventListener("keydown",(event)=>{

    console.log(event);
    if(event.keyCode == "68" && $playerDirection != "Left"){
      $playerDirection = "Right";
    }
    if(event.keyCode == "65" && $playerDirection != "Right"){
      $playerDirection = "Left";
    }
    if(event.keyCode == "87" && $playerDirection != "Down"){
      $playerDirection = "Up";
    }
    if(event.keyCode == "83" && $playerDirection != "Up") {
      $playerDirection = "Down";
    }

    //the the arrow keys to control the snake
      if (event.keyCode == "39" && $playerDirection != "Left"){
        $playerDirection = "Right";
      }
      if (event.keyCode == "37" && $playerDirection != "Right"){
        $playerDirection = "Left";
      }
      if (event.keyCode == "38" && $playerDirection != "Down"){
        $playerDirection = "Up";
      }
      if (event.keyCode == "40" && $playerDirection != "Up"){
        $playerDirection = "Down";
      }


  });

  dummy();
  renderSnake(1);
  renderSnake(2);

}
main();
startGame();
function startGame(){
  // moveSnake(2,$computerDirection);
  moveSnake(1,$playerDirection);
  if(!$gameOver){
    setTimeout(startGame,$speed);
  }
  setTimeout(flash,$speed);
}

function changeSpeed(){
  $speed = 1100 - document.getElementById("myRange").value;
}
