import { create } from "zustand";
import { Character } from "@/app/types/character";

interface CharactersState {
  characters: { [url: string]: Character };
  loading: { [url: string]: boolean };
  error: { [url: string]: string | null };
  fetchCharacter: (url: string) => Promise<Character | undefined>;
  fetchMany: (urls: string[]) => Promise<Character[]>;
  fetchList: (apiUrl: string) => Promise<Character[]>;
  setCharacters: (chars: Character[]) => void;
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: {},
  loading: {},
  error: {},
  async fetchCharacter(url: string) {
    if (get().characters[url]) return get().characters[url];
    set((state) => ({
      loading: { ...state.loading, [url]: true },
      error: { ...state.error, [url]: null },
    }));
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch character");
      const data = (await res.json()) as Character;
      set((state) => ({
        characters: { ...state.characters, [url]: data },
        loading: { ...state.loading, [url]: false },
      }));
      return data;
    } catch (e) {
      set((state) => ({
        error: {
          ...state.error,
          [url]: e instanceof Error ? e.message : "Unknown error",
        },
        loading: { ...state.loading, [url]: false },
      }));
      return undefined;
    }
  },
  async fetchMany(urls: string[]) {
    const results = await Promise.all(urls.map(get().fetchCharacter));
    return results.filter(Boolean) as Character[];
  },
  async fetchList(apiUrl: string) {
    set((state) => ({
      loading: { ...state.loading, [apiUrl]: true },
      error: { ...state.error, [apiUrl]: null },
    }));
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch character list");
      const listData = await res.json();
      const chars: Character[] = Array.isArray(listData.results)
        ? listData.results
        : Array.isArray(listData)
        ? listData
        : [];
      const newChars: { [url: string]: Character } = {};
      chars.forEach((char) => {
        if (char.url) newChars[char.url] = char;
      });
      set((state) => ({
        characters: { ...state.characters, ...newChars },
        loading: { ...state.loading, [apiUrl]: false },
      }));
      return chars;
    } catch (e) {
      set((state) => ({
        error: {
          ...state.error,
          [apiUrl]: e instanceof Error ? e.message : "Unknown error",
        },
        loading: { ...state.loading, [apiUrl]: false },
      }));
      return [];
    }
  },
  setCharacters: (chars) => {
    const charObj: { [url: string]: Character } = {};
    chars.forEach((char) => {
      if (char.url) charObj[char.url] = char;
    });
    set((state) => ({
      characters: { ...state.characters, ...charObj },
    }));
  },
}));
