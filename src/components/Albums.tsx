import ReleaseCard from "./ReleaseCard";

const BANDCAMP_URL = "https://bewider.bandcamp.com/music";

const ALBUMS = [
  {
    title: "SHIPS THAT PASS IN THE NIGHT",
    spotify: "https://open.spotify.com/album/313C73VtZgXrA9S7Ybr1EC?si=3ndu3JERTeis76pjGRZjjg",
    appleMusic: "https://music.apple.com/us/album/ships-that-pass-in-the-night-ep/1838859940",
    artwork: "/assets/albums/ships-that-pass-in-the-night.jpg",
    hasAtmos: true,
  },
  {
    title: "GYMNOPÉDIES REWORK",
    spotify: "https://open.spotify.com/album/6DK0vyvhbJGmpoVdkG2mak?si=1XvYgsKJTOGs0jEhxjQwsg",
    appleMusic: "https://music.apple.com/it/album/gymnop%C3%A9dies-rework-single/1549207538?l=en-GB",
    artwork: "/assets/albums/gymnopedies-rework.jpg",
  },
  {
    title: "FULL PANORAMA",
    spotify: "https://open.spotify.com/album/4YwKcoUtyCXC4m079KKjw1?si=mZJiRC8TSoa7eyLUyjkTCQ",
    appleMusic: "https://music.apple.com/it/album/full-panorama/1683514943?l=en-GB",
    artwork: "/assets/albums/full-panorama.jpg",
  },
  {
    title: "DISSOLVE",
    spotify: "https://open.spotify.com/album/4z3zGQVk7zxKRlpElMwawI?si=xKBN1VChS9S8ej1H5YNfEw",
    appleMusic: "https://music.apple.com/it/album/dissolve/1689876132?l=en-GB",
    artwork: "/assets/albums/dissolve.jpg",
  },
  {
    title: "A PLACE TO BE SAFE",
    spotify: "https://open.spotify.com/album/0GpbxLUm4gQNIG8l60EP8N?si=hk8iN2wsSfWJ1D8L6G6tFA",
    appleMusic: "https://music.apple.com/it/album/a-place-to-be-safe-ep/1508488727?l=en-GB",
    artwork: "/assets/albums/a-place-to-be-safe.jpg",
  },
];

const Albums = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <header className="mb-8 text-center sm:mb-12">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-white/60 sm:text-sm">Albums &amp; EPs</p>
      </header>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
        {ALBUMS.map((album, index) => (
          <ReleaseCard
            key={album.title}
            title={album.title}
            spotify={album.spotify}
            appleMusic={album.appleMusic}
            bandcamp={BANDCAMP_URL}
            hasAtmos={album.hasAtmos}
            artwork={album.artwork}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Albums;
