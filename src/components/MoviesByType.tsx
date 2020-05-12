import React, { createRef } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { RootState } from "../reducers/store";
import * as MoviesActions from "../reducers/movies/actions";
import { MoviesByType } from "../reducers/movies/types";
import { MovieType } from "../model/Movie";
import MovieThumbnail from "./MovieThumbnail";
import debounce from "../helpers/Debounce";
import { getDefaultSortByMovieType } from "../helpers/TMDBHelper";
import Sort from "./Sort";

import "./MoviesByType.scss";

type RouteParams =  { type: string; };

interface OwnProps {
    type: MovieType;
}

interface InternalState {
    isView: boolean;
}

interface StateProps {
    moviesByType?: MoviesByType | null;
    sortBy: string;
}

interface StateToProps extends OwnProps, Partial<RouteComponentProps<RouteParams>> {

}

interface DispatchProps {
  resetSortBy: (moviesType: MovieType) => void,
  setSortBy: (sortBy: string, moviesType: MovieType) => void,
  discoverMoviesBySort: (type: MovieType, sortBy: string, page?: number) => void
}
 
type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps<RouteParams>;

class MoviesByTypeComponent extends React.Component<Props, InternalState> {
    private container = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);

        this.handleScroll = debounce(this.handleScroll.bind(this), 50);

        this.state = {
            isView: this.props.type === undefined
        };

        this.props.setSortBy(getDefaultSortByMovieType(this.getMovieType()), this.getMovieType());
        this.props.discoverMoviesBySort(this.getMovieType(), getDefaultSortByMovieType(this.getMovieType()));
    }

    getTitleByType() {
        const type = this.getMovieType();

        switch(type) {
            case MovieType.NOW_PLAYING:
                return 'Now Playing';
            case MovieType.POPULAR:
                return 'Popular';
            case MovieType.TOP_RATED:
                return 'Top Rated';
            case MovieType.UPCOMING:
                return 'Upcoming';
        }
    }

    getMovieType(): MovieType {
        const type = (this.props.match && this.props.match.params && this.props.match.params.type) || this.props.type;

        return type as MovieType;
    }

    componentDidMount() {
        if(this.container && this.container.current) {
            this.container.current.addEventListener('scroll', this.handleScroll);
        }
    }

    componentDidUpdate(prevProps: Props) {
        const {
            match: {
                params: {
                    type
                }
            }
        } = prevProps;
        const newType = this.props.match.params.type;

        if(newType !== type) {
            this.props.resetSortBy(this.getMovieType());
            this.props.discoverMoviesBySort(this.getMovieType(), getDefaultSortByMovieType(this.getMovieType()));
        }
    }

    componentWillUnmount() {
        if(this.container && this.container.current) {
            this.container.current.removeEventListener('scroll', this.handleScroll);
        }

        this.props.resetSortBy(this.getMovieType());
    }

    handleScroll() {
        const {
            moviesByType,
            sortBy
        } = this.props;
        const {
            isView
        } = this.state;

        if(!isView) {
            const { scrollLeft, scrollWidth, clientWidth } = this.container.current as any;

            if(scrollLeft > ((scrollWidth - clientWidth) - clientWidth)) {
                if(moviesByType) {
                    if(moviesByType.page < moviesByType.total_pages) {
                        this.props.discoverMoviesBySort(this.getMovieType(), sortBy, moviesByType.page + 1);
                    }
                }
            }
        }
        else {
            const { scrollTop, scrollHeight, clientHeight } = this.container.current as any;

            if(scrollTop > ((scrollHeight - clientHeight) * .8)) {
                if(moviesByType) {
                    if(moviesByType.page < moviesByType.total_pages) {
                        this.props.discoverMoviesBySort(this.getMovieType(), sortBy, moviesByType.page + 1);
                    }
                }
            }
        }
    }

    render() {
        const {
            moviesByType,
            sortBy
        } = this.props;
        const {
            isView
        } = this.state;

        return (
            <>
                <div className={`movies-by-type${isView ? ' view' : ''}`}>
                    <h2>{this.getTitleByType()} Movies</h2>
                    <div className="movies-wrapper">
                        {
                            isView ?
                            <Sort sortBy={sortBy} movieType={this.getMovieType()}></Sort> : null
                        }
                        <div className="movies" ref={this.container}>
                            {moviesByType && moviesByType.ids && moviesByType.ids.map(movieId => {
                                return <MovieThumbnail key={movieId} id={movieId}></MovieThumbnail>
                            })}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: StateToProps): StateProps => {
    const { movies } = state;
    const routeType = ownProps.match && ownProps.match.params && ownProps.match.params.type;
    let moviesByType: MoviesByType | null = null;
    const sortBy = movies.sortByMoviesType && movies.sortByMoviesType[ownProps.type || routeType];

    if(movies.movieIdsByDiscoverType[ownProps.type || routeType] && movies.movieIdsByDiscoverType[ownProps.type || routeType][sortBy]) {
        moviesByType = movies.movieIdsByDiscoverType[ownProps.type || routeType][sortBy];
    }

    return { 
        moviesByType,
        sortBy
    };
}

export default connect(mapStateToProps, MoviesActions)(withRouter(MoviesByTypeComponent));