import { Music } from "lucide-react";
import { AppleMusicIcon, BandcampIcon, SpotifyIcon } from "@/components/StreamingIcons";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

interface ReleaseCardProps {
  title: string;
  spotify?: string;
  appleMusic: string;
  bandcamp?: string;
  hasAtmos?: boolean;
  artwork?: string;
  delay?: number;
}

const ReleaseCard = ({ title, spotify, appleMusic, bandcamp, hasAtmos, artwork, delay = 0 }: ReleaseCardProps) => {
  const cardRef = useRevealOnIntersect<HTMLDivElement>();
  const streamingLinks = [
    spotify && { href: spotify, label: "Spotify", Icon: SpotifyIcon },
    appleMusic && { href: appleMusic, label: "Apple Music", Icon: AppleMusicIcon },
    bandcamp && { href: bandcamp, label: "Bandcamp", Icon: BandcampIcon },
  ].filter((link): link is { href: string; label: string; Icon: typeof SpotifyIcon } => Boolean(link && link.href));

  return (
    <div ref={cardRef} className="group relative flex flex-col items-center opacity-0" style={{ animationDelay: `${delay}s` }}>
      <div className="relative aspect-square w-full max-w-[320px] overflow-hidden border border-border bg-card [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:-translate-y-1">
        {artwork ? (
          <img
            src={artwork}
            alt={`${title} cover artwork`}
            loading="lazy"
            className="h-full w-full object-cover [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:scale-105 group-focus-within:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Music
              className="h-14 w-14 text-muted-foreground [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:scale-110 group-focus-within:scale-110 md:h-16 md:w-16"
              aria-hidden="true"
            />
            <span className="sr-only">{`${title} placeholder artwork`}</span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center gap-3 bg-background/85 bg-gradient-to-b from-background/80 to-background/70 px-6 text-center opacity-0 md:pointer-events-auto md:flex md:opacity-0 md:[@media(hover:hover)]:group-hover:opacity-100 md:group-focus-within:opacity-100">
          {streamingLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 border border-white/40 px-4 py-3 text-white [@media(hover:hover)]:transition-colors [@media(hover:hover)]:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={`Open ${title} on ${label}`}
            >
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
              <span className="text-sm font-medium uppercase tracking-[0.18em]">{label}</span>
            </a>
          ))}
        </div>
      </div>
      <h3 className="mt-5 text-center text-lg font-light tracking-[0.35em] text-foreground sm:text-xl">
        {title}
      </h3>
      <div className="mt-4 flex w-full max-w-[320px] flex-col gap-2 md:hidden">
        {streamingLinks.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded border border-white/30 bg-background/70 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label={`Open ${title} on ${label}`}
          >
            <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>
      {hasAtmos && (
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/50">
          Available in Stereo and Dolby Atmos
        </p>
      )}
    </div>
  );
};

export default ReleaseCard;
