import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Film, Search, Heart, Star, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-blue-800 to-purple-900 shadow-lg fixed w-full z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 transform transition duration-500 hover:scale-105"
          >
            <Film className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Movie Verse
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 ">
            {[
              {
                name: "Home",
                path: "/",
                icon: <Star className="h-5 w-5 mr-2" />,
              },
              {
                name: "Trending",
                path: "/trending",
                icon: <List className="h-5 w-5 mr-2" />,
              },
              {
                name: "Search",
                path: "/search",
                icon: <Search className="h-5 w-5 mr-2" />,
              },
              {
                name: "Favorites",
                path: "/favorites",
                icon: <Heart className="h-5 w-5 mr-2" />,
              },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center px-4 py-2 text-sm font-medium text-white rounded-md transition-all duration-300 group ${
                  location.pathname === item.path
                    ? "bg-blue-600/50"
                    : "hover:bg-blue-600/30"
                }`}
              >
                {item.icon}
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="active-link"
                    className="absolute inset-0 bg-blue-600/20 rounded-md"
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-blue-200 hover:bg-blue-700/30 hover:text-white transition duration-300"
          >
            {isOpen ? (
              <X className="h-6 w-6 animate-spin-once" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute w-full bg-gradient-to-b from-purple-900/95 to-blue-900/95 backdrop-blur-lg shadow-xl h-screen"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {[
                {
                  name: "Home",
                  path: "/",
                  icon: <Star className="h-5 w-5 mr-3 text-cyan-300" />,
                },
                {
                  name: "Trending",
                  path: "/trending",
                  icon: <List className="h-5 w-5 mr-3 text-pink-300" />,
                },
                {
                  name: "Search",
                  path: "/search",
                  icon: <Search className="h-5 w-5 mr-3 text-yellow-300" />,
                },
                {
                  name: "Favorites",
                  path: "/favorites",
                  icon: <Heart className="h-5 w-5 mr-3 text-red-400" />,
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-blue-600/40"
                      : "hover:bg-blue-600/30"
                  }`}
                >
                  {item.icon}
                  <span className="text-white font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
