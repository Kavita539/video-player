import { usePlayerStore } from "../../store/playerStore";

export function MiniPlayer() {
  const { current, maximize, close, isPlaying, play, pause } = usePlayerStore();

  if (!current) return null;

  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 bg-black text-white rounded-xl shadow-lg flex items-center gap-3 p-2">
      <button onClick={maximize} className="flex items-center gap-3 flex-1">
        <iframe
          src={`${current.mediaUrl}?autoplay=1&controls=0`}
          className="w-24 h-14 rounded"
          allow="autoplay"
        />
        <p className="text-sm line-clamp-1">{current.title}</p>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          isPlaying ? pause() : play();
        }}
      >
        {isPlaying ? "⏸" : "▶️"}
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
