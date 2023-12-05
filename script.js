document.addEventListener('DOMContentLoaded', function () {
  // Get the modal elements
  const questionModal = document.getElementById('questionModal');
  const answerModal = document.getElementById('answerModal');

  // Function to open question modal
  function openQuestionModal(category, value, question, questionMedia) {
    // Close the answer modal if it's open
    if (answerModal.style.display === 'block') {
      answerModal.style.display = 'none';
    }

    // Set the question modal content
    document.getElementById('questionHeader').innerText = `${category} - $${value}`;
    document.getElementById('question').innerText = question;
    document.getElementById('questionMedia').innerHTML = questionMedia;

    // Display the question modal
    questionModal.style.display = 'block';
  }

  // Function to open answer modal
  function openAnswerModal(category, value, answer, answerMedia) {
    // Close the question modal
    questionModal.style.display = 'none';

    // Set the answer modal content
    document.getElementById('answerHeader').innerText = `${category} - $${value}`;
    document.getElementById('answer').innerText = answer;
    document.getElementById('answerMedia').innerHTML = answerMedia;

    // Display the answer modal
    answerModal.style.display = 'block';
  }

  // Add event listeners or triggers for opening modals
  // For example, you can add event listeners to table cells or buttons

  // Example event listener for a table cell click
  const tableCells = document.querySelectorAll('#jeopardyTable tbody td');
  tableCells.forEach(cell => {
    cell.addEventListener('click', function () {
      const category = this.dataset.category;
      const value = parseInt(this.dataset.value);
      const question = this.dataset.question;
      const questionMedia = this.dataset.questionMedia;
      
      openQuestionModal(category, value, question, questionMedia);
    });
  });

  // Example event listener for an answer button click in the question modal
  const showAnswerButton = document.getElementById('showAnswerButton');
  showAnswerButton.addEventListener('click', function () {
    const category = /* Get category */;
    const value = /* Get value */;
    const answer = /* Get answer */;
    const answerMedia = /* Get answer media */;
    
    openAnswerModal(category, value, answer, answerMedia);
  });
});
