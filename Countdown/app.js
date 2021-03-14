const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')
let futureDate = new Date(2021, 2, 16, 11, 30, 0)
const futureTime = futureDate.getTime()
function getTheMonth() {
  const month = months.find((value, index) => {
    if (index === futureDate.getMonth()) {
      return value
    }
  })
  return month
}
function getTheDay() {
  const day = weekdays.find((value, index) => {
    if (index === futureDate.getDay()) {
      return value
    }
  })
  return day
}

giveaway.textContent = `giveaway ends on ${getTheDay()}, ${futureDate.getDate()} ${getTheMonth()} 
 ${futureDate.getFullYear()} ${futureDate.getHours()}:${futureDate.getMinutes()}am `

function getRemainingTime() {
  const today = new Date().getTime()
  const diff = futureTime - today

  //values in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000

  let days = Math.floor(diff / oneDay)
  let hours = Math.floor((diff % oneDay) / oneHour)
  let minutes = Math.floor((diff % oneHour) / oneMinute)
  let seconds = Math.floor((diff % oneMinute) / 1000)

  const values = [days, hours, minutes, seconds]
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`)
    }
    return item
  }
  items.forEach((item, index) => {
    item.textContent = format(values[index])
  })

  if (diff < 0) {
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class='expired'>sorry, this giveaway has expired</h4>`
  }
}

let countdown = setInterval(getRemainingTime, 1000)
getRemainingTime()
