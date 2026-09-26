import type { Metadata, Viewport } from "next";
import { Albert_Sans, IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import localFont from "next/font/local";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { asset } from "@/lib/asset";
import "./globals.css";

const vonca = localFont({
  src: [
    { path: "../fonts/Vonca-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../fonts/Vonca-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Vonca-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Vonca-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-vonca",
  display: "swap",
});

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
});

// Arabic faces are only needed after a language switch, so they are not preloaded.
const readex = Readex_Pro({
  subsets: ["arabic"],
  weight: ["200", "300", "400"],
  variable: "--font-readex",
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://acousticbakery.sa"),
  title: "Acoustic | Bakery & Patisserie in Riyadh",
  description:
    "Acoustic Bakery & Patisserie on Olaya Street, Riyadh. Slow-fermented breads, handcrafted French pastry and specialty coffee.",
  alternates: { languages: { en: "/", ar: "/" } },
  openGraph: {
    title: "Acoustic | Bakery & Patisserie",
    description: "Everyday moments deserve exceptional quality. Olaya Street, Riyadh.",
    images: [asset("/images/story-flour.webp")],
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4b585a",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: returning Arabic visitors see the page fade in already flipped,
// instead of a flash of the English layout.
const bootScript = `try{if(localStorage.getItem("acoustic-locale")==="ar"){document.documentElement.classList.add("is-booting-locale")}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${vonca.variable} ${albert.variable} ${readex.variable} ${plexArabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
