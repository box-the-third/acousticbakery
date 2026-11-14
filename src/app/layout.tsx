import type { Metadata, Viewport } from "next";
import { Albert_Sans, IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import localFont from "next/font/local";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { asset } from "@/lib/asset";
import { BUSINESS, SITE_URL } from "@/data/site";
import "./globals.css";

// Only the two weights the design uses, subset to Latin (about 14 KB each).
const vonca = localFont({
  src: [
    { path: "../fonts/Vonca-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Vonca-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-vonca",
  display: "swap",
  // While Vonca loads, show the device's own geometric sans (SF / Roboto),
  // which is closer to Vonca than a metric-adjusted Arial.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Roboto", "sans-serif"],
  // Preloaded fonts block first paint in Chromium. Without preload, text paints
  // immediately in a metric-matched fallback and swaps in during the fade-in.
  preload: false,
});

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
  preload: false,
});

// Arabic faces are only downloaded when Arabic text is on screen.
const readex = Readex_Pro({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
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
  metadataBase: new URL(`${SITE_URL}/`),
  title: "Acoustic Bakery & Pâtisserie | Bakery & Café in Al Olaya, Riyadh",
  description:
    "Acoustic Bakery & Pâtisserie on Olaya Street, Al Olaya, Riyadh. Fresh croissants, breads, healthy breakfast, specialty coffee and desserts, open daily 7 AM to 12 AM. Party boxes and catering, including airline catering.",
  keywords: [
    "bakery Riyadh",
    "bakery Olaya",
    "pâtisserie Riyadh",
    "café Al Olaya",
    "croissant Riyadh",
    "breakfast Riyadh",
    "party boxes Riyadh",
    "airline catering Riyadh",
    "مخبز الرياض",
    "مخبز العليا",
    "حلويات الرياض",
    "أكوستيك",
    BUSINESS.mapsListingName,
  ],
  applicationName: BUSINESS.name,
  category: "Bakery",
  alternates: { canonical: "/", languages: { en: "/", ar: "/", "x-default": "/" } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    title: "Acoustic Bakery & Pâtisserie, Riyadh",
    description: "Made for the pause. Bakery, pâtisserie and café on Olaya Street, Al Olaya, Riyadh.",
    url: "/",
    siteName: BUSINESS.name,
    images: [{ url: asset("/images/hero-sign.webp"), width: 1920, height: 1080, alt: "Acoustic Bakery & Pâtisserie storefront in Riyadh" }],
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acoustic Bakery & Pâtisserie, Riyadh",
    description: "Bakery, pâtisserie and café on Olaya Street, Al Olaya, Riyadh.",
    images: [asset("/images/hero-sign.webp")],
  },
  other: {
    "geo.region": "SA-01",
    "geo.placename": "Riyadh",
    "geo.position": `${BUSINESS.latitude};${BUSINESS.longitude}`,
    ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
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
