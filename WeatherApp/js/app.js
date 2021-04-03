class AjaxWeather {
  constructor() {
    this.apiKey = ``
  }
  async getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
}
class UI {
  constructor() {
    this.results = document.querySelector('.results')
    this.cityName = document.querySelector('#cityName')
    this.cityCountry = document.querySelector('#cityCountry')
    this.cityIcon = document.querySelector('#cityIcon')
    this.cityTemperature = document.querySelector('#cityTemp')
    this.cityHumidity = document.querySelector('#cityHumidity')
  }
  showFeedback(text) {
    const feedback = document.querySelector('.feedback')
    feedback.classList.add('showItem')
    feedback.innerHTML = `<p>${text}</p>`

    setTimeout(() => {
      feedback.classList.remove('showItem')
    }, 2000)
  }
  showWeather(data) {
    const {
      name,
      sys: { country },
      main: { temp, humidity },
    } = data
    const { icon } = data.weather[0]

    this.results.classList.add('showItem')

    this.cityName.textContent = name
    this.cityCountry.textContent = country
    this.cityTemperature.textContent = temp
    this.cityHumidity.textContent = humidity
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`
  }
}
;(function () {
  const form = document.querySelector('#wheatherForm')
  const cityInput = document.querySelector('#cityInput')

  const ajax = new AjaxWeather()
  const ui = new UI()
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = cityInput.value
    if (!city) {
      ui.showFeedback('You need to enter a city name')
    } else {
      ajax.getWeather(city).then((data) => {
        data.message === 'city not found'
          ? ui.showFeedback('city with such nama cannot be found')
          : ui.showWeather(data)
      })
    }
  })
})()
