"use client";

import React from "react";

export type MovieHeaderProps = {
  title: string;
  episodeId: number;
  director: string;
  producer: string;
  releaseDate: string;
  isLoading?: boolean;
};

export function MovieHeader({
  title,
  episodeId,
  director,
  producer,
  releaseDate,
}: MovieHeaderProps) {
  const details = [
    { label: "Movie ID", value: episodeId },
    { label: "Director", value: director },
    { label: "Producer", value: producer },
    { label: "Release Date", value: releaseDate },
  ];

  return (
    <header
      aria-labelledby={`movie-title-${episodeId}`}
      className="mb-6 px-6 py-4"
    >
      <h1
        id={`movie-title-${episodeId}`}
        className="text-3xl font-bold mb-2 text-sb-light"
      >
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-base text-sb-secondary-foreground">
        {details.map(({ label, value }) => (
          <div key={label}>
            <span className="font-semibold text-sb-accent">{label}:</span>{" "}
            <span className="text-sb-light">{value}</span>
          </div>
        ))}
      </div>
      )
    </header>
  );
}
