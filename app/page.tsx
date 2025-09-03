import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import QuoteDivider from "@/components/QuoteDivider";
import Collaboration from "@/components/Collaboration";
import AboutSection from "@/components/About";
import Projects from "@/components/projectSection/Projects";

export default function Home() {
  return (
    <main className="bg-[#1e1e1e] pt-5 text-white min-h-screen">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="work">
        <Projects />
      </div>
      <QuoteDivider />
      <div id="about">
        <AboutSection />
      </div>
      <div id="play">
        <Collaboration />
      </div>
    </main>
  );
}
