import { Flex, Stack, Badge } from "@chakra-ui/react"
import { Genre } from "../types"

interface Props {
  genres: Genre[]
  handleClickGenre: (genreId: number) => void
}


export default function ListGenres({genres, handleClickGenre}: Props) {
  return (
    <Flex direction={'column'} alignItems={'center'} gap={4}>
      <Stack direction='row' wrap={'wrap'} width={'50%'} p={4} justifyContent={'center'}>
        {genres.map((genre: Genre) => {
          return (
            <Badge cursor={'pointer'} colorScheme='purple' key={genre.id} onClick={() => handleClickGenre(genre.id)}>{genre.name}</Badge>
          )
        } )}
      </Stack>
  </Flex>
  )
}
