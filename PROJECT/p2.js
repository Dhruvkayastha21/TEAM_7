const questions = [
  
  
{
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
    correct: "Hyper Text Markup Language"
},
{
    question: "Which programming language is known as the backbone of web development?",
    answers: ["Python", "JavaScript", "C++", "Java"],
    correct: "JavaScript"
},
{
    question: "What does CSS stand for?",
    answers: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correct: "Cascading Style Sheets"
},
{
    question: "Which company developed the Windows operating system?",
    answers: ["Apple", "Microsoft", "Google", "IBM"],
    correct: "Microsoft"
},
{
    question: "What is the main function of a firewall in a computer network?",
    answers: ["To monitor and control incoming and outgoing network traffic", "To store data", "To speed up the internet", "To provide antivirus protection"],
    correct: "To monitor and control incoming and outgoing network traffic"
},
{
    question: "What does HTTP stand for?",
    answers: ["Hyper Text Transfer Protocol", "Hyper Text Transmission Protocol", "Hyper Tool Transfer Protocol", "Hyper Text Transfer Program"],
    correct: "Hyper Text Transfer Protocol"
},
{
    question: "Which of the following is a database management system?",
    answers: ["MySQL", "HTML", "CSS", "JavaScript"],
    correct: "MySQL"
},
{
    question: "What is the purpose of an IP address?",
    answers: ["To identify a device on a network", "To store data", "To encrypt data", "To speed up the internet"],
    correct: "To identify a device on a network"
},
{
    question: "Which of the following is an example of open-source software?",
    answers: ["Linux", "Windows", "macOS", "Adobe Photoshop"],
    correct: "Linux"
},
{
    question: "What does RAM stand for in computer terminology?",
    answers: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Rapid Access Memory"],
    correct: "Random Access Memory"
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