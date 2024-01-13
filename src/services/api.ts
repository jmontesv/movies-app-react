import { Genre, MoviesData } from "../types"

const API_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}` 
  }
}
export async function getAllGenres(): Promise<{genres: Genre[]}> {
  const response: Response = await fetch(`${API_URL}/genre/movie/list?language=es`, options)
  const genresData = await response.json()
  return genresData
}

export async function getMovies(genreId?: number, page: number = 1): Promise<MoviesData> {
  const haveGenre = () => {
    if (!genreId) return 
    return `&with_genres=${genreId}`
  }
  const response: Response = await fetch(`${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${haveGenre()}`, options)
  const moviesData = await response.json()
  return moviesData
}

export async function getPopularMovies(page: number = 1): Promise<MoviesData> {
  const response: Response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options)
  const moviesData = await response.json()
  return moviesData
}

export async function getMoviesSearched(movieName: string, page: number = 1) {
  const response: Response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`, options)
  const moviesData = await response.json()
  return moviesData
}