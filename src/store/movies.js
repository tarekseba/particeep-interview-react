import { createSlice } from "@reduxjs/toolkit";
import { movies$ } from "../mocked-server/movies";
import { status } from "../utils";

const initialState = {
  // movies list
  movies: [],
  // filters list
  filters: [],
  // fetching error handling
  moviesStatus: status.STABLE,
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
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );
      state.movies[index].likes++;
      state.movies[index].liked = true;
    },
    removeLike: (state, action) => {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );
      state.movies[index].likes--;
      state.movies[index].liked = false;
    },
    addDislike: (state, action) => {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );
      state.movies[index].dislikes++;
      state.movies[index].disliked = true;
    },
    removeDislike: (state, action) => {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );
      state.movies[index].dislikes--;
      state.movies[index].disliked = false;
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
  dispatch(moviesActions.setMoviesStatus(status.LOADING));
  try {
    const response = await movies$;
    /**
     * Should test for response status here in a real scenario for example with fetch we should do :
     * if(response.ok){...} else throw response;
     * because in fetch API case 4** and 3** status codes do not throw exceptions so cannot be caught with try catch
     */
    dispatch(
      moviesActions.setMovies(
        response.map((movie) => {
          return { ...movie, liked: false, disliked: false };
        })
      )
    );
    dispatch(moviesActions.setMoviesStatus(status.STABLE));
  } catch (err) {
    dispatch(moviesActions.setMoviesStatus(status.LOADING_ERROR));
  }
};

export const moviesReducer = moviesSlice.reducer;
export const moviesActions = moviesSlice.actions;
