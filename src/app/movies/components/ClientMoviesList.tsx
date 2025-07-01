"use client";

import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useMoviesStore } from "@/app/store/movies-store";
import { Movie } from "@/app/types/film";
import { MovieCardSkeleton } from "./detail/MovieCardSkeleton";

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
      <div className="text-sb-accent text-center font-semibold py-8">
        Error loading movies: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="max-w-4xl mx-auto px-4">
        <ul
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
          aria-label="Loading movies"
          aria-busy="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="sr-only">List of Star Wars movies</h2>
      <ul
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
        aria-label="List of Star Wars movies"
      >
        {clientMovies.map((movie) => (
          <li key={movie.url} className="h-full">
            <MovieCard {...movie} />
          </li>
        ))}
      </ul>
    </section>
  );
}
