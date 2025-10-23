import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

    if (heroRef.current) {
      const children = heroRef.current.querySelectorAll(".fade-element");
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen relative px-6 py-12 flex flex-col" ref={heroRef}>
      {/* Top section with title */}
      <div className="fade-element opacity-0 pt-8" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-7xl md:text-9xl font-black tracking-wider text-foreground">
          BEWIDER
        </h1>
      </div>

      {/* Subtitle text */}
      <div className="fade-element opacity-0 mt-6 max-w-2xl" style={{ animationDelay: "0.2s" }}>
        <p className="text-xs md:text-sm tracking-wider text-muted-foreground uppercase leading-relaxed">
          Electronic music artist exploring the boundaries between ambient soundscapes and intricate rhythmic patterns
        </p>
      </div>
      
      {/* Center content with album info */}
      <div className="flex-1 flex items-center justify-center">
        <div className="fade-element opacity-0 max-w-sm w-full" style={{ animationDelay: "0.3s" }}>
          <div className="aspect-square bg-card border border-border mb-6 flex items-center justify-center">
            <Music className="w-20 h-20 text-muted-foreground" />
          </div>
          
          <h2 className="text-sm font-light mb-2 text-center tracking-widest text-muted-foreground">LATEST RELEASE</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-wider">ANOTHER HERO</h3>
          
          <div className="flex gap-3 justify-center flex-wrap">
            <Button 
              variant="outline" 
              className="bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              asChild
            >
              <a href="https://open.spotify.com/album/7mZQvL7Vf1ebVoDIOxaTKp?si=XA6X1AIjT_C5cjFGzHjDjw" target="_blank" rel="noopener noreferrer">
                Spotify
              </a>
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              asChild
            >
              <a href="https://music.apple.com/it/album/another-hero/1752728681?i=1752728682&l=en-GB" target="_blank" rel="noopener noreferrer">
                Apple Music
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="fade-element opacity-0 pb-8 text-center" style={{ animationDelay: "0.5s" }}>
        <p className="text-muted-foreground text-xs tracking-[0.3em]">SCROLL ↓</p>
      </div>
    </section>
  );
};

export default Hero;
