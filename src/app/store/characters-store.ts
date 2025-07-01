import { create } from "zustand";
import { Character } from "@/app/types/character";

interface CharactersState {
  characters: { [url: string]: Character };
  loading: { [url: string]: boolean };
  error: { [url: string]: string | null };
  fetchCharacter: (url: string) => Promise<Character | undefined>;
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
}));
