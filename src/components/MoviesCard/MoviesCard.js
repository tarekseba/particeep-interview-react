import { useEffect } from "react";
import Header from "./Header/Header";
import "./MoviesCard.css";
import Movie from "./Movie/Movie";
import { CircularProgress } from "@mui/material";
import PaginationComponent from "../UI/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "../../store/movies";
import { movies$ } from "../../mocked-server/movies";

const MoviesCard = () => {
  const movies = useSelector((state) => state.movies.movies);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const filters = useSelector((state) => state.movies.filters);
  const moviesPerPage = useSelector((state) => state.movies.moviesPerPage);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await movies$;
        dispatch(moviesActions.setMovies(movies));
        dispatch(moviesActions.setIsLoading(false));
      } catch (err) {
        dispatch(moviesActions.setLoadingError(true));
      }
    };
    fetchMovies();
  }, [dispatch]);

  const lastIndex = moviesPerPage * currentPage;
  const firstIndex = lastIndex - moviesPerPage;

  const categories = movies
    .map((value) => value.category)
    .filter((value, index, list) => list.indexOf(value) === index);

  let filteredMovies = movies.filter((value) => {
    if (filters && filters.length === 0) {
      return true;
    } else {
      return filters.includes(value.category);
    }
  });

  const totalMovies = filteredMovies.length;

  filteredMovies = filteredMovies.slice(
    firstIndex,
    lastIndex > filteredMovies.length ? filteredMovies.length : lastIndex
  );

  return (
    <div className="container">
      <Header categories={categories}></Header>
      {isLoading && (
        <div style={{ position: "absolute", top: "48%", left: "48%" }}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <div className="flex-container">
        {!isLoading &&
          filteredMovies.map((item) => (
            <Movie
              movie={item}
              key={item.id}
              ratio={(item.likes / (item.dislikes + item.likes)) * 100}
            ></Movie>
          ))}
      </div>
      {!isLoading && (
        <div className="pagination-container">
          <PaginationComponent totalMovies={totalMovies}></PaginationComponent>
        </div>
      )}
    </div>
  );
};

export default MoviesCard;
