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
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <header className="mb-8 text-center sm:mb-12">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-white/60 sm:text-sm">Videos</p>
      </header>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
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
