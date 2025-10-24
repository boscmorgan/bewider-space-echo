import ReleaseCard from "./ReleaseCard";

const BANDCAMP_URL = "https://bewider.bandcamp.com/music";

const SINGLES = [
  {
    title: "ANOTHER HERO",
    spotify: "https://open.spotify.com/album/7mZQvL7Vf1ebVoDIOxaTKp?si=XA6X1AIjT_C5cjFGzHjDjw",
    appleMusic: "https://music.apple.com/it/album/another-hero/1752728681?i=1752728682&l=en-GB",
    artwork: "/assets/another hero.jpg",
    hasAtmos: true,
  },
  {
    title: "SAILS AWAY",
    spotify: "https://open.spotify.com/album/1y8E1uOMPaBr04rT6FOzGa?si=VwaRTggjTLWAmZSqV8Jscw",
    appleMusic: "https://music.apple.com/it/album/sails-away-single/1693818315?l=en-GB",
    artwork: "/assets/singles/sails-away.jpg",
  },
  {
    title: "NISYROS",
    spotify: "https://open.spotify.com/album/6aIRNkt67C7mSOVMOGfpkr?si=Zgrm923DQIWte750WPiodA",
    appleMusic: "https://music.apple.com/it/album/nisyros/1504576967?i=1504576968&l=en-GB",
    artwork: "/assets/singles/nisyros.png",
  },
  {
    title: "ICON UNFOLD",
    spotify: "https://open.spotify.com/album/2X8nmyr7tVXUaMdSDokwXg?si=s5I-dXHQRwyM-uesZ_GzKw",
    appleMusic: "https://music.apple.com/it/album/icon-unfold-single/1493418625?l=en-GB",
    artwork: "/assets/singles/icon-unfold.jpg",
  },
];

const Singles = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
        {SINGLES.map((single, index) => (
          <ReleaseCard
            key={single.title}
            title={single.title}
            spotify={single.spotify}
            appleMusic={single.appleMusic}
            bandcamp={BANDCAMP_URL}
            artwork={single.artwork}
            hasAtmos={single.hasAtmos}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Singles;
