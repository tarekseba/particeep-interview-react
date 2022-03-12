import { FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "../../../store/movies";

const MovieCountSelect = () => {
  const moviesPerPage = useSelector((state) => state.movies.moviesPerPage);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(moviesActions.setMoviesPerPage(event.target.value));
  };

  return (
    <div>
      <FormControl variant="standard" style={{ width: "50px" }}>
        <Select
          value={moviesPerPage}
          onChange={handleChange}
          style={{ textAlign: "center" }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default MovieCountSelect;
