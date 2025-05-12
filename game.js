let timerDisplay = document.getElementById("timerDisplay");
let scoreDisplay = document.getElementById("scoreDisplay");
let gameMessage = document.getElementById("gameMessage");
let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");
let difficultySelect = document.getElementById("difficultySelect");
let gameContainer = document.querySelector(".game-container");

let seconds;
let interval;
let spawnInterval;
let isGameActive = false;
let score = 0;
let balls = [];
let currentMaxBalls = 3;
let currentBallSize = 70;
let currentSpawnRate = 1000;

function updateTimerDisplay() {
    timerDisplay.textContent = `00:${seconds.toString().padStart(2, "0")}`;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Punteggio: ${score}`;
}

function generateNonOverlappingPosition() {
    let screenWidth = window.innerWidth - currentBallSize - 20;
    let screenHeight = window.innerHeight - currentBallSize - 20;

    let attempts = 0;
    while (attempts < 50) {
        let x = Math.floor(Math.random() * screenWidth);
        let y = Math.floor(Math.random() * screenHeight);
        let overlap = balls.some(ball => {
            let bx = parseInt(ball.style.left);
            let by = parseInt(ball.style.top);
            return Math.abs(bx - x) < currentBallSize && Math.abs(by - y) < currentBallSize;
        });
        if (!overlap) {
            return { x, y };
        }
        attempts++;
    }
    return { x: Math.random() * screenWidth, y: Math.random() * screenHeight };
}

function createBall() {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.width = `${currentBallSize}px`;
    ball.style.height = `${currentBallSize}px`;

    let { x, y } = generateNonOverlappingPosition();
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    ball.addEventListener("click", () => {
        if (!isGameActive) return;
        score++;
        updateScoreDisplay();
        ball.remove();
        balls = balls.filter(b => b !== ball);

        if (isGameActive && balls.length < currentMaxBalls) {
            setTimeout(() => {
                let newBall = createBall();
                balls.push(newBall);
                gameContainer.appendChild(newBall);
            }, 400);
        }
    });

    return ball;
}

function configureDifficulty(level) {
    switch (level) {
        case "easy":
            seconds = 30;
            currentSpawnRate = 2000;
            currentMaxBalls = 3;
            currentBallSize = 80;
            break;
        case "medium":
            seconds = 20;
            currentSpawnRate = 1000;
            currentMaxBalls = 4;
            currentBallSize = 70;
            break;
        case "hard":
            seconds = 15;
            currentSpawnRate = 600;
            currentMaxBalls = 5;
            currentBallSize = 60;
            break;
    }
}

function startGame() {
    const level = difficultySelect.value;
    configureDifficulty(level);

    isGameActive = true;
    score = 0;
    updateTimerDisplay();
    updateScoreDisplay();
    startButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    gameMessage.textContent = "Clicca più palline possibile!";
    balls.forEach(ball => ball.remove());
    balls = [];

    document.querySelectorAll(".ball").forEach(ball => ball.remove());

    spawnInterval = setInterval(() => {
        if (balls.length < currentMaxBalls) {
            let ball = createBall();
            balls.push(ball);
            gameContainer.appendChild(ball);
        } else {
            clearInterval(spawnInterval);
        }
    }, currentSpawnRate);

    interval = setInterval(() => {
        seconds--;
        updateTimerDisplay();
        if (seconds <= 0) stopGame();
    }, 1000);
}

function stopGame() {
    isGameActive = false;
    clearInterval(interval);
    clearInterval(spawnInterval);
    balls.forEach(ball => ball.remove());
    balls = [];
    gameMessage.textContent = `Tempo scaduto! Hai cliccato ${score} palline.`;
    resetButton.classList.remove("hidden");
}

function resetGame() {
    startGame();
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);ù

function updateSelectColor() {
    switch (difficultySelect.value) {
        case "easy":
            difficultySelect.style.color = "#3adb76";  // verde
            break;
        case "medium":
            difficultySelect.style.color = "#f1c40f";  // giallo
            break;
        case "hard":
            difficultySelect.style.color = "#e74c3c";  // rosso
            break;
    }
}

// Esegui al cambio e al caricamento
difficultySelect.addEventListener("change", updateSelectColor);
window.addEventListener("load", updateSelectColor);

