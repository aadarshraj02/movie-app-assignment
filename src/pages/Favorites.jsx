import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { HeartIcon } from "@heroicons/react/24/solid"; // Importing a heart icon from Heroicons

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-900 py-8 px-4">
      <div className="container mx-auto mt-20">
        <h1 className="text-4xl font-bold text-center text-white mb-8 flex items-center justify-center">
          <HeartIcon className="w-10 h-10 text-red-500 mr-2" />
          Favorite Movies
        </h1>

        {favoriteMovies.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-2xl text-red-500 mb-4">
              No favorite movies added yet.
            </p>
            <p className="text-lg text-zinc-400">
              Start adding movies to your favorites!
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
