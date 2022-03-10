import { createContext, useEffect, useState } from "react";
import { movies$ } from "../mocked-server/movies";
export const Context = createContext({});

const MoviesContext = (props) => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      const movies = await movies$;
      setIsLoading(false);
      setMovies(movies);
    }
    fetch();
  }, []);
  return (
    <Context.Provider
      value={{
        movies: movies,
        setMovies: setMovies,
        filters: filters,
        setFilters: setFilters,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default MoviesContext;