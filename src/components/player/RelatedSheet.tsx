import { videos } from "../../data/videos";
import { usePlayerStore } from "../../store/playerStore";

export function RelatedSheet() {
  const { current, setVideo } = usePlayerStore();

  if (!current) return null;

  const related = videos.filter(
    (v) => v.category.slug === current.category.slug && v.id !== current.id
  );

  return (
    <div className="h-full bg-white p-4 overflow-y-auto">
      <h3 className="font-bold text-lg mb-4 text-neutral-900">Up next</h3>
      <div className="flex flex-col gap-4">
        {related.map((v) => (
          <button
            key={v.id}
            onClick={() => setVideo(v)}
            className="flex gap-3 group text-left"
          >
            <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-neutral-200">
              <img
                src={v.thumbnailUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold line-clamp-2 text-neutral-900 leading-tight">
                {v.title}
              </p>
              <p className="text-xs text-neutral-500 mt-1">{v.category.name}</p>
              <p className="text-xs text-neutral-400">1.2M views</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
