import "./Header.css";
import MovieCountSelect from "../../UI/select/MovieCountSelect";
import MultiSelect from "../../UI/select/MultiSelect";

const Header = (props) => {
  return (
    <div className="movies-header">
      <div className="left-container">
        <h2>Movies</h2>
        <MovieCountSelect></MovieCountSelect>
        <h3>per page</h3>
      </div>

      <div>
        <MultiSelect categories={props.categories}></MultiSelect>
      </div>
    </div>
  );
};

export default Header;
