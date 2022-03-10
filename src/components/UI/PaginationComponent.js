import { Pagination } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../Context/MoviesProvider";

const PaginationComponent = (props) => {
  const { currentPage, setCurrentPage } =
    useContext(Context);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Pagination
        count={props.count}
        page={currentPage}
        onChange={handleChange}
      ></Pagination>
    </>
  );
};

export default PaginationComponent;
