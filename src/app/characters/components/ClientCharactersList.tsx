"use client";

import React, { useState, useMemo, useEffect } from "react";
import PaginationControls from "@/app/components/PaginationControls";
import { CharacterCardSkeleton } from "./detail/CharacterCardSkeleton";
import CharacterCard from "./detail/CharacterCard";
import SearchBar from "@/app/components/SearchBar";
import { useCharactersStore } from "@/app/store/characters-store";

import type { Character } from "@/app/types/character";

interface ClientCharactersListProps {
  characters: Character[];
  error?: string;
  itemsPerPage?: number;
}

export default function ClientCharactersList({
  characters,
  error,
  itemsPerPage = 6,
}: ClientCharactersListProps) {
  const [search, setSearch] = useState<string>("");
  const [isPaginating, setIsPaginating] = useState(false);
  const { characters: storeChars, setCharacters } = useCharactersStore();

  useEffect(() => {
    if (characters && characters.length > 0) {
      setCharacters(characters);
    }
  }, [characters, setCharacters]);

  const allChars = useMemo(() => Object.values(storeChars || {}), [storeChars]);
  const filteredCharacters = useMemo(() => {
    const term = (search ?? "").trim().toLowerCase();
    if (term.length < 3) return allChars;
    return allChars.filter((c) => c.name.toLowerCase().includes(term));
  }, [allChars, search]);

  if (isPaginating) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <CharacterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <SearchBar
        placeholder="Search characters..."
        onSearch={setSearch}
        debounce={1000}
        defaultValue={search}
      />

      {error ? (
        <div>Error: {error}</div>
      ) : (
        <PaginationControls
          key={search}
          items={filteredCharacters}
          itemsPerPage={itemsPerPage}
          onPageChange={() => {
            setIsPaginating(true);
            setTimeout(() => setIsPaginating(false), 400); // always show at least 400ms
          }}
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
