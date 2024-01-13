import { Flex, Text, Input, Button, Stack } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from "react";

interface Props {
  handleMovieSearched: (movie:string) => void
}

export default function Header({handleMovieSearched}: Props) {
  const [ movie, setMovie ] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleMovieSearched(movie)
    setMovie('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(event.target.value)
  }
  return (
    <Flex direction={{base: 'column', md: 'row'}} gap={{base: 4}} justifyContent={'space-between'} alignItems={'center'}>
      <Text fontSize={{base: '3xl', md: '5xl'}} fontWeight={'bold'} bgGradient='linear(to-r, #7928CA, #44337A)' bgClip='text'>
        Infinite-movies
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack direction={'row'}>
          <Input value={movie} name='movie' type='text' onChange={handleChange} placeholder='Película...'></Input>
          <Button colorScheme='purple' type='submit'>
            <SearchIcon color={'white'}/>
          </Button>
        </Stack>
      </form>
    </Flex>
  )
}
