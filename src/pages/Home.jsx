import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const { movies, loading } = useMovies();

  if (loading) {
    return (
      <p className="text-2xl text-center text-green-500 mt-20">Loading...</p>
    );
  }

  return (
    <div className="bg-gradient-to-b from-zinc-900 via-zinc-500 to-zinc-800">
      <div className="container mx-auto px-4 py-6">
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
