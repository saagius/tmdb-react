import {
  ActionTypes,
  ErrorMovie,
  ErrorMovies,
  FetchedMovie,
  FetchedMovies,
  LoadingMovie,
  LoadingMovies,
  MoviesByTypeSet,
  MovieState,
  IMoviesState,
  FetchedMovieVideos,
  ErrorMovieVideos,
  LoadingMovieVideos,
  FetchedMovieCredits,
  ErrorMovieCredits,
  LoadingMovieCredits,
  FetchedMoviesSearch,
  SearchQuerySet,
  SearchQueryCleared,
  MoviesByDiscoverTypeSet,
  SortBySet,
  SortByReset,
  FetchedDiscoveredMovies
} from "./types";
import { getDefaultSortByMovieType } from "../../helpers/TMDBHelper";

const initialState: MovieState = {
  movieIdsByType: {},
  movieIdsByDiscoverType: {},
  movieIdsByQuery: {},
  movies: {},
  videos: {},
  credits: {},
  search: '',
  sortByMoviesType: {},
  loading: false
};

const movieReducer = () => {
  return (
    state = initialState,
    action: FetchedMovie | 
    FetchedMovieVideos | 
    FetchedMovieCredits | 
    FetchedMovies | 
    FetchedDiscoveredMovies |
    FetchedMoviesSearch | 
    ErrorMovie | 
    ErrorMovieVideos | 
    ErrorMovieCredits | 
    ErrorMovies | 
    LoadingMovie | 
    LoadingMovieVideos | 
    LoadingMovieCredits | 
    LoadingMovies | 
    MoviesByTypeSet | 
    MoviesByDiscoverTypeSet |
    SortBySet |
    SortByReset |
    SearchQuerySet | 
    SearchQueryCleared
  ) => {
    switch (action.type) {
      case ActionTypes.LOADING_MOVIE:
      case ActionTypes.LOADING_MOVIES:
        return { ...state, loading: action.loading };
      case ActionTypes.SET_SORT_BY:
        return {
          ...state,
          sortByMoviesType: {
            ...state.sortByMoviesType,
            [action.moviesType]: action.sortBy
          }
        };
      case ActionTypes.RESET_SORT_BY:
        return {
          ...state,
          sortByMoviesType: {
            ...state.sortByMoviesType,
            [action.moviesType]: getDefaultSortByMovieType(action.moviesType)
          }
        };
      case ActionTypes.SET_SEARCH_QUERY:
        return {
          ...state,
          search: action.query
        };
      case ActionTypes.CLEAR_SEARCH_QUERY:
        return {
          ...state,
          search: ''
        };
      case ActionTypes.SET_MOVIES_BY_TYPE:
        let currentIds: string[] = [];
        const movieIdsByType = state.movieIdsByType[action.moviesType];

        if(movieIdsByType && movieIdsByType.ids) {
          currentIds = movieIdsByType.ids;
        }

        return {
          ...state,
          movieIdsByType: {
            ...state.movieIdsByType,
            [action.moviesType]: {
              ...state.movieIdsByType[action.moviesType],
              ids: [
                ...currentIds.filter(id => action.movieIds.indexOf(id) === -1),
                ...action.movieIds
              ],
              page: action.page,
              total_pages: action.total_pages,
              total_results: action.total_results
            }
          }
        }
      case ActionTypes.SET_MOVIES_BY_DISCOVER_TYPE:
        let _currentIds: string[] = [];
        const movieIdsByDiscoverType = state.movieIdsByDiscoverType[action.moviesType] && state.movieIdsByDiscoverType[action.moviesType][action.sortBy];

        if(movieIdsByDiscoverType && movieIdsByDiscoverType.ids) {
          _currentIds = movieIdsByDiscoverType.ids;
        }

        return {
          ...state,
          movieIdsByDiscoverType: {
            ...state.movieIdsByDiscoverType,
            [action.moviesType]: {
              ...state.movieIdsByDiscoverType[action.moviesType],
              [action.sortBy]: {
                ids: [
                  ..._currentIds.filter(id => action.movieIds.indexOf(id) === -1),
                  ...action.movieIds
                ],
                page: action.page,
                total_pages: action.total_pages,
                total_results: action.total_results
              }
            }
          }
        }

      case ActionTypes.FETCHED_MOVIE:
        return {
          ...state,
          movies: {
            ...state.movies,
            [action.movie.id]: action.movie
          },
          loading: action.loading
        };
      case ActionTypes.FETCHED_MOVIES:
      case ActionTypes.FETCHED_DISCOVERED_MOVIES:
        const newMovies: IMoviesState = {};
        
        action.movies.forEach(movie => {
          if(movie.id) {
            newMovies[movie.id] = movie;
          }
        });

        return {
          ...state,
          movies: {
            ...state.movies,
            ...newMovies
          },
          loading: action.loading
        };
      case ActionTypes.FETCHED_MOVIES_SEARCH:
        const newSearchedMovies: IMoviesState = {};
        
        action.movies.forEach(movie => {
          if(movie.id) {
            newSearchedMovies[movie.id] = movie;
          }
        });

        return {
          ...state,
          movieIdsByQuery: {
            [action.query]: action.movies.map(movie => movie.id)
          },
          movies: {
            ...state.movies,
            ...newSearchedMovies
          },
          loading: action.loading
        };
      case ActionTypes.FETCHED_MOVIE_VIDEOS:
        return {
          ...state,
          videos: {
            ...state.videos,
            [action.movieId]: action.videos
          }
        }
      case ActionTypes.FETCHED_MOVIE_CREDITS:
        return {
          ...state,
          credits: {
            ...state.credits,
            [action.movieId]: action.credits
          }
        }
      case ActionTypes.ERROR_MOVIE:
      case ActionTypes.ERROR_MOVIES:
        return { ...state, error: action.error, loading: action.loading };
      default:
        return state;
    }
  };
};

export default movieReducer;
