import { create } from "zustand";
import type { Video } from "../types/video";

interface PlayerState {
  current: Video | null;
  isMini: boolean;
  isPlaying: boolean;
  videoElement: HTMLVideoElement | null;
  ytPlayer: any | null;
  setVideo: (video: Video) => void;
  setVideoElement: (el: HTMLVideoElement | null) => void;
  setYTPlayer: (player: any) => void;
  togglePlay: () => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  current: null,
  isMini: false,
  isPlaying: true,
  videoElement: null,
  ytPlayer: null,
  setVideo: (video) =>
    set({
      current: video,
      isMini: false,
      isPlaying: true,
      ytPlayer: null,
      videoElement: null,
    }),
  setVideoElement: (el) => set({ videoElement: el }),
  setYTPlayer: (player) => set({ ytPlayer: player }),
  togglePlay: () => {
    const { isPlaying, videoElement, ytPlayer, current } = get();
    const newState = !isPlaying;
    if (current?.mediaType === "YOUTUBE" && ytPlayer) {
      newState ? ytPlayer.playVideo() : ytPlayer.pauseVideo();
    } else if (videoElement) {
      newState ? videoElement.play() : videoElement.pause();
    }
    set({ isPlaying: newState });
  },
  minimize: () => set({ isMini: true }),
  maximize: () => set({ isMini: false }),
  close: () =>
    set({ current: null, isMini: false, videoElement: null, ytPlayer: null }),
}));
