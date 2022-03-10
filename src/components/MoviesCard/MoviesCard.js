import { useContext, useEffect } from "react";
import Header from "./Header/Header";
import { movies$ } from "../../mocked-server/movies";
import "./MoviesCard.css";
import Movie from "./Movie/Movie";
import { CircularProgress } from "@mui/material";
import { Context } from "../../Context/MoviesProvider";

const MoviesCard = () => {
  const { movies, setMovies, filters, setFilters, isLoading, setIsLoading } =
    useContext(Context);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      const movies = await movies$;
      setIsLoading(false);
      setMovies(movies);
    }
    fetch();
  }, [setIsLoading, setMovies]);
  const filteredMovies = movies.filter((value) => {
    if (filters && filters.length === 0) {
      return true;
    } else {
      return filters.includes(value.category);
    }
  });

  const categories = movies
    .map((value) => value.category)
    .filter((value, index, list) => list.indexOf(value) === index);

  return (
    <div className="container">
      <Header
        categories={categories}
        filters={filters}
        onFilterChange={setFilters}
      ></Header>
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
    </div>
  );
};

export default MoviesCard;
