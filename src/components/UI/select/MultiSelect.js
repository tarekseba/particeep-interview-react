import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "../../../store/movies";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 120,
      maxWidth: 200,
    },
  },
};

const MultiSelect = (props) => {
  const filters = useSelector((state) => state.movies.filters);
  const dispatch = useDispatch();
  const { categories } = props;
  //const { filters, setFilters } = useContext(Context);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(
      moviesActions.setFilters(
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{ m: 1 }}
        style={{ minWidth: 100, maxWidth: 130, maxHeight: 80 }}
      >
        <Select
          multiple
          value={filters}
          onChange={handleChange}
          label="Filters"
          renderValue={(selected) =>
            selected.filter((item) => categories.includes(item)).join(", ")
          }
          MenuProps={MenuProps}
          placeholder="Filters"
          style={{ textAlign: "center" }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Checkbox checked={filters.indexOf(cat) > -1} />
              <ListItemText primary={cat} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelect;
