"use client";

import React from "react";
import { Character } from "@/app/types/character";
import { getIdFromUrl } from "@/app/utils/getIdFromUrl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  const id = getIdFromUrl(character.url) ?? "";
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{character.name}</CardTitle>
        <CardDescription>Birth Year: {character.birth_year}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Height:</strong> {character.height} cm
        </p>
        <p>
          <strong>Mass:</strong> {character.mass} kg
        </p>
      </CardContent>
      <div className="p-4 pt-0">
        <Link href={`/characters/${id}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
