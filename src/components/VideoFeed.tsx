import { videos } from "../data/videos";
import { VideoCard } from "./VideoCard";

export function VideoFeed() {
  const grouped = videos.reduce<Record<string, typeof videos>>((acc, v) => {
    acc[v.category.name] ??= [];
    acc[v.category.name].push(v);
    return acc;
  }, {});

  return (
    <div className="h-screen w-full flex-1 flex flex-col overflow-hidden">
      <header className="shrink-0 bg-white px-4 py-3 flex justify-between items-center border-b border-neutral-100 z-10">
        <div className="flex items-center gap-1">
          <span className="font-bold text-lg tracking-tighter text-red-600">
            YouTube Clone
          </span>
        </div>
        <div className="flex gap-5 text-xl">
          <div className="w-7 h-7 rounded-full bg-neutral-200" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-3 space-y-6 pb-32 no-scrollbar touch-pan-y">
        {Object.entries(grouped).map(([category, group]) => (
          <section key={category}>
            <h2 className="font-bold text-lg mb-3 px-1">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
