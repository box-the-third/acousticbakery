import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Story } from "@/components/sections/Story";
import { Purpose } from "@/components/sections/Purpose";
import { Offerings } from "@/components/sections/Offerings";
import { Ritual } from "@/components/sections/Ritual";
import { Menu } from "@/components/sections/Menu";
import { PartyBoxes } from "@/components/sections/PartyBoxes";
import { Catering } from "@/components/sections/Catering";
import { Clients } from "@/components/sections/Clients";
import { Visit } from "@/components/sections/Visit";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <Story />
        <Purpose />
        <Offerings />
        <Ritual />
        <Menu />
        <PartyBoxes />
        <Catering />
        <Clients />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
