export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface MovieVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}

export interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string;
}

export interface Crew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path: string;
}

export interface MovieCredits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export enum MovieType {
    NOW_PLAYING = 'now_playing',
    POPULAR = 'popular',
    TOP_RATED = 'top_rated',
    UPCOMING = 'upcoming'
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface DetailedMovie extends Movie {
    belongs_to_collection?: any;
    budget: number;
    genres: Genre[];
    homepage?: string;
    imdb_id?: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    revenue: number;
    runtime?: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline?: string;
}

export enum SortBy {
    POPULARITY_ASC = "popularity.asc",
    POPULARITY_DESC = "popularity.desc",
    RELEASE_DATE_ASC = "release_date.asc", 
    RELEASE_DATE_DESC = "release_date.desc", 
    REVENUE_ASC = "revenue.asc", 
    REVENUE_DESC = "revenue.desc", 
    PRIMARY_RELEASE_DATE_ASC = "primary_release_date.asc", 
    PRIMARY_RELEASE_DATE_DESC = "primary_release_date.desc", 
    ORIGINAL_TITLE_ASC = "original_title.asc", 
    ORIGINAL_TITLE_DESC = "original_title.desc", 
    VOTE_AVERAGE_ASC = "vote_average.asc", 
    VOTE_AVERAGE_DESC = "vote_average.desc", 
    VOTE_COUNT_ASC = "vote_count.asc", 
    VOTE_COUNT_DESC = "vote_count.desc"
}

export interface ISortBy {
    [x: string]: string;
}