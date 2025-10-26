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
      className="group relative w-full max-w-[600px] translate-y-0 opacity-0 transition-transform duration-500"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative aspect-video overflow-hidden border border-border bg-card">
        {!isPlaying ? (
          <>
            <img
              src={posterImage}
              alt={title}
              loading="lazy"
              decoding="async"
              width="1280"
              height="720"
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
                className="flex h-20 w-20 items-center justify-center border border-border/70 bg-background/70 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 md:h-24 md:w-24 md:group-focus-within:scale-105"
              >
                <Play className="h-8 w-8 text-foreground md:h-10 md:w-10 md:group-focus-within:scale-110" />
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

      <h3 className="mt-4 text-center text-base font-light tracking-[0.3em] text-foreground sm:text-lg">
        {title}
      </h3>
    </div>
  );
};

export default VideoCard;
