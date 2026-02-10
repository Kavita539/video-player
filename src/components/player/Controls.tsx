import { useEffect, useState } from "react";
import { usePlayerStore } from "../../store/playerStore";

import { MdPlayArrow, MdPause, MdReplay10, MdForward10 } from "react-icons/md";

export function Controls() {
  const { isPlaying, togglePlay, videoElement, ytPlayer, current } =
    usePlayerStore();
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (current?.mediaType === "YOUTUBE" && ytPlayer) {
        setTime(ytPlayer.getCurrentTime() || 0);
        setDuration(ytPlayer.getDuration() || 0);
      } else if (videoElement) {
        setTime(videoElement.currentTime || 0);
        setDuration(videoElement.duration || 0);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [videoElement, ytPlayer, current]);

  const seek = (offset: number) => {
    if (current?.mediaType === "YOUTUBE" && ytPlayer) {
      ytPlayer.seekTo(ytPlayer.getCurrentTime() + offset, true);
    } else if (videoElement) {
      videoElement.currentTime += offset;
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="p-4 bg-neutral-900 text-white flex flex-col gap-2">
      <input
        type="range"
        min={0}
        max={duration}
        value={time}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (current?.mediaType === "YOUTUBE") ytPlayer.seekTo(val);
          else if (videoElement) videoElement.currentTime = val;
        }}
        className="w-full accent-red-600"
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button onClick={() => seek(-10)}><MdReplay10 size={35} /></button>
          <button onClick={togglePlay} className="text-2xl w-10">
            {isPlaying ? <MdPause size={50} /> : <MdPlayArrow size={50} />}
          </button>
          <button onClick={() => seek(10)}><MdForward10 size={35} /></button>
        </div>
        <span className="text-xs font-mono">
          {formatTime(time)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
