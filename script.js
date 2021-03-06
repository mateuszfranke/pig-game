'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const buttonRoll = document.querySelector('.btn--roll');
const buttonNewGame = document.querySelector('.btn--new');
const buttonHold = document.querySelector('.btn--hold');

const player0ScoreElement = document.querySelector('#score--0');
const player1ScoreElement = document.querySelector('#score--1');

const player0CurrentScoreElement = document.querySelector('#current--0');
const player1CurrentScoreElement = document.querySelector('#current--1');

const diceImg = document.querySelector('.dice');
//
let activePlayer = 0;
let currentScore = 0;
const winCondition = 100;
const scores = [0, 0];
let isGameActive = true;

initGame();

function roll() {
    const number = Math.trunc((Math.random() * 6) + 1);
    return number;
}
function buttonRollListener() {
    if (isGameActive) {
        const rolledNumber = roll();
        showRolledDice(rolledNumber);
        if (rolledNumber !== 1) {
            addToCurrentScore(rolledNumber);
        } else {
            switchPlayer();
        }
    }
}

function buttonHoldListener() {

    if (isGameActive) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= winCondition) {
            isGameActive = false;
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else switchPlayer();
    }
}

function showRolledDice(number) {
    console.log(number);
    if (diceImg.classList.contains('hidden')) diceImg.classList.remove('hidden');
    diceImg.src = `dice-${number}.png`;
}

function initGame() {
    diceImg.classList.add('hidden');
    player0ScoreElement.textContent = '0';
    player1ScoreElement.textContent = '0';
    player0CurrentScoreElement.textContent = '0';
    player1CurrentScoreElement.textContent = '0';
    isGameActive = true;
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');

}

function addToCurrentScore(rolledNumber) {

    currentScore += rolledNumber;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
}

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// listeners
buttonRoll.addEventListener('click', buttonRollListener);
buttonHold.addEventListener('click', buttonHoldListener);
buttonNewGame.addEventListener('click', initGame);
