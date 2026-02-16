import { PlayerShell } from "./components/player/PlayerShell";
import { VideoFeed } from "./components/VideoFeed";
import { usePlayerStore } from "./store/playerStore";


export default function App() {
  const { current } = usePlayerStore();

  return (
    <main className="relative min-h-screen bg-neutral-100 overflow-x-hidden">
      <VideoFeed />
      {current && <PlayerShell />}
    </main>
  );
}