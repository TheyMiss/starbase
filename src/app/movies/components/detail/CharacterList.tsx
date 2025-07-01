"use client";

import Link from "next/link";
import { Skeleton } from "@/app/components/ui/skeleton";
import type { Character } from "@/app/types/character";
import { getIdFromUrl } from "@/app/utils/getIdFromUrl";
import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

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
      <div className="space-y-3" aria-busy="true">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-9 w-40 rounded-lg bg-sb-muted" />
        ))}
      </div>
    );
  }

  if (!characterData.length) {
    return (
      <div className="text-sb-muted-foreground text-sm">
        No characters found.
      </div>
    );
  }

  return (
    <ul className="list-disc list-inside space-y-1 text-sb-light">
      {characterData.map((char) => (
        <li key={char.url}>
          <Link
            href={`/characters/${getIdFromUrl(char.url)}`}
            className={cn(
              buttonVariants({ variant: "navLink" }),
              "text-sb-primary"
            )}
          >
            {char.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
