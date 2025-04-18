const questions = [
  
  
  {
    question: "What is the process of forming a new word by adding a prefix or suffix called?",
    answers: ["Affixation", "Compounding", "Blending", "Clipping"],
    correct: "Affixation"
    },
    {
    question: "Which word is formed by blending 'smoke' and 'fog'?",
    answers: ["Smog", "Snog", "Foke", "Smofo"],
    correct: "Smog"
    },
    {
    question: "What is the term for creating a new word by combining two existing words?",
    answers: ["Compounding", "Affixation", "Clipping", "Blending"],
    correct: "Compounding"
    },
    {
    question: "What is the process of shortening a word by removing parts of it called?",
    answers: ["Clipping", "Blending", "Affixation", "Compounding"],
    correct: "Clipping"
    },
    {
    question: "Which of the following is an example of a clipped word?",
    answers: ["Exam", "Notebook", "Keyboard", "Smartphone"],
    correct: "Exam"
    },
    {
    question: "What is the term for forming a new word by imitating a sound?",
    answers: ["Onomatopoeia", "Blending", "Clipping", "Affixation"],
    correct: "Onomatopoeia"
    },
    {
    question: "Which word is an example of onomatopoeia?",
    answers: ["Buzz", "Table", "Chair", "Book"],
    correct: "Buzz"
    },
    {
    question: "What is the process of forming a new word by removing a supposed affix called?",
    answers: ["Back-formation", "Affixation", "Clipping", "Compounding"],
    correct: "Back-formation"
    },
    {
    question: "Which word is an example of back-formation?",
    answers: ["Edit", "Editor", "Editing", "Edited"],
    correct: "Edit"
    },
    {
    question: "What is the process of forming a new word by combining parts of two words called?",
    answers: ["Blending", "Clipping", "Affixation", "Compounding"],
    correct: "Blending"
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