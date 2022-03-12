import { useState } from "react";
import { useDispatch } from "react-redux";
import { moviesActions } from "../../store/movies";
import "./LikeAndDislike.css";
import RatioBar from "./RatioBar";

const LikeAndDislike = (props) => {
  const dispatch = useDispatch();
  const { ratio } = props;
  const [likedOrDisliked, setLikedOrDisliked] = useState({
    liked: false,
    disliked: false,
  });
  const likeHandler = (event) => {
    const { liked, disliked } = likedOrDisliked;
    /**
     * In a real scenario, i would have used a thunk to call API
     */
    if (liked) {
      dispatch(moviesActions.removeLike(props.movieId));
    } else if (disliked) {
      dispatch(moviesActions.addLike(props.movieId));
      dispatch(moviesActions.removeDislike(props.movieId));
    } else {
      dispatch(moviesActions.addLike(props.movieId));
    }
    setLikedOrDisliked((prev) => {
      return { liked: !prev.liked, disliked: false };
    });
  };
  const dislikeHandler = (event) => {
    const { disliked, liked } = likedOrDisliked;
    if (disliked) {
      dispatch(moviesActions.removeDislike(props.movieId));
    } else if (liked) {
      dispatch(moviesActions.addDislike(props.movieId));
      dispatch(moviesActions.removeLike(props.movieId));
    } else {
      dispatch(moviesActions.addDislike(props.movieId));
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
