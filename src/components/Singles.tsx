import ReleaseCard from "./ReleaseCard";

const Singles = () => {
  const singles = [
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

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center tracking-wider">SINGLES</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {singles.map((single, index) => (
          <ReleaseCard
            key={single.title}
            title={single.title}
            spotify={single.spotify}
            appleMusic={single.appleMusic}
            bandcamp="https://bewider.bandcamp.com/music"
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Singles;
