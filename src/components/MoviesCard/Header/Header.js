import "./Header.css";
import MultiSelect from "./select/MultiSelect";

const Header = (props) => {
  return (
    <div className="movies-header">
      <h2>Movies</h2>
      <div>
        <MultiSelect
          categories={props.categories}
          filters={props.filters}
          onFilterChange={props.onFilterChange}
        ></MultiSelect>
      </div>
    </div>
  );
};

export default Header;
