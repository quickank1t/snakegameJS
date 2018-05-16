// controlling the global object $plazersnake or $computerSnake
function moveSnake(player,direction){
  var snake;
  (player == 1 ) ?  snake = $playerSnake : snake = $computerSnake;
  var nextMove = [];
  switch(direction){
    case 'Down':
      nextMove[0] = snake[0][0];
      nextMove[1] = snake[0][1]+1;
      nextMove[2] = direction;
      break;
    case 'Up':
      nextMove[0] = snake[0][0];
      nextMove[1] = snake[0][1]-1;
      nextMove[2] = direction;
      break;
    case 'Left':
      nextMove[0] = snake[0][0]-1;
      nextMove[1] = snake[0][1];
      nextMove[2] = direction;
      break;
    case 'Right':
      nextMove[0] = snake[0][0]+1;
      nextMove[1] = snake[0][1];
      nextMove[2] = direction;
      break;
  }
  if(isValid(nextMove)){
    snake.unshift(nextMove);
    renderAddHead(nextMove,player);
    var tail = snake.pop();
    renderRemoveTail(tail);
    sync(player,nextMove,tail,true);
  }else if(levelUp(nextMove)){
    snake.unshift(nextMove);
    renderAddHead(nextMove,player);
    genrateFood();
    sync(player,nextMove,null,false);
  }else{
    alert('burst');
    $gameOver=true;
  }
  (player == 1 ) ?   $playerSnake =  snake :  $computerSnake = snake ;
}
function isValid(nextMove){
  try{
    return(($gameMatrix[nextMove[0]][nextMove[1]] === 0 || $gameMatrix[nextMove[0]][nextMove[1]] == null) ? true : false);
  }catch(e){
    return false;
  }
}
function levelUp(nextMove){
  try{
    return(($gameMatrix[nextMove[0]][nextMove[1]] === 3 ) ? true : false);
  }catch(e){
    return false;
  }
}
function genrateFood(){
  $food.pop();
  while(true){
    var randomX = Math.floor(Math.random() * screenWidth / snakeSize);
    var randomY = Math.floor(Math.random() * screenHeight / snakeSize);
    if ($gameMatrix[randomX][randomY] === 0 || $gameMatrix[randomX][randomY] == null){
      $gameMatrix[randomX][randomY] =  3;
      $food.push([Math.floor(randomX) ,  Math.floor(randomY )]);
      break;
    }
  }
}
function sync(player,nextMove,tail,isWithTail){
  console.log(tail);
  $gameMatrix[nextMove[0]][nextMove[1]] = player;
  if (isWithTail) $gameMatrix[tail[0]][tail[1]]=0;
}
