const grid = document.getElementById("grid");
const startBtn = document.getElementById("start-btn");
const statusMessage = document.getElementById("status-message");
const scoreDisplay = document.getElementById("score");

const gridSize = 4;  // Griglia 4x4
let sequence = [];
let userSequence = [];
let score = 0;
let isGameActive = false;

// Funzione per generare la sequenza casuale
function generateSequence() {
    const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
    sequence.push(randomIndex);
}

// Funzione per creare la griglia di pulsanti
function createGrid() {
    grid.innerHTML = "";  // Reset della griglia
    for (let i = 0; i < gridSize * gridSize; i++) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-memory");
        button.dataset.index = i;
        button.addEventListener("click", () => handleUserInput(i));
        grid.appendChild(button);
    }
}

// Funzione per mostrare la sequenza
function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        const buttons = document.querySelectorAll(".btn-memory");
        const button = buttons[sequence[index]];
        button.classList.add("active");
        setTimeout(() => {
            button.classList.remove("active");
        }, 500);

        index++;
        if (index === sequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

// Funzione per gestire l'input dell'utente
function handleUserInput(index) {
    if (!isGameActive) return;

    userSequence.push(index);

    // Verifica se l'input dell'utente è corretto
    if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
        statusMessage.textContent = "Hai sbagliato! Il gioco è stato resettato.";
        score = 0;
        updateScore();
        resetGame();
        return;
    }

    // Se l'utente ha riprodotto tutta la sequenza correttamente
    if (userSequence.length === sequence.length) {
        score++;
        statusMessage.textContent = "Bravo! Passi al prossimo livello.";
        updateScore();
        nextRound();
    }
}

// Funzione per aggiornare il punteggio
function updateScore() {
    scoreDisplay.textContent = score;
}

// Funzione per passare al prossimo turno
function nextRound() {
    userSequence = [];
    setTimeout(() => {
        generateSequence();
        showSequence();
    }, 1000);
}

// Funzione per iniziare il gioco
function startGame() {
    score = 0;
    sequence = [];
    userSequence = [];
    statusMessage.textContent = "Inizia a giocare!";
    createGrid();
    generateSequence();
    showSequence();
    isGameActive = true;
    startBtn.disabled = true;
}

// Funzione per resettare il gioco
function resetGame() {
    isGameActive = false;
    startBtn.disabled = false;
}

// Aggiungi evento al pulsante "Start"
startBtn.addEventListener("click", startGame);
