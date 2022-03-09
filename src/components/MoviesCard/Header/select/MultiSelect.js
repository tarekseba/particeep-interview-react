import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 160,
      maxWidth: 200,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const MultiSelect = (props) => {
  const { categories, filters, onFilterChange } = props;
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    onFilterChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{ m: 1 }}
        style={{ minWidth: 160, maxWidth: 200, maxHeight: 80 }}
      >
        <Select
          multiple
          value={filters}
          onChange={handleChange}
          label="Filters"
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          placeholder="Filters"
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
