import { useContext, useState } from "react";
import { Context } from "../../Context/MoviesProvider";
import "./LikeAndDislike.css";
import RatioBar from "./RatioBar";

const sortArray = (el1, el2) => {
  if (+el1.id === +el2.id) return 0;
  return +el1.id < +el2.id ? -1 : 1;
};

const LikeAndDislike = (props) => {
  const moviesCtx = useContext(Context);
  const { movies, setMovies } = moviesCtx;
  const { ratio } = props;
  const [likedOrDisliked, setLikedOrDisliked] = useState({
    liked: false,
    disliked: false,
  });
  const likeHandler = (event) => {
    const { liked, disliked } = likedOrDisliked;
    const movie = movies.find((mov) => mov.id === props.movieId);
    const index = movies.findIndex((mov) => mov.id === props.movieId);
    let newMovies = movies.filter((mov) => mov.id !== props.movieId);
    if (liked) {
      const state = [...newMovies, { ...movie, likes: movie.likes - 1 }].sort(
        sortArray
      );
      console.log("new state");
      console.log(state);
      setMovies(state);
    } else if (disliked) {
      const state = [
        ...newMovies,
        { ...movie, likes: movie.likes + 1, dislikes: movie.dislikes - 1 },
      ].sort(sortArray);
      console.log("new state 2");
      console.log(state);
      setMovies(state);
    } else {
      let state = [...newMovies, { ...movie, likes: movie.likes + 1 }].sort(
        sortArray
      );
      console.log("new state 3");
      console.log(state);
      setMovies(state);
    }
    setLikedOrDisliked((prev) => {
      return { liked: !prev.liked, disliked: false };
    });
  };
  const dislikeHandler = (event) => {
    const { disliked, liked } = likedOrDisliked;
    const movie = movies.find((mov) => mov.id === props.movieId);
    let newMovies = movies.filter((mov) => mov.id !== props.movieId);
    if (disliked) {
      const state = [
        ...newMovies,
        { ...movie, dislikes: movie.dislikes - 1 },
      ].sort(sortArray);
      setMovies(state);
      console.log(disliked + movie.dislikes - 1);
    } else if (liked) {
      const state = [
        ...newMovies,
        { ...movie, likes: movie.likes - 1, dislikes: movie.dislikes + 1 },
      ].sort(sortArray);
      setMovies(state);
    } else {
      const state = [
        ...newMovies,
        { ...movie, dislikes: movie.dislikes + 1 },
      ].sort(sortArray);
      setMovies(state);
    }
    setLikedOrDisliked((prev) => {
      return { liked: false, disliked: !prev.disliked };
    });
  };
  return (
    <>
      <div className="wrapper">
        <div className="radio-group">
          <input
            type="radio"
            name={"liked" + props.movieId}
            checked={likedOrDisliked.liked}
            onChange={(event) => null}
            onClick={likeHandler}
          />
          <label htmlFor="liked">
            <i className="fa-solid fa-thumbs-up"></i>
          </label>
        </div>
        <div className="radio-group">
          <input
            type="radio"
            name={"disliked" + props.movieId}
            checked={likedOrDisliked.disliked}
            onChange={(event) => null}
            onClick={dislikeHandler}
          />
          <label htmlFor="disliked">
            <i className="fa-solid fa-thumbs-down"></i>
          </label>
        </div>
      </div>
      <RatioBar ratio={ratio}></RatioBar>
    </>
  );
};

export default LikeAndDislike;
