import { videos } from "../data/videos";
import { VideoCard } from "./VideoCard";

export function VideoFeed() {
  const grouped = videos.reduce<Record<string, typeof videos>>((acc, v) => {    
    acc[v.category.name] ??= [];
    acc[v.category.name].push(v);
    return acc;
  }, {});

  return (
    <div className="p-3 space-y-6 pb-24">
      {/* Sticky Mobile Header */}
      <header className="sticky top-0 z-40 bg-white px-4 py-2 flex justify-between items-center border-b border-neutral-100">
        <div className="flex items-center gap-1">
          <span className="font-bold text-lg tracking-tighter">
            Video Player
          </span>
        </div>
        <div className="flex gap-5 text-xl">
          <span>🔍</span>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
        </div>
      </header>

      {Object.entries(grouped).map(([category, group]) => (
        <section key={category}>
          <h2 className="font-semibold mb-2">
              {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
