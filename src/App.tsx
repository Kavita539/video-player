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
          className={`fixed transition-all duration-500 ease-in-out bg-black overflow-hidden flex items-center justify-center ${
            isMini
              ? "bottom-[24px] left-4 w-32 aspect-video rounded-lg z-[100]"
              : "top-0 left-0 w-full lg:w-[70%] xl:w-[75%] h-screen aspect-video z-[40]"
          }`}
          style={{ pointerEvents: "auto" }}
        >
          <div className="w-full h-full max-w-full max-h-full">
            <VideoSurface />
          </div>
        </div>
      )}
      {current && <PlayerShell />}
    </main>
  );
}
