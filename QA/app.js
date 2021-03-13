//using selectors inside the element
// const questions = document.querySelectorAll('.questions')

// questions.forEach((question) => {
//   const btn = question.querySelector('.question-btn')
//   btn.addEventListener('click', function () {
//     question.classList.toggle('show-text')
//     questions.forEach(function (item) {
//       if (item !== question) {
//         item.classList.remove('show-text')
//       }
//     })
//   })
// })
// traversing the dom

const btns = document.querySelectorAll('.question-btn')

btns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const question = e.currentTarget.parentElement.parentElement
    question.classList.toggle('show-text')
  })
})
