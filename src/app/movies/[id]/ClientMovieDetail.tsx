"use client";

import React, { useEffect } from "react";

import { Card, CardContent } from "@/app/components/ui/card";

import type { Character } from "@/app/types/character";
import { MovieDetailError } from "../components/detail/MovieDetailError";
import { MovieHeader } from "../components/detail/MovieHeader";
import { OpeningCrawlAccordion } from "../components/detail/OpeningCrawlAccordion";
import { CharacterList } from "../components/detail/CharacterList";
import { Movie } from "@/app/types/film";
import { useMoviesStore } from "@/app/store/movies-store";

type Props = {
  movie: Movie | null;
  characterData: Character[];
  error: string | null;
};

export default function ClientMovieDetail({
  movie,
  characterData,
  error,
}: Props) {
  const setMovieById = useMoviesStore((state) => state.setMovieById);

  useEffect(() => {
    if (movie) {
      setMovieById(movie);
    }
  }, [movie, setMovieById]);

  if (error || !movie) {
    return <MovieDetailError />;
  }

  return (
    <main className="max-w-2xl mx-auto py-10">
      <Card>
        <article>
          <CardContent className="py-8">
            <MovieHeader
              title={movie.title}
              episodeId={movie.episode_id}
              director={movie.director}
              producer={movie.producer}
              releaseDate={movie.release_date}
            />

            <section className="mt-6">
              <OpeningCrawlAccordion crawl={movie.opening_crawl} />
            </section>

            <section aria-labelledby="characters-heading" className="mt-8">
              <h2
                id="characters-heading"
                className="text-xl font-semibold mb-2"
              >
                Characters:
              </h2>
              <CharacterList isLoading={false} characterData={characterData} />
            </section>
          </CardContent>
        </article>
      </Card>
    </main>
  );
}
