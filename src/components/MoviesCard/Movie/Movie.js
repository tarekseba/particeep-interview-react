import LikeAndDislike from "../../UI/LikeAndDislike";
import DeleteButton from "../../UI/DeleteButton";
import moviePosters from "../../../utils";
import "./Movie.css";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useDispatch } from "react-redux";
import { moviesActions } from "../../../store/movies";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const Movie = (props) => {
  const dispatch = useDispatch();

  const [toggleModal, setToggleModal] = useState(false);

  const deleteHandler = (event) => {
    dispatch(moviesActions.removeMovie(props.movie));
    setToggleModal(false);
  };
  const modalToggleHandler = () => {
    setToggleModal(true);
  };
  const { ratio } = props;
  return (
    <div className="item">
      <DeleteButton setModal={modalToggleHandler} />
      <div className="content">
        <h2>{props.movie.title}</h2>
        <h3>{props.movie.category}</h3>
      </div>
      <div className="like-dislike">
        <LikeAndDislike ratio={ratio} movieId={props.movie.id}></LikeAndDislike>
      </div>
      <div className="background-image">
        <img src={moviePosters[props.movie.id]} alt="Image not found"></img>
      </div>
      <div className="gradient-cover"></div>
      <div
        className="modal"
        style={{
          opacity: toggleModal ? 0.9 : 0,
          pointerEvents: toggleModal ? "all" : "none",
        }}
        onClick={() => setToggleModal(false)}
      >
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            style={{ opacity: 1, height: "2rem", maxWidth: "20px" }}
            onClick={deleteHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="rgb(200, 26, 26)"
              transform="scale(0.8)"
            >
              <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
            </svg>
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              opacity: 1,
              height: "2rem",
            }}
            onClick={() => setToggleModal(false)}
          >
            Cancel
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Movie;
