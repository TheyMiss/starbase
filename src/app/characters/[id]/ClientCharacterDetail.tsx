"use client";

import React, { useEffect, useState } from "react";
import { useCharactersStore } from "@/app/store/characters-store";
import type { Character } from "@/app/types/character";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import CharacterRelatedMovies from "../components/detail/CharacterRelatedMovies";

type Props = {
  character: Character | null;
  error?: string | null;
};

export default function ClientCharacterDetail({ character, error }: Props) {
  const { characters, setCharacters } = useCharactersStore();
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (character && character.url && !characters[character.url]) {
      setCharacters([character]);
    }
  }, [character, characters, setCharacters]);

  if (error || !character) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="bg-sb-background border-sb-primary border-2 p-4">
          <CardHeader>
            <CardTitle className="text-2xl text-sb-light">Error</CardTitle>
            <CardDescription className="text-sb-accent">
              {error || "Character not found."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const id = character ? character.url.split("/").filter(Boolean).pop() : "";
  const details = [
    { label: "Height", value: `${character.height} cm` },
    { label: "Mass", value: `${character.mass} kg` },
    { label: "Hair Color", value: character.hair_color },
    { label: "Skin Color", value: character.skin_color },
    { label: "Eye Color", value: character.eye_color },
    { label: "Birth Year", value: character.birth_year },
    { label: "Gender", value: character.gender, full: true },
  ];

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <Card className="border-sb-primary border-2 bg-sb-background overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow group">
        <div className="relative w-full h-72">
          {isImageLoading && (
            <Skeleton className="absolute inset-0 w-full h-full bg-sb-muted" />
          )}
          <Image
            src="/avatar.jpg"
            alt={character.name}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            className={`object-cover transition-opacity duration-300 rounded-t-xl ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>

        <CardContent className="p-6 space-y-6">
          <CardHeader className="p-0">
            {/* Character name as a link, optional */}
            <Link href={`/characters/${id}`}>
              <CardTitle className="text-3xl font-bold mb-1 text-sb-light hover:underline">
                {character.name}
              </CardTitle>
            </Link>
            <CardDescription className="text-lg text-sb-secondary-foreground">
              Character Details
            </CardDescription>
          </CardHeader>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-base leading-relaxed text-sb-light">
            {details.map(({ label, value, full }) => (
              <div key={label} className={full ? "col-span-2" : undefined}>
                <p className="font-medium text-sb-accent">{label}</p>
                <p className="text-sb-light">{value}</p>
              </div>
            ))}
          </div>

          <CharacterRelatedMovies filmUrls={character.films ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
