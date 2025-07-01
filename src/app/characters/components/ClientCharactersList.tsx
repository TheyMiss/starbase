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
  const { characters: charsInStore, setCharacters } = useCharactersStore();

  useEffect(() => {
    if (characters && characters.length > 0) {
      setCharacters(characters);
    }
  }, [characters, setCharacters]);

  const filteredCharacters = useMemo(() => {
    const charsArray = Object.values(charsInStore || {});
    if (!search) return charsArray;
    const s = search.toLowerCase();
    return charsArray.filter((c) => c.name.toLowerCase().includes(s));
  }, [charsInStore, search]);

  if (error) {
    return (
      <main className="max-w-4xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Characters</CardTitle>
            <CardDescription className="text-red-500">{error}</CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  if (!filteredCharacters || filteredCharacters.length === 0) {
    return (
      <main className="max-w-4xl mx-auto py-10 text-center text-gray-500">
        No characters found.
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-10">
      <SearchBar
        placeholder="Search characters..."
        onSearch={setSearch}
        debounce={1000}
      />
      <PaginationControls
        items={filteredCharacters}
        itemsPerPage={itemsPerPage}
        renderPage={(paginated: Character[]) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((character) => (
              <CharacterCard key={character.url} character={character} />
            ))}
          </div>
        )}
      />
    </main>
  );
}
