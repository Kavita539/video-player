import { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { usePlayerStore } from "../../store/playerStore";

export function VideoSurface() {
  const { current, setVideoElement, setYTPlayer, togglePlay } =
    usePlayerStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) setVideoElement(videoRef.current);
  }, [current, setVideoElement]);

  if (!current) return null;

  const getYouTubeId = (url: string) => {
    return url.includes("v=")
      ? url.split("v=")[1].split("&")[0]
      : url.split("/").pop();
  };

  return (
    <div className="relative aspect-video w-full h-full bg-black group">
      <div
        className="absolute inset-0 z-20 cursor-pointer"
        onClick={() => {
          togglePlay();
        }}
      />

      {current.mediaType === "YOUTUBE" ? (
        <YouTube
          videoId={getYouTubeId(current.mediaUrl)}
          className="w-full h-full pointer-events-none"
          iframeClassName="w-full h-full"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: { autoplay: 1, controls: 0 },
          }}
          onReady={(e) => setYTPlayer(e.target)}
        />
      ) : (
        <video
          ref={videoRef}
          src={current.mediaUrl}
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}
