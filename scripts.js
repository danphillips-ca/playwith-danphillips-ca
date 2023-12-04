// Fetching and processing JSON data
fetch('gamedata/gamedata.json')
  .then(response => response.json())
  .then(data => {
    const jeopardyTable = document.getElementById('jeopardyTable');
    const categoriesRow = jeopardyTable.querySelector('thead tr');
    const body = jeopardyTable.querySelector('tbody');

    // Populate category titles in the top row
    data.categories.forEach(category => {
      categoriesRow.innerHTML += `<th>${category.title}</th>`;
    });

    // Populate dollar values and cells
    data.categories.forEach(category => {
      const categoryQuestions = category.questions;
      categoryQuestions.forEach(question => {
        const cell = document.createElement('td');
        cell.textContent = `$${question.value}`;
        cell.addEventListener('click', () => openQuestionModal(category.title, question));
        body.appendChild(cell);
      });
    });
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to open question modal
function openQuestionModal(category, question) {
  const questionModal = document.getElementById('questionModal');
  const questionHeader = document.getElementById('questionHeader');
  const questionContent = document.getElementById('question');
  const questionMedia = document.getElementById('questionMedia');

  questionHeader.textContent = `${category} - $${question.value}`;
  questionContent.textContent = question.question;
  questionMedia.innerHTML = question['question-media'] || '';

  questionModal.style.display = 'block';

  // Event listener to open answer modal when question modal is clicked
  questionModal.addEventListener('click', () => openAnswerModal(category, question), { once: true });

  // Close the modal when clicking the close button
  const closeModal = questionModal.querySelector('.close');
  closeModal.addEventListener('click', () => {
    questionModal.style.display = 'none';
  });
}

// Function to open answer modal
function openAnswerModal(category, question) {
  const answerModal = document.getElementById('answerModal');
  const answerHeader = document.getElementById('answerHeader');
  const answerContent = document.getElementById('answer');
  const answerMedia = document.getElementById('answerMedia');

  answerHeader.textContent = `${category} - $${question.value}`;
  answerContent.textContent = question.answer;
  answerMedia.innerHTML = question['answer-media'] || '';

  answerModal.style.display = 'block';

  // Close the modal when clicking the close button
  const closeModal = answerModal.querySelector('.close');
  closeModal.addEventListener('click', () => {
    answerModal.style.display = 'none';
  });
}
