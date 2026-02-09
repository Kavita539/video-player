import { usePlayerStore } from "../store/playerStore";
import type { Video } from "../types/video";

interface Props {
  video: Video;
}

export function VideoCard({ video }: Props) {
  const setVideo = usePlayerStore((s) => s.setVideo);

  return (
    <div
      onClick={() => setVideo(video)}
      className="flex flex-col w-full bg-white mb-2 sm:mb-6 active:bg-neutral-100 transition-colors cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          4:15
        </span>
      </div>
      <div className="flex justify-between items-center">
        {/* Metadata Row */}
        <div className="flex p-3 gap-3">
          {/* Channel Avatar Placeholder */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.id}`}
              alt="avatar"
            />
          </div>

          {/* Text Info */}
          <div className="flex flex-col pr-4">
            <h3 className="text-[15px] font-semibold leading-tight line-clamp-2 text-gray-900">
              {video.title}
            </h3>
            <div className="flex items-center text-[12px] text-gray-600 mt-1">
              <span>{video.category.name}</span>
              <span className="mx-1">•</span>
              <span>1.2M views</span>
              <span className="mx-1">•</span>
              <span>2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Three dots menu icon */}
        <button className=" h-fit p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
