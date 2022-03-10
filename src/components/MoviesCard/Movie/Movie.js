import LikeAndDislike from "../../UI/LikeAndDislike";
import DeleteButton from "../../UI/DeleteButton";
import moviePosters from "../../../utils";
import "./Movie.css";
const Movie = (props) => {
  const { ratio } = props;
  return (
    <div className="item">
      <DeleteButton top={"1rem"} right={"1rem"} movieId={props.movie.id} />
      <div className="content">
        <h2>{props.movie.title}</h2>
        <p>{props.movie.category}</p>
      </div>
      <div className="like-dislike">
        <LikeAndDislike ratio={ratio} movieId={props.movie.id}></LikeAndDislike>
      </div>
      <div className="background-image">
        <img
          src={moviePosters[props.movie.id]}
          className="background-image"
          alt="not found"
        ></img>
      </div>
      <div className="gradient-cover"></div>
    </div>
  );
};

export default Movie;
