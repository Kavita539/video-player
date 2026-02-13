import { motion } from "framer-motion";
import { Controls } from "./Controls";
import { RelatedSheet } from "./RelatedSheet";
import { MiniPlayer } from "./MiniPlayer";
import { usePlayerStore } from "../../store/playerStore";

export function PlayerShell() {
  const { isMini, minimize, current } = usePlayerStore();

  if (!current || isMini) return <MiniPlayer />;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col lg:flex-row overflow-hidden"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100) minimize();
      }}
    >
      {/* LEFT SIDE */}
      <div className="w-full lg:w-[70%] xl:w-[75%] flex flex-col">
        <div className="w-full aspect-video lg:flex-1 bg-transparent relative">
          <div className="absolute inset-0 z-[60]" />
        </div>

        <div className="w-full bg-neutral-900/90 backdrop-blur-md z-[70] pointer-events-auto">
          <Controls />
          <div className="h-10 w-full flex-shrink-0" />
        </div>
      </div>

      {/* RIGHT SIDE: Related Videos */}
      <div className="w-full lg:w-[30%] xl:w-[25%] bg-white lg:border-l border-neutral-800 flex flex-col overflow-hidden z-[70] pointer-events-auto shadow-xl">
        <RelatedSheet />
      </div>
    </motion.div>
  );
}
