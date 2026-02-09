import { create } from "zustand";
import type { Video } from "../types/video";

interface PlayerState {
  current: Video | null;
  isMini: boolean;
  isPlaying: boolean;
  setVideo: (video: Video) => void;
  play: () => void;
  pause: () => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  current: null,
  isMini: false,
  isPlaying: true,
  setVideo: (video) =>
    set({
      current: video,
      isMini: false,
      isPlaying: true,
    }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  minimize: () => set({ isMini: true }),
  maximize: () => set({ isMini: false }),
  close: () => set({ current: null, isMini: false }),
}));
