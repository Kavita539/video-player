import { MiniPlayer } from "./components/player/MiniPlayer";
import { PlayerShell } from "./components/player/PlayerShell";
import { VideoFeed } from "./components/VideoFeed";
import { usePlayerStore } from "./store/playerStore";


export default function App() {
  const { current, isMini } = usePlayerStore();

  return (
    <main className="min-h-screen bg-neutral-100">
      <VideoFeed />
      {current && !isMini && <PlayerShell />}
      {current && isMini && <MiniPlayer />}
    </main>
  );
}