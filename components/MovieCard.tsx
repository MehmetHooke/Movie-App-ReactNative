import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id,poster_path,title, vote_average ,release_date}:Movie) => {
    
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image
                source={{
                    uri:poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        :
                        'https://placehold.co/600/400/1a1a1a/ffffff.png'
                }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
            />
            <Text className='text-sm font-bold text-white' numberOfLines={1}>{title}</Text>


            <View className="absolute top-1 right-1 flex-row items-center bg-black/70 px-2 py-1 rounded-full">
            <Image source={icons.star} className="w-4 h-4 mr-1" />
            <Text className="text-[10px] text-white font-bold">
                {Math.round(vote_average ?? 0)}/10
            </Text>
            </View>
            <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium mt-1'>{release_date?.split('-')[0]}</Text>
                {/* <Text className='text-xs font-medium text-light-300 uppercase'>Movie</Text> */}
            </View>
                
        </TouchableOpacity>

    </Link>
  )
}

export default MovieCard