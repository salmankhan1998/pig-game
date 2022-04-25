'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function(){

    // Setting element to default values
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = () =>{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0 ;
    player0El.classList.toggle('player--active'); 
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function(){

    if(playing){
        // Genarte a dice number
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // Displaying a dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./images/dice-${dice}.png`;

        // Genarting current score
        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            // Switching player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function(){

   if(playing){

    //Holding current to total scores
    scores[activePlayer] += currentScore;

    //Setting current score to 0
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 50){
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        // prompt(`Player ${activePlayer+1} Won! 🏆. Press OK to play again`);
    }
    else{
        // Switching player
        switchPlayer();
    }
   }
});

btnNew.addEventListener('click', init);