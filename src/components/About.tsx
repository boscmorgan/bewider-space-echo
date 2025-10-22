import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      const children = sectionRef.current.querySelectorAll(".fade-element");
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto" ref={sectionRef}>
      <div className="fade-element opacity-0" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center tracking-wider">ABOUT</h2>
      </div>
      
      <div className="fade-element opacity-0" style={{ animationDelay: "0.3s" }}>
        <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-2xl mx-auto">
          BEWIDER is an electronic music artist exploring the boundaries between ambient soundscapes and 
          intricate rhythmic patterns. Through carefully crafted compositions, each release invites listeners 
          into immersive sonic environments that blur the lines between the organic and the synthetic.
        </p>
      </div>
    </section>
  );
};

export default About;
