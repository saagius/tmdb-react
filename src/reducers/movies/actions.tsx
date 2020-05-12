import { ThunkDispatch } from "redux-thunk";
import { 
  ActionTypes, 
  ErrorMovie, 
  ErrorMovies, 
  FetchedMovie, 
  FetchedMovies, 
  LoadingMovie, 
  LoadingMovies,
  MoviesByTypeSet,
  FetchedMovieVideos,
  ErrorMovieVideos,
  LoadingMovieVideos,
  FetchedMovieCredits,
  ErrorMovieCredits,
  LoadingMovieCredits,
  FetchedMoviesSearch,
  ErrorMoviesSearch,
  LoadingMoviesSearch,
  SortBySet,
  SortByReset,
  SearchQuerySet,
  SearchQueryCleared,
  MoviesByDiscoverTypeSet,
  FetchedDiscoveredMovies
} from "./types";
import Fetch from "../../helpers/Fetch";
import { 
  Movie,
  MovieType,
  DetailedMovie,
  MovieVideo,
  MovieCredits
} from "../../model/Movie";
import { RootState } from "../store";
import { getDefaultExtraParamsByMovieType } from "../../helpers/TMDBHelper";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MoviesErrorResponse {
  status_message: string;
  status_code: string;
}

interface MoviesByTypeParams {
  type: MovieType;
  movieIds: string[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface MoviesByDiscoverTypeParams extends MoviesByTypeParams {
  sortBy: string;
}

export const setMoviesByType = (params: MoviesByTypeParams): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, MoviesByTypeSet>
  ) => {
    const {
      type,
      movieIds,
      page,
      total_pages,
      total_results
    } = params;

    dispatch({
      type: ActionTypes.SET_MOVIES_BY_TYPE,
      loading: false,
      moviesType: type,
      movieIds,
      page,
      total_pages,
      total_results
    });
  };
};

export const setMoviesByDiscoverType = (params: MoviesByDiscoverTypeParams): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, MoviesByDiscoverTypeSet>
  ) => {
    const {
      type,
      movieIds,
      page,
      total_pages,
      total_results,
      sortBy
    } = params;

    dispatch({
      type: ActionTypes.SET_MOVIES_BY_DISCOVER_TYPE,
      loading: false,
      moviesType: type,
      movieIds,
      page,
      total_pages,
      total_results,
      sortBy
    });
  };
};

export const setSearchQuery = (query: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SearchQuerySet>
  ) => {
    dispatch({
      type: ActionTypes.SET_SEARCH_QUERY,
      query
    });
  };
};

export const setSortBy = (sortBy: string, moviesType: MovieType): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SortBySet>
  ) => {
    dispatch({
      type: ActionTypes.SET_SORT_BY,
      moviesType,
      sortBy
    });
  };
};

export const resetSortBy = (moviesType: MovieType): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SortByReset>
  ) => {
    dispatch({
      type: ActionTypes.RESET_SORT_BY,
      moviesType
    });
  };
};

export const clearSearchQuery = (): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SearchQueryCleared>
  ) => {
    dispatch({
      type: ActionTypes.CLEAR_SEARCH_QUERY
    });
  };
};

export const fetchMovies = (type: MovieType, pageToDownload: number = 1): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedMovies | ErrorMovies | LoadingMovies | MoviesByTypeSet>,
    getState: () => RootState
  ) => {
    let page = 0;
    const movieIdsByType = getState().movies.movieIdsByType;

    if(movieIdsByType[type]) {
      page = movieIdsByType[type].page;
    }

    if(pageToDownload > page) {
      dispatch({
        type: ActionTypes.LOADING_MOVIES,
        loading: true
      });

      Fetch.get(`/movie/${type}`, {
        page: pageToDownload
      })
        .then((response: MoviesResponse) => {
          dispatch({
            type: ActionTypes.FETCHED_MOVIES,
            loading: false,
            movies: response.results
          });

          dispatch(setMoviesByType({
            movieIds: response.results.map(movie => movie.id.toString()),
            type,
            page: response.page,
            total_pages: response.total_pages,
            total_results: response.total_results
          }));
        })
        .catch((errorResponse: MoviesErrorResponse) => {
          console.error(errorResponse);
          dispatch({
            type: ActionTypes.ERROR_MOVIES,
            error: errorResponse.status_message,
            loading: false
          });
        });
      }
  };
};

export const discoverMoviesBySort = (type: MovieType, sortBy: string, pageToDownload: number = 1): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedDiscoveredMovies | ErrorMovies | LoadingMovies>,
    getState: () => RootState
  ) => {
    let page = 0;
    const movieIdsByType = getState().movies.movieIdsByDiscoverType;

    if(movieIdsByType[type] && movieIdsByType[type][sortBy]) {
      page = movieIdsByType[type][sortBy].page;
    }

    if(pageToDownload > page) {
      dispatch({
        type: ActionTypes.LOADING_MOVIES,
        loading: true
      });

      Fetch.get(`/discover/movie`, {
        page: pageToDownload,
        sort_by: sortBy,
        ...getDefaultExtraParamsByMovieType(type)
      })
        .then((response: MoviesResponse) => {
          dispatch({
            type: ActionTypes.FETCHED_DISCOVERED_MOVIES,
            loading: false,
            movies: response.results
          });

          dispatch(setMoviesByDiscoverType({
            movieIds: response.results.map(movie => movie.id.toString()),
            type,
            page: response.page,
            total_pages: response.total_pages,
            total_results: response.total_results,
            sortBy
          }));
        })
        .catch((errorResponse: MoviesErrorResponse) => {
          console.error(errorResponse);
          dispatch({
            type: ActionTypes.ERROR_MOVIES,
            error: errorResponse.status_message,
            loading: false
          });
        });
      }
  };
};

export const fetchMovieById = (movieId: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedMovie | ErrorMovie | LoadingMovie>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_MOVIE,
      loading: true
    });

    Fetch.get(`/movie/${movieId}`)
      .then((movie: DetailedMovie) => {
          dispatch({
            type: ActionTypes.FETCHED_MOVIE,
            loading: false,
            movie
          });
      })
      .catch((errorResponse: MoviesErrorResponse) => {
        dispatch({
          type: ActionTypes.ERROR_MOVIE,
          error: errorResponse.status_message,
          loading: false
        });
      });
  };
};

interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

export const fetchVideosForMovie = (movieId: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedMovieVideos | ErrorMovieVideos | LoadingMovieVideos>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_MOVIE_VIDEOS,
      loading: true,
      movieId
    });

    Fetch.get(`/movie/${movieId}/videos`)
      .then((videosResponse: MovieVideosResponse) => {
          dispatch({
            type: ActionTypes.FETCHED_MOVIE_VIDEOS,
            loading: false,
            videos: videosResponse.results,
            movieId
          });
      })
      .catch((errorResponse: MoviesErrorResponse) => {
        dispatch({
          type: ActionTypes.ERROR_MOVIE_VIDEOS,
          error: errorResponse.status_message,
          loading: false,
          movieId
        });
      });
  };
};

interface MovieCreditsResponse {
  id: number;
  results: MovieCredits;
}

export const fetchCreditsForMovie = (movieId: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedMovieCredits | ErrorMovieCredits | LoadingMovieCredits>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_MOVIE_CREDITS,
      loading: true,
      movieId
    });

    Fetch.get(`/movie/${movieId}/credits`)
      .then((movieCredits: MovieCredits) => {
          dispatch({
            type: ActionTypes.FETCHED_MOVIE_CREDITS,
            loading: false,
            credits: movieCredits,
            movieId
          });
      })
      .catch((errorResponse: MoviesErrorResponse) => {
        dispatch({
          type: ActionTypes.ERROR_MOVIE_CREDITS,
          error: errorResponse.status_message,
          loading: false,
          movieId
        });
      });
  };
};

export const searchMovies = (query: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedMoviesSearch | ErrorMoviesSearch | LoadingMoviesSearch>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_MOVIES_SEARCH,
      loading: true,
      query
    });

    Fetch.get('/search/movie', {
      query
    })
      .then((moviesResponse: MoviesResponse) => {
          dispatch({
            type: ActionTypes.FETCHED_MOVIES_SEARCH,
            loading: false,
            movies: moviesResponse.results,
            query
          });
      })
      .catch((errorResponse: MoviesErrorResponse) => {
        dispatch({
          type: ActionTypes.ERROR_MOVIES_SEARCH,
          error: errorResponse.status_message,
          loading: false,
          query
        });
      });
  };
};