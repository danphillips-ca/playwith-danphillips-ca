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

  // Fetch the usernames from the JSON file
  fetch('scoreboards/users.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(users => {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <h2>Question</h2>
          <p class="answer">${answer}</p>
          <div class="user-buttons"></div>
        </div>
      `;
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';

      // Create buttons for each user
      const userButtonsDiv = modal.querySelector('.user-buttons');
      users.slice(0, 3).forEach(user => {
        const button = document.createElement('button');
        button.textContent = user.username;
        button.className = 'user-button';
        button.addEventListener('click', () => handleUserSelection(user.username, answer));
        userButtonsDiv.appendChild(button);
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the usernames:', error);
      // Handle error loading usernames
    });

  modal.addEventListener('click', function () {
    closeModal();
  });
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

function handleUserSelection(username, answer) {
  fetch('scoreboards/users.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(users => {
      const selectedUser = users.find(user => user.username === username);
      if (selectedUser) {
        // Update the user's score by adding the dollar amount (parsing it from the answer)
        const dollarAmount = parseInt(answer.replace('$', ''), 10);
        selectedUser.score += dollarAmount;

        // Here, you might want to update the user's score on your server/database.
        // For this example, let's assume it's being handled on the client-side only.

        // Log the updated user score
        console.log(`User "${username}" selected. Answer: ${answer}. Updated score: ${selectedUser.score}`);
      } else {
        console.error(`User "${username}" not found.`);
      }
      closeModal();
    })
    .catch(error => {
      console.error('There was a problem fetching the usernames:', error);
      // Handle error loading usernames or updating scores
      closeModal();
    });
}

