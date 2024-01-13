import { useEffect, useState } from 'react'
import { getMovies, getAllGenres, getPopularMovies, getMoviesSearched } from './services/api'
import { Button, Container } from '@chakra-ui/react'
import BackdropImage from './components/BackdropImage'
import ListMovies from './components/ListMovies'
import ListGenres from './components/ListGenres'
import { Genre, Movie, MoviesData } from './types'
import Header from './components/Header'
import './App.css'


interface PageInfo {
  total_pages: number,
  total_results: number
}

function App() {
  const [ genres, setGenres ] = useState<Array<Genre>>([]) 
  const [ genreSelected, setGenreSelected ] = useState<number | null>(null)
  const [ movies, setMovies ] = useState<Array<Movie>>([])
  const [ movieSelected, setMovieSelected ] = useState<Movie | null>(null)
  const [ pageInfo, setPageInfo ] = useState<PageInfo>({
    total_pages: 0,
    total_results: 0
  })
  const [ page, setPage ] = useState<number>(1)
  const [ movieSearched, setMovieSearched ] = useState<string>('')

  useEffect(() => {
    getAllGenres().then((genresData: {genres: Genre []}) => {
      setGenres(genresData.genres)
    })
  }, [])

  useEffect(() => {
    if (genreSelected) {
      getMovies(genreSelected, page).then((moviesData: MoviesData) => {
        setMovies(movies.concat(moviesData.results))
        setPageInfo({
          total_pages: moviesData.total_pages,
          total_results: moviesData.total_results
        })
      })
    } else {
      getPopularMovies(page).then((moviesData: MoviesData) => {
        setMovies(movies.concat(moviesData.results))
        setPageInfo({
          total_pages: moviesData.total_pages,
          total_results: moviesData.total_results
        })
      })
    }
  }, [genreSelected, page])

  useEffect(() => {
    if (movieSearched.length > 0) {
      getMoviesSearched(movieSearched, page).then((moviesData: MoviesData) => {
        setMovies(movies.concat(moviesData.results))
        setPageInfo({
          total_pages: moviesData.total_pages,
          total_results: moviesData.total_results
        })
      })
    }
  }, [movieSearched, page])

  const handleClickGenre = (id: number) => {
    setMovieSelected(null)
    setMovies([])
    setPage(1)
    setGenreSelected(id)
  }

  const handleClickMovie = (movie: Movie) => {
    setMovieSelected(movie)
  }

  const handleClickShowMoreMovies = () => {
    setPage(page + 1)
  }

  const handleMovieSearched = (movie: string) => {
    setMovieSelected(null)
    setMovies([])
    setPage(1)
    setMovieSearched(movie)
  }
  

  return (
    <Container maxW={'100%'} bgColor={'purple.900'} p={0}>
      <Container maxW={{base: '100%', md: '70%'}} minH={'100vh'} bgColor={'purple.50'} display={'flex'} flexDirection={'column'} gap={4}>
        <Header handleMovieSearched={handleMovieSearched}/>
        <ListGenres genres={genres} handleClickGenre={handleClickGenre} />
        { 
          movieSelected
          ? <BackdropImage imageSrc={movieSelected.backdrop_path} titleMovie={movieSelected.title} /> 
          : <BackdropImage imageSrc={movies[0]?.backdrop_path} titleMovie={movies[0]?.title} />
        }
        <ListMovies movies={movies} handleClickMovie={handleClickMovie}/>
        {
          page < pageInfo.total_pages &&
            <Button colorScheme='purple' onClick={handleClickShowMoreMovies}>Mostrar más</Button>
        }
      </Container>
    </Container>
  )
}

export default App
