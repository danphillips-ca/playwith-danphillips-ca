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

      questionDiv.addEventListener('click', function () {
        showQuestionModal(question.question);
      });

      categoryDiv.appendChild(questionDiv);
    });

    jeopardyBoard.appendChild(categoryDiv);
  });
}

let questionModal = null; // Variable to store the current question modal

function showQuestionModal(question, answer) {
  closeModal(); // Close any existing modal before displaying a new one

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Question</h2>
      <p class="question">${question}</p>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open

  questionModal = modal; // Store the reference to the current question modal

  modal.addEventListener('click', function () {
    showAnswerModal(answer); // Pass the answer to showAnswerModal
  });
}

function showAnswerModal(answer) {
  if (questionModal !== null) {
    questionModal.remove(); // Close the question modal
    questionModal = null; // Reset the reference to the question modal
  }

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Answer</h2>
      <p class="answer">${answer}</p>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open

  modal.addEventListener('click', function () {
    closeModal();
  });
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = ''; // Enable scrolling when modal is closed
    if (questionModal !== null) {
      questionModal.remove(); // Close the question modal if it exists
      questionModal = null; // Reset the reference to the question modal
    }
  }
}
