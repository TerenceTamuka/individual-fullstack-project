
/**
 * Global variables to parse and store highscores in the application
 */
const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

/**
 * Highscores list for the user name and scores to be displayed on the screen
 */
highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')