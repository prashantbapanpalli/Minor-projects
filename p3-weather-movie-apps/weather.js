// Weather App: Open-Meteo (free, no API key). Step 1: city name -> coordinates. Step 2: coordinates -> weather.
const form = document.getElementById('form')
const result = document.getElementById('result')
const errorBox = document.getElementById('error')

const codes = { 0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 51: 'Light drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 80: 'Rain showers', 95: 'Thunderstorm' }

const getJson = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error, please try again')
  return res.json()
}

async function getWeather(city) {
  const geo = await getJson(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
  if (!geo.results) throw new Error(`City "${city}" not found`)
  const { latitude, longitude, name, country } = geo.results[0]
  const w = await getJson(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
  return { name, country, ...w.current }
}

const show = ({ name, country, temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code }) => {
  result.innerHTML = `
    <div class="card">
      <h2>${name}, ${country}</h2>
      <div class="temp">${temperature_2m}&deg;C</div>
      <p>${codes[weather_code] ?? 'Weather code ' + weather_code}</p>
      <p>Humidity: ${relative_humidity_2m}%</p>
      <p>Wind speed: ${wind_speed_10m} km/h</p>
    </div>`
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  errorBox.textContent = ''
  result.innerHTML = 'Loading...'
  try {
    show(await getWeather(document.getElementById('city').value.trim()))
  } catch (err) {
    result.innerHTML = ''
    errorBox.textContent = err.message
  }
})
