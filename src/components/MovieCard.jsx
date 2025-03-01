import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFav = favorites.some((favMovie) => favMovie.id === movie.id);
    setIsFavorite(isAlreadyFav);
  }, [movie.id]);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
    } else {
      favorites.push(movie);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={item}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl relative cursor-pointer"
      style={{
        boxShadow: isHovered
          ? "0 0 25px rgba(16, 185, 129, 0.6)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
        />
      </div>

      <div className="p-5">
        <motion.h3 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 text-lg font-bold mb-2 text-center">
          {movie.title}
        </motion.h3>

        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-yellow-400 mr-1">⭐</span>
            <span className="text-gray-200">
              {movie.vote_average.toFixed(1)}
            </span>
          </motion.div>

          <motion.span
            className="text-sm text-gray-300"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {movie.release_date?.split("-")[0]}
          </motion.span>
        </div>
      </div>

      <motion.button
        onClick={handleFavoriteToggle}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
          isFavorite
            ? "bg-gradient-to-r from-red-500 to-pink-500"
            : "bg-gray-700"
        }`}
      >
        <Heart
          className={`text-white ${isFavorite ? "fill-current" : ""}`}
          size={18}
        />
      </motion.button>
    </motion.div>
  );
};

export default MovieCard;
