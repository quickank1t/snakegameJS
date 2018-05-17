function renderSnake(player){
  var count = 1;
  (player == 1 ) ?  snake = $playerSnake : snake = $computerSnake;
  snake.forEach((value)=>{
    (player === 1)? $imgDraw.fillStyle="#000000" : $imgDraw.fillStyle="#FF0000";
    $imgDraw.fillRect(value[0] * snakeSize-1 , value[1]* snakeSize-1, snakeSize-1,snakeSize-1);
  });
}

function renderFood(){
  $imgDraw.fillRect($food[0][0] * snakeSize-1 , $food[0][1] * snakeSize-1 , snakeSize-1,snakeSize-1);
}
function renderRemoveTail(value){
  $imgDraw.fillStyle="#FFFFFF";
  $imgDraw.fillRect(value[0] * snakeSize-1 , value[1]* snakeSize-1 , snakeSize-1,snakeSize-1);
}
function renderAddHead(value,player){
  (player === 1)? $imgDraw.fillStyle="#000000" : $imgDraw.fillStyle="#FF0000";
  $imgDraw.fillRect(value[0] * snakeSize-1 , value[1]* snakeSize-1, snakeSize-1,snakeSize-1);
}

function flash(){
  var xcord=$food[0][0] * snakeSize-1;
  var ycord=$food[0][1] * snakeSize-1;
  var distance =Math.floor(snakeSize/2);
  if($blink === true){

    $imgDraw.fillStyle="#000000";
    $imgDraw.fillRect( xcord , ycord , Math.floor(snakeSize/2),Math.floor(snakeSize/2));
    $imgDraw.fillRect( xcord +distance-1, ycord+distance-1, distance,distance);
    $imgDraw.fillStyle="#FF0000";
    $imgDraw.fillRect( xcord , ycord+distance-1, distance,distance);
    $imgDraw.fillRect( xcord+distance-1 , ycord, distance,distance);

    $blink = false;
  }else{
    $imgDraw.fillStyle="#FF0000";
    $imgDraw.fillRect($food[0][0] * snakeSize-1 , $food[0][1] * snakeSize-1 , Math.floor(snakeSize/2),Math.floor(snakeSize/2));
    $imgDraw.fillRect( xcord +distance-1, ycord+distance-1 , distance,distance);
    $imgDraw.fillStyle="#000000";
    $imgDraw.fillRect( xcord , ycord+distance-1, distance,distance);
    $imgDraw.fillRect( xcord+distance-1 , ycord, distance,distance);
    $blink = true;
  }
}
function bust(player){
  var color = (player == 1 ) ?  'red' : 'black';
  document.getElementById('noti').hidden = false;
  document.getElementById(color).hidden = false;
  document.getElementById('control').hidden = true;
  document.getElementById('auto').hidden = true;
}
