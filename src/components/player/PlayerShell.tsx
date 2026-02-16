import { motion } from "framer-motion";
import { Controls } from "./Controls";
import { RelatedSheet } from "./RelatedSheet";
import { MiniPlayer } from "./MiniPlayer";
import { usePlayerStore } from "../../store/playerStore";
import { VideoSurface } from "./VideoSurface";

export function PlayerShell() {
  const { isMini, minimize, current } = usePlayerStore();

  if (!current) return null;
  if (isMini) return <MiniPlayer />;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col lg:flex-row bg-black/40 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
      drag="y"
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100) minimize();
      }}
    >
      {/* LEFT SIDE (Video + Controls) */}
      <div className="w-full h-full lg:w-[70%] xl:w-[75%] flex flex-col justify-between bg-black lg:bg-transparent">
        <VideoSurface />

        {/* Controls */}
        <div className="w-full bg-neutral-900/95 backdrop-blur-md">
          <Controls />
        </div>
      </div>

      {/* RIGHT SIDE (Related Videos) */}
      <div className="w-full lg:w-[30%] xl:w-[25%] bg-white lg:border-l border-neutral-800 flex flex-col overflow-hidden shadow-xl">
        <RelatedSheet />
      </div>
    </motion.div>
  );
}