import VideoCard from "./VideoCard";

const VIDEOS = [
  {
    title: "PANORAMA",
    videoId: "A4ivofgWkUM",
    thumbnail: "/assets/videos/panorama.png",
  },
  {
    title: "SHAPING LIGHTS",
    videoId: "xowPZ487zVg",
    thumbnail: "/assets/videos/shaping-lights.png",
  },
  {
    title: "CHROME",
    videoId: "YbbemHnF0BE",
    thumbnail: "/assets/videos/chrome.png",
  },
  {
    title: "FOLLOWING THE RIVER FLOW",
    videoId: "Yr6HpHBn2cQ",
    thumbnail: "/assets/videos/following-the-river-flow.png",
  },
  {
    title: "LIVE SET",
    videoId: "FQ9gLqYOzhQ",
    thumbnail: "/assets/videos/live-set.png",
  },
];

const Videos = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-20 lg:py-20">
      <header className="mb-6 text-center sm:mb-10">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.32em] text-white/60 sm:text-xs">Videos</p>
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {VIDEOS.map((video, index) => (
          <VideoCard
            key={video.videoId}
            title={video.title}
            videoId={video.videoId}
            thumbnail={video.thumbnail}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Videos;
