// Fetching data from the JSON file
fetch('scoreboard/users.json')
  .then(response => response.json())
  .then(data => {
    // Sort the data by username alphabetically
    data.sort((a, b) => a.username.localeCompare(b.username));

    // Displaying the users and their scores in three columns
    const columns = [document.getElementById('column1'), document.getElementById('column2'), document.getElementById('column3')];

    // Distribute users evenly among columns
    const usersPerColumn = Math.ceil(data.length / columns.length);

    data.forEach((user, index) => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `<p><strong>${user.username}</strong></p><p>${user.score} points</p>`;

      // Calculate which column to place the user in
      const columnIndex = Math.floor(index / usersPerColumn);
      columns[columnIndex].appendChild(userDiv);
    });
  })
  .catch(error => {
    console.log('Error fetching data:', error);
  });
