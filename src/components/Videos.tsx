import VideoCard from "./VideoCard";

const Videos = () => {
  const videos = [
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

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center tracking-wider">VIDEOS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {videos.map((video, index) => (
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
