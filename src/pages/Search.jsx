import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "../components/MovieCard";
import { Search, RotateCw, AlertCircle, Star } from "lucide-react";
import { fetchMoviesBySearch } from "../hooks/useTmdb";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    const results = await fetchMoviesBySearch(searchTerm);
    setSearchResults(results);
    setLoading(false);
  };

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-16 relative group"
        >
          <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative backdrop-blur-lg bg-gray-800/30 rounded-2xl border border-cyan-500/20 p-1">
            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 ml-4 text-cyan-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsTyping(!!e.target.value);
                }}
                placeholder="Search for movies, actors, or genres..."
                className="w-full py-4 bg-transparent text-xl text-white placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold flex items-center space-x-2"
              >
                {loading ? (
                  <RotateCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>Search</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <RotateCw className="h-12 w-12 text-cyan-400 animate-spin mx-auto" />
              <p className="mt-4 text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Searching the cinematic universe...
              </p>
            </motion.div>
          )}

          {!loading && searchTerm && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                No Results Found!
              </h3>
              <p className="text-gray-400 mt-2">
                We couldn't find any matches for "{searchTerm}"
              </p>
            </motion.div>
          )}

          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {searchResults.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && isTyping && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-12 pb-8"
          >
            <p className="text-gray-400">
              Showing {searchResults.length} results for "{searchTerm}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
