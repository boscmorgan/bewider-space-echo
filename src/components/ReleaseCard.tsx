import { Music } from "lucide-react";
import { AppleMusicIcon, BandcampIcon, DolbyAtmosIcon, SpotifyIcon } from "@/components/StreamingIcons";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

interface ReleaseCardProps {
  title: string;
  spotify: string;
  appleMusic: string;
  bandcamp?: string;
  hasAtmos?: boolean;
  delay?: number;
}

const ReleaseCard = ({ title, spotify, appleMusic, bandcamp, hasAtmos, delay = 0 }: ReleaseCardProps) => {
  const cardRef = useRevealOnIntersect<HTMLDivElement>();

  return (
    <div ref={cardRef} className="group relative flex flex-col items-center opacity-0" style={{ animationDelay: `${delay}s` }}>
      <div className="relative aspect-square w-full max-w-[320px] overflow-hidden border border-border bg-card transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex h-full w-full items-center justify-center">
          <Music className="h-14 w-14 text-muted-foreground transition-transform duration-500 group-hover:scale-110 group-focus-within:scale-110 md:h-16 md:w-16" />
        </div>
        
        {hasAtmos && (
          <span className="absolute right-3 top-3 inline-flex items-center">
            <DolbyAtmosIcon className="h-5 w-auto text-white" />
            <span className="sr-only">Dolby Atmos</span>
          </span>
        )}

        <div
          className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/95 bg-gradient-to-b from-background/90 to-background/80 px-6 text-center opacity-100 transition-all duration-500 md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100"
        >
          <a
            href={spotify}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Listen on Spotify"
            className="flex w-full items-center justify-center gap-2 border border-white/40 px-4 py-3 text-white transition-colors hover:bg-white/10"
          >
            <SpotifyIcon className="!h-5 !w-5 text-white" />
            <span className="sr-only">Spotify</span>
          </a>
          <a
            href={appleMusic}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Listen on Apple Music"
            className="flex w-full items-center justify-center gap-2 border border-white/40 px-4 py-3 text-white transition-colors hover:bg-white/10"
          >
            <AppleMusicIcon className="!h-5 !w-5 text-white" />
            <span className="sr-only">Apple Music</span>
          </a>
          {bandcamp && (
            <a
              href={bandcamp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open on Bandcamp"
              className="flex w-full items-center justify-center gap-2 border border-white/40 px-4 py-3 text-white transition-colors hover:bg-white/10"
            >
              <BandcampIcon className="!h-5 !w-5 text-white" />
              <span className="sr-only">Bandcamp</span>
            </a>
          )}
        </div>
      </div>
      
      <h3 className="mt-5 text-center text-lg font-light tracking-[0.35em] text-foreground sm:text-xl">
        {title}
      </h3>
    </div>
  );
};

export default ReleaseCard;
