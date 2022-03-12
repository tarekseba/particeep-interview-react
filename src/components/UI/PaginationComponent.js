import { Pagination } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { moviesActions } from "../../store/movies";

const PaginationComponent = (props) => {
  const currentPage = useSelector((state) => state.movies.currentPage);
  const moviesPerPage = useSelector((state) => state.movies.moviesPerPage);
  const filters = useSelector((state) => state.movies.filters);
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    dispatch(moviesActions.setCurrentPage(value));
  };
  const pageCount = Math.ceil(props.totalMovies / moviesPerPage);

  useEffect(() => {
    if (props.totalMovies === 0) {
      dispatch(moviesActions.setCurrentPage(1));
    } else if (pageCount < currentPage) {
      dispatch(moviesActions.setCurrentPage(pageCount));
    }
  }, [currentPage, dispatch, moviesPerPage, pageCount, props.totalMovies]);
  return (
    <>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
      ></Pagination>
    </>
  );
};

export default PaginationComponent;
