import Albums from "@/components/Albums";
import About from "@/components/About";
import Contact from "@/components/Contact";
import CursorAura from "@/components/CursorAura";
import FloatingPlayer from "@/components/FloatingPlayer";
import Hero from "@/components/Hero";
import SiteTitle from "@/components/SiteTitle";
import Singles from "@/components/Singles";
import Videos from "@/components/Videos";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <CursorAura />
      <FloatingPlayer />
      <SiteTitle />
      <div className="relative z-10">
        <Hero />
        <Singles />
        <Albums />
        <Videos />
        <About />
        <Contact />
      </div>
    </div>
  );
};

export default Index;
