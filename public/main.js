const searchByCity = () => {
  let domUpdater = new DOMUpdater()
  let city = domUpdater.getUserInputForCity()

  let weatherAPI = new WeatherAPI()
  weatherAPI.fetchWeatherForCity(city)

  let weatherDisplay = new DOMUpdater()
  weatherDisplay.addForecastToDOM()
}

const searchByZip = () => {
  let domUpdater = new DOMUpdater()
  let zip = domUpdater.getUserInputForZip()

  let weatherAPI = new WeatherAPI()
  weatherAPI.fetchWeatherForCity(zip)

  let weatherDisplay = new DOMUpdater()
  weatherDisplay.addForecastToDOM()
}

const refreshSearch = () => {
  location.reload()
}

class DOMUpdater {
  constructor() {}

  getUserInputForCity() {
    let inputField = document.querySelector('.selected-city')
    return inputField.value
  }

  getUserInputForZip() {
    let inputField = document.querySelector('.selected-zip')
    return inputField.value
  }

  addForecastToDOM(temp, high, low, hum) {
    let weatherList = document.querySelector('.weather-list')
    weatherList.innerHTML = ''

    let temperature = document.createElement('p')
    temperature.textContent = `Temperature: ${temp}˚F`
    weatherList.appendChild(temperature)

    let hiTemp = document.createElement('p')
    hiTemp.textContent = `High: ${high}˚F`
    weatherList.appendChild(hiTemp)

    let lowTemp = document.createElement('p')
    lowTemp.textContent = `Low: ${low}˚F`
    weatherList.appendChild(lowTemp)

    let humidity = document.createElement('p')
    humidity.textContent = `Humidity: ${hum}`
    weatherList.appendChild(humidity)

    this.hideAllSearchOptions()
  }

  hideAllSearchOptions() {
    let findCityHeader = document.querySelector('.search-area')
    findCityHeader.classList.add('hidden')

    let resetButton = document.querySelector('.reset')
    resetButton.classList.remove('hidden')
  }
}

class WeatherAPI {
  constructor() {}

  fetchWeatherForCity(selectedCity) {
    let cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&APPID=02b2a9ead3ec838a723d7f65a90a6b6e&units=imperial`

    fetch(cityURL) // <-----this is the promise, let promise = fetch(cityURL)
      .then(response => response.json()) // <----The response is what the promise returns,
      .then(weatherData => {
        // get specific elements
        let temperature = weatherData.main.temp
        let hiTemp = weatherData.main.temp_max
        let lowTemp = weatherData.main.temp_min
        let humidity = weatherData.main.humidity

        let domUpdater = new DOMUpdater()
        domUpdater.addForecastToDOM(temperature, hiTemp, lowTemp, humidity)
      })
  }

  fetchWeatherForZip(selectedZip) {
    let zipURL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedZip}&APPID=02b2a9ead3ec838a723d7f65a90a6b6e&units=imperial`

    fetch(zipURL) // <-----this is the promise, let promise = fetch(cityURL)
      .then(response => response.json()) // <----The response is what the promise returns,
      .then(weatherData => {
        let temperature = weatherData.main.temp
        let hiTemp = weatherData.main.temp_max
        let lowTemp = weatherData.main.temp_min
        let humidity = weatherData.main.humidity

        let domUpdater = new DOMUpdater()
        domUpdater.addForecastToDOM(temperature, hiTemp, lowTemp, humidity)
      })
  }
}

const main = () => {
  let citySearchButton = document.querySelector('.city-search')
  citySearchButton.addEventListener('click', searchByCity)

  let zipSearchButton = document.querySelector('.zip-search')
  zipSearchButton.addEventListener('click', searchByZip)

  let resetButton = document.querySelector('.reset')
  resetButton.addEventListener('click', refreshSearch)
}

document.addEventListener('DOMContentLoaded', main)
