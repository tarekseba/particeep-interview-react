import LikeAndDislike from "../../UI/LikeAndDislike";
import DeleteButton from "../../UI/DeleteButton";
import "./Movie.css";
const Movie = (props) => {
  const { ratio } = props;
  return (
    <div className="item">
      <DeleteButton top={"1rem"} right={"1rem"} />
      <a href="#"><i class="fa-solid fa-circle-trash"></i></a>
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
