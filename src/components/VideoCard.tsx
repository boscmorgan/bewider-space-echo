import { useState } from "react";
import { Play } from "lucide-react";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

interface VideoCardProps {
  title: string;
  videoId: string;
  thumbnail?: string;
  delay?: number;
}

const VideoCard = ({ title, videoId, thumbnail, delay = 0 }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRevealOnIntersect<HTMLDivElement>();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const youtubeFallback = (quality: "maxresdefault" | "hqdefault") => `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  const posterImage = thumbnail ?? youtubeFallback("maxresdefault");

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
              src={posterImage}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={(event) => {
                const fallback = youtubeFallback("hqdefault");
                if (event.currentTarget.dataset.fallbackApplied === "true" || posterImage === fallback) {
                  return;
                }

                event.currentTarget.dataset.fallbackApplied = "true";
                event.currentTarget.src = fallback;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-100 pointer-events-auto md:pointer-events-none md:opacity-0 md:[@media(hover:hover)]:group-hover:pointer-events-auto md:[@media(hover:hover)]:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100">
              <button
                type="button"
                aria-label={`Play ${title}`}
                onClick={handlePlay}
                className="flex h-24 w-24 items-center justify-center border border-border/70 bg-background/70 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 md:h-28 md:w-28 md:group-focus-within:scale-105"
              >
                <Play className="h-10 w-10 text-foreground md:h-12 md:w-12 md:group-focus-within:scale-110" />
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
