import { PlayerShell } from "./components/player/PlayerShell";
import { VideoSurface } from "./components/player/VideoSurface";
import { VideoFeed } from "./components/VideoFeed";
import { usePlayerStore } from "./store/playerStore";

export default function App() {
  const { current, isMini } = usePlayerStore();

  return (
    <main className="relative h-screen w-full bg-white overflow-hidden">
      <VideoFeed />

      {current && (
        <div
          className={`fixed transition-all duration-500 ease-in-out bg-black flex items-center justify-center ${
            isMini
              ? "bottom-6 left-4 w-40 aspect-video rounded-xl z-[100]"
              : "top-0 left-0 w-full lg:w-[70%] xl:w-[75%] h-auto z-[100] lg:z-[40]"
          }`}
        >
          {/* OUTER = layout control */}
          <div className="w-full h-full flex items-center justify-center">
            {/* INNER = aspect ratio control */}
            <div className="w-full max-w-full aspect-video">
              <VideoSurface />
            </div>
          </div>
        </div>
      )}

      {current && <PlayerShell />}
    </main>
  );
}