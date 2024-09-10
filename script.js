const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Lisbon", correct: false }
      ]
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answers: [
        { text: "Harper Lee", correct: true },
        { text: "Mark Twain", correct: false },
        { text: "Ernest Hemingway", correct: false },
        { text: "F. Scott Fitzgerald", correct: false }
      ]
    },
    // Add more questions as needed
  ];
  
  const questionContainer = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const resultContainer = document.getElementById('result-container');
  const scoreElement = document.getElementById('score');
  const restartButton = document.getElementById('restart-btn');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
    showQuestion(questions[currentQuestionIndex]);
  }                              
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
      score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      showResult();
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  function showResult() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = `Your score: ${score}`;
  }
  
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add('hide');
  });
  
  restartButton.addEventListener('click', startQuiz);
  
  startQuiz();
  