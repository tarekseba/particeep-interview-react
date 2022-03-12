import { useEffect } from "react";
import Header from "./Header/Header";
import "./MoviesCard.css";
import Movie from "./Movie/Movie";
import { Button, CircularProgress } from "@mui/material";
import PaginationComponent from "../UI/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { status } from "../../utils";
import { fetchMoviesAction } from "../../store/movies";

const MoviesCard = () => {
  const { movies, moviesStatus, filters, moviesPerPage, currentPage } =
    useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction());
  };

  useEffect(() => {
    dispatch(fetchMoviesAction());
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
      {!(moviesStatus === status.STABLE) && (
        <div style={{ position: "absolute", top: "48%", left: "48%" }}>
          {moviesStatus === status.LOADING ? (
            <CircularProgress color="inherit" />
          ) : (
            <div
              style={{
                display: "flex",
                gap: "0.2rem",
              }}
            >
              <p style={{ fontWeight: "bold", margin: "auto" }}>
                Loading failed...
              </p>
              <Button
                variant="contained"
                style={{
                  fontWeight: "bold",
                  color: "rgb(0,0,0)",
                  height: "1rem",
                  width: "1rem",
                  maxWidth: "1rem",
                  minWidth: "0.5rem",
                  backgroundColor: "rgba(0, 0,0, 0.2)",
                }}
                onClick={fetchMovies}
              >
                <i class="fa-solid fa-arrow-rotate-right"></i>
              </Button>
            </div>
          )}
        </div>
      )}
      {moviesStatus === status.STABLE && (
        <>
          <div className="flex-container">
            {filteredMovies.map((item) => (
              <Movie
                movie={item}
                key={item.id}
                ratio={(item.likes / (item.dislikes + item.likes)) * 100}
              ></Movie>
            ))}
          </div>
          <div className="pagination-container">
            <PaginationComponent
              totalMovies={totalMovies}
            ></PaginationComponent>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesCard;
