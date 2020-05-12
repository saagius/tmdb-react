import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Movie } from "../model/Movie";
import { RootState } from "../reducers/store";
import { getPosterBasePath, PosterSize } from "../helpers/TMDBHelper";

import "./MovieThumbnail.scss";

interface OwnProps {
    id: string;
}

interface StateProps {
    movie: Partial<Movie>;
}

type Props = OwnProps & StateProps;

class MovieThumbnailComponent extends React.Component<Props> {
    hasThumbnail() {
        const {
            movie
        } = this.props;

        return movie.poster_path !== null;
    }

    render() {
        const {
            movie
        } = this.props;

        if(movie) {
            return (
                <>
                    <div className="movie">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={this.hasThumbnail() ? `${getPosterBasePath(PosterSize.XSMALL)}${movie.poster_path}` : '/assets/default.jpg'}
                                alt={movie.title} />
                        </Link>
                    </div>
                </>
            );
        }

        return null;
    }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
    const { movies } = state;

    return { 
        movie: movies.movies[ownProps.id]
    };
}

export default connect(mapStateToProps)(MovieThumbnailComponent);