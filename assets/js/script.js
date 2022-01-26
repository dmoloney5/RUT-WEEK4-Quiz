//lisst of questions, choices, and answer
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["1: strings", "2: booleans", "3: alerts", "4: numbers"],
    answer: "3: alerts",
  },
  {
    question: "Which built-in method returns the length of the string?",
    choices: ["1: length()", "2: size()", "3: index()", "4: None of the above."],
    answer: "1: length()",
  },
  {
    question: "Which built-in method returns the calling string value converted to upper case?",
    choices: ["1: toUpperCase()", "2:toUpper()", "3: changeCase(case)", "4: None of the above."],
    answer: "1: toUpperCase()",
  },
  {
    question: "Which of the following function of String object returns the character at the specified index?",
    choices: ["1: charCodeAt()", "2: charCodeAt()", "3: concat()", "4: indexOf()"],
    answer: "2: charAt()",
  },
  {
    question: "Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?",
    choices: ["1: substr()", "2: search()", "3: lastIndexOf()", "4: indexOf()"],
    answer: "4: indexOf()",
  },
  {
    question: "Which of the following function of String object returns the calling string value converted to lower case?",
    choices: ["1: toLocaleLowerCase()", "2: toLowerCase()", "3: toString()", "4: substring()"],
    answer: "1: toLocaleLowerCase()",
  },
  {
    question: "Which of the following function of Array object returns a new array comprised of this array joined with other array(s) and/or value(s)?",
    choices: ["1: push()", "2: pop()", "3: concat()", "4: some()"],
    answer: "3: concat()",
  },
  {
    question: "Which of the following function of Array object applies a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value?",
    choices: ["1: pop()", "2: push()", "3: reduce()", "4: reduceRight()"],
    answer: "3: reduce()",
  },
  {
    question: "Which of the following function of Array object represents the source code of an object?",
    choices: ["1: splice()", "2: toSource()", "3: toString()", "4: unshift()"],
    answer: "2: toSource()",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");


var questionIndex = 0;
var score = 0;

//time counter
var time = 40;
var intervalId;

// End the Quiz
function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  localStorage.setItem('mostRecentScore', score);

// create label
const input = document.createElement("input");
input.setAttribute("id", "initials");
input.setAttribute("type", "text");

document.body.appendChild(input);

const label = document.createElement("label");
label.setAttribute("for", "initials");
label.innerHTML = "Initials: ";

const usernameText = document.getElementById("initials");

document.body.insertBefore(label, usernameText);
// insert textbox
document.body.appendChild(input);

};

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
    return window.location.assign("./end.html");
  }
}

function renderQuestion() {

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);

  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      score++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
