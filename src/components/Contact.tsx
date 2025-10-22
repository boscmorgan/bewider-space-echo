import { useEffect, useRef } from "react";
import { Instagram } from "lucide-react";

const Contact = () => {
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
        <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center tracking-wider">CONTACT</h2>
      </div>
      
      <div className="fade-element opacity-0 flex flex-col items-center gap-6" style={{ animationDelay: "0.3s" }}>
        <a 
          href="mailto:info@bewider.net" 
          className="text-xl tracking-wider hover:text-muted-foreground transition-colors"
        >
          info@bewider.net
        </a>
        
        <a 
          href="https://www.instagram.com/bewider_music/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-muted-foreground transition-colors"
        >
          <Instagram className="w-8 h-8" />
        </a>
      </div>

      <div className="fade-element opacity-0 mt-16 text-center text-sm text-muted-foreground" style={{ animationDelay: "0.5s" }}>
        <p>© 2025 BEWIDER. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Contact;
