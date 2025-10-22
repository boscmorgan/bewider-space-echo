import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  videoId: string;
  delay?: number;
}

const VideoCard = ({ title, videoId, delay = 0 }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-blur-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      ref={cardRef}
      className="opacity-0 group relative"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-card border border-border overflow-hidden relative">
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
            <div
              className={`absolute inset-0 bg-background/80 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              onClick={handlePlay}
            >
              <Play className="w-16 h-16 text-foreground transition-transform duration-300 group-hover:scale-110" />
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

      <h3 className="mt-4 text-lg font-light tracking-wider text-center">{title}</h3>
    </div>
  );
};

export default VideoCard;
