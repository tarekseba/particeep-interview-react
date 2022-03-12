import "./App.css";
import MoviesCard from "./components/MoviesCard/MoviesCard";
import MoviesContext from "./context/MoviesProvider";

function App() {
  return (
    <MoviesContext>
      <MoviesCard></MoviesCard>
    </MoviesContext>
  );
}

export default App;
