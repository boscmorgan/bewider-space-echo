import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

const About = () => {
  const sectionRef = useRevealOnIntersect<HTMLDivElement>({ selector: ".fade-element" });

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 lg:px-20 lg:py-20" ref={sectionRef}>
      <header className="mb-6 text-center sm:mb-10">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.32em] text-white/60 sm:text-xs">About</p>
      </header>
      <div className="fade-element opacity-0" style={{ animationDelay: "0.15s" }}>
        <article className="relative overflow-hidden border border-border/60 bg-background/40 px-5 py-10 sm:px-9 lg:px-12">
          <div className="absolute inset-y-6 left-4 hidden w-px bg-foreground/30 sm:left-6 lg:block" aria-hidden="true" />
          <div className="space-y-10 text-left font-sans text-[0.95rem] leading-7 text-white/85 sm:text-base lg:ml-12 lg:max-w-4xl">
            <p className="max-w-3xl text-pretty">
              Bewider is an electronic musician and producer who has spent several years crafting soundtracks and music
              for media. The first EP, “A Place To Be Safe”, arrived in February 2015 and was widely acclaimed by
              critics.
            </p>
            <div className="grid gap-10 lg:grid-cols-2">
              <p className="max-w-xl text-pretty">
                In 2016 Bewider released a second EP, “Dissolve”, a collection of organic tracks that blend seamlessly
                even as they explore heterogeneous styles. The analog and vintage sound palette was an intentional
                decision, carefully adapted to a modern sensibility.
              </p>
              <p className="max-w-xl text-pretty">
                Bewider fluctuates between diverse influences, embracing a broad spectrum that stretches from ambient
                music infused with electronic elements to electro-dance energy, all woven together with a cinematic,
                modern touch.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <p className="max-w-xl text-pretty">
                The first full-length album, “Full Panorama”, is an electronic and highly performative body of work. Each
                track emerged from hands-on manipulations and recordings on analog modular synthesizers, where the rarity
                of repetition nurtures spontaneity.
              </p>
              <p className="max-w-xl text-pretty">
                In 2021 Bewider released “Gymnopédies Rework”, a project realized during the lockdown period. It grew
                from modular synth experiments that evolved into a fully formed exploration. Erik Satie’s three
                Gymnopédies have always resonated deeply—captivating melodies that continue to inspire.
              </p>
            </div>
            <p className="max-w-3xl text-pretty">
              In 2025, Bewider released <em>Ship That Pass in the Night</em>, his fourth album, which continues the sonic
              journey begun with <em>Full Panorama</em>. Inspired by the imagery of ships traveling through the darkness, the
              record explores themes of distance, connection, and solitude through immersive electronic and ambient
              textures. Mixed both in stereo and Dolby Atmos, it reflects his ongoing passion for cinematic sound and
              emotional storytelling.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;
