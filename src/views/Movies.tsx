import React from "react";
import { MovieType } from "../model/Movie";
import MoviesByType from "../components/MoviesByType";

import "./Movies.scss";

class MoviesComponent extends React.Component {
  render() {
    return (
      <>
        <div className="movies-view">
          <MoviesByType type={MovieType.NOW_PLAYING}></MoviesByType>
          <MoviesByType type={MovieType.POPULAR}></MoviesByType>
          <MoviesByType type={MovieType.TOP_RATED}></MoviesByType>
          <MoviesByType type={MovieType.UPCOMING}></MoviesByType>
        </div>
      </>
    );
  }
}

export default MoviesComponent;