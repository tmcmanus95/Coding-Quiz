// Array of questions that is iterated through.
var questions = [
  {
    question: "What does CSS stand for?",
    responses: [
      "Creative Style Sheet",
      "Cascading Style Sheet",
      "Cascading Screen Styling",
      "Can't Stand Simple",
    ],
    correctResponse: 1,
  },
  {
    question: "Which data type represents textual data?",
    responses: ["String", "Number", "Boolean", "Library"],
    correctResponse: 0,
  },
  {
    question: "Which coding language is primarily used for web development?",
    responses: ["Python", "Rust", "JavaScript", "C++"],
    correctResponse: 2,
  },

  {
    question: "Which data type contains a true or false value?",
    responses: ["String", "Number", "Boolean", "Library"],
    correctResponse: 2,
  },
  {
    question: "What does Camel Case mean? ",
    responses: [
      "The practice of writing phrases without spaces, and capitalizing the first letters of all words in a phrase except the first",
      "A famous 1920s incident in which a camel was the prime suspect of a crime",
      "Adding spaces or 'humps' in between each word in a phrase",
      "Using terms that will stick in the mind when naming variables, data types, and functions",
    ],
    correctResponse: 0,
  },
  {
    question: "What does HTML stand for?",
    responses: [
      "HP Textual Machine Learning",
      "Hyper Tuning Machine Language",
      "Have Tons Make Lots",
      "Hypertext Markup Language",
    ],
    correctResponse: 2,
  },
  {
    question: "Which is the best definition of RAM?",
    responses: [
      "A great album by Paul McCartney",
      "Long term storage of files on your computer.",
      "A great album by Daft Punk",
      "Random Access Memory, memory that can be read and changed in any order.",
    ],
    correctResponse: 3,
  },
  {
    question: "Where should your script tags go on an HTML file?",
    responses: [
      "At the very top",
      "Wherever you expect a function to be called",
      "Right before the closing html tag ",
      "You should never use script tags with html",
    ],
    correctResponse: 2,
  },
  {
    question: "Which of the following programming languages is the oldest?",
    responses: ["Python", "Plankalkül", "C++", "JavaScript"],
    correctResponse: 1,
  },
];

//Sets timer, the index of the questions array, the current score, and the ability to stop the timer at the end of the quiz.

var timer = 60;
var questionsNumber = 0;
var score = 0;
var stopTimer;

//Locates html elements.
var questionsContainer = document.getElementById("questions-container");
var questionPrompt = document.getElementById("question-prompt");
var possibleResponses = document.getElementById("possible-responses");
var startButton = document.getElementById("start-button");
var scoreContainer = document.getElementById("score-container");
var scoreDisplay = document.getElementById("score-display");
var timeRemaining = document.getElementById("time-in-seconds");
var scoreNumber = document.getElementById("score-number");
var hiddenUntilEnd = document.getElementById("hidden-until-end");
var initialsInput = document.getElementById("initials-input");
var saveButton = document.getElementById("save-button");
var clearButton = document.getElementById("clear-button");
var playAgainButton = document.getElementById("play-again-button");
var listForScores = document.getElementById("list-for-scores");

//Funciton that initially starts the timer. Displays on the screen.
function startTimer() {
  timer--;
  timeRemaining.innerHTML = timer;
  if (timer <= 0) {
    endQuiz();
  }
}

//Function that starts the quiz. Calls the nextQuestion function.
function startQuiz() {
  startTimer();
  stopTimer = setInterval(startTimer, 1000);
  startButton.style.display = "none";
  nextQuestion();
}

//Function that displays the prompt and possible responses on the screen.
function nextQuestion() {
  //Displays the score on the screen.
  scoreNumber.textContent = score;
  //Get the current question from the questions array.
  const currentQuestion = questions[questionsNumber];
  questionPrompt.textContent = currentQuestion.question;

  //Creates a list element for each of the possible responses per the indexed question.
  possibleResponses.textContent = "";
  currentQuestion.responses.forEach((responses, index) => {
    const liItem = document.createElement("li");
    liItem.textContent = responses;
    //Adds an event listener for each response to check to see if the index clicked matches the correct response.
    liItem.addEventListener("click", () => checkResponse(index));
    possibleResponses.appendChild(liItem);
  });
}

function checkResponse(index) {
  const currentQuestion = questions[questionsNumber];
  //Checks to see if the selected responses matches the correct response. Increments the score if yes.
  if (index === currentQuestion.correctResponse) {
    score++;
    console.log(score);
    //If the selected response does not match the correct reponse, subtracts 15 from the timer.
  } else {
    timer -= 15;
    if (timer < 0) {
      timer = 0;
    }
  }

  //Increments the question index to display the next prompt / array of possible responses.
  questionsNumber++;
  if (questionsNumber < questions.length) {
    nextQuestion();
  } else {
    endQuiz();
    possibleResponses.style.display = "none";
  }
}

//Function that is called if the timer is below or equal to 0, or if the array is past its last question.
function endQuiz() {
  window.clearInterval(stopTimer);
  questionPrompt.textContent = "Thanks for playing!";
  scoreNumber.textContent = score;
  timeRemaining.textContent = 0;
  possibleResponses.style.display = "none";
  hiddenUntilEnd.style.display = "block";
}

//Event listener for start button that calls the startQuiz function.
startButton.addEventListener("click", startQuiz);

//Event listener for the save button.
saveButton.addEventListener("click", () => {
  const initials = initialsInput.value;
  if (initials.length === 2) {
    //Creates a list element for the new score / initials recorded.
    const scoreRecord = document.createElement("li");
    //Sets the text content of that list element to the initials and the score via a template literal.
    scoreRecord.textContent = `${initials}: ${score}`;
    //Appends list item to list element.
    listForScores.appendChild(scoreRecord);
  } else {
    alert("Please submit two characters signifying your initials.");
  }
});

//Event listener for clear button that resets the list element.
clearButton.addEventListener("click", () => {
  listForScores.textContent = "";
  saveButton.style.display = "inline";
});

//Play again button that reloads the page.
playAgainButton.addEventListener("click", () => {
  window.location.reload();
});
