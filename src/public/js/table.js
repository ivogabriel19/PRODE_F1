async function cargarLeaderboard() {
  const res = await fetch("/api/users/leaderboard");
  const data = await res.json();
  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = "";
  data.forEach((user, index) => {
    tbody.innerHTML += ` 
                        <tr> 
                          <td>${index + 1}</td> 
                          <td>${user.username}</td> 
                          <td>${user.score}</td> 
                          <td>${user.exactMatches}</td> 
                          <td>${user.perfectPredictions}</td> 
                        </tr> `;
  });
}
cargarLeaderboard();