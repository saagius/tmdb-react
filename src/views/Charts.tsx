import React from "react";
import Chart from "../components/Chart";
import * as MoviesActions from "../reducers/movies/actions";

import "./Charts.scss";
import { MovieType, SortBy, DetailedMovie } from "../model/Movie";
import { connect } from "react-redux";
import { RootState } from "../reducers/store";
import { IChartData, IChart } from "../model/Chart";

interface StateProps {
    movies: Partial<DetailedMovie>[];
}

interface DispatchProps {
    discoverMoviesBySort: (type: MovieType, sortBy: string, page?: number) => void
}

type Props = StateProps & DispatchProps;

class ChartsComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.props.discoverMoviesBySort(MovieType.TOP_RATED, SortBy.VOTE_AVERAGE_DESC);
    }

    getTop10RatedData() {
        const chart: IChart = {
            x_title: 'Top 10 Rated Movies',
            y_title: 'Rating %',
            data: this.props.movies.slice(0, 10).map(movie => {
                const data: IChartData = {
                    x: movie.title as string,
                    y: movie.vote_average ? movie.vote_average * 10 : 0,
                    color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
                };
                
                return data;
            })
        }

        return chart;
    }

    getTop10RatedVotesData() {
        const chart: IChart = {
            x_title: 'Top 10 Rated Movies',
            y_title: 'Vote Count',
            data: this.props.movies.slice(0, 10).map(movie => {
                const data: IChartData = {
                    x: movie.title as string,
                    y: movie.vote_count ? movie.vote_count : 0,
                    color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
                };
                
                return data;
            })
        }
        
        return chart;
    }

    render() {
        if(this.props.movies && this.props.movies.length > 0) {
            return (
                <>
                    <div className="charts-view">
                        <h2>Top 10 Charts</h2>
                        <div className="chart-wrapper">
                            <Chart id="top-rated" data={this.getTop10RatedData()} specifier="%"></Chart>
                            <Chart id="votes" data={this.getTop10RatedVotesData()} specifier="votes"></Chart>
                        </div>
                    </div>
                </>
            );
        }

        return null;
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    const { movies } = state;
    let movieIds: string[] = [];

    if(movies.movieIdsByDiscoverType[MovieType.TOP_RATED] && movies.movieIdsByDiscoverType[MovieType.TOP_RATED][SortBy.VOTE_AVERAGE_DESC]) {
        movieIds = movies.movieIdsByDiscoverType[MovieType.TOP_RATED][SortBy.VOTE_AVERAGE_DESC].ids;
    }

    return { 
        movies: movieIds.map(movieId => {
            return movies.movies[movieId];
        })
    };
}

export default connect(mapStateToProps, MoviesActions)(ChartsComponent);