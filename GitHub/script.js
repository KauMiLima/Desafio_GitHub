window.onload = () => {
  const user = localStorage.getItem("githubUser");
  if (user) {
    document.getElementById("search").value = user;
    buscarRepos();
  }
};

function buscarRepos() {
  const username = document.getElementById("search").value.trim();
  if (!username) return;

  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((user) => {
      document.getElementById("perfil").innerHTML = `
        <img src="${user.avatar_url}" width="80" style="border-radius:50%"><br>
        <strong>${user.name || user.login}</strong><br>
        <p>${user.bio || "Undefined"}</p>
      `;
    });

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((repos) => {
      const reposDiv = document.getElementById("repos");
      reposDiv.innerHTML = "";
      repos.forEach((repo) => {
        reposDiv.innerHTML += `
          <div class="repo-card">
            <strong class="repo-text">${repo.name}</strong>
           <p class="star">⭐ ${repo.stargazers_count}
          </div>
        `;
      });
    });
}
