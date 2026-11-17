// Movie Search: OMDb API. Search returns a list; a second call per movie fetches rating and details.
import { OMDB_KEY } from './config.js'

const form = document.getElementById('form')
const results = document.getElementById('results')
const errorBox = document.getElementById('error')
const NO_POSTER = 'https://via.placeholder.com/300x450?text=No+Poster'

const getJson = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error, please try again')
  return res.json()
}

async function searchMovies(q) {
  const data = await getJson(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&type=movie&s=${encodeURIComponent(q)}`)
  if (data.Response === 'False') throw new Error(data.Error === 'Movie not found!' ? `No movies found for "${q}"` : data.Error)
  // Fetch details (rating etc.) for each result in parallel
  return Promise.all(data.Search.slice(0, 8).map(({ imdbID }) => getJson(`https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}`)))
}

const render = (movies) => {
  results.innerHTML = movies.map(({ Title, Year, Released, imdbRating, Genre, Poster }) => `
    <div class="card movie">
      <img src="${Poster !== 'N/A' ? Poster : NO_POSTER}" alt="${Title} poster">
      <h3>${Title} (${Year})</h3>
      <p>Rating: ${imdbRating} / 10</p>
      <p>Released: ${Released}</p>
      <p>${Genre}</p>
    </div>`).join('')
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  errorBox.textContent = ''
  results.innerHTML = 'Loading...'
  const q = document.getElementById('query').value.trim()
  if (q.length < 2) { results.innerHTML = ''; errorBox.textContent = 'Please enter at least 2 characters'; return }
  try { render(await searchMovies(q)) } catch (err) { results.innerHTML = ''; errorBox.textContent = err.message }
})
