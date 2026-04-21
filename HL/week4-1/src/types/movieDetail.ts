export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  tagline: string;

  poster_path: string | null;
  backdrop_path: string | null;

  vote_average: number;
  release_date: string;
  runtime: number;

  genres: Genre[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  cast: Cast[];
  crew: Crew[];
}