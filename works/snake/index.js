const map = document.querySelector("#map")
const ctx = map.getContext("2d");
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#reset");
const speedBtn = document.querySelector("#speed");
const {
    gameBackground,
    snakeColor,
    snakeHeadColor,
    snakeBorder,
    foodColor,
    gameWidth,
    gameHeight,
    unitSize,
    foodPos
} = {
    gameBackground: "white",
    snakeColor: "lightgreen",
    snakeHeadColor: "green",
    snakeBorder: "black",
    foodColor: "red",
    gameWidth: map.width,
    gameHeight: map.height,
    unitSize: 25,
    foodPos: {
        x: null,
        y: null,
    }
};
let [xVot, yVot] = [unitSize, 0];
let score = 0;
let running = false;
let snake = [
    {
        x: unitSize * 4,
        y: 0,
    },
    {
        x: unitSize * 3,
        y: 0,
    },
    {
        x: unitSize * 2,
        y: 0,
    },
    {
        x: unitSize,
        y: 0,
    },
    {
        x: 0,
        y: 0,
    },
];
let gameSpeeds = [
    {
        text: "慢",
        speed: 150,
    },
    {
        text: "中",
        speed: 100,
    },
    {
        text: "快",
        speed: 50,
    },
]
let speedIndex = 0
function clearContent() {
    ctx.fillStyle = gameBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
    function randomFood(min, max) {
        const randNum =
            Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodPos.x = randomFood(0, gameWidth - unitSize);
    foodPos.y = randomFood(0, gameHeight - unitSize);
    snake.forEach((snakePart) => {
        if (snakePart.x == foodPos.x && snakePart.y == foodPos.y) {
            createFood()
        }
    })
}
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.beginPath();
    ctx.arc(foodPos.x + unitSize / 2, foodPos.y + unitSize / 2, unitSize / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}
function moveSnake() {
    const head = {
        x: snake[0].x + xVot,
        y: snake[0].y + yVot,
    };
    snake.unshift(head);
    if (snake[0].x === foodPos.x && snake[0].y === foodPos.y) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakePart, i) => {
        if (i == 0) {
            ctx.fillStyle = snakeHeadColor
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.fillStyle = snakeColor
        } else {

            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
        }
    });
}
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = yVot == -unitSize;
    const goingDown = yVot == unitSize;
    const goingRight = xVot == unitSize;
    const goingLeft = xVot == -unitSize;

    switch (true) {
        case keyPressed == LEFT && !goingRight:
            xVot = -unitSize;
            yVot = 0;
            break;
        case keyPressed == UP && !goingDown:
            xVot = 0;
            yVot = -unitSize;
            break;
        case keyPressed == RIGHT && !goingLeft:
            xVot = unitSize;
            yVot = 0;
            break;
        case keyPressed == DOWN && !goingUp:
            xVot = 0;
            yVot = unitSize;
            break;
    }
}
function checkGameOver() {
    switch (true) {
        case snake[0].x < 0:
            running = false;
            break;
        case snake[0].x >= gameWidth:
            running = false;
            break;
        case snake[0].y < 0:
            running = false;
            break;
        case snake[0].y >= gameHeight:
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearContent();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, gameSpeeds[speedIndex].speed);
    } else {
        displayGameOver();
    }
}
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    ctx.fillText(`result:${scoreText.textContent}`, gameWidth / 2, gameHeight / 2 + 75);
    running = false;
}
function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    drawSnake();
    nextTick();
}
function resetGame() {
    score = 0;
    xVot = unitSize;
    yVot = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 },
    ];
    gameStart();
}
function changeSpeedGame() {
    if (speedIndex < gameSpeeds.length - 1) {
        speedIndex++
    } else {
        speedIndex = 0
    }
    speedBtn.textContent = gameSpeeds[speedIndex].text
}
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
speedBtn.addEventListener("click", changeSpeedGame);
gameStart();