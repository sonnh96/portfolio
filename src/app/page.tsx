import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/animations/CustomCursor";

export default function Home() {
  return (
    <main className="relative bg-[#050816]">
      <CustomCursor />
      <Header />

      <section id="home">
        <HeroSection />
      </section>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
