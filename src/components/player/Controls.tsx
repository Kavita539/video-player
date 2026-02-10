import { useEffect, useState } from "react";
import { usePlayerStore } from "../../store/playerStore";
import { ProgressBar } from "./ProgressBar";

export function Controls() {
  const { isPlaying, play, pause } = usePlayerStore();
  const videoEl = document.querySelector("video") as HTMLVideoElement | null;
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!videoEl) return;

    const update = () => {
      setTime(videoEl.currentTime);
      setDuration(videoEl.duration || 0);
    };

    videoEl.addEventListener("timeupdate", update);
    return () => videoEl.removeEventListener("timeupdate", update);
  }, [videoEl]);

  const seek = (sec: number) => {
    if (!videoEl) return;
    videoEl.currentTime = Math.max(0, videoEl.currentTime + sec);
  };

  return (
    <div className="px-4 py-3 text-white space-y-2">
      <ProgressBar
        value={time}
        max={duration}
        onChange={(v) => {
          if (videoEl) videoEl.currentTime = v;
        }}
      />

      <div className="flex items-center justify-center gap-6">
        <button onClick={() => seek(-10)}>⏪ 10</button>
        <button
          onClick={() => (isPlaying ? pause() : play())}
          className="text-xl"
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <button onClick={() => seek(10)}>⏩ 10</button>
      </div>

      <p className="text-xs text-center text-neutral-300">
        {format(time)} / {format(duration)}
      </p>
    </div>
  );
}

function format(sec: number) {
  if (!sec) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
