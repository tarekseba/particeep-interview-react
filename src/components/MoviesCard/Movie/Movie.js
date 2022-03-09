import LikeAndDislike from "../../UI/LikeAndDislike";
import "./Movie.css";
const Movie = (props) => {
  const { ratio } = props;
  return (
    <div className="item">
      <div className="content">
        <h2>{props.movie.title}</h2>
        <p>{props.movie.category}</p>
      </div>
      <div className="like-dislike">
        <LikeAndDislike ratio={ratio}></LikeAndDislike>
      </div>
      <div className="background-image">
        <img
          src="https://movieposters2.com/images/1301847-b.jpg"
          className="background-image"
          alt="not found"
        ></img>
      </div>
      <div className="gradient-cover"></div>
    </div>
  );
};

export default Movie;
