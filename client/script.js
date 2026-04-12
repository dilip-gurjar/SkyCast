
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const cityName = document.getElementById('city-name')
const currentDate = document.getElementById('current-date')
const currentTemp = document.getElementById('current-temp')
const weatherDesc = document.getElementById('weather-desc')
const windSpeed = document.getElementById('wind-speed')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const feelsLike = document.getElementById('feels-like')
const visibility = document.getElementById('visibility')
const cloudCover = document.getElementById('cloud-cover')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const lastUpdate = document.getElementById('last-update')
const forecastContainer = document.getElementById('forecast-container')
const celsiusBtn = document.getElementById('celsius-btn')
const fahrenheitBtn = document.getElementById('fahrenheit-btn')

const today = new Date()
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
currentDate.textContent = today.toLocaleDateString('en-US', options)

let currentTempC = 0
let currentFeelsC = 0


const BASE_URL = "https://skylytics-backend.onrender.com" 


async function getWeather(city) {
    const url = `${BASE_URL}/weather?city=${city}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        cityName.textContent = data.name
        currentTempC = data.main.temp
        currentFeelsC = data.main.feels_like

        currentTemp.textContent = Math.round(currentTempC) + "°C"
        feelsLike.textContent = Math.round(currentFeelsC) + "°C"

        weatherDesc.textContent = data.weather[0].description
        windSpeed.textContent = data.wind.speed + " km/h"
        humidity.textContent = data.main.humidity + "%"
        pressure.textContent = data.main.pressure + " hPa"
        visibility.textContent = data.visibility / 1000 + " km"
        cloudCover.textContent = data.clouds.all + "%"

        const sunriseTime = new Date(data.sys.sunrise * 1000)
        const sunsetTime = new Date(data.sys.sunset * 1000)

        sunrise.textContent = sunriseTime.toLocaleTimeString()
        sunset.textContent = sunsetTime.toLocaleTimeString()

        const updateTime = new Date(data.dt * 1000)
        lastUpdate.textContent = updateTime.toLocaleTimeString()

    } catch (error) {
        alert("City not found or server error")
    }
}


async function getForecast(city) {
    forecastContainer.innerHTML = "<p>Forecast coming soon...</p>"
}


searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim()

    if (city) {
        getWeather(city)
        getForecast(city)
        searchInput.value = ""
    }
})


searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click()
    }
})


getWeather("Delhi")
getForecast("Delhi")


celsiusBtn.addEventListener("click", () => {
    celsiusBtn.classList.add("active")
    fahrenheitBtn.classList.remove("active")

    currentTemp.textContent = Math.round(currentTempC) + "°C"
    feelsLike.textContent = Math.round(currentFeelsC) + "°C"
})


fahrenheitBtn.addEventListener("click", () => {
    fahrenheitBtn.classList.add("active")
    celsiusBtn.classList.remove("active")

    const tempF = (currentTempC * 9 / 5) + 32
    const feelsF = (currentFeelsC * 9 / 5) + 32

    currentTemp.textContent = Math.round(tempF) + "°F"
    feelsLike.textContent = Math.round(feelsF) + "°F"
})