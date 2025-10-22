import Hero from "@/components/Hero";
import Albums from "@/components/Albums";
import Singles from "@/components/Singles";
import Videos from "@/components/Videos";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Hero />
        <Albums />
        <Singles />
        <Videos />
        <About />
        <Contact />
      </div>
    </div>
  );
};

export default Index;
