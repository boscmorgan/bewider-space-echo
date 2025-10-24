import { Button } from "@/components/ui/button";
import { AppleMusicIcon, DolbyAtmosIcon, SpotifyIcon } from "@/components/StreamingIcons";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

const STREAMING_LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/album/7mZQvL7Vf1ebVoDIOxaTKp?si=XA6X1AIjT_C5cjFGzHjDjw",
    Icon: SpotifyIcon,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/it/album/another-hero/1752728681?i=1752728682&l=en-GB",
    Icon: AppleMusicIcon,
  },
];

const Hero = () => {
  const heroRef = useRevealOnIntersect<HTMLDivElement>({ selector: ".fade-element" });

  return (
    <section
      className="relative flex min-h-screen items-center justify-center px-3 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-10 lg:pt-48"
      ref={heroRef}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-spotlight animate-hero-spotlight" />
      </div>
      <div className="fade-element relative z-10 w-full max-w-5xl opacity-0" style={{ animationDelay: "0.15s" }}>
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[640px] hero-breath">
            <img
              src="/album_latest.webp"
              alt="Bewider - Another Hero album artwork"
              className="aspect-square w-full object-cover shadow-[0_35px_80px_-40px_rgba(0,0,0,0.9)]"
            />
            <span className="absolute right-4 top-4 inline-flex items-center">
              <DolbyAtmosIcon className="h-4 w-auto text-white" />
              <span className="sr-only">Dolby Atmos</span>
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.6em] text-white/70 sm:text-sm">
            Another Hero · Latest EP
          </p>
          <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            {STREAMING_LINKS.map(({ label, href, Icon }) => (
              <Button
                key={label}
                variant="outline"
                className="h-12 w-full min-w-[120px] border border-white/50 bg-transparent text-white transition-colors duration-300 hover:bg-white/15 sm:w-auto"
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="!h-5 !w-5 text-white" />
                  <span className="text-[0.65rem] uppercase tracking-[0.55em] text-white sm:text-xs">
                    {label}
                  </span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
