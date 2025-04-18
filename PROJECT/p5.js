const questions = [
  
  
  {
    question: "Who is known as the 'King of Bollywood'?",
    answers: ["Salman Khan", "Shah Rukh Khan", "Aamir Khan", "Akshay Kumar"],
    correct: "Shah Rukh Khan"
    },
    {
    question: "Which Bollywood movie is the highest-grossing of all time?",
    answers: ["Dangal", "Baahubali 2", "PK", "RRR"],
    correct: "Dangal"
    },
    {
    question: "Who is the music composer known as the 'Mozart of Madras'?",
    answers: ["A.R. Rahman", "Pritam", "Shankar-Ehsaan-Loy", "Vishal-Shekhar"],
    correct: "A.R. Rahman"
    },
    {
    question: "Which Bollywood actress is known as the 'Dream Girl'?",
    answers: ["Hema Malini", "Madhuri Dixit", "Sridevi", "Rekha"],
    correct: "Hema Malini"
    },
    {
    question: "Which Bollywood movie featured the song 'Chaiyya Chaiyya'?",
    answers: ["Dil Se", "Kabhi Khushi Kabhie Gham", "Kal Ho Naa Ho", "Lagaan"],
    correct: "Dil Se"
    },
    {
    question: "Who directed the movie '3 Idiots'?",
    answers: ["Rajkumar Hirani", "Karan Johar", "Sanjay Leela Bhansali", "Anurag Kashyap"],
    correct: "Rajkumar Hirani"
    },
    {
    question: "Which Bollywood actor is known as 'Mr. Perfectionist'?",
    answers: ["Aamir Khan", "Hrithik Roshan", "Ranbir Kapoor", "Ajay Devgn"],
    correct: "Aamir Khan"
    },
    {
    question: "Which movie won the first Filmfare Award for Best Film?",
    answers: ["Do Bigha Zamin", "Mother India", "Mughal-e-Azam", "Kismet"],
    correct: "Do Bigha Zamin"
    },
    {
    question: "Which Bollywood movie is based on the life of Milkha Singh?",
    answers: ["Bhaag Milkha Bhaag", "Mary Kom", "Dangal", "Chak De! India"],
    correct: "Bhaag Milkha Bhaag"
    },
    {
    question: "Who played the role of 'Gabbar Singh' in the movie 'Sholay'?",
    answers: ["Amjad Khan", "Dharmendra", "Sanjeev Kumar", "Amitabh Bachchan"],
    correct: "Amjad Khan"
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