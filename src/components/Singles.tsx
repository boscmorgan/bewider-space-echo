import ReleaseCard from "./ReleaseCard";

const BANDCAMP_URL = "https://bewider.bandcamp.com/music";

const SINGLES = [
  {
    title: "ANOTHER HERO",
    spotify: "https://open.spotify.com/album/7mZQvL7Vf1ebVoDIOxaTKp?si=XA6X1AIjT_C5cjFGzHjDjw",
    appleMusic: "https://music.apple.com/it/album/another-hero/1752728681?i=1752728682&l=en-GB",
    artwork: "/assets/albums/another-hero.webp",
  },
  {
    title: "SAILS AWAY",
    spotify: "https://open.spotify.com/album/1y8E1uOMPaBr04rT6FOzGa?si=VwaRTggjTLWAmZSqV8Jscw",
    appleMusic: "https://music.apple.com/it/album/sails-away-single/1693818315?l=en-GB",
    artwork: "/assets/singles/sails-away.jpg",
  },
  {
    title: "ICON UNFOLD",
    spotify: "https://open.spotify.com/album/2X8nmyr7tVXUaMdSDokwXg?si=s5I-dXHQRwyM-uesZ_GzKw",
    appleMusic: "https://music.apple.com/it/album/icon-unfold-single/1493418625?l=en-GB",
    artwork: "/assets/singles/icon-unfold.jpg",
  },
  {
    title: "NISYROS",
    spotify: "https://open.spotify.com/album/6aIRNkt67C7mSOVMOGfpkr?si=Zgrm923DQIWte750WPiodA",
    appleMusic: "https://music.apple.com/it/album/nisyros/1504576967?i=1504576968&l=en-GB",
    artwork: "/assets/singles/nisyros.png",
  },
];

const Singles = () => {
  return (
    <section
      id="music"
      className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10 sm:px-10 lg:px-20 lg:pt-20 lg:pb-16"
    >
      <header className="mb-6 text-center sm:mb-10">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.32em] text-white/60 sm:text-xs">Singles</p>
      </header>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">
        {SINGLES.map((single, index) => (
          <ReleaseCard
            key={single.title}
            title={single.title}
            spotify={single.spotify}
            appleMusic={single.appleMusic}
            bandcamp={BANDCAMP_URL}
            artwork={single.artwork}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Singles;
