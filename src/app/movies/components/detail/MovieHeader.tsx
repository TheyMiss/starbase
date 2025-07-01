"use client";

import React from "react";

export type MovieHeaderProps = {
  title: string;
  episodeId: number;
  director: string;
  producer: string;
  releaseDate: string;
};

export function MovieHeader({
  title,
  episodeId,
  director,
  producer,
  releaseDate,
}: MovieHeaderProps) {
  return (
    <header aria-labelledby={`movie-title-${episodeId}`} className="mb-6">
      <h1 id={`movie-title-${episodeId}`} className="text-3xl font-bold mb-2">
        {title}
      </h1>
      <div className="text-sm text-gray-500 space-y-1">
        <div>
          <span className="font-semibold">Episode:</span> {episodeId}
        </div>
        <div>
          <span className="font-semibold">Director:</span> {director}
        </div>
        <div>
          <span className="font-semibold">Producer:</span> {producer}
        </div>
        <div>
          <span className="font-semibold">Release Date:</span> {releaseDate}
        </div>
      </div>
    </header>
  );
}
