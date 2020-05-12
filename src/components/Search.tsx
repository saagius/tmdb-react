import React from "react";
import { connect } from "react-redux";
import Autocomplete from "react-autocomplete";

import { RootState } from "../reducers/store";
import * as MoviesActions from "../reducers/movies/actions";
import { Movie, DetailedMovie } from "../model/Movie";
import debounce from "../helpers/Debounce";

import "./Search.scss";
import { Link } from "react-router-dom";

interface DispatchProps {
    clearSearchQuery: () => void,
    setSearchQuery: (query: string) => void,
    searchMovies: (query: string) => void
}

interface StateProps {
    query: string;
    moviesByQuery: Partial<DetailedMovie>[];
}

type Props = StateProps & DispatchProps;

class SearchComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.searchForMovies = debounce(this.searchForMovies.bind(this), 200);
    }

    searchForMovies() {
        this.props.searchMovies(this.props.query);
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>, query: string) {
        this.props.setSearchQuery(query);
        this.searchForMovies();
    }

    onSelect() {
        this.props.clearSearchQuery();
    }

    renderItem(movie: Movie, isHighlighted: boolean) {
        return (
            <Link key={movie.id} className={isHighlighted ? 'selected' : ''} to={`/movie/${movie.id}`}>{movie.title} ({movie.release_date})</Link>
        );
    }

    render() {
        const {
            query,
            moviesByQuery
        } = this.props;

        return (
            <>
                <div className="search">
                    <Autocomplete
                        inputProps={{placeholder: 'Search for Movies'}}
                        getItemValue={movie => movie.title}
                        items={moviesByQuery}
                        renderItem={this.renderItem}
                        value={query}
                        onChange={this.onChange}
                        onSelect={this.onSelect} />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    const { movies } = state;
    const query = movies.search;

    const movieIds = (query && movies.movieIdsByQuery && movies.movieIdsByQuery[query]) || [];

    return {
        query,
        moviesByQuery: movieIds.map(movieId => {
            return movies.movies[movieId];
        })
    };
}

export default connect(mapStateToProps, MoviesActions)(SearchComponent);