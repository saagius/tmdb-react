import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Moment from 'react-moment';
import Accounting from 'accounting';
import ReactPlayer from 'react-player';

import { RootState } from "../reducers/store";
import * as MoviesActions from "../reducers/movies/actions";
import { Movie, DetailedMovie, MovieVideo, MovieCredits } from "../model/Movie";
import { 
    getPosterBasePath, 
    PosterSize, 
    getBackdropBasePath, 
    BackdropSize,
    getProfileBasePath,
    ProfileSize
} from "../helpers/TMDBHelper";

import './MovieForm.scss';

type RouteParams =  { id: string; };

interface InternalStateProps {
    showVideo: boolean;
}

interface OwnProps {
  movie: Movie;
}

interface StateToProps extends OwnProps, RouteComponentProps<RouteParams> {

}

interface StateProps {
    movie: Partial<DetailedMovie>;
    videos: MovieVideo[];
    credits: MovieCredits;
}

interface DispatchProps {
  fetchMovieById: (id: string) => void,
  fetchVideosForMovie: (id: string) => void,
  fetchCreditsForMovie: (id: string) => void
}
 
type Props = DispatchProps & StateProps & RouteComponentProps<RouteParams>;

class MovieFormComponent extends React.Component<Props, InternalStateProps> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showVideo: false
        };

        const {
            match: {
                params: {
                    id
                }
            }
        } = props;

        this.props.fetchMovieById(id);
        this.props.fetchVideosForMovie(id);
        this.props.fetchCreditsForMovie(id);

        this.toggleVideo = this.toggleVideo.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
        const {
            match: {
                params: {
                    id
                }
            }
        } = prevProps;
        const newId = this.props.match.params.id;

        if(newId !== id) {
            this.props.fetchMovieById(newId);
            this.props.fetchVideosForMovie(newId);
            this.props.fetchCreditsForMovie(newId);
        }
    }

    formatMoney(amount: number) {
        return Accounting.formatMoney(amount, '$', 0)
    }

    toggleVideo() {
        const {
            showVideo
        } = this.state;

        this.setState({
            showVideo: !showVideo
        });
    }

    getFirstVideoLink() {
        const videos = this.props.videos;
        let url = '';

        if(videos.length > 0) {
            const firstVideo = videos[0];

            switch(firstVideo.site) {
                case "YouTube":
                    url = `https://www.youtube.com/watch?v=${firstVideo.key}`;
                    break;
            }
        }

        return url;
    }

    getCrewNameByJob(job: string): string {
        const {
            credits
        } = this.props;

        let crewName: string = '';

        if(credits && credits.crew && credits.crew.length > 0) {
            credits.crew.forEach(_crew => {
                if(crewName === '' && _crew.job === job) {
                    crewName = _crew.name;
                }
            });
        }

        return crewName;
    }

    showBackdropSection() {
        const {
            movie,
            videos
        } = this.props;

        return movie.backdrop_path !== null || (videos && videos.length > 0);
    }

    showPosterSection() {
        const {
            movie
        } = this.props;

        return movie.poster_path !== null;
    }

    render() {
        const {
            movie,
            videos,
            credits
        } = this.props;
        const {
            showVideo
        } = this.state;

        if(movie) {
            return (
                <>
                    <div className="movie-form">
                        {
                            this.showBackdropSection() ?
                            <div className="backdrop">
                                <img alt={movie.title} src={movie.backdrop_path ? `${getBackdropBasePath(BackdropSize.ORIGINAL)}${movie.backdrop_path}` : '/assets/default.jpg'} />
                                {
                                    videos && videos.length > 0 ?
                                    <div className="video-wrapper">
                                        {showVideo ? null : <i onClick={this.toggleVideo} className="fa fa-play"></i>}
                                        {showVideo ? 
                                            <div className="video-backdrop">
                                                <div onClick={this.toggleVideo} className="closeVideo fa fa-times-rectangle"></div>
                                                <ReactPlayer url={this.getFirstVideoLink()} width="100%" height="100%" playing />
                                            </div> : null}
                                    </div> : null
                                }
                            </div> : null
                        }
                        <div className="information-wrapper">
                            {
                                this.showPosterSection() ?
                                <div className="poster">
                                    <img alt={movie.title} src={`${getPosterBasePath(PosterSize.XSMALL)}${movie.poster_path}`} />
                                </div> : null
                            }
                            <div className={`information ${!this.showPosterSection() ? 'full-width': ''}`}>
                                <div>
                                    <hr />
                                    <h1>{movie.title}</h1>
                                    <h2>{movie.tagline}</h2>
                                </div>
                                <div className="scores">
                                    <div className="vote_average">
                                        {movie && movie.vote_average ? `${movie.vote_average * 10}%` : 'N/A'}
                                    </div>
                                    <div className="other-score-info">
                                        <div className="popularity">
                                            Popularity: {movie.popularity}
                                        </div>
                                        <div className="vote_count">
                                            Vote Count: {movie.vote_count}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="movie-info-section">
                            <h3>Movie Info</h3>
                            <p>{movie.overview}</p>
                            <div className="movie-info">
                                <div>
                                    Genre: {movie.genres?.map(genre => {
                                        return genre.name;
                                    }).join(', ')}
                                </div>
                                <div>
                                    Directed by: {this.getCrewNameByJob('Director')}
                                </div>
                                <div>
                                    Written by: {this.getCrewNameByJob('Screenplay')}
                                </div>
                                <div>
                                    In Theaters: <Moment format="DD/MM/YYYY">{movie.release_date}</Moment>
                                </div>
                                <div>
                                    Runtime: {movie.runtime} minutes
                                </div>
                                <div>
                                    Languages: {movie.spoken_languages?.map(language => {
                                        return language.name;
                                    }).join(', ')}
                                </div>
                                <div>
                                    Budget: {movie.budget ? this.formatMoney(movie.budget) : 'N/A'}
                                </div>
                                <div>
                                    Revenue: {movie.revenue ? this.formatMoney(movie.revenue) : 'N/A'}
                                </div>
                                <div>
                                    Status: {movie.status}
                                </div>
                                <div>
                                    Produced by: {movie.production_companies?.map(company => {
                                        return company.name;
                                    }).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="cast-info-section">
                            <h3>Cast</h3>
                            <div className="cast-info">
                                {
                                    credits && credits.cast.map(cast => {
                                        return cast && cast.profile_path ?
                                            <div key={cast.id} className="cast">
                                                <div className="cast-image">
                                                    <img alt={cast.name} src={`${getProfileBasePath(ProfileSize.LARGE)}${cast.profile_path}`} />
                                                </div>
                                                <div className="cast-name">{cast.name}</div>
                                                <div className="cast-character">as {cast.character}</div>
                                            </div> : null;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                Loading movie...
            </>
        )
    }
}

const mapStateToProps = (state: RootState, ownProps: StateToProps): StateProps => {
    const { movies } = state;
    const {
        match: {
            params: {
                id
            }
        }
    } = ownProps;

    return { 
        credits: movies.credits[id],
        movie: movies.movies[id],
        videos: movies.videos[id]
    };
}

export default connect(mapStateToProps, MoviesActions)(MovieFormComponent);