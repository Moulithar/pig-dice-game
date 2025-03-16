"use strict";

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Score = document.getElementById("current--0");
const current1Score = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const diceElement = document.querySelector(".dice");
const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");

let currentScore = 0;
let activePlayer = "player-0";

score0Element.textContent = 0;
score1Element.textContent = 0;

const toggleActivePlayer = (activePlayer) => {
  if (activePlayer == "player-1") {
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
    score1Element.textContent =
      Number(score1Element.textContent) + currentScore;
    currentScore = 0;
    current1Score.textContent = 0;
  } else if (activePlayer == "player-0") {
    player0.classList.remove("player--active");
    player1.classList.add("player--active");
    score0Element.textContent =
      Number(score0Element.textContent) + currentScore;
    currentScore = 0;
    current0Score.textContent = 0;
  }
};

diceElement.classList.add("hidden");

buttonRoll.addEventListener("click", () => {
  const dice = Math.trunc(Math.random() * 6 + 1);
  diceElement.classList.remove("hidden");
  diceElement.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    console.log(currentScore);
    if (activePlayer == "player-0") {
      current0Score.textContent = currentScore;
    } else {
      current1Score.textContent = currentScore;
    }
  } else {
    currentScore = 0;
    toggleActivePlayer(activePlayer);
    if (activePlayer == "player-0") {
      activePlayer = "player-1";
    } else if (activePlayer == "player-1") {
      activePlayer = "player-0";
    }
  }
});

buttonHold.addEventListener("click", () => {
  toggleActivePlayer(activePlayer);
  if (activePlayer == "player-0") {
    activePlayer = "player-1";
  } else if (activePlayer == "player-1") {
    activePlayer = "player-0";
  }
  console.log("value", score1Element.textContent);
  console.log("value", score0Element.textContent);
  if (Number(score1Element.textContent) >= 100) {
    player1.classList.add("player--winner");
  } else if (Number(score0Element.textContent) >= 100) {
    player0.classList.add("player--winner");
  }
});

buttonNew.addEventListener("click", () => {
  currentScore = 0;
  activePlayer = "player-0";

  score0Element.textContent = 0;
  score1Element.textContent = 0;

  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
});
