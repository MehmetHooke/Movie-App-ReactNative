import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovieDetails } from '@/services/api'
import { isMovieSaved, removeMovie, saveMovie } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface MovieInfoProps{
  label:string;
  value?:string | number | null;
}


const MovieInfo = ({label ,value}: MovieInfoProps) =>
(
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
    {label}
    </Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>
      {value || 'N/A'}
    </Text>
  </View>
)


const MovieDetails = () => {

    const { id } = useLocalSearchParams();
    const {data: movie,loading} = useFetch(()=>
      fetchMovieDetails(id as string));


//yeni kaydetme denemesi

const [isSaved, setIsSaved] = useState(false);
const userId = "guest-user"; // ileride Appwrite auth’tan gelecek

useEffect(() => {
  if (movie) {
    (async () => {
      const saved = await isMovieSaved(userId, movie.id);
      setIsSaved(saved);
    })();
  }
}, [movie]);

const toggleSave = async () => {
  if (!movie) return;

  if (isSaved) {
    await removeMovie(userId, movie.id);
    setIsSaved(false);
  } else {
    const payload = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    };

    console.log("Saving movie payload:", payload); // 🔍 kontrol için log

    await saveMovie(userId, payload as Movie);
    setIsSaved(true);
  }
};
//--------------


  return (

    <View className='bg-primary flex-1 '>
      
      
      
      <ScrollView contentContainerStyle={{paddingBottom:80}}>
        <View>
        <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className="w-full h-[550px]" resizeMode='stretch'/>
          <TouchableOpacity onPress={toggleSave}>
        <ImageBackground
          source={images.highlight}
          className="absolute size-12 bottom-[-20px] right-10 items-center justify-center rounded-2xl overflow-hidden"
        >
          <Image
            className="size-7"
            tintColor={isSaved ? "red" : "white"} // ✅ Kaydedilmişse kırmızı, değilse beyaz
            source={icons.heart}
          />
        </ImageBackground>
      </TouchableOpacity>
        </View>
        <View className='flex-col items-start justify-centermt-5 px-5'>
          <Text className="text-white font-bold text-3xl mt-5">
            {movie?.title}
          </Text>
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm font-bold'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm ml-3'>{movie?.runtime} dakika</Text>
          </View>

          <View className='flex-row items-center bg-dark-100 py-1 px-2 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4'/>
            <Text className='text-white font-bold text-sm '>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className='text-light-200 text-sm'>
              ({movie?.vote_count} votes)
            </Text>
          </View>

            <MovieInfo label='Overview' value= {movie?.overview} />

            <MovieInfo label='Genres' value= {movie?.genres?.map((g)=>g.name).join(' - ')|| 'N/A'} />
              <View className='flex flex-row justify-between w-1/2'>
                <MovieInfo label='Budget' value= {`$${(movie?.budget ?? 0)/1_000_000} million`} />
                <MovieInfo  label='Revenue' value= {`$${Math.round(movie?.revenue ?? 0)/1_000_000}`} />

              </View>
              <MovieInfo label='Production Companies' value={movie?.production_companies.map((c)=>c.name).join(" - ")|| 'N/A'}/>
        </View>
      </ScrollView>

      <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex-row items-center justify-center z-50' onPress={router.back}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff"/>
        <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
    

  )
}

export default MovieDetails