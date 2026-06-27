let score = 0;
let timeLeft = 30;
let timer;
let gameRunning = false;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const messageDisplay = document.getElementById("message");

const winMessages = [
  "Amazing! You helped collect clean water!",
  "Great job! You reached the goal!",
  "You win! Every drop counts!"
];

const loseMessages = [
  "Nice try! Play again and collect more drops.",
  "Almost there! Keep practicing.",
  "Try again! You can reach 20 drops!"
];

startButton.addEventListener("click", startGame);

function startGame() {
  score = 0;
  timeLeft = 30;
  gameRunning = true;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  messageDisplay.textContent = "";
  startButton.disabled = true;
  gameContainer.innerHTML = "";

  timer = setInterval(function () {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  createDrop();
}

function createDrop() {
  if (!gameRunning) return;

  const drop = document.createElement("div");
  drop.classList.add("drop");

  const size = Math.floor(Math.random() * 30) + 30;
  drop.style.width = size + "px";
  drop.style.height = size + "px";
  drop.style.left = Math.random() * (gameContainer.offsetWidth - size) + "px";

  const isBadDrop = Math.random() < 0.2;

  if (isBadDrop) {
    drop.classList.add("bad-drop");
  }

  drop.addEventListener("click", function () {
    if (!gameRunning) return;

    if (isBadDrop) {
      score--;
    } else {
      score++;
    }

    scoreDisplay.textContent = score;
    drop.remove();
  });

  gameContainer.appendChild(drop);

  setTimeout(function () {
    drop.remove();
  }, 3000);

  setTimeout(createDrop, 700);
}

function endGame() {
  gameRunning = false;
  clearInterval(timer);
  startButton.disabled = false;
  gameContainer.innerHTML = "";

  if (score >= 20) {
    const randomMessage = winMessages[Math.floor(Math.random() * winMessages.length)];
    messageDisplay.textContent = randomMessage;
  } else {
    const randomMessage = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    messageDisplay.textContent = randomMessage;
  }
}
