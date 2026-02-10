import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../store/playerStore";

export function VideoSurface() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { current, isPlaying } = usePlayerStore();

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.play();
    else videoRef.current.pause();
  }, [isPlaying, current]);

  if (!current) return null;

  if (current.mediaType === "YOUTUBE") {
    return (
      <div className="aspect-video bg-black w-full h-full">
        <div className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing" />
        <iframe
          src={`${current.mediaUrl}?autoplay=1&controls=0&playsinline=1`}
          allow="autoplay; fullscreen"
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black">
      <video
        ref={videoRef}
        src={current.mediaUrl}
        autoPlay
        playsInline
        className="w-full h-full object-contain"
      />
    </div>
  );
}
