// tack the search made by a user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

import { Client, Databases, ID, Query } from "appwrite";
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.equal('searchTerm',query)] )
        
        console.log(result);

        if(result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count +1
                }
            )
        }else{
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count:1,
                    title:movie.title,
                    poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            )
        }
        //cheack if a record of that search has already been stored
        //if a document is found increment the search count filed
        //if no document file is not found
            //create new document Appwrite database


    }catch(error){
        console.log(error);
        throw error;
        
        
    }
} 


export const getTrendingMovies = async(): Promise<TrendingMovie[] | undefined> => {


    try {
        
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.limit(5),
        Query.orderDesc('count'), 
    ])
        return result.documents as unknown as TrendingMovie[];
    } 
    
    catch (error) {
        console.log(error);
        return undefined;
    }


}

// 🎬 Kaydet
/*
export const saveMovie = async (userId: string, movie: Movie) => {
  return database.createDocument(DATABASE_ID, SAVED_COLLECTION_ID, ID.unique(), {
    userId,
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    vote_average: movie.vote_average,
    release_date: movie.release_date,  
  });
}; 
*/
export const saveMovie = async (userId: string, movie: Movie | MovieDetails) => {
  const payload = {
    userId,
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path ?? "",
    vote_average: Number(movie.vote_average ?? 0),
    release_date: movie.release_date ?? "",
  };

  console.log("createDocument payload:", payload); // 🔍 burayı mutlaka gör

  return database.createDocument(
    DATABASE_ID,
    SAVED_COLLECTION_ID,
    ID.unique(),
    payload
  );
};

// 🗑 Çıkar
export const removeMovie = async (userId: string, movieId: number) => {
  const res = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
    Query.equal("userId", userId),
    Query.equal("movieId", movieId),
  ]);
  if (res.total > 0) {
    await database.deleteDocument(DATABASE_ID, SAVED_COLLECTION_ID, res.documents[0].$id);
  }
};

// ❤️ Kontrol et
export const isMovieSaved = async (userId: string, movieId: number) => {
  const res = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
    Query.equal("userId", userId),
    Query.equal("movieId", movieId),
  ]);
  return res.total > 0;
};

// 📋 Listele
export const listSavedMovies = async (userId: string) => {
  const res = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
    Query.equal("userId", userId),
  ]);
  return res.documents;
};