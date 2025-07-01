import { fetchMovies } from "../lib/fetch-movies";
import { Movie } from "../types/film";
import ClientMoviesList from "./components/ClientMoviesList";

export default async function MoviesPage() {
  let movies: Movie[] = [];
  let error: string | null = null;

  try {
    movies = await fetchMovies();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error loading movies.";
  }

  return <ClientMoviesList movies={movies} error={error} />;
}
