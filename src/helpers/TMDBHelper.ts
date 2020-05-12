import moment from "moment";
import { 
    SortBy, 
    ISortBy, 
    MovieType 
} from "../model/Movie";

export enum BackdropSize {
    SMALL = 'w300',
    MEDIUM = 'w780',
    LARGE = 'w1280',
    ORIGINAL = 'original'
}

export enum ProfileSize {
    SMALL = 'w45',
    MEDIUM = 'w180',
    LARGE = 'h632',
    ORIGINAL = 'original'
}

export enum PosterSize {
    TINY = 'w92',
    XXSMALL = 'w154',
    XSMALL = 'w185',
    SMALL = 'w342',
    SMALL_MEDIUM = 'w500',
    MEDIUM = 'w780',
    ORIGINAL = 'original'
}

const sortByInformation: ISortBy = {
    [SortBy.POPULARITY_ASC]: "Popularity Ascending",
    [SortBy.POPULARITY_DESC]: "Popularity Descending",
    [SortBy.VOTE_AVERAGE_ASC]: "Rating Ascending",
    [SortBy.VOTE_AVERAGE_DESC]: "Rating Descending",
    [SortBy.RELEASE_DATE_ASC]: "Release Date Ascending",
    [SortBy.RELEASE_DATE_DESC]: "Release Date Descending",
    [SortBy.ORIGINAL_TITLE_ASC]: "Title (A-Z)",
    [SortBy.ORIGINAL_TITLE_DESC]: "Title (Z-A)"
}

export const movieImageBasePath = 'http://image.tmdb.org/t/p/:size';

export const getBackdropBasePath = (size: BackdropSize) => {
    return movieImageBasePath.replace(':size', size);
}

export const getPosterBasePath = (size: PosterSize) => {
    return movieImageBasePath.replace(':size', size);
}

export const getProfileBasePath = (size: ProfileSize) => {
    return movieImageBasePath.replace(':size', size);
}

export const getSortByDescription = (sortBy: string) => {
    return sortByInformation[sortBy];
}

export const getDefaultSortByMovieType = (movieType: MovieType) => {
    if(movieType !== MovieType.TOP_RATED) {
        return SortBy.POPULARITY_DESC;
    }
    else {
        return SortBy.VOTE_AVERAGE_DESC;
    }
}

export const getDefaultExtraParamsByMovieType = (movieType: MovieType): any => {
    switch(movieType) {
        case MovieType.NOW_PLAYING:
            return {
                with_release_type: 3,
                "release_date.gte": moment().subtract('M', 1).set('date', 1).format('YYYY-MM-DD'),
                "release_date.lte": moment().add('d', 1).format('YYYY-MM-DD')
            };
        case MovieType.UPCOMING:
            return {
                with_release_type: 3,
                "release_date.gte": moment().add('d', 1).format('YYYY-MM-DD'),
                "release_date.lte": moment().add('M', 1).add('d', 1).format('YYYY-MM-DD')
            };
        case MovieType.TOP_RATED:
            return {
                "vote_count.gte": 300
            }
    }
}