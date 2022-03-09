import "./Header.css";
import MultiSelect from "./select/MultiSelect";

const Header = (props) => {
  return (
    <div className="movies-header">
      <h2>Movies</h2>
      <div>
        <MultiSelect></MultiSelect>
      </div>
    </div>
  );
};

export default Header;
