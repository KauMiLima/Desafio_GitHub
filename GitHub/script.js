window.onload = () => {
  const user = localStorage.getItem("githubUser");
  if (user) {
    document.getElementById("search").value = user;
    buscarRepos();
  }

 document.getElementById("search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      buscarRepos();
    }
  });
};

function buscarRepos() {
  const username = document.getElementById("search").value.trim();
  if (!username) return;


  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((user) => {
      document.getElementById("perfil").innerHTML = `
        <div class="debatata">
          <img src="${user.avatar_url}" width="80" style="border-radius:50%"><br>
        </div>
        <section class="pandequeijo">
          <strong>${user.name || user.login}</strong><br>
          <p>${user.bio || "Bio não informada"}</p>

          <div class="icons">
          <p>👥 Seguidores: ${user.followers}</p>
          <p>➡️ Seguindo: ${user.following}</p>
            <p>📍 ${user.location || "Localização não informada"}</p>
          </div>
        </section>
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
            <strong class="repo-text">${repo.name}</strong><br>
            <p class="star">⭐ Estrelas: ${repo.stargazers_count}</p>
             <a href="${repo.html_url}" target="_blank">
            <button class="btn-repo">Ver no GitHub</button>
          </a>
          </div>
        `;
      });
    });
}
