import { create } from "zustand";

import { getIdFromUrl } from "../utils/getIdFromUrl";
import { Movie } from "../types/film";
import { fetchMovieById, fetchMovies } from "../lib/fetch-movies";

interface MoviesState {
  movies: Movie[];
  moviesById: Record<string, Movie>;
  isLoading: boolean;
  error: string | null;
  setMovies: (movies: Movie[]) => void;
  setMovieById: (movie: Movie) => void;
  fetchMovies: () => Promise<void>;
  fetchMovieById: (id: string) => Promise<Movie | null>;
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  movies: [],
  moviesById: {},
  isLoading: true,
  error: null,
  setMovies: (movies) => set({ movies, isLoading: false }),
  setMovieById: (movie) => {
    const id = getIdFromUrl(movie.url);
    if (id != null) {
      set((state) => ({
        moviesById: { ...state.moviesById, [id]: movie },
        isLoading: false,
      }));
    }
  },

  fetchMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchMovies();
      const moviesById: Record<string, Movie> = {};
      data.forEach((movie) => {
        const movieId = getIdFromUrl(movie.url);
        if (movieId !== undefined) {
          moviesById[movieId] = movie;
        }
      });
      set({ movies: data, moviesById, isLoading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        isLoading: false,
      });
    }
  },

  fetchMovieById: async (id: string) => {
    const { moviesById } = get();
    if (moviesById[id]) {
      return moviesById[id];
    }
    set({ isLoading: true, error: null });
    try {
      const movie = await fetchMovieById(id);
      if (movie) {
        set((state) => ({
          moviesById: { ...state.moviesById, [id]: movie },
          isLoading: false,
        }));
      }
      return movie;
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        isLoading: false,
      });
      return null;
    }
  },
}));
