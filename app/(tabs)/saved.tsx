import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { listSavedMovies } from "@/services/appwrite";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const saved = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: login sistemi eklenince buradan alacaksın
  const userId = "guest-user";
  // Sayfa focus olduğunda listeyi yenile
    useFocusEffect(
      useCallback(() => {
        const fetchSavedMovies = async () => {
          try {
            setLoading(true);
            const res = await listSavedMovies(userId);
            setMovies(res);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchSavedMovies();
      }, [userId])
    );

  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        setLoading(true);
        const docs = await listSavedMovies(userId);
        setMovies(docs);
      } catch (err: any) {
        setError(err.message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedMovies();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#ab8bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }



  
  return (
    <View className="flex-1  bg-primary">

      <View className="mt-20">
      {movies.length === 0 ? (
        <Text className="text-white text-center mt-20">
          Henüz film kaydetmedin
        </Text>
      ) : (
        <FlatList className=""
          data={movies}
          renderItem={({ item }) => (
            <MovieCard
              id={item.movieId}
              title={item.title}
              vote_average={item.vote_average}
              release_date={item.release_date}
              poster_path={item.posterPath} adult={false} backdrop_path={""} genre_ids={[]} original_language={""} original_title={""} overview={""} popularity={0} video={false} vote_count={0} />
          )}
          keyExtractor={(item) => item.$id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            padding: 5,
            marginBottom: 10,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
            <View className="w-full flex-row justify-center mb-10 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
                <Text className="text-purple-400 font-bold text-4xl ml-2">
                  Saved Movies
                </Text>
            </View>
            </>
          }

          

        />
      )}
      </View>
    </View>
  );
};

export default saved;
