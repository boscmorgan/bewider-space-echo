import { AppleMusicIcon, BandcampIcon, SpotifyIcon } from "@/components/StreamingIcons";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

const STREAMING_LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/album/313C73VtZgXrA9S7Ybr1EC?si=3ndu3JERTeis76pjGRZjjg",
    Icon: SpotifyIcon,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/album/ships-that-pass-in-the-night-ep/1838859940",
    Icon: AppleMusicIcon,
  },
  {
    label: "Bandcamp",
    href: "https://bewider.bandcamp.com/album/ships-that-pass-in-the-night",
    Icon: BandcampIcon,
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
            {STREAMING_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Ships That Pass In The Night on ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded border border-white/30 bg-background/70 text-white shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)] [@media(hover:hover)]:transition-all [@media(hover:hover)]:duration-300 [@media(hover:hover)]:hover:border-white/60 [@media(hover:hover)]:hover:bg-white/12 [@media(hover:hover)]:hover:shadow-[0_0_28px_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                <span className="sr-only">{`Open Ships That Pass In The Night on ${label}`}</span>
              </a>
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
