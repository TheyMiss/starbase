import { fetchCharacterById } from "@/app/lib/fetch-characters";
import ClientCharacterDetail from "./ClientCharacterDetail";

import { Character } from "@/app/types/character";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;

  let character: Character | null = null;
  let error: string | null = null;

  try {
    character = await fetchCharacterById(id);
    if (!character) throw new Error("Character not found");
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Unknown error fetching data";
    }
  }

  return <ClientCharacterDetail character={character} error={error} />;
}
