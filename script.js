// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "Which of the following is used to style a web page?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false },
    ],
  },
  {
    question: "What does the 'typeof' operator do in JavaScript?",
    answers: [
        { text: "Returns the data type of a variable", correct: true },
        { text: "Checks if a variable is defined", correct: false },
        { text: "Assigns a type to a variable", correct: false },
        { text: "Converts a variable to a string", correct: false },
    ],
  },
  {
    question: "Which of the following is a synonym for 'happy'?",
    answers: [
      { text: "Sorrowful", correct: false },
      { text: "Joyful", correct: true },
      { text: "Angry", correct: false },
      { text: "Tired", correct: false },
    ],
  },
  {
    question: "What is the past tense of the verb 'to eat'?",
    answers: [
        { text: "Eated", correct: false },
        { text: "Ate", correct: true },
        { text: "Eaten", correct: false },
        { text: "Eating", correct: false },
    ],
  },
  {
    question: "In League of Legends, which of these is NOT a role?",
    answers: [
      { text: "Top Laner", correct: false },
      { text: "Mid Laner", correct: false },
      { text: "Jungler", correct: false },
      { text: "Side Laner", correct: true },
    ],
  },
  {
    question: "What is the name of the main objective in League of Legends?",
    answers: [
        { text: "Baron Nashor", correct: false },
        { text: "Dragon", correct: false },
        { text: "Nexus", correct: true },
        { text: "Inhibitor", correct: false },
    ],
  },
  {
    question: "What is a group of cats called?",
    answers: [
      { text: "A pack", correct: false },
      { text: "A flock", correct: false },
      { text: "A clowder", correct: true },
      { text: "A school", correct: false },
    ],
  },
  {
    question: "On average, how many hours a day do cats sleep?",
    answers: [
        { text: "8-10 hours", correct: false },
        { text: "12-16 hours", correct: true },
        { text: "4-6 hours", correct: false },
        { text: "20-22 hours", correct: false },
    ],
  },
  {
    question: "What is 'inflation'?",
    answers: [
      { text: "A decrease in the price of goods and services", correct: false },
      { text: "The rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling", correct: true },
      { text: "The total value of a country's exports", correct: false },
      { text: "The amount of money a government has in its budget", correct: false },
    ],
  },
  {
    question: "What is a 'bull market'?",
    answers: [
        { text: "A market in which prices are falling", correct: false },
        { text: "A market that is stagnant", correct: false },
        { text: "A market in which prices are rising", correct: true },
        { text: "A market for agricultural products", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion(){
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // what is dataset? It's a property of the button element that allows you to store custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    })
}

function selectAnswer(event) {
    // optimization check
    if(answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct == "true";

    Array.from(answersContainer.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if(button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    },1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}