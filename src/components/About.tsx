import { useRevealOnIntersect } from "@/hooks/use-reveal-on-intersect";

const About = () => {
  const sectionRef = useRevealOnIntersect<HTMLDivElement>({ selector: ".fade-element" });

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24" ref={sectionRef}>
      <div className="fade-element opacity-0" style={{ animationDelay: "0.15s" }}>
        <article className="relative overflow-hidden border border-border/60 bg-background/40 px-6 py-12 sm:px-10 lg:px-14">
          <div className="absolute inset-y-6 left-4 hidden w-px bg-foreground/30 sm:left-6 lg:block" aria-hidden="true" />
          <div className="space-y-12 text-left text-base leading-relaxed text-white/80 sm:text-lg lg:ml-12 lg:max-w-4xl">
            <p className="max-w-2xl text-balance">
              Bewider is an electronic musician and producer who has spent several years crafting soundtracks and music
              for media. The first EP, “A Place To Be Safe”, arrived in February 2015 and was widely acclaimed by
              critics.
            </p>
            <div className="grid gap-10 lg:grid-cols-2">
              <p className="max-w-xl lg:text-balance">
                In 2016 Bewider released a second EP, “Dissolve”, a collection of organic tracks that blend seamlessly
                even as they explore heterogeneous styles. The analog and vintage sound palette was an intentional
                decision, carefully adapted to a modern sensibility.
              </p>
              <p className="max-w-xl lg:text-balance">
                Bewider fluctuates between diverse influences, embracing a broad spectrum that stretches from ambient
                music infused with electronic elements to electro-dance energy, all woven together with a cinematic,
                modern touch.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <p className="max-w-xl lg:text-balance">
                The first full-length album, “Full Panorama”, is an electronic and highly performative body of work. Each
                track emerged from hands-on manipulations and recordings on analog modular synthesizers, where the rarity
                of repetition nurtures spontaneity.
              </p>
              <p className="max-w-xl lg:text-balance">
                In 2021 Bewider released “Gymnopédies Rework”, a project realized during the lockdown period. It grew
                from modular synth experiments that evolved into a fully formed exploration. Erik Satie’s three
                Gymnopédies have always resonated deeply—captivating melodies that continue to inspire.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;
