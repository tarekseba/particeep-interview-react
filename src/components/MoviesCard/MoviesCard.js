import { useEffect, useState } from "react";
import Header from "./Header/Header";
import { movies$ } from "../../mocked-server/movies";
import "./MoviesCard.css";
import Movie from "./Movie/Movie";
import { CircularProgress } from "@mui/material";
const fetchMovies = async () => {
  return await movies$;
};

const MoviesCard = () => {
  const [movies, setMovies] = useState([]);
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
    <div className="container">
      <Header></Header>
      {isLoading && (
        <div style={{ position: "absolute", top: "48%", left: "48%" }}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <div className="flex-container">
        {!isLoading &&
          movies.map((item) => <Movie movie={item} key={item.id}></Movie>)}
      </div>
    </div>
  );
};

export default MoviesCard;
