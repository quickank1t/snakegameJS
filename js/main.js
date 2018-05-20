const snakeSize=20,screenSize=600,screenWidth=600,screenHeight=600;
var $imgDraw, $blink=true,$gameOver=false;

var $gameMatrix , $food=[], $autopilot, $gameMatrix4Bot , $grid4shortestpath;
var $playerDirection, $playerSnake=[], $playerAlgorithm = 'Dijkstra';
var $computerSnake=[],$computerDirection;

function main(){
  document.getElementById('auto').hidden = false;
  document.getElementById('start').hidden = true;
  var canvas = document.getElementById("game-screen");
  $imgDraw = canvas.getContext("2d");
  $gameMatrix = initGame();
  $gameMatrix4Bot =makeMatrix();
  $grid4shortestpath = new PF.Grid(30, 30);

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

  loadSnake();
  renderSnake(1);
  renderSnake(2);
  startGame();
}

function loadSnake(){
  $gameMatrix[0][0]= 3;//food
  $gameMatrix4Bot[0][0]= 'Goal';//food
  $food.push([0,0]);
  $playerSnake.unshift([29,1,'down']);
  $playerSnake.unshift([29,2,'down']);
  $playerSnake.unshift([29,3,'down']);
  $computerSnake.push([0,3,'down']);
  $computerSnake.push([0,2,'down']);
  $computerSnake.push([0,1,'down']);
  $playerDirection = 'Down';
  $computerDirection='Down';
  $speed= 1100 -  document.getElementById("myRange").value * 100;
}

function startGame(){

  var temp = $gameMatrix4Bot;
  // playMove(2,$grid4shortestpath,$botAlgoritm);
  playBestMove(2,temp);
  moveSnake(2,$computerDirection);
  var temp = $gameMatrix4Bot;
  if ($autopilot) playMove(1,$grid4shortestpath,$playerAlgorithm);
  temp=[];
  moveSnake(1,$playerDirection);
  if(!$gameOver){
    setTimeout(startGame,$speed);
  }
  setTimeout(flash,$speed);
}

function changeSpeed(){
  $speed = 1100 - document.getElementById("myRange").value * 100;
  //alert($speed);
}

function playBestMove(player,grid){
  (player == 1 ) ?  snake = $playerSnake : snake = $computerSnake;

  grid[snake[0][0]][snake[0][1]] = "Start";
  var root = findShortestPath([snake[0][0],snake[0][1]],grid);
  grid=removeVisited(grid);
  grid[snake[0][0]][snake[0][1]] = "Obstacle";
  // console.log(root[0]);
  if (root[0] == null) root[0] = saveFunction([snake[0][0],snake[0][1]],player);
  switch(root[0]){
    case 'Right':
      (player == 1 ) ?  $playerDirection = 'Down' : $computerDirection= 'Down';
      break;
    case 'Left':
      (player == 1 ) ?  $playerDirection = 'Up' : $computerDirection= 'Up';
      break;
    case 'Top':
      (player == 1 ) ?  $playerDirection = 'Left' : $computerDirection= 'Left';
      break;
    case 'Down':
      (player == 1 ) ?  $playerDirection = 'Right' : $computerDirection= 'Right';
      break;
  }
}


function initGame(){
  var row=[];
  for(var i=0;i<30;i++){
    row[i] = new Array(30);
  }
  return row;
}

function makeMatrix(){
  var grid = initGame();
  for (var i = 0; i < 30; i++) {
    for (var j = 0; j < 30; j++) {
      grid[i][j] = 'Empty';
  }
}
return grid;
}

function makeMatrix2(){
  var grid = initGame();
  for (var i = 0; i < 30; i++) {
    for (var j = 0; j < 30; j++) {
      grid[i][j] = 0;
  }
}
return grid;
}
function removeVisited(grid){
  for (var i = 0; i < 30; i++) {
    for (var j = 0; j < 30; j++) {
      if (grid[i][j] == 'Visited') grid[i][j]='Empty';
  }
}
return grid;
}

function playMove(player,gridInstance,algorithm){
  (player == 1 ) ?  snake = $playerSnake : snake = $computerSnake;
  var gridBackup = $grid4shortestpath.clone();
  switch((player == 1 ) ? $playerAlgorithm : $botAlgoritm){
    case 'Astar':
      var finder = new PF.AStarFinder();
      break;
    case 'Dijkstra':
      var finder = new PF.DijkstraFinder();
      break;
    case 'BFS':
      var finder = new PF.BreadthFirstFinder();
      break;
    case 'BestFirstFinder':
      var finder = new PF.BestFirstFinder();
      break;

  }
  try{
    var predict = direction(finder.findPath(snake[0][0], snake[0][1], $food[0][0], $food[0][1], gridInstance));
    (player == 1 ) ?  $playerDirection = predict : $computerDirection= predict ;
  }
  catch(e){
    saveFunction([snake[0][0],snake[0][1]],player);
  }
  $grid4shortestpath = gridBackup;
}

function direction(path){
  if (path[0][0]== path[1][0] && (path[0][1]==path[1][1]+1 )) return 'Up';
  if (path[0][0]== path[1][0] && (path[0][1]==path[1][1]-1 )) return 'Down';
  if (path[0][0]== path[1][0]-1 && (path[0][1]==path[1][1] )) return 'Right';
  if (path[0][0]== path[1][0]+1 && (path[0][1]==path[1][1])) return 'Left';
}
