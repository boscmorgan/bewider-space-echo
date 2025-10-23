import ReleaseCard from "./ReleaseCard";

const BANDCAMP_URL = "https://bewider.bandcamp.com/music";

const ALBUMS = [
  {
    title: "ANOTHER HERO",
    spotify: "https://open.spotify.com/album/7mZQvL7Vf1ebVoDIOxaTKp?si=XA6X1AIjT_C5cjFGzHjDjw",
    appleMusic: "https://music.apple.com/it/album/another-hero/1752728681?i=1752728682&l=en-GB",
    hasAtmos: true,
  },
  {
    title: "A PLACE TO BE SAFE",
    spotify: "https://open.spotify.com/album/0GpbxLUm4gQNIG8l60EP8N?si=hk8iN2wsSfWJ1D8L6G6tFA",
    appleMusic: "https://music.apple.com/it/album/a-place-to-be-safe-ep/1508488727?l=en-GB",
  },
  {
    title: "DISSOLVE",
    spotify: "https://open.spotify.com/album/4z3zGQVk7zxKRlpElMwawI?si=xKBN1VChS9S8ej1H5YNfEw",
    appleMusic: "https://music.apple.com/it/album/dissolve/1689876132?l=en-GB",
  },
  {
    title: "FULL PANORAMA",
    spotify: "https://open.spotify.com/album/4YwKcoUtyCXC4m079KKjw1?si=mZJiRC8TSoa7eyLUyjkTCQ",
    appleMusic: "https://music.apple.com/it/album/full-panorama/1683514943?l=en-GB",
  },
  {
    title: "GYMNOPÉDIES REWORK",
    spotify: "https://open.spotify.com/album/6DK0vyvhbJGmpoVdkG2mak?si=1XvYgsKJTOGs0jEhxjQwsg",
    appleMusic: "https://music.apple.com/it/album/gymnop%C3%A9dies-rework-single/1549207538?l=en-GB",
  },
];

const Albums = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
        {ALBUMS.map((album, index) => (
          <ReleaseCard
            key={album.title}
            title={album.title}
            spotify={album.spotify}
            appleMusic={album.appleMusic}
            bandcamp={BANDCAMP_URL}
            hasAtmos={album.hasAtmos}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Albums;
