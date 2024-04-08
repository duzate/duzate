const ApiUrl = 'https://api.github.com/users/duzate';
const ReposUrl = 'https://api.github.com/users/duzate/repos';
const div = document.querySelector('.projects')
const AvatarUser = document.querySelectorAll('.avatar');

const getUser = async () => {
  const response = await fetch(ApiUrl)
  const userData = await response.json()
  return userData
}

const userProfile = async () => {
  const user = await getUser()
  AvatarUser.forEach(
    element => {
      element.src = user.avatar_url
      element.alt = user.login
    }
  )
}

userProfile();

const getRepos = async () => {
  const response = await fetch(ReposUrl)
  const repoData = await response.json()
  return repoData
}

const projectCard = (repo, limit) => repo.slice(0, limit).map(item =>
  `
  <a href="${item.html_url}" class="project">
  <div class="header-project">
  <img class="svg-img" src="./image/folder.svg" alt="folder">
      <span class="title-project">${item.name}</span>
      </div>
      <p class="description">
      ${item.description === null ? ' ' : item.description}
      </p>
      <div class="footer">
      <div class="states">
      <div class="stars">
      <img class="svg-img" src="image/star.svg" alt="stars">
      <span>${item.stargazers_count}</span>
      </div>
      <div class="branch">
      <img class="svg-img" src="image/git-branch.svg" alt="git-branch">
      <span>${item.forks_count}</span>
      </div>
      </div>
      <div class="program">
      <div class="program-color"></div>
      <span>${item.language}</span>
      </div>
      </div>
      </a>
      `
).join('')

const projectRender = async (limit) => {
  const repo = await getRepos()
  const projectTemplate = projectCard(repo, limit)
  div.innerHTML = projectTemplate
}

let visibleAll = true;
limit = 2;

const renderAll = (element) => {
  visibleAll = !visibleAll
  myFunction(visibleAll, element)
}

async function myFunction(visibleAll, element) {
  visibleAll ? element.textContent = "Mostrar todos" : element.textContent = "Mostrar menos"
  const repo = await getRepos()
  visibleAll ? limit = 2 : limit = repo.length
  projectRender(limit)
}

projectRender(limit)
