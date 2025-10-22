import { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";

interface ReleaseCardProps {
  title: string;
  spotify: string;
  appleMusic: string;
  bandcamp?: string;
  hasAtmos?: boolean;
  delay?: number;
}

const ReleaseCard = ({ title, spotify, appleMusic, bandcamp, hasAtmos, delay = 0 }: ReleaseCardProps) => {
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

  return (
    <div
      ref={cardRef}
      className="opacity-0 group relative"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square bg-card border border-border flex items-center justify-center overflow-hidden relative transition-all duration-500">
        <Music className="w-16 h-16 text-muted-foreground transition-all duration-500 group-hover:scale-110" />
        
        {hasAtmos && (
          <div className="absolute top-3 right-3 bg-foreground text-background px-2 py-1 text-xs tracking-wider">
            ATMOS
          </div>
        )}

        <div 
          className={`absolute inset-0 bg-background/95 flex flex-col items-center justify-center gap-3 transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href={spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wider hover:text-muted-foreground transition-colors"
          >
            SPOTIFY
          </a>
          <a
            href={appleMusic}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wider hover:text-muted-foreground transition-colors"
          >
            APPLE MUSIC
          </a>
          {bandcamp && (
            <a
              href={bandcamp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wider hover:text-muted-foreground transition-colors"
            >
              BANDCAMP
            </a>
          )}
        </div>
      </div>
      
      <h3 className="mt-4 text-lg font-light tracking-wider text-center">{title}</h3>
    </div>
  );
};

export default ReleaseCard;
