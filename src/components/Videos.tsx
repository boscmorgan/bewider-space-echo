import VideoCard from "./VideoCard";

const VIDEOS = [
  {
    title: "PANORAMA",
    videoId: "A4ivofgWkUM",
  },
  {
    title: "SHAPING LIGHTS",
    videoId: "xowPZ487zVg",
  },
  {
    title: "CHROME",
    videoId: "YbbemHnF0BE",
  },
  {
    title: "FOLLOWING THE RIVER FLOW",
    videoId: "Yr6HpHBn2cQ",
  },
];

const Videos = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        {VIDEOS.map((video, index) => (
          <VideoCard
            key={video.videoId}
            title={video.title}
            videoId={video.videoId}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Videos;
