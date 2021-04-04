const searchForm = document.querySelector('#searchForm')
const searchUser = document.querySelector('#searchUser')
const userList = document.querySelector('#github-users')

class Github {
  constructor() {
    this.client_id = 'cefbe7d62dcf9565a80a'
    this.client_secret = 'd677ece5487e75e06eae964a8e1ff730c179dd04'
    this.base = 'https://api.github.com/users/'
  }

  async ajaxUser(userValue) {
    //user url
    const userURL = `${this.base}${userValue}?client_id='${this.client_id}'$client_secret='${this.client_secret}'`
    //repos url
    const reposURL = `${this.base}${userValue}/repos?client_id='${this.client_id}'$client_secret='${this.client_secret}'`
    const userData = await fetch(userURL)
    const user = await userData.json()
    const reposData = await fetch(reposURL)
    const repos = await reposData.json()

    return {
      user,
      repos,
    }
  }
}
class UI {
  constructor() {}
  showFeedback(text) {
    const feedback = document.querySelector('.feedback')
    feedback.classList.add('showItem')
    feedback.innerHTML = `<p>${text}</p>`

    setTimeout(() => {
      feedback.classList.remove('showItem')
    }, 2000)
  }
  displayUser(image, link, repos, name, login) {
    const div = document.createElement('div')
    div.classList.add('row', 'single-user', 'my-3')
    div.innerHTML = `
      <div class=" col-sm-6 col-md-4 user-photo my-2">
       <img src="${image}" class="img-fluid" alt="">
      </div>
      <div class="col-sm-6 col-md-4 user-info text-capitalize my-2">
       <h6>name : <span>${name}</span></h6>
       <h6>blog : <a href="#" class="badge badge-primary">blog</a> </h6>
       <h6>github : <a href="#" class="badge badge-primary">${link}</a> </h6>
       <h6>public repos : <span class="badge badge-success">${repos}</span> </h6>
      </div>
      <div class=" col-sm-6 col-md-4 user-repos my-2">
       <button type="button" data-id="${login}" id="getRepos" class="btn reposBtn text-capitalize mt-3">
        get repos
       </button>
      </div>
    `
    userList.appendChild(div)
  }
  displayRepos(userID, repos) {
    const reposBtn = document.querySelectorAll('[data-id]')
    reposBtn.forEach((btn) => {
      if (userID === btn.dataset.id) {
        const parent = btn.parentElement

        repos.forEach((repo) => {
          const p = document.createElement('p')
          p.innerHTML = `<p><a href='${repo.html_url}' target="_blank">${repo.name}</a></p>`
          parent.appendChild(p)
        })
      }
    })
  }
  getUser(user) {
    const {
      avatar_url: image,
      html_url: link,
      public_repos: repos,
      name,
      login,
      message,
    } = user
    message === 'Not Found'
      ? this.showFeedback('Please enter a valid user')
      : this.displayUser(image, link, repos, name, login)
  }
}

;(function () {
  const ui = new UI()
  const github = new Github()

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = searchUser.value
    if (!query) {
      ui.showFeedback('You need to enter a user')
    } else {
      github
        .ajaxUser(query)
        .then((data) => ui.getUser(data.user))
        .catch((error) => console.log(error))
    }
  })
  userList.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('reposBtn')) {
      let id = e.target.dataset.id
      github
        .ajaxUser(id)
        .then((data) => ui.displayRepos(id, data.repos))
        .catch((error) => console.log(error))
    }
  })
})()
