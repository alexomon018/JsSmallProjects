//select elements

const loading = document.querySelector('.loading')
const searchForm = document.getElementById('searchForm')
const output = document.querySelector('.output')
const search = document.getElementById('search')
const feedback = document.querySelector('.feedback')

const base = `https://en.wikipedia.org/w/api.php`
const url = `?action=query&format=json&origin=*&list=search&srsearch=`

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const value = search.value
  if (!value) {
    showFeedback('Please enter a valid search value')
  } else {
    search.value = ''
    // request

    ajaxWiki(value)
  }
})

//showFeedback
function showFeedback(text) {
  feedback.classList.add('showItem')
  feedback.innerHTML = `<p>${text}</p>`
  setTimeout(() => {
    feedback.classList.remove('showItem')
  }, 2000)
}
function ajaxWiki(value) {
  output.innerHTML = ''
  showLoading(true)
  fetch(`${base}${url}${value}`)
    .then((response) => response.json())
    .then((response) => showData(response))
}
function showData(data) {
  const {
    query: { search },
  } = data
  const displayItems = search
    .map((item) => {
      return `
      <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
        <div class="card card-body">
          <h1 class="card-title blueText">${item.title}</h1>
          <p>${item.snippet}</p>
          <a href="${`https://en.wikipedia.org/wiki/${item.title}`}" target="_blank" class="my-2 text-capitalize">read
          more...</a>
          </div>
         </div>
         `
    })
    .join('')
  output.innerHTML = displayItems

  showLoading(false)
}

function showLoading(isLoading) {
  isLoading
    ? loading.classList.add('showItem')
    : loading.classList.remove('showItem')
}
