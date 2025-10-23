import ReleaseCard from "./ReleaseCard";

const BANDCAMP_URL = "https://bewider.bandcamp.com/music";

const SINGLES = [
  {
    title: "NISYROS",
    spotify: "https://open.spotify.com/album/6aIRNkt67C7mSOVMOGfpkr?si=Zgrm923DQIWte750WPiodA",
    appleMusic: "https://music.apple.com/it/album/nisyros/1504576967?i=1504576968&l=en-GB",
  },
  {
    title: "ICON UNFOLD",
    spotify: "https://open.spotify.com/album/2X8nmyr7tVXUaMdSDokwXg?si=s5I-dXHQRwyM-uesZ_GzKw",
    appleMusic: "https://music.apple.com/it/album/icon-unfold-single/1493418625?l=en-GB",
  },
  {
    title: "SAILS AWAY",
    spotify: "https://open.spotify.com/album/1y8E1uOMPaBr04rT6FOzGa?si=VwaRTggjTLWAmZSqV8Jscw",
    appleMusic: "https://music.apple.com/it/album/sails-away-single/1693818315?l=en-GB",
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
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Singles;
