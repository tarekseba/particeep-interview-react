import { useState } from "react";
import "./LikeAndDislike.css";
import RatioBar from "./RatioBar";
const LikeAndDislike = (props) => {
  const [likedOrDisliked, setLikedOrDisliked] = useState({
    liked: false,
    disliked: false,
  });

  console.log(likedOrDisliked);
  const likeHandler = (event) => {
    setLikedOrDisliked((prev) => {
      return { liked: !prev.liked, disliked: false };
    });
  };
  const dislikeHandler = (event) => {
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
            name="liked"
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
            name="disliked"
            checked={likedOrDisliked.disliked}
            onChange={(event) => null}
            onClick={dislikeHandler}
          />
          <label htmlFor="disliked">
            <i className="fa-solid fa-thumbs-down"></i>
          </label>
        </div>
      </div>
      <RatioBar ratio={85}></RatioBar>
    </>
  );
};

export default LikeAndDislike;
