import { Pagination } from "@mui/material";
import { useContext, useEffect } from "react";
import { Context } from "../../Context/MoviesProvider";

const PaginationComponent = (props) => {
  const { currentPage, setCurrentPage, filters, moviesPerPage } =
    useContext(Context);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (props.totalMovies === 0) {
      setCurrentPage(1);
    } else if (Math.ceil(props.totalMovies / moviesPerPage) < currentPage) {
      setCurrentPage(Math.ceil(props.totalMovies / moviesPerPage));
    }
  }, [filters, currentPage, moviesPerPage, setCurrentPage, props.totalMovies]);
  return (
    <>
      <Pagination
        count={Math.ceil(props.totalMovies / moviesPerPage)}
        page={currentPage}
        onChange={handleChange}
      ></Pagination>
    </>
  );
};

export default PaginationComponent;
