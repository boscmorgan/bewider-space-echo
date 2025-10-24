import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronsLeft, Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";

const TRACKS = [
  { title: "The Approaching", src: "/assets/audio/the-approaching.mp3" },
  { title: "First Ship", src: "/assets/audio/first-ship.mp3" },
  { title: "Tetide", src: "/assets/audio/tetide.mp3" },
  { title: "4AM", src: "/assets/audio/4am.mp3" },
  { title: "Departure", src: "/assets/audio/departure.mp3" },
];

const shuffle = <T,>(input: T[]) => {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const FloatingPlayer = () => {
  const queue = useMemo(() => shuffle(TRACKS), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((previous) => (previous + 1) % queue.length);
    setIsPlaying(true);
  }, [queue.length]);

  useEffect(() => {
    const audio = new Audio(queue[currentIndex].src);
    audioRef.current = audio;
    audio.muted = isMuted;
    const onEnded = () => {
      handleNext();
    };
    audio.addEventListener("ended", onEnded);
    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, [currentIndex, handleNext, isMuted, isPlaying, queue]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.muted = isMuted;
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying((previous) => !previous);
  };

  const toggleMute = () => {
    setIsMuted((previous) => !previous);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsCollapsed(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside className="fixed bottom-6 right-4 z-[60] flex items-center gap-2 sm:right-6">
      <button
        type="button"
        onClick={() => {
          setIsCollapsed((previous) => !previous);
        }}
        className={`grid h-9 w-9 place-items-center rounded border border-white/25 bg-background/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:border-white/60 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
          isCollapsed ? "translate-x-[19.5rem]" : "translate-x-0"
        } transition-transform duration-300`}
        aria-label={isCollapsed ? "Show player" : "Hide player"}
      >
        <ChevronsLeft className={`h-4 w-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`player-shell flex w-full max-w-xs items-center gap-3 rounded border border-white/25 bg-background/80 px-4 py-3 shadow-lg backdrop-blur-sm ${
          isCollapsed ? "player-shell--hidden" : ""
        }`}
      >
        <div className="flex-1">
          <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/50">Now Playing</p>
          <p className="truncate text-sm font-semibold text-white" title={queue[currentIndex].title}>
            {queue[currentIndex].title}
          </p>
        </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          className="grid h-9 w-9 place-items-center rounded border border-white/25 text-white transition-colors hover:border-white/60 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="grid h-9 w-9 place-items-center rounded border border-white text-white transition-colors hover:border-white/70 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label={isPlaying ? "Pause playback" : "Play playback"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="grid h-9 w-9 place-items-center rounded border border-white/25 text-white transition-colors hover:border-white/60 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Play next track"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
      </div>
    </aside>
  );
};

export default FloatingPlayer;
