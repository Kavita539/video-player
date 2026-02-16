import { useRef, useEffect, useMemo } from "react";
import YouTube from "react-youtube";
import { usePlayerStore } from "../../store/playerStore";

export function VideoSurface() {
  const { current, setVideoElement, setYTPlayer } = usePlayerStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && current?.mediaType !== "YOUTUBE") {
      setVideoElement(videoRef.current);
    }
  }, [current?.mediaUrl, setVideoElement]);

  const videoId = useMemo(() => {
    if (!current?.mediaUrl) return "";
    const url = current.mediaUrl;
    return url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop();
  }, [current?.mediaUrl]);

  if (!current) return null;

  return (
    <div className="w-full h-full pointer-events-none">
      {current.mediaType === "YOUTUBE" ? (
        <YouTube
          videoId={videoId}
          className="w-full h-full"
          iframeClassName="w-full h-full"
          opts={{
            playerVars: { 
                autoplay: 1, 
                controls: 0, // Keep controls off so our custom overlay/controls work
                modestbranding: 1,
                iv_load_policy: 3
            },
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