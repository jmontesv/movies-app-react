import { Box, Grid, Image, Flex, Text, Skeleton } from "@chakra-ui/react"
import { Movie } from "../types"


interface Props {
  movies: Movie[], 
  handleClickMovie: (movie: Movie) => void
}

export default function ListMovies({movies, handleClickMovie}: Props) {
  return (
    <Grid templateColumns={'repeat(auto-fill, minmax(128px, 1fr))'} gap={2}>
          {
            movies.map(((movie) => {
              return (
                <Box key={movie.id} onClick={() => handleClickMovie(movie)} cursor={'pointer'}>
                  {
                    movie.poster_path 
                      ? <Image 
                          key={movie.id} 
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                          fallback={<Skeleton  startColor='purple.500' endColor='pink.500' height={'100%'}/>} 
                        />
                      : <Flex justifyContent={'center'} alignItems={'center'} bgColor={'gray.200'} height={'100%'}>
                          <Text textAlign={'center'}>Imagen no encontrada</Text>
                        </Flex>
                  }       
                </Box>
              )
              }))
          }
      </Grid>
  )
}
