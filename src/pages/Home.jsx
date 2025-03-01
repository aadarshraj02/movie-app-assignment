import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const { movies, loading } = useMovies();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
          <p className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Loading Cinematic Magic...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fade-in-down">
          Featured Movies
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative transform transition-all duration-500 hover:scale-105 hover:z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {movies.length === 0 && !loading && (
          <div className="text-center py-24">
            <p className="text-xl text-gray-400 animate-pulse">
              No movies found. Start exploring!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
