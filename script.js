'use strict';

// Selecting Items/elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting score
score0El.textContent = 0;
score1El.textContent = 0;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let game = true;

// switch player method
function switchPlayer() {
  currentScore = 0;
  console.log(activePlayer);
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// hiding the dice
diceEl.classList.add('hidden');

// document.querySelector('.dice').src = 'dice-6.png';

btnRoll.addEventListener('click', function () {
  if (game) {
    // generate random number for dice
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // display dice and add current score

      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // if dice == 1
      // switch player
      switchPlayer();
    }
  }
});

// Hold btn function
btnHold.addEventListener('click', function () {
  if (game) {
    // 1. add current score to active player score
    // add the current score to the total of the Array's index value
    scores[activePlayer] += currentScore;
    // display the current score in the Array[index]
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if score >= 100 : end game
    if (scores[activePlayer] >= 100) {
      // the game variable is turned into false making all functions to not work
      game = false;
      // hid the dice after game is done
      diceEl.classList.add('hidden');
      // added the element if win
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // removed the player--active element because game is over
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch player if game is not over yet.
      switchPlayer();
    }
  }
});

// reset the game from the start and all its values
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  if (activePlayer == 1) {
    activePlayer = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
  game = true;
  scores = [0, 0];
  currentScore = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
});
