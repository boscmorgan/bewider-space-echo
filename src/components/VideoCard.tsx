import { useState } from "react";
import { Play } from "lucide-react";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

interface VideoCardProps {
  title: string;
  videoId: string;
  delay?: number;
}

const VideoCard = ({ title, videoId, delay = 0 }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRevealOnIntersect<HTMLDivElement>();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      ref={cardRef}
      className="group relative w-full max-w-[640px] translate-y-0 opacity-0 transition-transform duration-500"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative aspect-video overflow-hidden border border-border bg-card">
        {!isPlaying ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-100 pointer-events-auto transition-all duration-500 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100">
              <button
                type="button"
                aria-label={`Play ${title}`}
                onClick={handlePlay}
                className="flex h-24 w-24 items-center justify-center border border-border/70 bg-background/70 text-foreground transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 md:h-28 md:w-28 md:group-hover:scale-105 md:group-focus-within:scale-105"
              >
                <Play className="h-10 w-10 text-foreground transition-transform duration-300 md:h-12 md:w-12 md:group-hover:scale-110 md:group-focus-within:scale-110" />
              </button>
            </div>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&color=white`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>

      <h3 className="mt-5 text-center text-lg font-light tracking-[0.35em] text-foreground sm:text-xl">
        {title}
      </h3>
    </div>
  );
};

export default VideoCard;
