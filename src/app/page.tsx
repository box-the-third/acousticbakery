import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Craft } from "@/components/sections/Craft";
import { Menu } from "@/components/sections/Menu";
import { Visit } from "@/components/sections/Visit";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <Story />
        <Craft />
        <Menu />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
