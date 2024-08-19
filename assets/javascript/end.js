const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

/**
 * Event listener for when user enters their name to store their scores
 */
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

/**
 * 
 * Highscore function to save and sort the highscores from most to least in decending format 
 */
const saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    highScores.splice(5); //Splice to display 5 top scores

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('highscores.html');
};


