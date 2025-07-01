"use client";

import Link from "next/link";
import { Skeleton } from "@/app/components/ui/skeleton";
import type { Character } from "@/app/types/character";
import { getIdFromUrl } from "@/app/utils/getIdFromUrl";

interface CharacterListProps {
  isLoading: boolean;
  characterData?: Character[];
}

export const CharacterList = ({
  isLoading,
  characterData = [],
}: CharacterListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2" aria-busy="true">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-1/3" />
        ))}
      </div>
    );
  }

  if (!characterData.length) {
    return <div className="text-gray-400 text-sm">No characters found.</div>;
  }

  return (
    <ul className="list-disc list-inside space-y-1">
      {characterData.map((char) => (
        <li key={char.url}>
          <Link
            href={`/characters/${getIdFromUrl(char.url)}`}
            className="hover:underline text-blue-700"
          >
            {char.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
