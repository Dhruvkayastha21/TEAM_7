const questions = [
  
  
{
  question: "What is the capital of France?",
  answers: ["Paris", "Berlin", "Madrid", "Rome"],
  correct: "Paris"
},
{
  question: "Which is the largest continent by area?",
  answers: ["Asia", "Africa", "Europe", "Antarctica"],
  correct: "Asia"
},
{
  question: "What is the longest river in the world?",
  answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
  correct: "Nile"
},
{
  question: "Which country has the most population?",
  answers: ["China", "India", "USA", "Indonesia"],
  correct: "india"
},
{
  question: "What is the smallest country in the world?",
  answers: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
  correct: "Vatican City"
},
{
  question: "Which desert is the largest in the world?",
  answers: ["Sahara", "Gobi", "Kalahari", "Arctic"],
  correct: "Sahara"
},
{
  question: "What is the highest mountain in the world?",
  answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
  correct: "Mount Everest"
},
{
  question: "Which ocean is the largest by area?",
  answers: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
  correct: "Pacific Ocean"
},
{
  question: "What is the capital of Australia?",
  answers: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
  correct: "Canberra"
},
{
  question: "Which country is known as the Land of the Rising Sun?",
  answers: ["Japan", "China", "South Korea", "Thailand"],
  correct: "Japan"
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