const questions = [
  
  
{
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correct: "Paris"
},
{
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    correct: "William Shakespeare"
},
{
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Jupiter"
},
{
    question: "What is the chemical symbol for water?",
    answers: ["H2O", "O2", "CO2", "NaCl"],
    correct: "H2O"
},
{
    question: "Who painted the Mona Lisa?",
    answers: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    correct: "Leonardo da Vinci"
},
{
    question: "What is the smallest prime number?",
    answers: ["1", "2", "3", "5"],
    correct: "2"
},
{
    question: "Which country is known as the Land of the Rising Sun?",
    answers: ["China", "Japan", "Thailand", "India"],
    correct: "Japan"
},
{
    question: "What is the square root of 64?",
    answers: ["6", "7", "8", "9"],
    correct: "8"
},
{
    question: "Who discovered gravity?",
    answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correct: "Isaac Newton"
},
{
    question: "What is the longest river in the world?",
    answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correct: "Nile River"
}
];

let currentindex = 0;
const question = document.getElementById("question");
const answerbtn = document.querySelectorAll(".btn");
const nextbtn = document.getElementById("next");
let timerElement = document.getElementById("timer");
let tl = document.getElementById("timeleft");
let timerInterval;
let timeLeft = 15;
let correct=0;
let incorrect=-1;



function loadQuestion() {
  const currentque = questions[currentindex];
  question.textContent = currentque.question;
  answerbtn.forEach((btn, i) => {
    btn.textContent = currentque.answers[i];


    
    btn.addEventListener("click",function(){
      if (btn.textContent == currentque.correct) {
        btn.style.backgroundColor = "green";
        correct++;
      } 
      else {
        btn.style.backgroundColor = "red";
      }
     
      answerbtn.forEach(btn=>{
        btn.disabled=true;
      })
      nextbtn.style.display="block";
    })
    btn.style.backgroundColor = "";
    btn.disabled = false;
    
  });
}
function startTimer() {
  timeLeft = 15;
  timerElement.textContent = `${timeLeft}`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      answerbtn.forEach(btn => {
        btn.disabled = true;
      });
      nextbtn.style.display = "block";
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimer();
}

loadQuestion = (function(originalLoadQuestion) {
  return function() {
    originalLoadQuestion();
    resetTimer();
  };
})(loadQuestion);

nextbtn.addEventListener("click",function()
{
  currentindex++;
  if (currentindex < questions.length) {
    setTimeout(() => {
      nextbtn.style.display="none";
    },100);
    loadQuestion();
  } else {
    question.textContent = "Quiz Completed!";
    nextbtn.innerText="VIEW SCORE";
    nextbtn.addEventListener("click",function(){
      window.location.href="score-1.html"; 
    })
    timerElement.style.display="none";
    tl.style.display="none";
    incorrect=10-correct;
    localStorage.setItem("correct",correct);
    localStorage.setItem("incorrect",incorrect);

  }
}
);

loadQuestion();