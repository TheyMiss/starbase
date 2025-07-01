"use client";

import React, { useState } from "react";
import { Character } from "@/app/types/character";
import { getIdFromUrl } from "@/app/utils/getIdFromUrl";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/app/components/ui/skeleton";

type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  const id = getIdFromUrl(character.url) ?? "";
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={`/characters/${id}`}
      className="block group focus:outline-none focus:ring-2 focus:ring-sb-accent rounded-xl h-full"
      tabIndex={0}
    >
      <Card className="hover:shadow-lg group-hover:shadow-xl transition-shadow border-sb-primary border-2 bg-transparent rounded-xl overflow-hidden h-full cursor-pointer">
        <div className="relative w-full h-64">
          {isLoading && (
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
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <CardHeader className="p-4 pt-2">
          <CardTitle className="text-lg font-semibold text-sb-accent group-hover:underline transition-colors">
            {character.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
