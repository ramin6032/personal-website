import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import LogoLoader from "@/components/logoLoader";
import dynamic from "next/dynamic";

const Hero = dynamic(() =>
  import("@/components/sections/hero").then((m) => m.Hero),
);
const PinnedShowcase = dynamic(() =>
  import("@/components/sections/pinned-showcase").then((m) => m.PinnedShowcase),
);

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
