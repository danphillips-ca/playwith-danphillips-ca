document.addEventListener('DOMContentLoaded', function () {
  fetch('jeopardy_data.json')
    .then(response => response.json())
    .then(data => displayJeopardyBoard(data.categories));
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
        alert(question.question); // Show the question on click (replace with your logic)
      });

      categoryDiv.appendChild(questionDiv);
    });

    jeopardyBoard.appendChild(categoryDiv);
  });
}
