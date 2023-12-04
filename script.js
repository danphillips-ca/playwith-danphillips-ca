document.addEventListener('DOMContentLoaded', function() {
  const categoryTitles = document.querySelector('.category-titles');
  const questionValues = document.querySelector('.question-values');
  const modal = document.querySelector('.modal-content');
  const modalTitle = document.querySelector('.modal-title');
  const questionText = document.querySelector('.question-text');
  const questionMedia = document.querySelector('.question-media');
  const answerText = document.querySelector('.answer-text');
  const answerMedia = document.querySelector('.answer-media');
  const modalClose = document.querySelector('.modal-close');

  let data; // Variable to hold the loaded JSON data

  // Fetch JSON data
  fetch('gamedata/gamedata.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;

      // Populate category titles
      data.categories.forEach(category => {
        categoryTitles.innerHTML += `<div>${category.title}</div>`;
      });

      // Populate question values
      data.categories[0].questions.forEach(question => {
        questionValues.innerHTML += `<div data-value="${question.value}">$${question.value}</div>`;
      });

      // Handle click events on questions
      const questions = document.querySelectorAll('.question-values div');
      questions.forEach(question => {
        question.addEventListener('click', () => {
          const value = question.getAttribute('data-value');
          const category = data.categories[0].title; // You can update this to fetch the relevant category

          // Find the selected question
          const selectedQuestion = data.categories.find(cat => cat.title === category)
            .questions.find(q => q.value.toString() === value);

          // Populate the modal with question data
          modalTitle.textContent = `Category: ${category} - Value: $${value}`;
          questionText.textContent = selectedQuestion.question;
          questionMedia.innerHTML = selectedQuestion['question-media'];

          // Show the modal
          modal.style.display = 'block';
        });
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  // Handle modal close button
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal if clicked outside the content
  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
