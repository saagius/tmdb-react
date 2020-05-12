import React from "react";
import { connect } from "react-redux";

import { SortBy, MovieType } from "../model/Movie";
import enumToArray from "../helpers/EnumToArray";
import { getSortByDescription } from "../helpers/TMDBHelper";
import * as MoviesActions from "../reducers/movies/actions";

interface OwnProps {
    sortBy: string;
    movieType: MovieType;
}

interface DispatchProps {
    setSortBy: (sortBy: string, moviesType: MovieType) => void,
    discoverMoviesBySort: (type: MovieType, sortBy: string, page?: number) => void
}

type Props = OwnProps & DispatchProps;

class SortComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onSortChange = this.onSortChange.bind(this);
    }

    onSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.setSortBy(event.target.value, this.props.movieType);
        this.props.discoverMoviesBySort(this.props.movieType, event.target.value);
    }

    render() {
        return (
            <>
                <aside>
                    <div className="sort-wrapper">
                        <div>Sort results by</div>
                        <select value={this.props.sortBy} onChange={this.onSortChange}>
                            {
                                enumToArray(SortBy).map(_sortBy => {
                                    const description = getSortByDescription(_sortBy);
                                    return description ? <option key={_sortBy} value={_sortBy}>{description}</option> : null
                                })
                            }
                        </select>
                    </div>
                </aside>
            </>
        );
    }
}

export default connect(null, MoviesActions)(SortComponent);