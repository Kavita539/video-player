import { videos } from "../data/videos";
import { VideoCard } from "./VideoCard";

export function VideoFeed() {
  const grouped = videos.reduce<Record<string, typeof videos>>((acc, v) => {
    acc[v.category.slug] ??= [];
    acc[v.category.slug].push(v);
    return acc;
  }, {});

  return (
    <div className="p-3 space-y-6 pb-24">
      {Object.values(grouped).map((group) => (
        <section key={group[0].category.slug}>
          <h2 className="font-semibold mb-2">{group[0].category.name}</h2>
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
