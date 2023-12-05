document.addEventListener('DOMContentLoaded', function () {
  // Get the modal elements
  const questionModal = document.getElementById('questionModal');
  const answerModal = document.getElementById('answerModal');

  // Function to open question modal
  function openQuestionModal(category, value, question, questionMedia) {
    // Set the question modal content
    document.getElementById('questionHeader').innerText = `${category} - $${value}`;
    document.getElementById('question').innerText = question;
    document.getElementById('questionMedia').innerHTML = questionMedia;

    // Display the question modal
    questionModal.style.display = 'block';

    // Example event listener for an answer button click in the question modal
    const showAnswerButton = document.getElementById('showAnswerButton');
    showAnswerButton.addEventListener('click', function () {
      const answer = document.getElementById('answer').innerText; // Gets the answer content from the answer modal
      const answerMedia = document.getElementById('answerMedia').innerHTML; // Gets the answer media from the answer modal

      // Now you can use these retrieved values as needed
      console.log("Category:", category);
      console.log("Value:", value);
      console.log("Answer:", answer);
      console.log("Answer Media:", answerMedia);

      // Call the function to open the answer modal
      openAnswerModal(category, value, answer, answerMedia);
    });
  }

  // Function to open answer modal
  function openAnswerModal(category, value, answer, answerMedia) {
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

});
