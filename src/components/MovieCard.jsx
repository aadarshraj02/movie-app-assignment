import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFav = favorites.some((favMovie) => favMovie.id === movie.id);
    setIsFavorite(isAlreadyFav);
  }, [movie.id]);

  const handleFavoriteToggle = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
    } else {
      favorites.push(movie);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative cursor-pointer hover:scale-105 transition-all duration-300 ease-linear">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold text-center">
          {movie.title}
        </h3>
        <p className="text-yellow-400">⭐ {movie.vote_average}</p>
        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isFavorite ? "bg-red-500" : "bg-gray-500"
          }`}
        >
          <Heart className={`text-white ${isFavorite ? "scale-125" : ""}`} />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
