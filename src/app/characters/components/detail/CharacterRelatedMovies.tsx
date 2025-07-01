"use client";

import React, { useEffect, useState } from "react";
import { useMoviesStore } from "@/app/store/movies-store";
import { getIdFromUrl } from "@/app/utils/getIdFromUrl";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

type Props = {
  filmUrls: string[];
};

export default function CharacterRelatedMovies({ filmUrls }: Props) {
  const { moviesById, fetchMovieById, isLoading, error } = useMoviesStore();
  const [movieIds, setMovieIds] = useState<string[]>([]);

  useEffect(() => {
    if (!filmUrls || filmUrls.length === 0) return;

    const ids = filmUrls
      .map((url) => getIdFromUrl(url))
      .filter((id): id is string => !!id);

    setMovieIds(ids);

    ids.forEach((id) => {
      if (!moviesById[id]) {
        fetchMovieById(id);
      }
    });
    // eslint-disable-next-line
  }, [filmUrls]);

  if (!filmUrls || filmUrls.length === 0) {
    return <div className="text-gray-400">No movies found</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <strong>Movies:</strong>
      {isLoading && <div className="text-gray-500">Loading movies…</div>}
      <ul className="mt-2 space-y-1">
        {movieIds.map((id) => {
          const movie = moviesById[id];
          if (!movie)
            return (
              <li key={id} className="text-gray-400">
                Loading...
              </li>
            );
          return (
            <li key={id}>
              <Link href={`/movies/${id}`} passHref>
                <Button
                  variant="link"
                  className="p-0 h-auto text-base align-baseline"
                >
                  <span className="font-medium">{movie.title}</span>
                </Button>
              </Link>
              <span className="text-xs text-gray-500 ml-2">
                (Episode {movie.episode_id}, {movie.release_date})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
