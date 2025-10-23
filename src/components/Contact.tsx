import { BandcampIcon, InstagramIcon, YoutubeIcon } from "@/components/StreamingIcons";
import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

const Contact = () => {
  const sectionRef = useRevealOnIntersect<HTMLDivElement>({ selector: ".fade-element" });

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-24" ref={sectionRef}>
      <div className="fade-element w-full opacity-0" style={{ animationDelay: "0.2s" }}>
        <div className="flex flex-col items-center gap-8 text-center">
          <a
            href="mailto:info@bewider.net"
            className="text-base font-light uppercase tracking-[0.45em] text-foreground transition-colors hover:text-muted-foreground sm:text-lg"
          >
            info@bewider.net
          </a>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-8 text-foreground">
              <a
                href="https://www.instagram.com/bewider_music/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-muted-foreground"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCH7B6yBwZ9DQ-bOxe_xI7ZQ"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-muted-foreground"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-6 w-6" />
              </a>
              <a
                href="https://bewider.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-muted-foreground"
                aria-label="Bandcamp"
              >
                <BandcampIcon className="h-6 w-6" />
              </a>
            </div>
            <a
              href="https://www.dropbox.com/scl/fo/s1tmmstkic5kc83121qfz/APnZWt21ladgHjkmLkeQ8-M?rlkey=czu6gwli00z1373q07w0fvlqz&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-light uppercase tracking-[0.45em] text-foreground transition-colors hover:text-muted-foreground sm:text-sm"
              aria-label="Download press kit"
            >
              <span className="material-symbols-outlined text-2xl leading-none">download</span>
              <span>PRESS KIT</span>
            </a>
          </div>
        </div>
      </div>

      <div className="fade-element opacity-0" style={{ animationDelay: "0.45s" }}>
        <p className="mt-12 text-center text-[0.55rem] uppercase tracking-[0.55em] text-muted-foreground/80 sm:text-[0.6rem]">
          © 2025 BEWIDER. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Contact;
