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
            className="font-sans text-base font-semibold tracking-[0.18em] text-foreground transition-colors hover:text-muted-foreground sm:text-lg"
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
              href="https://bewider.bandcamp.com/merch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-white/40 bg-background/70 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:text-base"
              aria-label="Open Bewider merch store on Bandcamp"
            >
              <span className="material-symbols-outlined text-2xl leading-none">shopping_bag</span>
              <span>MERCH</span>
            </a>
            <a
              href="https://www.dropbox.com/scl/fo/s1tmmstkic5kc83121qfz/APnZWt21ladgHjkmLkeQ8-M?rlkey=czu6gwli00z1373q07w0fvlqz&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-muted-foreground sm:text-base"
              aria-label="Download press kit"
            >
              <span className="material-symbols-outlined text-2xl leading-none">download</span>
              <span>PRESS KIT</span>
            </a>
          </div>
        </div>
      </div>

      <div className="fade-element opacity-0" style={{ animationDelay: "0.45s" }}>
        <p className="mt-12 font-sans text-center text-xs uppercase tracking-[0.28em] text-muted-foreground/80 sm:text-sm">
          © 2025 BEWIDER. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Contact;
