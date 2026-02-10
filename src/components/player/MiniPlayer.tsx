import YouTube from "react-youtube";
import { usePlayerStore } from "../../store/playerStore";

import { MdPlayArrow, MdPause } from "react-icons/md";

export function MiniPlayer() {
  const { current, maximize, close, isPlaying, togglePlay, setYTPlayer } =
    usePlayerStore();

  if (!current) return null;

  const getYouTubeId = (url: string) => {
    return url.includes("v=")
      ? url.split("v=")[1].split("&")[0]
      : url.split("/").pop();
  };

  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 bg-black text-white rounded-xl shadow-lg flex items-center gap-3 p-2">
      <button onClick={maximize} className="flex items-center gap-3 flex-1">
        <YouTube
          videoId={getYouTubeId(current.mediaUrl)}
          className="w-24 h-14 rounded"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: { autoplay: 1, controls: 0 },
          }}
          onReady={(e) => setYTPlayer(e.target)}
        />
        <p className="text-sm line-clamp-1">{current.title}</p>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      >
        {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        ✕
      </button>
    </div>
  );
}
