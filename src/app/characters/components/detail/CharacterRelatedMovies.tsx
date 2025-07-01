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

const skeletonWidths = [
  { title: "w-32", meta: "w-24" },
  { title: "w-40", meta: "w-16" },
  { title: "w-28", meta: "w-20" },
];

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

  const showSkeleton = isLoading || movieIds.some((id) => !moviesById[id]);

  return (
    <div className="mt-2">
      <strong className="text-sb-accent text-xl">Movies:</strong>
      <ul className="mt-2 space-y-1">
        {showSkeleton
          ? (movieIds.length > 0 ? movieIds : [0, 1, 2]).map((_, idx) => (
              <li key={idx} className="flex items-center space-x-2 py-1">
                <Skeleton
                  className={`h-6 rounded-md bg-sb-muted ${
                    skeletonWidths[idx % skeletonWidths.length].title
                  }`}
                />
                <Skeleton
                  className={`h-4 rounded bg-sb-muted ${
                    skeletonWidths[idx % skeletonWidths.length].meta
                  }`}
                />
              </li>
            ))
          : movieIds.map((id) => {
              const movie = moviesById[id];
              if (!movie)
                return (
                  <li key={id} className="flex items-center space-x-2 py-1">
                    <Skeleton className="h-6 w-32 rounded-md bg-sb-muted" />
                    <Skeleton className="h-4 w-20 rounded bg-sb-muted" />
                  </li>
                );
              return (
                <li key={id}>
                  <Link
                    className={cn(
                      "p-0 h-auto text-base align-baseline",
                      buttonVariants({ variant: "navLink" }),
                      "text-sb-accent"
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
