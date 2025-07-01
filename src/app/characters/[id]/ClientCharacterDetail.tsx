"use client";

import React, { useEffect } from "react";
import { useCharactersStore } from "@/app/store/characters-store";
import type { Character } from "@/app/types/character";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import CharacterRelatedMovies from "../components/detail/CharacterRelatedMovies";

type Props = {
  character: Character | null;
  error?: string | null;
};

export default function ClientCharacterDetail({ character, error }: Props) {
  const { characters, setCharacters } = useCharactersStore();

  useEffect(() => {
    if (character && character.url && !characters[character.url]) {
      setCharacters([character]);
    }
  }, [character, characters, setCharacters]);

  if (error || !character) {
    return (
      <main className="max-w-lg mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription className="text-red-500">
              {error || "Character not found."}
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{character.name}</CardTitle>
          <CardDescription>Character Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Height:</strong> {character.height} cm
          </p>
          <p>
            <strong>Mass:</strong> {character.mass} kg
          </p>
          <p>
            <strong>Hair Color:</strong> {character.hair_color}
          </p>
          <p>
            <strong>Skin Color:</strong> {character.skin_color}
          </p>
          <p>
            <strong>Eye Color:</strong> {character.eye_color}
          </p>
          <p>
            <strong>Birth Year:</strong> {character.birth_year}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <CharacterRelatedMovies filmUrls={character.films ?? []} />
        </CardContent>
      </Card>
    </main>
  );
}
