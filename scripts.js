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

function showQuestionModal(question) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <h2>Question</h2>
      <p>${question}</p>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = ''; // Enable scrolling when modal is closed
  }
}
