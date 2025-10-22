import Hero from "@/components/Hero";
import Albums from "@/components/Albums";
import Singles from "@/components/Singles";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Albums />
      <Singles />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
