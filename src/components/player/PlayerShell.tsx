import { motion, type PanInfo } from "framer-motion";
import { VideoSurface } from "./VideoSurface";
import { Controls } from "./Controls";
import { RelatedSheet } from "./RelatedSheet";
import { usePlayerStore } from "../../store/playerStore";
import { MdClose, MdPause, MdPlayArrow } from "react-icons/md";

export function PlayerShell() {
  const { isMini, minimize, maximize, current, close, isPlaying, togglePlay } =
    usePlayerStore();

  if (!current) return null;

  const handleDrag = (_: any, info: PanInfo) => {
    if (!isMini && info.offset.y > 100) minimize();
  };

  return (
    <motion.div
      layout
      drag={isMini ? false : "y"}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={handleDrag}
      className={`
        fixed z-[100] bg-black shadow-2xl overflow-hidden flex transition-all duration-300
        ${
          isMini
            ? "bottom-4 left-4 right-4 h-20 rounded-xl flex-row items-center border border-white/10"
            : "inset-0 flex-col lg:flex-row bg-neutral-900"
        }
      `}
    >
      <div
        className={`relative flex flex-col bg-black overflow-hidden shrink-0 transition-all duration-300
          ${isMini ? "w-32 h-full" : "w-full lg:w-[70%] h-auto lg:h-full"}
        `}
        onClick={() => isMini && maximize()}
      >
        <div className="relative aspect-video lg:aspect-auto lg:flex-1 bg-black">
          <VideoSurface />
        </div>

        <div className={`w-full bg-neutral-900 ${isMini ? "hidden" : "block"}`}>
          <Controls />
        </div>
      </div>

      <div
        className={`flex-1 px-4 items-center justify-between min-w-0 ${
          isMini ? "flex" : "hidden"
        }`}
        onClick={maximize}
      >
        <div className="truncate pr-4">
          <p className="text-white text-sm font-medium truncate">
            {current.title}
          </p>
        </div>
        <div
          className="flex items-center gap-2 pr-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={togglePlay} className="text-white p-2">
            {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
          </button>
          <button onClick={close} className="text-gray-400 p-2">
            <MdClose size={24} />
          </button>
        </div>
      </div>

      {/* --- RELATED CONTENT (Only visible when NOT isMini) --- */}
      <div
        className={`flex-1 bg-white overflow-y-auto ${
          isMini ? "hidden" : "block"
        }`}
      >
        <RelatedSheet />
      </div>
    </motion.div>
  );
}
