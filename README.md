# Acoustic Bakery & Patisserie

Informational landing page for Acoustic Bakery & Patisserie, Olaya St, Riyadh.
Bilingual (English LTR / Arabic RTL), statically generated, no e-commerce.

## Stack

- Next.js 16 (App Router, fully static output)
- Tailwind CSS 4 (brand tokens in `src/app/globals.css`)
- Framer Motion (lazy `domAnimation` feature set)
- Three.js (hero scene, loaded after first paint on browser idle)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` writes a static site to `out/`.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Push the repo to GitHub.
2. In the repo, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow passes the Pages base path (for example `/acousticbakery`) and site URL to the
build, so asset links work both on `username.github.io/repo` and on a custom domain.
Images from `public/` must be referenced through `asset()` in `src/lib/asset.ts` so they get that prefix.

## Structure

```
src/
  app/                 layout, page, global styles, favicon
  components/
    layout/            Navbar, LanguageSwitch, Footer, SkipLink
    sections/          Hero, Intro, Story, Purpose (mission and vision), Offerings,
                       Ritual (3D), Menu, PartyBoxes, Catering, Clients, Visit
    motion/            MotionProvider, Reveal, StaggerText
    three/             StringsVisual (lazy loader), StringsScene (WebGL)
    ui/                SectionHeading, Isotype
  data/menu.ts         bilingual menu items and prices (edit here)
  data/site.ts         phone, WhatsApp, maps and online-ordering links
  i18n/                dictionary (all copy, EN + AR) and LanguageProvider
  fonts/               Vonca (brand display face, woff2)
public/
  brand/               logo and isotype artwork, exported from Assets/
  images/              photography and packaging mockups from the brand files
```

## Content to confirm before launch

- **Menu:** `Assets/MENU.pdf` only contains placeholder copy, so `src/data/menu.ts` holds a curated sample menu. Replace it with the final items and prices.
- **Online ordering link:** `ORDER_URL` in `src/data/site.ts`. Every party box and "Order online" button opens it.
- **Party boxes, catering and client types:** copy lives in `src/i18n/dictionary.ts` (`boxes`, `catering`, `clients`).
- **Opening hours and phone:** `visit.hours` in the dictionary, and `src/data/site.ts`.
- **Domain:** `metadataBase` in `src/app/layout.tsx`.

## Brand notes

- Colours: Pantone 445 C `#4b585a` and 7542 C `#b1bec6`, with the warm paper `#f5f0e6`, shell `#e6ded0` and coral `#d98e78` from the approved reference design.
- Straight lines throughout: square buttons, cards and frames, no rounded corners.
- Fonts: Vonca (display) and Albert Sans (body). Neither includes Arabic glyphs, so Arabic is set in Readex Pro (display) and IBM Plex Sans Arabic (body).
- The logo and isotype are used from the official artwork and are never mirrored in RTL.

## Language

The EN/AR choice is held in React context, persisted to `localStorage`, and applied to
`<html lang dir>`. Layout uses logical properties (`ps`, `pe`, `start`, `end`, `text-start`)
so everything flips automatically in RTL.
