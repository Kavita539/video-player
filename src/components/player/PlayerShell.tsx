import { motion } from "framer-motion";
import { VideoSurface } from "./VideoSurface";
import { Controls } from "./Controls";
import { RelatedSheet } from "./RelatedSheet";
import { usePlayerStore } from "../../store/playerStore";

export function PlayerShell() {
  const minimize = usePlayerStore((s) => s.minimize);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black lg:bg-neutral-950 flex flex-col lg:flex-row overflow-hidden"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100) minimize();
      }}
    >
      {/* LEFT SIDE: Video and Controls */}
      <div className="w-full lg:w-[70%] xl:w-[75%] flex flex-col bg-black">
        <div className="flex-1 flex items-center justify-center">
          <VideoSurface />
        </div>

        {/* Controls Bar - Always visible below video */}
        <div className="w-full bg-neutral-900/90 backdrop-blur-md">
          <Controls />
        </div>
      </div>

      {/* RIGHT SIDE: Related Videos */}
      <div className="w-full lg:w-[30%] xl:w-[25%] bg-white lg:border-l border-neutral-800 flex flex-col overflow-hidden">
        <RelatedSheet />
      </div>
    </motion.div>
  );
}
