import { Character } from "@/app/types/character";

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
