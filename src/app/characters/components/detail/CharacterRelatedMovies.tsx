"use client";

import React, { useEffect, useState } from "react";
import { useMoviesStore } from "@/app/store/movies-store";
import { getIdFromUrl } from "@/app/utils/getIdFromUrl";
import { buttonVariants } from "@/app/components/ui/button";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { Skeleton } from "@/app/components/ui/skeleton";

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
    return <div className="text-sb-muted-foreground">No movies found</div>;
  }

  if (error) {
    return <div className="text-sb-accent">{error}</div>;
  }

  return (
    <div className="mt-2">
      <strong className="text-sb-accent text-xl">Movies:</strong>
      <ul className="mt-2 space-y-1">
        {isLoading || movieIds.some((id) => !moviesById[id])
          ? (movieIds.length > 0 ? movieIds : Array.from({ length: 3 })).map(
              (_, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-32 bg-sb-muted rounded" />
                  <Skeleton className="h-4 w-20 bg-sb-muted rounded" />
                </li>
              )
            )
          : movieIds.map((id) => {
              const movie = moviesById[id];
              if (!movie)
                return (
                  <li key={id} className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-32 bg-sb-muted rounded" />
                    <Skeleton className="h-4 w-20 bg-sb-muted rounded" />
                  </li>
                );
              return (
                <li key={id}>
                  <Link
                    className={cn(
                      "p-0 h-auto text-base align-baseline",
                      buttonVariants({ variant: "navLink" }),
                      "text-sb-accent font-semibold hover:underline transition-colors"
                    )}
                    href={`/movies/${id}`}
                  >
                    {movie.title}
                  </Link>
                  <span className="text-xs text-sb-muted-foreground ml-2">
                    (Episode {movie.episode_id}, {movie.release_date})
                  </span>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
