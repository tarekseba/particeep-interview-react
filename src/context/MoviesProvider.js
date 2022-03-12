import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { moviesActions } from "../store/movies";
import { movies$ } from "../mocked-server/movies";
export const Context = createContext({});

const MoviesContext = (props) => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(12);
  useEffect(() => {
    async function fetch() {
      dispatch(moviesActions.setIsLoading(true));
      setIsLoading(true);
      const movies = await movies$;
      setIsLoading(false);
      setMovies(movies);
      dispatch(moviesActions.setIsLoading(false));
    }
    fetch();
  }, [dispatch]);
  return (
    <Context.Provider
      value={{
        movies: movies,
        setMovies: setMovies,
        filters: filters,
        setFilters: setFilters,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        moviesPerPage: moviesPerPage,
        setMoviesPerPage: setMoviesPerPage,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default MoviesContext;
