import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const { data: trendingMovies } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading,
    error,
    refetch
  } = useFetch(() => fetchMovies({ page }), true);


  // Her yeni sayfada gelen filmleri allMovies’e ekle
useEffect(() => {
  if (movies && movies.length > 0) {
    setAllMovies(prev => {
      // Aynı id zaten varsa tekrar ekleme
      const newOnes = movies.filter(
        m => !prev.some(p => p.id === m.id)
      );
      return [...prev, ...newOnes];
    });
  }
}, [movies]);

  const loadMore = () => {
    if (!loading) {
      setPage(prev => prev + 1);
      refetch();
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

        <FlatList
          data={allMovies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            padding: 5,
            marginBottom: 10,
          }}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator color="#fff" /> : null}
          ListHeaderComponent={
          <>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            <Text className="text-purple-400 font-bold text-4xl mt-2 mb-5 mx-auto">MovieFlix</Text>

            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={trendingMovies}
                  renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <Text className="text-lg text-white font-bold mb-3 mt-5">Latest Movies</Text>
          </>
        }
      />
    </View>
  );
}
