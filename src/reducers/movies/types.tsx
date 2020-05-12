import { Movie, MovieType, DetailedMovie, MovieVideo, MovieCredits, SortBy } from "../../model/Movie";

export enum ActionTypes {
  SET_MOVIES_BY_TYPE = "SET_MOVIES_BY_TYPE",
  SET_MOVIES_BY_DISCOVER_TYPE = "SET_MOVIES_BY_DISCOVER_TYPE",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_SORT_BY = "SET_SORT_BY",
  RESET_SORT_BY = "RESET_SORT_BY",
  CLEAR_SEARCH_QUERY = "CLEAR_SEARCH_QUERY",
  LOADING_MOVIE = "LOADING_MOVIE",
  LOADING_MOVIE_VIDEOS = "LOADING_MOVIE_VIDEOS",
  LOADING_MOVIE_CREDITS = "LOADING_MOVIE_CREDITS",
  LOADING_MOVIES = "LOADING_MOVIES",
  LOADING_MOVIES_SEARCH = "LOADING_MOVIES_SEARCH",
  FETCHED_MOVIE = "FETCHED_MOVIE",
  FETCHED_MOVIE_VIDEOS = "FETCHED_MOVIE_VIDEOS",
  FETCHED_MOVIE_CREDITS = "FETCHED_MOVIE_CREDITS",
  FETCHED_MOVIES = "FETCHED_MOVIES",
  FETCHED_MOVIES_SEARCH = "FETCHED_MOVIES_SEARCH",
  FETCHED_DISCOVERED_MOVIES = "FETCHED_DISCOVERED_MOVIES",
  ERROR_MOVIE = "ERROR_MOVIE",
  ERROR_MOVIE_VIDEOS = "ERROR_MOVIE_VIDEOS",
  ERROR_MOVIE_CREDITS = "ERROR_MOVIE_CREDITS",
  ERROR_MOVIES = "ERROR_MOVIES",
  ERROR_MOVIES_SEARCH = "ERROR_MOVIES_SEARCH"
}

/**
 * Action Types
 */
export type LoadingMovie = {
  type: ActionTypes.LOADING_MOVIE;
  loading: boolean;
};
export type LoadingMovieVideos = {
  type: ActionTypes.LOADING_MOVIE_VIDEOS;
  loading: boolean;
  movieId: string;
};
export type LoadingMovieCredits = {
  type: ActionTypes.LOADING_MOVIE_CREDITS;
  loading: boolean;
  movieId: string;
};
export type LoadingMovies = {
  type: ActionTypes.LOADING_MOVIES;
  loading: boolean;
};
export type LoadingMoviesSearch = {
  type: ActionTypes.LOADING_MOVIES_SEARCH;
  loading: boolean;
  query: string;
};
export type FetchedMovie = {
  movie: DetailedMovie;
  type: ActionTypes.FETCHED_MOVIE;
  loading: boolean;
};
export type FetchedMovieVideos = {
  videos: MovieVideo[];
  type: ActionTypes.FETCHED_MOVIE_VIDEOS;
  loading: boolean;
  movieId: string;
};
export type FetchedMovieCredits = {
  credits: MovieCredits;
  type: ActionTypes.FETCHED_MOVIE_CREDITS;
  loading: boolean;
  movieId: string;
};
export type FetchedMovies = {
  movies: Partial<Movie>[];
  type: ActionTypes.FETCHED_MOVIES;
  loading: boolean;
};
export type FetchedDiscoveredMovies = {
  movies: Partial<Movie>[];
  type: ActionTypes.FETCHED_DISCOVERED_MOVIES;
  loading: boolean;
};
export type FetchedMoviesSearch = {
  movies: Partial<Movie>[];
  type: ActionTypes.FETCHED_MOVIES_SEARCH;
  loading: boolean;
  query: string;
};

export type MoviesByTypeSet = {
  type: ActionTypes.SET_MOVIES_BY_TYPE;
  movieIds: string[];
  moviesType: MovieType;
  page: number;
  total_pages: number;
  total_results: number;
};
export type MoviesByDiscoverTypeSet = {
  type: ActionTypes.SET_MOVIES_BY_DISCOVER_TYPE;
  movieIds: string[];
  moviesType: MovieType;
  sortBy: string;
  page: number;
  total_pages: number;
  total_results: number;
}

export type SearchQuerySet = {
  type: ActionTypes.SET_SEARCH_QUERY;
  query: string;
};
export type SortBySet = {
  type: ActionTypes.SET_SORT_BY;
  sortBy: string;
  moviesType: MovieType;
}
export type SortByReset = {
  type: ActionTypes.RESET_SORT_BY;
  moviesType: MovieType;
}
export type SearchQueryCleared = {
  type: ActionTypes.CLEAR_SEARCH_QUERY;
};

export type ErrorMovie = {
  type: ActionTypes.ERROR_MOVIE;
  error: string;
  loading: boolean;
};
export type ErrorMovieVideos = {
  type: ActionTypes.ERROR_MOVIE_VIDEOS;
  error: string;
  loading: boolean;
  movieId: string;
};
export type ErrorMovieCredits = {
  type: ActionTypes.ERROR_MOVIE_CREDITS;
  error: string;
  loading: boolean;
  movieId: string;
};
export type ErrorMovies = {
  type: ActionTypes.ERROR_MOVIES;
  error: string;
  loading: boolean;
};
export type ErrorMoviesSearch= {
  type: ActionTypes.ERROR_MOVIES_SEARCH;
  error: string;
  loading: boolean;
  query: string;
};

export interface IMoviesState {
  [x: string]: Partial<DetailedMovie>
}

export interface IVideosState {
  [x: string]: MovieVideo[];
}

export interface ICreditsState {
  [x: string]: MovieCredits;
}

export interface MoviesByType {
  ids: string[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMoviesByTypeState {
  [x: string]: MoviesByType;
}

export interface ISortByState {
  [x: string]: MoviesByType;
}

export interface IMoviesByDiscoverTypeState {
  [x: string]: ISortByState;
}

export interface IMoviesByQueryState {
  [x: string]: number[];
}

export interface ISortByMoviesTypeState {
  [x: string]: SortBy;
}

/**
 * State Type
 */
export type MovieState = {
  movieIdsByType: IMoviesByTypeState;
  movieIdsByDiscoverType: IMoviesByDiscoverTypeState;
  movieIdsByQuery: IMoviesByQueryState;
  movies: IMoviesState;
  videos: IVideosState;
  credits: ICreditsState;
  search: string;
  sortByMoviesType: ISortByMoviesTypeState;
  loading: boolean;
  error?: string;
};
