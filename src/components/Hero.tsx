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
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20" ref={heroRef}>
      <div className="fade-element opacity-0" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-8xl md:text-9xl font-bold tracking-wider mb-12 text-foreground font-rois">
          BEWIDER
        </h1>
      </div>
      
      <div className="fade-element opacity-0 max-w-md w-full" style={{ animationDelay: "0.3s" }}>
        <div className="aspect-square bg-card border border-border mb-6 flex items-center justify-center">
          <Music className="w-20 h-20 text-muted-foreground" />
        </div>
        
        <h2 className="text-2xl font-light mb-2 text-center">LATEST RELEASE</h2>
        <h3 className="text-4xl font-bold mb-6 text-center">ANOTHER HERO</h3>
        
        <div className="flex gap-3 justify-center">
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

      <div className="fade-element opacity-0 mt-16" style={{ animationDelay: "0.5s" }}>
        <p className="text-muted-foreground text-sm tracking-widest">SCROLL ↓</p>
      </div>
    </section>
  );
};

export default Hero;
