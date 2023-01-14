import { create } from "zustand";

interface AppState {
  season: number;
  setSeason: (season: number) => void;
}

export const useStore = create<AppState>(set => ({
  season: 1,
  setSeason: (season: number) => set({ season }),
}));
