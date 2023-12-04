// Fetching data from the JSON file
fetch('users.json')
  .then(response => response.json())
  .then(data => {
    // Sort the data by score in descending order
    data.sort((a, b) => b.score - a.score);

    // Extracting the top 3 users
    const topThreeUsers = data.slice(0, 3);

    // Displaying the top 3 users and their scores
    const userScoresContainer = document.getElementById('userScores');

    topThreeUsers.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `<p><strong>${user.username}</strong>: ${user.score} points</p>`;
      userScoresContainer.appendChild(userDiv);
    });
  })
  .catch(error => {
    console.log('Error fetching data:', error);
  });
