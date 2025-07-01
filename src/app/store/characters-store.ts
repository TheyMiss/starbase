import { create } from "zustand";
import { Character } from "@/app/types/character";

interface CharactersState {
  characters: { [url: string]: Character };
  isLoading: boolean;
  error: string | null;
  setCharacters: (chars: Character[]) => void;
  fetchCharacter: (url: string) => Promise<Character | undefined>;
  fetchMany: (urls: string[]) => Promise<Character[]>;
  fetchList: (apiUrl: string) => Promise<Character[]>;
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: {},
  isLoading: true,
  error: null,

  setCharacters: (chars) => {
    const charObj: { [url: string]: Character } = {};
    chars.forEach((char) => {
      if (char.url) charObj[char.url] = char;
    });
    set((state) => ({
      characters: { ...state.characters, ...charObj },
      isLoading: false,
      error: null,
    }));
  },

  fetchCharacter: async (url: string) => {
    const { characters } = get();
    if (characters[url]) return characters[url];
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch character");
      const data = (await res.json()) as Character;
      set((state) => ({
        characters: { ...state.characters, [url]: data },
        isLoading: false,
        error: null,
      }));
      return data;
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : "Unknown error",
        isLoading: false,
      });
      return undefined;
    }
  },

  fetchMany: async (urls: string[]) => {
    set({ isLoading: true, error: null });
    const promises = urls.map(get().fetchCharacter);
    const results = await Promise.all(promises);
    set({ isLoading: false });
    return results.filter(Boolean) as Character[];
  },

  fetchList: async (apiUrl: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch character list");
      const listData = await res.json();
      const chars: Character[] = Array.isArray(listData.results)
        ? listData.results
        : Array.isArray(listData)
        ? listData
        : [];
      const charObj: { [url: string]: Character } = {};
      chars.forEach((char) => {
        if (char.url) charObj[char.url] = char;
      });
      set((state) => ({
        characters: { ...state.characters, ...charObj },
        isLoading: false,
        error: null,
      }));
      return chars;
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : "Unknown error",
        isLoading: false,
      });
      return [];
    }
  },
}));
