import { createContext, useContext, useState, useEffect } from "react";
import { fetchTrendingMovies, fetchMovieDetails } from "../hooks/useTmdb";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
      setLoading(false);
    };
    getMovies();
  }, []);

  const fetchMovieById = async (movieId) => {
    setLoading(true);
    const data = await fetchMovieDetails(movieId);
    setMovieDetails(data);
    setLoading(false);
  };

  return (
    <MovieContext.Provider
      value={{ movies, loading, movieDetails, fetchMovieById }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
