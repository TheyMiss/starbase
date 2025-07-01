import { Character } from "@/app/types/character";
import { SWAPI_PEOPLE_ENDPOINT } from "../config/variables";

export const fetchCharacter = async (
  url: string
): Promise<Character | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch character");
    return await res.json();
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
};

export const fetchCharacterById = async (
  id: string
): Promise<Character | null> => {
  const separator = SWAPI_PEOPLE_ENDPOINT.endsWith("/") ? "" : "/";
  const url = `${SWAPI_PEOPLE_ENDPOINT}${separator}${id}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok)
      throw new Error(`Failed to fetch character by ID (status ${res.status})`);
    return (await res.json()) as Character;
  } catch (error) {
    console.error(`Error fetching character by ID ${id}:`, error);
    return null;
  }
};

export const fetchCharacters = async (urls: string[]): Promise<Character[]> => {
  const data = await Promise.all(
    urls.map(async (url) => {
      try {
        return await fetchCharacter(url);
      } catch (e) {
        console.error(`Error fetching character from ${url}:`, e);
        return null;
      }
    })
  );
  return data.filter(Boolean) as Character[];
};

export async function fetchAllCharacters(): Promise<Character[]> {
  const res = await fetch(SWAPI_PEOPLE_ENDPOINT, { cache: "default" });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch characters: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Expected an array of characters from SWAPI");
  }

  type CharacterListItem = { url: string; [key: string]: unknown };
  const urls = data.map((c: CharacterListItem, i: number) => {
    if (typeof c.url !== "string") {
      throw new Error(`Character at index ${i} has no .url`);
    }
    return c.url;
  });

  return fetchCharacters(urls);
}
