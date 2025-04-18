const questions = [
  
  
{
    question: "What is the mean of the numbers 2, 4, 6, 8, 10?",
    answers: ["5", "6", "7", "8"],
    correct: "6"
  },
  {
    question: "What is the median of the numbers 3, 7, 9, 15, 21?",
    answers: ["7", "9", "15", "21"],
    correct: "9"
  },
  {
    question: "What is the mode of the numbers 2, 3, 3, 5, 7?",
    answers: ["2", "3", "5", "7"],
    correct: "3"
  },
  {
    question: "What is the range of the numbers 10, 15, 20, 25, 30?",
    answers: ["15", "20", "25", "30"],
    correct: "20"
  },
  {
    question: "What is the probability of rolling a 6 on a standard die?",
    answers: ["1/2", "1/3", "1/6", "1/4"],
    correct: "1/6"
  },
  {
    question: "What is the square root of 144?",
    answers: ["10", "11", "12", "13"],
    correct: "12"
  },
  {
    question: "If a triangle has angles 60°, 60°, and 60°, what type of triangle is it?",
    answers: ["Scalene", "Isosceles", "Equilateral", "Right"],
    correct: "Equilateral"
  },
  {
    question: "What is 15% of 200?",
    answers: ["20", "25", "30", "35"],
    correct: "30"
  },
  {
    question: "What is the value of π (pi) approximately?",
    answers: ["2.14", "3.14", "4.14", "5.14"],
    correct: "3.14"
  },
  {
    question: "What is the area of a rectangle with length 10 and width 5?",
    answers: ["15", "30", "50", "100"],
    correct: "50"
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