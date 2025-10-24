import { Button } from "@/components/ui/button";
import { AppleMusicIcon, BandcampIcon, SpotifyIcon } from "@/components/StreamingIcons";
import { cn } from "@/lib/utils";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

const STREAMING_LINKS = [
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/album/ships-that-pass-in-the-night-ep/1838859940",
    Icon: AppleMusicIcon,
    variant: "outline" as const,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/album/313C73VtZgXrA9S7Ybr1EC?si=3ndu3JERTeis76pjGRZjjg",
    Icon: SpotifyIcon,
    variant: "outline" as const,
  },
  {
    label: "Bandcamp",
    href: "https://bewider.bandcamp.com/album/ships-that-pass-in-the-night",
    Icon: BandcampIcon,
    variant: "outline" as const,
  },
];

const Hero = () => {
  const heroRef = useRevealOnIntersect<HTMLDivElement>({ selector: ".fade-element" });

  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center px-6 pb-10 pt-20 sm:min-h-[85vh] sm:px-12 sm:pb-14 sm:pt-24 lg:px-20"
      ref={heroRef}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="hero-spotlight hero-spotlight--primary" aria-hidden="true" />
        <div className="hero-spotlight hero-spotlight--secondary" aria-hidden="true" />
      </div>
      <div className="fade-element relative z-10 w-full max-w-4xl opacity-0" style={{ animationDelay: "0.15s" }}>
        <div className="flex flex-col items-center gap-5 sm:gap-6">
          <div className="relative w-full max-w-[320px] hero-breath sm:max-w-[360px] lg:max-w-[400px]">
            <img
              src="/assets/albums/ships-that-pass-in-the-night.jpg"
              alt="Bewider - Ships That Pass In The Night cover artwork"
              className="aspect-square w-full object-cover shadow-[0_35px_80px_-40px_rgba(0,0,0,0.9)]"
            />
          </div>
          <p className="text-[0.6rem] uppercase tracking-[0.48em] text-white/70 sm:text-xs">
            Ships That Pass In The Night · Latest EP
          </p>
          <div className="flex w-full max-w-xs justify-center gap-2 sm:max-w-sm">
            {STREAMING_LINKS.map(({ label, href, Icon, variant }) => (
              <Button
                key={label}
                variant={variant}
                size="icon"
                className="h-9 w-9 border border-white/30 bg-transparent text-white [@media(hover:hover)]:transition-colors [@media(hover:hover)]:duration-300 [@media(hover:hover)]:hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open on ${label}`}>
                  <Icon className="!h-4 !w-4 text-white" />
                </a>
              </Button>
            ))}
          </div>
          <p className="text-[0.5rem] uppercase tracking-[0.22em] text-white/50">
            Available in Stereo and Dolby Atmos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
