
const questions = [
  
  
  {
    question: "Who is the first cricketer to score 200 runs in an ODI match?",
    answers: ["sachin tendulkar", "virender sehwag", "rohit sharma", "chris gayle"],
    correct: "sachin tendulkar"
  },
  {
    question: "Which bowler has the most wickets in test cricket?",
    answers: ["shane warne", "muttiah muralitharan", "glenn mcgrath", "james anderson"],
    correct: "muttiah muralitharan"
  },
  {
    question: "Which country hosted the first-ever Cricket World Cup?",
    answers: ["england", "india", "australia", "west indies"],
    correct: "england"
  },
  {
    question: "Who is known as the 'God of Cricket'?",
    answers: ["virat kohli", "sachin tendulkar", "ms dhoni", "rahul dravid"],
    correct: "sachin tendulkar"
  },
  {
    question: "Which cricketer is known for hitting six sixes in an over in T20 cricket?",
    answers: ["yuvraj singh", "chris gayle", "andre russell", "kieron pollard"],
    correct: "yuvraj singh"
  },
  {
    question: "Which team won the inaugural ICC T20 World Cup in 2007?",
    answers: ["india", "pakistan", "australia", "south africa"],
    correct: "india"
  },
  {
    question: "Who has the highest individual score in ODI cricket?",
    answers: ["virender sehwag", "rohit sharma", "martin guptill", "chris gayle"],
    correct: "rohit sharma"
  },
  {
    question: "Which cricketer is nicknamed 'The Wall'?",
    answers: ["rahul dravid", "jacques kallis", "kumar sangakkara", "mahela jayawardene"],
    correct: "rahul dravid"
  },
  {
    question: "Which country has won the most ICC Champions Trophy titles?",
    answers: ["india", "australia", "south africa", "west indies"],
    correct: "india"
  },
  {
    question: "Who is the fastest bowler to take 400 test wickets?",
    answers: ["dale steyn", "muttiah muralitharan", "glenn mcgrath", "richard hadlee"],
    correct: "dale steyn"
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