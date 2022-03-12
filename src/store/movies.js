import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  filters: [],
  isLoading: [],
  currentPage: 1,
  moviesPerPage: 12,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    removeMovie(state, action) {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    addFilter(state, action) {
      state.filters.push(action.payload);
    },
    removeFilter(state, action) {
      state.filters.filter((filter) => filter !== action.payload);
    },
    clearFilters(state) {
      state.filters = [];
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setMoviesPerPage(state, action) {
      state.moviesPerPage = action.payload;
    },
  },
});

export default moviesSlice.reducer;
export const moviesActions = moviesSlice.actions;
