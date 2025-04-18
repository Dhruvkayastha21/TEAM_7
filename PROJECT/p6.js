const questions = [
  
  
  {
    question: "Who was the first President of India?",
    answers: ["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel"],
    correct: "Dr. Rajendra Prasad"
  },
  {
    question: "In which year did India gain independence?",
    answers: ["1945", "1947", "1950", "1952"],
    correct: "1947"
  },
  {
    question: "Who is known as the 'Father of the Indian Constitution'?",
    answers: ["B. R. Ambedkar", "Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose"],
    correct: "B. R. Ambedkar"
  },
  {
    question: "Which movement was led by Mahatma Gandhi in 1942?",
    answers: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement", "Salt Satyagraha"],
    correct: "Quit India Movement"
  },
  {
    question: "Who was the founder of the Maurya Empire?",
    answers: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"],
    correct: "Chandragupta Maurya"
  },
  {
    question: "Which Indian king embraced Buddhism after the Kalinga War?",
    answers: ["Chandragupta Maurya", "Ashoka", "Harsha", "Samudragupta"],
    correct: "Ashoka"
  },
  {
    question: "Who was the first Governor-General of independent India?",
    answers: ["Lord Mountbatten", "C. Rajagopalachari", "Jawaharlal Nehru", "Sardar Patel"],
    correct: "Lord Mountbatten"
  },
  {
    question: "Which Mughal emperor built the Taj Mahal?",
    answers: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
    correct: "Shah Jahan"
  },
  {
    question: "Who was the leader of the 1857 Revolt in Kanpur?",
    answers: ["Rani Lakshmibai", "Tantia Tope", "Nana Sahib", "Bahadur Shah Zafar"],
    correct: "Nana Sahib"
  },
  {
    question: "Which Indian freedom fighter is known as the 'Iron Man of India'?",
    answers: ["Mahatma Gandhi", "Sardar Patel", "Subhas Chandra Bose", "Jawaharlal Nehru"],
    correct: "Sardar Patel"
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