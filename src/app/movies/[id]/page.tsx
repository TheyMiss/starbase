import type { Character } from "@/app/types/character";

import { fetchCharacters } from "@/app/lib/fetch-characters";
import ClientMovieDetail from "./ClientMovieDetail";
import { Movie } from "@/app/types/film";
import { fetchMovieById } from "@/app/lib/fetch-movies";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;

  let movie: Movie | null = null;
  let characterData: Character[] = [];
  let error: string | null = null;

  try {
    movie = await fetchMovieById(id);
    if (!movie) throw new Error("Movie not found");
    characterData = await fetchCharacters(movie.characters);
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error fetching movie";
  }

  return (
    <ClientMovieDetail
      movie={movie}
      characterData={characterData}
      error={error}
    />
  );
}
