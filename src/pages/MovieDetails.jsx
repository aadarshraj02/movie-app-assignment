import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMovieDetails } from "../hooks/useTmdb";
import {
  Star,
  Clock,
  Calendar,
  AlertCircle,
  RotateCw,
  Film,
} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      if (data) {
        setMovieDetails(data);
      }
      setLoading(false);
    };
    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <RotateCw className="h-12 w-12 text-cyan-400 animate-spin" />
          <p className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Loading Cinematic Experience...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            Movie Not Found!
          </h2>
          <p className="text-gray-300 mt-2">
            The requested movie could not be loaded.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 pb-20">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24"
        >
          <div className="grid lg:grid-cols-3 gap-12 backdrop-blur-lg rounded-3xl p-8 shadow-2xl shadow-blue-900/20">
            {/* Poster Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group col-span-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={`https://image.tmdb.org/t/p/w780${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="w-full h-auto rounded-2xl shadow-xl shadow-blue-900/30"
              />
            </motion.div>

            {/* Details Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Rating */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  {movieDetails.title}
                </motion.h1>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-400" />
                    <span className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      {movieDetails.vote_average}/10
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-600" />
                  <div className="flex items-center space-x-2">
                    <Film className="h-6 w-6 text-cyan-400" />
                    <span className="text-gray-300">
                      {movieDetails.original_language.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative pl-4 border-l-4 border-cyan-400/20"
              >
                <p className="text-lg text-gray-300 leading-relaxed">
                  {movieDetails.overview}
                </p>
              </motion.div>

              {/* Metadata Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Release Date and Runtime */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-pink-400" />
                    <div>
                      <h3 className="text-sm text-gray-400">Release Date</h3>
                      <p className="text-gray-200 font-medium">
                        {new Date(
                          movieDetails.release_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-purple-400" />
                    <div>
                      <h3 className="text-sm text-gray-400">Runtime</h3>
                      <p className="text-gray-200 font-medium">
                        {movieDetails.runtime} minutes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Genres */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {movieDetails.genres?.map((genre) => (
                      <motion.div
                        key={genre.id}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/20"
                      >
                        <span className="text-sm text-cyan-300">
                          {genre.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MovieDetails;
