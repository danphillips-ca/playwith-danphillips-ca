User
// Create an object to keep track of selected questions
const selectedQuestions = {};

document.addEventListener('DOMContentLoaded', function () {
  fetch('jeopardy_data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => displayJeopardyBoard(data.categories))
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
      const jeopardyBoard = document.getElementById('jeopardyBoard');
      jeopardyBoard.innerHTML = 'Failed to load Jeopardy game data. Please try again later.';
    });
});

function displayJeopardyBoard(categories) {
  const jeopardyBoard = document.getElementById('jeopardyBoard');

  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'jeopardy-category';
    categoryDiv.textContent = category.title;

    category.questions.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'jeopardy-question';
      questionDiv.textContent = `$${question.value}`;

      if (selectedQuestions[question.value]) {
        questionDiv.classList.add('question-selected');
        questionDiv.removeEventListener('click', handleClick);
      } else {
        questionDiv.addEventListener('click', handleClick);
      }

      function handleClick() {
        selectedQuestions[question.value] = true;
        questionDiv.classList.add('question-selected');

        showQuestionModal(question.question, question.answer);
        questionDiv.removeEventListener('click', handleClick);
      }

      categoryDiv.appendChild(questionDiv);
    });

    jeopardyBoard.appendChild(categoryDiv);
  });
}

let questionModal = null; // Variable to store the current question modal

function showQuestionModal(question, answer) {
  closeModal();

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Answer</h2>
      <p class="question">${question}</p>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  questionModal = modal;

  modal.addEventListener('click', function () {
    showAnswerModal(answer);
  });
}

function showAnswerModal(answer) {
  if (questionModal !== null) {
    questionModal.remove();
    questionModal = null;
  }

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Question</h2>
      <p class="answer">${answer}</p>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  modal.addEventListener('click', function () {
    closeModal();
  });
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
    if (questionModal !== null) {
      questionModal.remove();
      questionModal = null;
    }
  }
}
