const searchByCity = () => {
  // When the user clicks on the search button:
  // - Get the city
  //   - Find the DOM element of the input field
  let inputField = document.querySelector('.selected-city')
  //   - Read the user input from that field
  //   - Save that in a variable called "selectedCity"
  let selectedCity = inputField.value
  //   - Build a URL with the "selectedCity" and API key
  let cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&APPID=02b2a9ead3ec838a723d7f65a90a6b6e&units=imperial`
  fetch(cityURL) // <-----this is the promise, let promise = fetch(cityURL)
    .then(response => response.json()) // <----The response is what the promise returns, which we covert to json
    .then(weatherData => {
      console.log(`Showing weather for ${selectedCity}`)
      // Do whatever we want under this
      let weatherList = document.querySelector('.weather-list')

      let temperature = document.createElement('p')
      temperature.textContent = `Temperature: ${weatherData.main.temp}˚F`
      weatherList.appendChild(temperature)

      let hiTemp = document.createElement('p')
      hiTemp.textContent = `High: ${weatherData.main.temp_max}˚F`
      weatherList.appendChild(hiTemp)

      let lowTemp = document.createElement('p')
      lowTemp.textContent = `Low: ${weatherData.main.temp_min}˚F`
      weatherList.appendChild(lowTemp)

      let humidity = document.createElement('p')
      humidity.textContent = `Humidity: ${weatherData.main.humidity}`
      weatherList.appendChild(humidity)
    })
}

const searchByZip = () => {
  let inputField = document.querySelector('.selected-zip')
  let selectedZip = inputField.value
  let zipURL = `https://api.openweathermap.org/data/2.5/weather?zip=${selectedZip}&APPID=02b2a9ead3ec838a723d7f65a90a6b6e&units=imperial`

  fetch(zipURL)
    .then(response => response.json())
    .then(weatherData => {
      console.log(`Showing weather for ${selectedZip}`)
      let weatherList = document.querySelector('.weather-list')

      let temperature = document.createElement('p')
      temperature.textContent = `Temperature: ${weatherData.main.temp}˚F`
      weatherList.appendChild(temperature)

      let hiTemp = document.createElement('p')
      hiTemp.textContent = `High: ${weatherData.main.temp_max}˚F`
      weatherList.appendChild(hiTemp)

      let lowTemp = document.createElement('p')
      lowTemp.textContent = `Low: ${weatherData.main.temp_min}˚F`
      weatherList.appendChild(lowTemp)

      let humidity = document.createElement('p')
      humidity.textContent = `Humidity: ${weatherData.main.humidity}`
      weatherList.appendChild(humidity)

      console.log(weatherData.main.temp)
      console.log(weatherData)
    })
}

const main = () => {
  let citySearchButton = document.querySelector('.city-search')
  citySearchButton.addEventListener('click', searchByCity)

  let zipSearchButton = document.querySelector('.zip-search')
  zipSearchButton.addEventListener('click', searchByZip)
}

document.addEventListener('DOMContentLoaded', main)
