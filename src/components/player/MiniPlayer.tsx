import { usePlayerStore } from "../../store/playerStore";

import { MdPlayArrow, MdPause, MdClose } from "react-icons/md";

export function MiniPlayer() {
  const { current, maximize, close, togglePlay, isPlaying } = usePlayerStore();

  return (
    <div 
      onClick={maximize}
      className="fixed bottom-4 left-2 right-2 z-50 h-24 bg-neutral-900 rounded-xl flex items-center p-2 pl-36 gap-3 shadow-2xl cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{current?.title}</p>
      </div>

      <div className="flex items-center gap-2 pr-2" onClick={e => e.stopPropagation()}>
        <button onClick={togglePlay} className="text-white p-2">
          {isPlaying ? <MdPause size={24}/> : <MdPlayArrow size={24}/>}
        </button>
        <button onClick={close} className="text-gray-400 p-2">
          <MdClose size={24}/>
        </button>
      </div>
    </div>
  );
}
