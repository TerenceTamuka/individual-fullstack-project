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
        question: 'Who is known as the father of the World Wide Web?',
        choice1: 'Tim Berners-Lee',
        choice2: 'Vint Cerf',
        choice3: 'Steve Wozniak',
        choice4: 'Elon Musk',
        answer: 1,
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
        question: 'What creature did Theseus slay in the labyrinth?',
        choice1: 'Chimera',
        choice2: 'Minotaur',
        choice3: 'Hydra',
        choice4: 'Cerberus',
        answer: 2,
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
        question: 'Which hero is known for his 12 labors?',
        choice1: 'Perseus',
        choice2: 'Theseus',
        choice3: 'Heracles (Hercules)',
        choice4: 'Achilles',
        answer: 3,
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
        question: 'Who is the king of the Greek gods?',
        choice1: 'Poseidon',
        choice2: 'Zeus',
        choice3: 'Hades',
        choice4: 'Apollo',
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
        question: 'Which goddess is known as the goddess of wisdom and warfare?',
        choice1: 'Hera',
        choice2: 'Aphrodite',
        choice3: 'Athena',
        choice4: 'Artemis',
        answer: 3,
    },
    {
        question: 'What is the name of the first artificial satellite launched into space?',
        choice1: 'Explorer 1',
        choice2: 'Sputnik 1',
        choice3: 'Voyager 1',
        choice4: 'Apollo 11',
        answer: 2,
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