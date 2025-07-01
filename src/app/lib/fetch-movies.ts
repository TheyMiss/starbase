import { SWAPI_FILMS_ENDPOINT } from "../config/variables";
import { Movie, MoviesResponse } from "../types/film";

export const fetchMovies = async (): Promise<MoviesResponse> => {
  const res = await fetch(SWAPI_FILMS_ENDPOINT);

  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

export const fetchMovieById = async (id: string | number): Promise<Movie> => {
  const res = await fetch(`${SWAPI_FILMS_ENDPOINT}${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
};
