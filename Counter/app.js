const decrease = document.querySelector('.decrease')
// const increase = document.querySelector('.increase')
// const reset = document.querySelector('.reset')
const value = document.getElementById('value')
const btns = document.querySelectorAll('.btn')
let count = 0

btns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const styles = e.currentTarget.classList
    if (styles.contains('decrease')) {
      count--
    } else if (styles.contains('increase')) {
      count++
    } else {
      count = 0
    }
    value.textContent = count
  })
})
// function increaseFunc() {
//   return (count = count + 1)
// }
// function decreaseFunc() {
//   return (count = count - 1)
// }
// function resetFunc() {
//   return (count = 0)
// }
// decrease.addEventListener('click', function () {
//   decreaseFunc()
//   value.textContent = count
// })
// increase.addEventListener('click', function () {
//   increaseFunc()
//   value.textContent = count
// })
// reset.addEventListener('click', function () {
//   resetFunc()
//   value.textContent = count
// })
