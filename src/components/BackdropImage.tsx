import { Box, Text } from '@chakra-ui/react'


interface Props {
  imageSrc: string,
  titleMovie: string
}

function BackdropImage({imageSrc, titleMovie}: Props) {
  return <>
    {
    imageSrc  
        ? <Box 
            backgroundImage={`https://image.tmdb.org/t/p/original${imageSrc}`} 
            backgroundSize={'cover'} 
            width={'100%'} 
            height={'400px'}
            position={'relative'}>
              <Text fontSize={'4xl'} color={'white'} fontWeight={'bold'} position={'absolute'} bottom={'8px'} left={'8px'}>{titleMovie}</Text>   
          </Box>
        : <Box 
            width={'100%'} 
            height={'400px'}
            bgColor={'gray.300'}
            position={'relative'}>
              <Text fontSize={'4xl'} color={'white'} fontWeight={'bold'} position={'absolute'} bottom={'8px'} left={'8px'}>Imagen no encontrada</Text>
          </Box>
    }
  </> 
}

export default BackdropImage