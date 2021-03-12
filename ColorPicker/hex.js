const btn = document.getElementById('btn')
const color = document.querySelector('.color')

btn.addEventListener('click', function () {
  document.body.style.backgroundColor = colour()
  color.textContent = colour()
})

function colour() {
  return `#${Math.random().toString(16).substring(2, 8)}`
}
