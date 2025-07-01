import { fetchAllCharacters } from "@/app/lib/fetch-characters";
import { Character } from "../types/character";
import ClientCharactersList from "./components/ClientCharactersList";

export const dynamic = "force-dynamic";

export default async function CharactersPage() {
  let characters: Character[] = [];
  let error: string | undefined;

  try {
    characters = await fetchAllCharacters();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return <ClientCharactersList characters={characters} error={error} />;
}
