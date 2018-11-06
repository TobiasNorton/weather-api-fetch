const searchByCity = () => {
  // Get the value of the user input, which takes place in the DOM
  let domUpdater = new DOMUpdater()
  let city = domUpdater.getUserInputForCity()
  // Use the user's click to fetch the data for that city input
  let weatherAPI = new WeatherAPI()
  weatherAPI.fetchWeatherForCity(city)
  // Display the forecast to the user (in the DOM)
  let weatherDisplay = new DOMUpdater()
  weatherDisplay.addForecastToDOM()
}

const searchByZip = () => {
  let domUpdater = new DOMUpdater()
  let zip = domUpdater.getUserInputForZip()
  let weatherAPI = new WeatherAPI()
  weatherAPI.fetchWeatherForCity(zip)
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
}

document.addEventListener('DOMContentLoaded', main)
