const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const homeButton = document.getElementById('home-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  homeButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    homeButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    homeButton.innerText = 'Home'
    startButton.classList.remove('hide')
    homeButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Welche Einrichtung findet man in der Mensa?',
    answers: [
      { text: 'Career Service', correct: false },
      { text: 'Infothek', correct: false },
      { text: 'Studentenwerk', correct: true },
      { text: 'Prüfungsamt', correct: false }
    ]
  },
  {
    question: 'Wie viele Lehstühle befinden sich in der Langen Gasse?',
    answers: [
      { text: '36', correct: true },
      { text: '42', correct: false },
      { text: '30', correct: false },
      { text: '9', correct: false }
    ]
  },
  {
    question: 'Welcher ist der größte Hörsaal in der Langen Gasse? ',
    answers: [
      { text: 'H1', correct: false },
      { text: 'H2', correct: false },
      { text: 'H6', correct: false },
      { text: 'H4', correct: true }
    ]
  },
  {
    question: 'Welche Farbe haben die Tische und Stühle im H4? ',
    answers: [
      { text: 'rot', correct: false },
      { text: 'gelb', correct: true },
      { text: 'weiß', correct: false },
      { text: 'braun', correct: false }
    ]
  },
  {
    question: 'Wo befindet sich das Studierendencafe "der Trichter?"',
    answers: [
      { text: 'Lange Gasse', correct: false },
      { text: 'Mensa', correct: false },
      { text: 'Findelgasse', correct: true },
      { text: 'Innenstadt', correct: false }
    ]
  },
  {
    question: 'Wieviele CIP-Pools befinden sich in der Langen Gasse?',
    answers: [
      { text: 'vier', correct: true },
      { text: 'zwei', correct: false },
      { text: 'drei', correct: false },
      { text: 'fünf', correct: false }
    ]
  },
  {
    question: 'Wo befindet sich die Mensa?',
    answers: [
      { text: 'Hans-Sachs Platz', correct: false },
      { text: 'Andrej-Sacharow Platzer', correct: true },
      { text: 'Albrecht-Dürer Platz', correct: false },
      { text: 'Aufseßplatz', correct: false }
    ]
  },
  {
    question: 'Was kann man in der Mensa NICHT machen?',
    answers: [
      { text: 'Zu Mittag essen', correct: false },
      { text: 'Prüfungen schreiben', correct: false },
      { text: 'Fau-Card aufladen', correct: false },
      { text: 'Fau-Card validieren', correct: true}
    ]
  },
  {
    question: 'Welches Café ist am nächsten zur Langen Gasse?',
    answers: [
      { text: 'Café Opa Helmut', correct: false },
      { text: 'Basement 11', correct: false },
      { text: 'White Bulldog', correct: true },
      { text: 'Ludwigs Bar & Café', correct: false }
    ]
  },
  {
    question: 'Welcher dieser Lehrstühle befindet sich NICHT an der Findelgasse?',
    answers: [
      { text: 'Juniorprofessur für Wirtschaftspsychologie', correct: true },
      { text: 'Professur für Wirtschaftspädagogik', correct: false },
      { text: 'Professur für Gesundheitsökonomie', correct: false },
      { text: 'Lehrstuhl für Kommunikationswissenschaften', correct: false }
    ]
  },
]