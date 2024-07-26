
// IQ test app all constant's
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const check = document.querySelector('.check');
const header = document.querySelector('.header');
const timer = document.querySelector('.timer');


const quiz = [
    {
        question: "Q1. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "boder-radius", "boder-collapse"],
        answer: "margin"
    },
    {
        question: "Q2. Which of the following is not a CSS box model property?",
        choices: ["left", "right", "top", "bottom"],
        answer: "right"
    },
    {
        question: "Q3. Which of the following is not a CSS box model property?",
        choices: ["a", "b", "c", "d"],
        answer: "b"
    },
    {
        question: "Q5. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "boder-radius", "boder-collapse"],
        answer: "boder-radius"
    }
];

// Function to show progress bar
const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / timer) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

// Create varables for question 
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 10;
let timerID = null;

// Arrow call function to show new question on click next button
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    // add question
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    // add options 
    for(let i=0; i<questionDetails.choices.length; i++){
        const currentchoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentchoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });

        if(currentQuestionIndex < quiz.length){
            startTimer();
        }
    }

    // console.log(questionDetails);
}

// Function to check correct answer
const checkAnswer = () => {
    const selectedchoice = document.querySelector('.choice.selected');
    if(selectedchoice.textContent === quiz[currentQuestionIndex].answer){
        // alert("Correct Answer!");
        displayalert(`Correct Answer!`);
        score++;
    }
    else{
        // alert("Wrong Answer!");
        displayalert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 10;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
    }    
}


// Function to show score
const showScore = () =>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Rewarded ${score} out of ${quiz.length}!`;
    displayalert("You have completed this test!");
    header.textContent = "Completed"
    nextBtn.textContent = "Try Again";
    quizOver = true;
    timer.style.display = "none";
}

// function to show grade 

// Function to show alert
const displayalert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}
// Function to start timer
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;
    const countDown = () =>{
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 3) {
            playAdudio("countdown.mp3");
          }
        if(timeLeft === 0){
            const conFirmUser = confirm("Time Over! Do you want to try again");
            if(conFirmUser){
                timeLeft = 10;
                startQuiz();
            }
            else{
                check.style.display = "block";
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to stop timer 
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// function to hide Next Button while select option


// Function to start test
const startQuiz = () =>{
    timeLeft = 10;
    timer.style.display = "flex";
    shuffleQuestions();
    header.textContent = "Please take your time and test";
} 

// Adding Event Listener to start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    check.style.display = "none";
    startQuiz();
});


// Function to add question click on next button
nextBtn.addEventListener('click', ()=>{
    const selectedchoice = document.querySelector('.choice.selected');
    if(!selectedchoice && nextBtn.textContent === "Next"){
        // alert("Select your answer!");
        displayalert("Select the answer!");
        return;
    }
    if(quizOver){
        // currentQuestionIndex = 0;
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
    
});