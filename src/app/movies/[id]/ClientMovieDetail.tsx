"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { MovieDetailError } from "../components/detail/MovieDetailError";
import { MovieHeader } from "../components/detail/MovieHeader";
import { CharacterList } from "../components/detail/CharacterList";
import { Movie } from "@/app/types/film";
import { useMoviesStore } from "@/app/store/movies-store";
import { Character } from "@/app/types/character";
import { MovieDetailSkeleton } from "../components/detail/MovieDetailSkeleton";

interface Props {
  movie: Movie | null;
  characterData: Character[];
  error: string | null;
}

export default function ClientMovieDetail({
  movie,
  characterData,
  error,
}: Props) {
  const setMovieById = useMoviesStore((state) => state.setMovieById);
  const isLoading = useMoviesStore((s) => s.isLoading);

  useEffect(() => {
    if (movie) {
      setMovieById(movie);
    }
  }, [movie, setMovieById]);

  if (error || !movie) {
    return <MovieDetailError />;
  }

  if (isLoading) {
    return (
      <main className="max-w-2xl mx-auto py-10 space-y-8">
        <article>
          <MovieDetailSkeleton />
        </article>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-10 space-y-8">
      <article>
        <Card className="border-sb-primary border-2 bg-sb-background rounded-xl overflow-hidden shadow-lg">
          <header className="relative w-full">
            <MovieHeader
              title={movie.title}
              episodeId={movie.episode_id}
              director={movie.director}
              producer={movie.producer}
              releaseDate={movie.release_date}
            />
          </header>
          <CardContent className="p-6 space-y-6 text-sb-light">
            <section aria-labelledby="opening-crawl-heading">
              <CardHeader className="p-0 mb-2">
                <CardTitle
                  id="opening-crawl-heading"
                  className="text-xl font-semibold text-sb-accent"
                >
                  Opening Crawl
                </CardTitle>
              </CardHeader>
              <p className="whitespace-pre-line">{movie.opening_crawl}</p>
            </section>
            <section aria-labelledby="characters-heading">
              <CardHeader className="p-0 mb-2">
                <CardTitle
                  id="characters-heading"
                  className="text-xl font-semibold text-sb-accent"
                >
                  Characters
                </CardTitle>
              </CardHeader>
              <CharacterList
                isLoading={!characterData || characterData.length === 0}
                characterData={characterData}
              />
            </section>
          </CardContent>
        </Card>
      </article>
    </main>
  );
}
