const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progresBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/**
 * Question dictionary array for the Quiz game
 */
let questions = [
    {
        question: 'What is the largest ocean on Earth?',
        choice1: 'Atlantic Ocean',
        choice2: 'Indian Ocean',
        choice3: 'Arctic Ocean',
        choice4: 'Pacific Ocean',
        answer: 4,
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        choice1: 'China',
        choice2: 'Japan',
        choice3: 'India',
        choice4: 'Thailand',
        answer: 2,
     },
     {
        question: 'What is the chemical symbol for water?',
        choice1: 'H2O',
        choice2: 'O2',
        choice3: 'CO2',
        choice4: 'NaCl',
        answer: 1,
     },
     {
        question: 'What is the powerhouse of the cell?',
        choice1: 'Nucleus',
        choice2: 'Mitochondria',
        choice3: 'Ribosome',
        choice4: 'Endoplasmic Reticulum',
        answer: 2,
     },
     {
        question: 'Who painted the Mona Lisa?',
        choice1: 'Vincent van Gogh',
        choice2: 'Leonardo da Vinci',
        choice3: 'Pablo Picasso',
        choice4: 'Claude Monet',
        answer: 2,
    },
    {
        question: 'Who discovered penicillin?',
        choice1: 'Marie Curie',
        choice2: 'Alexander Fleming',
        choice3: 'Isaac Newton',
        choice4: 'Albert Einstein',
        answer: 2,
    },
    {
        question: 'What is the capital city of Liechtenstein?',
        choice1: 'Vaduz',
        choice2: 'Bern',
        choice3: 'Zurich',
        choice4: 'Innsbruck',
        answer: 1,
    },
    {
        question: 'What is the largest desert in the world?',
        choice1: 'Sahara Desert',
        choice2: 'Arabian Desert',
        choice3: 'Gobi Desert',
        choice4: 'Antarctic Desert',
        answer: 4,
    },
    {
        question: 'Who is known as the "Father of Computers"?',
        choice1: 'Alan Turing',
        choice2: 'Charles Babbage',
        choice3: 'John von Neumann',
        choice4: 'Bill Gates',
        answer: 2,
    },
    {
        question: 'Which physicist developed the theory of relativity?',
        choice1: 'Isaac Newton',
        choice2: 'Niels Bohr',
        choice3: 'Albert Einstein',
        choice4: 'Galileo Galilei',
        answer: 3,
    },
    {
        question: 'Which scientist proposed the three laws of planetary motion?',
        choice1: 'Isaac Newton',
        choice2: 'Galileo Galilei',
        choice3: 'Johannes Kepler',
        choice4: 'Nicolaus Copernicus',
        answer: 3,
    },
    {
        question: 'What is the capital city of Bhutan?',
        choice1: 'Thimphu',
        choice2: 'Kathmandu',
        choice3: 'Paro',
        choice4: 'Punaka',
        answer: 1,
    },
    {
        question: 'Which Shakespearean play features the character Shylock?',
        choice1: 'Othello',
        choice2: 'The Merchant of Venice',
        choice3: 'Hamlet',
        choice4: 'Macbeth',
        answer: 2,
    },
    {
        question: 'What is the smallest bone in the human body?',
        choice1: 'Femur',
        choice2: 'Stapes',
        choice3: 'Ulna',
        choice4: 'Phalanges',
        answer: 2,
    },
    {
        question: 'Who wrote the epic poem "Paradise Lost"?',
        choice1: 'William Shakespeare',
        choice2: 'John Milton',
        choice3: 'Dante Alighieri',
        choice4: 'Geoffrey Chaucer',
        answer: 2,
    },
    {
        question: 'Which country is the largest producer of coffee in the world?',
        choice1: 'Colombia',
        choice2: 'Vietnam',
        choice3: 'Ethiopia',
        choice4: 'Brazil',
        answer: 4,
    },
    {
        question: 'Which element has the atomic number 1?',
        choice1: 'Helium',
        choice2: 'Oxygen',
        choice3: 'Hydrogen',
        choice4: 'Carbon',
        answer: 3,
    },
    {
        question: 'What is the rarest blood type in the world?',
        choice1: 'AB-',
        choice2: 'O+',
        choice3: 'B+',
        choice4: 'A-',
        answer: 1,
    },
    {
        question: 'What is the highest mountain in Africa?',
        choice1: 'Mount Kilimanjaro',
        choice2: 'Mount Elgon',
        choice3: 'Mount Kenya',
        choice4: 'Ras Dashen',
        answer: 1,
    },
    {
        question: 'In which year did the French Revolution begin?',
        choice1: '1776',
        choice2: '1789',
        choice3: '1799',
        choice4: '1815',
        answer: 2,
    },
    {
        question: 'Which physicist is known for the Uncertainty Principle?',
        choice1: 'Albert Einstein',
        choice2: 'Isaac Newton',
        choice3: 'Werner Heisenberg',
        choice4: 'Niels Bohr',
        answer: 3,
    }
]


/**
 * Global variuables for score points, max questions.
 */
const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

const timerText = document.querySelector('#timer'); // Get the timer element
let timer;
let timeLeft = 10; // Time in seconds

/**
 * Start game function initialization.
 */
startGame = () => {

    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

/**
 * Timer method for the 10 seconds timer function
 */
startTimer = () => {
    timeLeft = 10; // Reset timer to 10 seconds
    timerText.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            // If time runs out, apply incorrect class and move to next question
            choices.forEach(choice => {
                choice.parentElement.classList.add('incorrect');
            });

            setTimeout(() => {
                choices.forEach(choice => {
                    choice.parentElement.classList.remove('incorrect');
                });
                getNewQuestion();
            }, 1000);
        }
    }, 1000);
}

/**
 * Get the new question method tied in with the 10 seconds timers on each question.
 */
getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progresBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

    clearInterval(timer); // Clear any existing timer
    startTimer(); // Start a new timer for the current question

}

/**
 * Multple choice answers process method and event handlers for realtime UX interaction
 */
choices.forEach(choice => {

    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        clearInterval(timer); // Stop the timer when an answer is selected

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

        
    })
})

/**
 * Score incremental function for each time user gets a correct answer
 */
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()