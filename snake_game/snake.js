const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const blockSize = 20;
const canvasSize = 400;
const snakeSpeed = 200; // 뱀 이동 속도(밀리초)

let snake = [
  { x: 0, y: 0 }, // 초기 뱀 위치
];

let food = generateFood();

let direction = "right";
let directionBuffer = [];

let snakeLength = 5;
let gameover = false;

function draw() {
  context.clearRect(0, 0, canvasSize, canvasSize); // 화면 초기화

  if(gameover) {
    // 게임오버에 대한 처리
    context.fillstyle = '#f00';
    context.font = '30px Arial';
    context.fillText('Game Over', 100, canvasSize / 2);
    // 재시작여부 확인
    context.font = '20px Arial';
    context.fillText('Retry? (Press Y)', 110, canvasSize / 2 + 40);
    return;
  }
  drawSnake();
  drawFood();

  moveSnake();
  checkCollision(); //과제
  checkFood();
}

function checkCollision() {
  // 벽에 부딪히면 게임오버
  const head = snake[0];
  if ( 
      head.x < 0 || 
      head.x * blockSize > canvasSize - blockSize || 
      head.y < 0 || 
      head.y * blockSize > canvasSize - blockSize || 
      isSnakeCollision() 
  ) {
        console.log("게임오버");
        gameover = true;
    }

}

function isSnakeCollision() {
  if (gameover) {
    return;
  }
  const head = snake[0];
  // return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);

  let isCollision = false;
  snake.forEach((segment, index) => {
    if(index > 0 && segment.x === head.x && segment.y === head.y) {
      isCollision = true;
    }
  });
  return isCollision;
}

function checkFood() {
  const head = snake[0];
  if (head.x === food[0].x && head.y === food[0].y) {
    console.log("같음");
    food = generateFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  context.fillStyle = "#00F";

  snake.forEach((segment) => {
    context.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize); // x, y, width, height
  });
}

function drawFood() {
  console.log("Food");
  context.fillStyle = '#F00';
  context.fillRect(food[0].x * blockSize, food[0].y * blockSize, blockSize, blockSize);
  console.log(food);
}

function generateFood() {
  let foodPosition;

  do {
    foodPosition = [
      {
        x: Math.floor(Math.random() * (canvasSize / blockSize)),
        y: Math.floor(Math.random() * (canvasSize / blockSize)),
      },
    ];
  } while (isFoodOnSnake(foodPosition));

  return foodPosition;
}

function isFoodOnSnake(foodPosition) {
  let isOnSnake = false;

  snake.forEach((segment) => {
    if (segment.x === foodPosition.x && segment.y === foodPosition.y) {
      isOnSnake = true;
    }
  });
  return isOnSnake;

}

function moveSnake() {
  const head = { ...snake[0] };

  if (directionBuffer.length > 0) {
    direction = directionBuffer.shift();
  }
  switch (direction) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
  }

  // 벗어나지 않았다면 머리 추가
  snake.unshift(head); 

}

document.addEventListener("keydown", handleKeyPress);

let lastKeyPressTime = 0;

function resetGame () {
  snake = [{ x:0, y:0 }];
  direction = 'right';
  food = generateFood();
  gameover = false;
};


function handleKeyPress(event) {
  console.log(event.key);
  
  if (gameover) {
    //재시작 여부 결정
    if(event.key.toLowerCase() === 'y'){
      resetGame();
    }
    return;
  }
  const now = Date.now();
  const timeSinceLastKeyPress = now - lastKeyPressTime;
  console.log(timeSinceLastKeyPress);

  if(directionBuffer.length >= 2) {
    console.log('너무 많은 키 입력 대기중:', directionBuffer);
    return;
  }

  let previousKeyPress = direction;
  if (directionBuffer.length > 0) {
    previousKeyPress = directionBuffer[directionBuffer.length - 1];
  }

  switch (event.key) {
    //TODO: 키 입력시, 이번 입력과 다음 입력을 200ms(snakeSpeed) 안에 한번만 받게 한다.
    case "ArrowUp":
      if (direction !== 'down') {
        directionBuffer.push('up');
      }
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
   direction = event.key.toLowerCase().replace("arrow", "");
}

setInterval(draw, snakeSpeed);
