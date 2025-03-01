import { useMovies } from "../context/MovieContext";

const Trending = () => {
  const { movies, loading } = useMovies();

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-white mb-4">Trending Movies</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md"
              />
              <h3 className="text-white text-lg mt-2">{movie.title}</h3>
              <p className="text-yellow-400">⭐ {movie.vote_average}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
