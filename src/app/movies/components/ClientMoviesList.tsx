"use client";

import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useMoviesStore } from "@/app/store/movies-store";
import { Movie } from "@/app/types/film";

type Props = {
  movies: Movie[];
  error: string | null;
};

export default function ClientMoviesList({ movies, error }: Props) {
  const setMovies = useMoviesStore((s) => s.setMovies);
  const isLoading = useMoviesStore((s) => s.isLoading);
  const clientMovies = useMoviesStore((s) => s.movies);

  useEffect(() => {
    if (movies.length > 0) {
      setMovies(movies);
    }
  }, [movies, setMovies]);

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading movies: {error}
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-gray-500 text-center">Loading movies…</div>;
  }

  return (
    <ul className="space-y-6" aria-label="List of Star Wars movies">
      {clientMovies.map((movie) => (
        <li key={movie.url}>
          <MovieCard {...movie} />
        </li>
      ))}
    </ul>
  );
}
