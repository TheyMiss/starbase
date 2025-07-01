"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Character } from "@/app/types/character";
import PaginationControls from "@/app/components/PaginationControls";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import CharacterCard from "./detail/CharacterCard";
import SearchBar from "@/app/components/SearchBar";
import { useCharactersStore } from "@/app/store/characters-store";
import { CharacterCardSkeleton } from "./detail/CharacterCardSkeleton";

type Props = {
  characters?: Character[];
  error?: string;
  itemsPerPage?: number;
};

export default function ClientCharactersList({
  characters,
  error,
  itemsPerPage = 6,
}: Props) {
  const [search, setSearch] = useState("");
  const {
    characters: storeChars,
    setCharacters,
    isLoading,
  } = useCharactersStore();

  useEffect(() => {
    if (characters && characters.length > 0) {
      setCharacters(characters);
    }
  }, [characters, setCharacters]);

  const allChars = useMemo(() => Object.values(storeChars || {}), [storeChars]);

  const filteredCharacters = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term.length < 3) return allChars;
    return allChars.filter((c) => c.name.toLowerCase().includes(term));
  }, [allChars, search]);

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <SearchBar
        placeholder="Search characters..."
        onSearch={setSearch}
        debounce={1000}
        defaultValue={search}
      />

      {error ? (
        <Card className="border-sb-primary bg-sb-background border-2">
          <CardHeader>
            <CardTitle className="text-sb-accent">
              Error Loading Characters
            </CardTitle>
            <CardDescription className="text-sb-accent">
              {error}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredCharacters.length === 0 ? (
        <div className="mx-auto text-center text-sb-muted-foreground">
          No characters found.
        </div>
      ) : (
        <PaginationControls
          key={search}
          items={filteredCharacters}
          itemsPerPage={itemsPerPage}
          renderPage={(page) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {page.map((character) => (
                <CharacterCard key={character.url} character={character} />
              ))}
            </div>
          )}
        />
      )}
    </div>
  );
}
