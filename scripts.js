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

    const categoryTitleDiv = document.createElement('div');
    categoryTitleDiv.className = 'category-title';

    const categoryTitleSpan = document.createElement('span');
    categoryTitleSpan.className = 'category-text';
    categoryTitleSpan.innerHTML = category.title.replace(/\n/g, '<br>'); // Adding <br> for line breaks

    categoryTitleDiv.appendChild(categoryTitleSpan);
    categoryDiv.appendChild(categoryTitleDiv);

    category.questions.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'jeopardy-question';

      const questionTextSpan = document.createElement('span');
      questionTextSpan.className = 'grid-content-text';
      questionTextSpan.innerHTML = `$${question.value}`.replace(/\n/g, '<br>'); // Adding <br> for line breaks

      questionDiv.appendChild(questionTextSpan);

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

  question = question.trim(); // Trim the question content
  answer = answer.trim(); // Trim the answer content

  const modal = document.createElement('div');
  modal.className = 'modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const questionHeader = document.createElement('h2');
  questionHeader.textContent = 'Answer';

  const questionText = document.createElement('p');
  questionText.className = 'question';
  questionText.textContent = question;

  modalContent.appendChild(questionHeader);
  modalContent.appendChild(questionText);
  modal.appendChild(modalContent);

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

  answer = answer.trim(); // Trim the answer content

  const modal = document.createElement('div');
  modal.className = 'modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const answerHeader = document.createElement('h2');
  answerHeader.textContent = 'Question';

  const answerText = document.createElement('p');
  answerText.className = 'answer';
  answerText.textContent = answer;

  modalContent.appendChild(answerHeader);
  modalContent.appendChild(answerText);
  modal.appendChild(modalContent);

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
