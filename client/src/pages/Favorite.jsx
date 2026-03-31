import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import { useAppContext } from "../context/AppContext";
import { HeartIcon } from "lucide-react";

const Favorite = () => {
  const { favoriteMovies } = useAppContext();

  return favoriteMovies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0" color="violet" />
      <BlurCircle bottom="50px" right="50px" color="cyan" />
      <div className="flex items-center gap-3 my-6">
        <div className="h-6 w-1 bg-gradient-to-b from-accent to-primary rounded-full"></div>
        <h1 className="text-lg font-semibold text-gray-200">Your Favorite Movies</h1>
      </div>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {favoriteMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <HeartIcon className="w-16 h-16 text-accent/20" />
      <h1 className="text-2xl font-bold text-gray-400">No favorites yet</h1>
      <p className="text-sm text-gray-600">Heart a movie to add it here</p>
    </div>
  );
};

export default Favorite;
