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
      className="relative flex min-h-[85vh] items-center justify-center px-3 pb-12 pt-24 sm:min-h-[90vh] sm:px-6 sm:pb-16 sm:pt-28 lg:px-10"
      ref={heroRef}
    >
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
        <div className="hero-spotlight hero-spotlight--primary" aria-hidden="true" />
        <div className="hero-spotlight hero-spotlight--secondary" aria-hidden="true" />
      </div>
      <div className="fade-element relative z-10 w-full max-w-5xl opacity-0" style={{ animationDelay: "0.15s" }}>
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="relative w-full max-w-[360px] hero-breath sm:max-w-[420px] lg:max-w-[480px]">
            <img
              src="/assets/albums/ships-that-pass-in-the-night.jpg"
              alt="Bewider - Ships That Pass In The Night cover artwork"
              className="aspect-square w-full object-cover shadow-[0_35px_80px_-40px_rgba(0,0,0,0.9)]"
            />
          </div>
          <p className="text-xs uppercase tracking-[0.6em] text-white/70 sm:text-sm">
            Ships That Pass In The Night · Latest EP
          </p>
          <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            {STREAMING_LINKS.map(({ label, href, Icon, variant }) => (
              <Button
                key={label}
                variant={variant}
                className="h-12 w-full min-w-[140px] border border-white/50 bg-transparent text-white [@media(hover:hover)]:transition-colors [@media(hover:hover)]:duration-300 [@media(hover:hover)]:hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:w-auto"
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="!h-5 !w-5 text-white" />
                  <span className="ml-2 text-[0.72rem] uppercase tracking-[0.24em] text-white sm:text-[0.75rem]">
                    {label}
                  </span>
                </a>
              </Button>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Available in Stereo and Dolby Atmos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
