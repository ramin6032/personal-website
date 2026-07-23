import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { PinnedShowcase } from "@/components/sections/pinned-showcase";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import LogoLoader from "@/components/logoLoader";

export default function Home() {
  return (
    <>
      <LogoLoader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <PinnedShowcase />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
