import { FormControl, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../../Context/MoviesProvider";

const MovieCountSelect = () => {
  const { moviesPerPage, setMoviesPerPage } = useContext(Context);

  const handleChange = (event) => {
    setMoviesPerPage(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" style={{ width: "50px" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
