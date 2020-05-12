import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

class HeaderComponent extends React.Component {
  render() {
    return (
      <>
        <header>
            <Link to={'/movies'}>Home</Link>
            <Link to={'/movies/now_playing'}>Now Playing</Link>
            <Link to={'/movies/popular'}>Popular</Link>
            <Link to={'/movies/top_rated'}>Top Rated</Link>
            <Link to={'/movies/upcoming'}>Upcoming</Link>
            <Link to={'/movies/charts/top_rated'}>Top 10 Charts</Link>
        </header>
      </>
    );
  }
}

export default HeaderComponent;