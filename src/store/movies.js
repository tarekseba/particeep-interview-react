import { createSlice } from "@reduxjs/toolkit";
import { movies$ } from "../mocked-server/movies";
import { LOADING, LOADING_ERROR, STABLE } from "../utils";

const initialState = {
  // movies list
  movies: [],
  // filters list
  filters: [],
  // fetching error handling
  moviesStatus: STABLE,
  currentPage: 1,
  moviesPerPage: 12,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addLike: (state, action) => {
      state.movies[
        state.movies.findIndex((movie) => movie.id === action.payload)
      ].likes++;
    },
    removeLike: (state, action) => {
      state.movies[
        state.movies.findIndex((movie) => movie.id === action.payload)
      ].likes--;
    },
    addDislike: (state, action) => {
      state.movies[
        state.movies.findIndex((movie) => movie.id === action.payload)
      ].dislikes++;
    },
    removeDislike: (state, action) => {
      state.movies[
        state.movies.findIndex((movie) => movie.id === action.payload)
      ].dislikes--;
    },
    removeMovie: (state, action) => {
      const newMovies = state.movies.filter(
        (mov) => mov.id !== action.payload.id
      );
      // check if there are still movies of removed movie category, if not remove category from filters
      if (
        !newMovies.map((mov) => mov.category).includes(action.payload.category)
      ) {
        state.filters = state.filters.filter(
          (filter) => filter !== action.payload.category
        );
      }
      // Remove movie
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    addFilter: (state, action) => {
      state.filters.push(action.payload);
    },
    removeFilter: (state, action) => {
      state.filters = state.filters.filter(
        (filter) => filter !== action.payload
      );
    },
    clearFilters: (state) => {
      state.filters = [];
    },
    setMoviesStatus: (state, action) => {
      state.moviesStatus = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setMoviesPerPage: (state, action) => {
      state.moviesPerPage = action.payload;
    },
  },
});

export const fetchMoviesAction = () => async (dispatch) => {
  dispatch(moviesActions.setMoviesStatus(LOADING));
  try {
    const response = await movies$;
    /**
     * Should test for response status here in a real scenario for example with fetch we should do :
     * if(response.ok){...} else throw response;
     * because in fetch API case 4** and 3** status codes do not throw exceptions so cannot be caught with try catch
     */
    dispatch(moviesActions.setMovies(response));
    dispatch(moviesActions.setMoviesStatus(STABLE));
  } catch (err) {
    dispatch(moviesActions.setMoviesStatus(LOADING_ERROR));
  }
};

export const moviesReducer = moviesSlice.reducer;
export const moviesActions = moviesSlice.actions;
