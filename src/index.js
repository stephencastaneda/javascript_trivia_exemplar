// Requirements for project
const questions = [
  {
    number: 0,
    question: "What team won the very first NBA game?",
    choices: [
      "Philadelphia Warriors",
      "Toronto Huskies",
      "Chicago Stags",
      "New York Knicks"
    ],
    answer: 3
  },
  {
    number: 1,
    question: "What NBA player scored 100 points on March 2, 1962",
    choices: [
      "Wilt Chamberlain",
      "Bill Russell",
      "Kareem Abdul-Jabbar",
      "Elgin Baylor"
    ],
    answer: 0
  },
  {
    number: 2,
    question:
      "Who was the first player in NBA history to be elected league MVP by a unanimous vote?",
    choices: [
      "Stephen Curry",
      "LeBron James",
      "Magic Johnson",
      "Michael Jordan"
    ],
    answer: 0
  },
  {
    number: 3,
    question:
      " What new kind of shot did Joe Fulks score a record 63 points with in one game in 1949?",
    choices: ["Three-Point Shot", "Free Throw", "Jump Shot", "Hook Shot"],
    answer: 2
  },
  {
    number: 4,
    question: "What team won the very first NBA game?",
    choices: [
      "Philadelphia Warriors",
      "Toronto Huskies",
      "Chicago Stags",
      "New York Knicks"
    ],
    answer: 3
  },
  {
    number: 5,
    question: "Who scored the first three-point basket in NBA history?",
    choices: ["Chris Ford", "Larry Bird", "Wes Unseld", "Gene Stump"],
    answer: 0
  },
  {
    number: 6,
    question: "Who was the youngest player to score 10,000 points in the NBA?",
    choices: [
      "Kobe Bryant",
      "LeBron James",
      "Wilt Chamberlain",
      "Michael Jordan"
    ],
    answer: 1
  },
  {
    number: 7,
    question: "What team owns the longest winning streak in NBA history?",
    choices: ["Lakers", "Heat", "Warriors", "Bulls"],
    answer: 0
  },
  {
    number: 8,
    question: "Who is the all-time leading scorer in men's college basketball?",
    choices: [
      "Stephen Curry",
      "Pete Maravich",
      "Freeman Williams",
      "Larry Bird"
    ],
    answer: 1
  },
  {
    number: 9,
    question: "Who was the first WNBA player to dunk in a playoff game?",
    choices: [
      "Lisa Leslie",
      "Michelle Snow",
      "Brittney Griner",
      "Tamika Catchings"
    ],
    answer: 2
  },
  {
    number: 10,
    question:
      " How many games did Wilt Chamberlain foul out of during his 14 year NBA career?",
    choices: ["94", "25", "11", "0"],
    answer: 3
  }
];

// set tracking variables
let count = 0;
let score = 0;
let correctAnswer = false;
let prevFlag = false;

// grab html elements
const choices = document.querySelectorAll(".choices");
const question = document.getElementsByTagName("h2")[0];
const resultsPara = document.getElementsByTagName("p")[0];
const choicesPara = document.getElementsByTagName("p")[1];

const resetButton = document.getElementsByClassName("reset")[0];
const prevButton = document.getElementsByClassName("prev")[0];
const progress = document.getElementsByClassName("progress-bar")[0];

// add the event listeners
window.onload = renderQuestion();

prevButton.addEventListener("click", prevQuestion);
resetButton.addEventListener("click", resetQuiz);
choices.forEach(function (choice) {
  choice.addEventListener("click", scoring);
});

const rightAnswerSound = new Audio("../sound/applause2_x.wav");
const wrongAnswerSound = new Audio("../sound/hit_with_frying_pan_y.wav");

// functions used
function scoring() {
  // grab the answer of the current question
  const answer = questions[count].answer;
  // prevButton is visible when a choice is selected
  prevFlag = true;

  // THIS is the span.choice that the user clicked
  if (this.innerText === questions[count].choices[answer]) {
    // correctAnswer waves for prevButton use
   correctAnswer = true;
    score++;
//play correct sound audio
    rightAnswerSound.play();
  } else {
    correctAnswer = false;
//add wrong sound audio 
    wrongAnswerSound.play();
  }

  // then render next question
  nextQuestion();
}

function nextQuestion() {
  // count goes up
  count++;

  if (count > 10) {
    count = 10;
  } else if (count !== 10) {
    // numbers between 0 and 10 have questions that can be rendered
    renderQuestion();
  } else if (count === 10) {
    // quiz is over when count reaches 20
    renderCompletion();
  }
}

// the prevButton will only be available to go back one question
function prevQuestion() {
  // when the previous question renders, remove the prevButton
  prevFlag = false;

  // if the user originally clicked the correctAnswer, remove score
  if (correctAnswer) {
    correctAnswer = false;
    score--;
  }

  // then go back and render the old question
  count--;
  renderQuestion();
}

function renderQuestion() {
  // prevButton is hidden on the first page
  // and if the user attempts to go back more than one question
  if (!prevFlag) {
    prevButton.classList.add("hide");
  } else if (prevButton.classList.contains("hide")) {
    prevButton.classList.remove("hide");
  }

  // update question div with current question
  question.innerText = questions[count].question;

  // update each choice with the choices available in current question
  choices.forEach(function (choice, i) {
    choice.innerText = questions[count].choices[i];
  });

  updateProgress();
}

function renderCompletion() {
  updateProgress();
  const scorePercentage = Math.round((score / 10) * 100) + "%";

  // update with a thank you note and the user's percentage
  question.innerText = "Thank you for Completing the Quiz!";
  resultsPara.innerText = "Your score is: " + scorePercentage;

  // reset avail, prevButton and choicesPara are removed
  choicesPara.classList.add("hide");
  prevButton.classList.add("hide");
  resetButton.classList.remove("hide");
}

function updateProgress() {
  // progress bar will be updated as count goes up
const progressPercentage = Math.round((count / 10) * 100);
  progress.style.width = progressPercentage + "%";
}

function resetQuiz() {
  // reset tracking variables
  count = 0;
  score = 0;
  correctAnswer = false;
  prevFlag = false;

  // resultsPara is hidden
  resultsPara.innerText = "";

  // choicesPara displays while resetButton is hidden
  choicesPara.classList.remove("hide");
  resetButton.classList.add("hide");

  renderQuestion();
}
