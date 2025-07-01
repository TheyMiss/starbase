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
  const { characters: storeChars, setCharacters } = useCharactersStore();

  // Populate store once on mount
  useEffect(() => {
    if (characters && characters.length > 0) {
      setCharacters(characters);
    }
  }, [characters, setCharacters]);

  // Convert store object to array
  const allChars = useMemo(() => Object.values(storeChars || {}), [storeChars]);

  // Filter by search (only triggers when trimmed search ≥ 3 chars)
  const filteredCharacters = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term.length < 3) return allChars;
    return allChars.filter((c) => c.name.toLowerCase().includes(term));
  }, [allChars, search]);

  // Determine loading state to avoid flash of "No results"
  const isLoading = !!characters && allChars.length === 0 && !error;

  // Always render SearchBar, then handle states
  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <SearchBar
        placeholder="Search characters..."
        onSearch={setSearch}
        debounce={1000}
        defaultValue={search}
      />

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Characters</CardTitle>
            <CardDescription className="text-red-500">{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : isLoading ? (
        <div className="mx-auto text-center text-gray-500">
          Loading characters…
        </div>
      ) : filteredCharacters.length === 0 ? (
        <div className="mx-auto text-center text-gray-500">
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
